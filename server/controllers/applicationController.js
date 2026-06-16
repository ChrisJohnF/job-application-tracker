const applicationModel = require("../models/applicationModel.js");

const getAllApplications = async (req, res) => {
    try {
        const applications = await applicationModel.getAllApplications();

        res.json(applications);
    } catch (err) {
        console.error("Error fetching applications:", err.message);
        res.status(500).json({ error: "Failed to fetch applications" });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const application = await applicationModel.getApplicationById(req.params.id);

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        res.json(application);
    } catch (err) {
        console.error("Error fetching application:", err.message);
        res.status(500).json({ error: "Failed to fetch application" });
    }
};

const createApplication = async (req, res) => {
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

    try {
        const application = await applicationModel.createApplication({
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
        });

        res.status(201).json(application);
    } catch (err) {
        console.error("Error creating application:", err.message);
        res.status(500).json({
            error: "Failed to create application"
        });
    }
};

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication
};
