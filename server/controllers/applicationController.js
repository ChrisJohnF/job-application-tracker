const db = require("../database/database.js");

const getAllApplications = (req, res) => {
    db.all("SELECT * FROM applications ORDER BY created_at DESC", [], (err, rows) => {
        if (err) {
            console.error("Error fetching applications:", err.message);
            return res.status(500).json({ error: "Failed to fetch applications" });
        }

        res.json(rows);
    });
};

const createApplication = (req, res) => {
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
    } = req.body;

    if (!company || !position) {
        return res.status(400).json({
            error: "Company and position are required"
        });
    }

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

    db.run(sql, params, function (err) {
        if (err) {
            console.error("Error creating application:", err.message);
            return res.status(500).json({
                error: "Failed to create application"
            });
        }

        res.status(201).json({
            id: this.lastID,
            company,
            position,
            status: status || "Entwurf"
        });
    });
};

module.exports = {
    getAllApplications,
    createApplication
};
