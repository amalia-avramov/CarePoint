class MedicineProgram {
    constructor(dates, hour, quantity, startDate) {
        this.dates = dates;
        this.hour = hour;
        this.quantity = quantity;
        this.startDate = startDate;
    }
}

class Medicine {
    constructor(name, administrationMethod, frequency, startDate, endDate, program) {
        this.name = name;
        this.administrationMethod = administrationMethod;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.program = program.map(
            p => new MedicineProgram(p.dates, p.hour, p.quantity, p.startDate)
        );
    }
}

class MedicalRecord {
    constructor(diagnostic, medicine, patientId) {
        this.diagnostic = diagnostic;
        this.medicine = new Medicine(
            medicine.name,
            medicine.administrationMethod,
            medicine.frequency,
            medicine.startDate,
            medicine.endDate,
            medicine.program
        );
        this.patientId = patientId;
    }
}

module.exports = { MedicalRecord, Medicine, MedicineProgram };
