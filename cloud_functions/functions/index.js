const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { initializeApp } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { onRequest } = require("firebase-functions/v2/https");
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const logger = require("firebase-functions/logger");
const path = require("path");

const {
    onDocumentWritten,
    onDocumentCreated,
    onDocumentUpdated,
    onDocumentDeleted,
    Change,
    FirestoreEvent
} = require('firebase-functions/v2/firestore');

// library for image resizing
const sharp = require("sharp");

const { setGlobalOptions } = require('firebase-functions/v2');
setGlobalOptions({ region: 'europe-west3' })

initializeApp();

const { generateProgramsReport } = require('./databaseWatcher')

const db = admin.firestore();

// exports.helloWorld = onRequest((request, response) => {
//     logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });

// When an image is uploaded in the default storage bucket
exports.generateThumbnail = onObjectFinalized({ cpu: 2 }, async (event) => {

    const fileBucket = event.data.bucket;
    const filePath = event.data.name;
    const contentType = event.data.contentType;

    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith("image/")) {
        return logger.log("This is not an image.");
    }
    // Exit if the image is already a thumbnail.
    const fileName = path.basename(filePath);
    if (fileName.startsWith("thumb_")) {
        return logger.log("Already a Thumbnail.");
    }

    // Download file into memory from bucket.
    const bucket = getStorage().bucket(fileBucket);
    const downloadResponse = await bucket.file(filePath).download();
    const imageBuffer = downloadResponse[0];
    logger.log("Image downloaded!");

    // Generate a thumbnail using sharp.
    const thumbnailBuffer = await sharp(imageBuffer).resize({
        width: 200,
        height: 200,
        withoutEnlargement: true,
    }).toBuffer();
    logger.log("Thumbnail created");

    // Prefix 'thumb_' to file name.
    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

    // Upload the thumbnail.
    const metadata = { contentType: contentType };
    await bucket.file(thumbFilePath).save(thumbnailBuffer, {
        metadata: metadata,
    });
    return logger.log("Thumbnail uploaded!");
});

exports.weeklyReport = functions
    .pubsub.schedule('every 2 minutes')
    .onRun(async (context) => {
        await generateProgramsReport()
    });
