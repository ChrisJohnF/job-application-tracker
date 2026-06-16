const db = require("../database/database.js");

const getAllApplications = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM applications ORDER BY created_at DESC", [], (err, rows) => {
            if (err) {
                return reject(err);
            }

            resolve(rows);
        });
    });
};

const getApplicationById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM applications WHERE id = ?", [id], (err, row) => {
            if (err) {
                return reject(err);
            }

            resolve(row);
        });
    });
};

const createApplication = (applicationData) => {
    const {
        company,
        position,
        source,
        link,
        applied_date,
        status,
        salary,
        contact_person,
        notes,
        interview_date
    } = applicationData;

    const sql = `
        INSERT INTO applications (
            company,
            position,
            source,
            link,
            applied_date,
            status,
            salary,
            contact_person,
            notes,
            interview_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        company,
        position,
        source,
        link,
        applied_date,
        status || "Entwurf",
        salary,
        contact_person,
        notes,
        interview_date
    ];

    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                return reject(err);
            }

            resolve({
                id: this.lastID,
                company,
                position,
                status: status || "Entwurf"
            });
        });
    });
};

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication
};
