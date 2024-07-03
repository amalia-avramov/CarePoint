const { MedicalRecord, Medicine, MedicineProgram } = require('./programModel')

const admin = require('firebase-admin');

const db = admin.firestore();
const bucket = admin.storage().bucket();

const generateProgramsReport = async () => {
    try {
        // Reference a Firestore collection
        const snapshot = await db.collection('programs').get();
        const records = [];

        snapshot.forEach(doc => {
            const programId = doc.id;
            const programData = doc.data()

            const medicalRecord = new MedicalRecord(
                programData.diagnostic,
                programData.medicine,
                programData.patientId
            )

            records.push(medicalRecord);
        });

        const reportHtml = generateReport(records);
        await saveReportToStorage(reportHtml);
    } catch (error) {
        console.error("Error reading Firestore: ", error);
        throw new Error("Error reading Firestore");
    }
}

// Utility function to parse a date in "DD/MM/YYYY" format
function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
}

// Utility function to format a date as "DD/MM/YYYY"
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Function to generate an array of dates from startDate to now
function generateDateRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

// Function to generate a report with highlighted dates
function generateReport(records) {
    let html = `
  <html>
    <head>
      <title>Patient Report</title>
      <style>
        .green {
          background-color: green;
          color: white;
        }
        .red {
          background-color: red;
          color: white;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          text-align: center;
          padding: 8px;
        }
      </style>
    </head>
    <body>
      <h1>Patient Report</h1>
  `;

    records.forEach(record => {
        html += `<h2>Patient ID: ${record.patientId}</h2>`;
        html += `<p><strong>Diagnostic:</strong> ${record.diagnostic}</p>`;
        html += `<p><strong>Medicine:</strong> ${record.medicine.name}</p>`;
        html += `<p><strong>Administration Method:</strong> ${record.medicine.administrationMethod}</p>`;
        html += `<p><strong>Frequency:</strong> ${record.medicine.frequency}</p>`;
        html += `<p><strong>Start Date:</strong> ${record.medicine.startDate}</p>`;
        html += `<p><strong>End Date:</strong> ${record.medicine.endDate}</p>`;
        html += '<h3>Program:</h3>';
        html += '<table><thead><tr><th>Date</th></tr></thead><tbody>';

        const startDate = parseDate(record.medicine.startDate);
        const endDate = new Date(); // Today's date
        const allDates = generateDateRange(startDate, endDate);
        const datesList = record.medicine.program.flatMap(p => p.dates.map(parseDate));

        allDates.forEach(date => {
            const dateStr = formatDate(date);
            const isGreen = datesList.some(d => d.getTime() === date.getTime());
            const className = isGreen ? 'green' : 'red';
            html += `<tr><td class="${className}">${dateStr}</td></tr>`;
        });

        html += '</tbody></table>';
        html += '<hr>';
    });

    html += '</body></html>';
    return html;
}

// Function to save the report to Firebase Storage
async function saveReportToStorage(reportHtml) {
    const fileName = `patient_report_${Date.now()}.html`;
    const file = bucket.file(fileName);

    try {
        await file.save(reportHtml, {
            metadata: {
                contentType: 'text/html',
            },
        });
        console.log(`Report saved to ${fileName}`);

        // Update database with the new report
        await updateDatabase(fileName, '1234567890123')
    } catch (error) {
        console.error('Error saving report to storage:', error);
    }
}

async function updateDatabase(fileName, doctorCNP) {
    const reportData = {
        doctorCNP: doctorCNP,
        reportName: fileName
    }

    try {
        // Add a new document with a generated ID to the "reports" collection
        const docRef = await db.collection('reports').add(reportData);

        console.log(`Report added with ID: ${docRef.id}`);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
}

module.exports = { generateProgramsReport };
