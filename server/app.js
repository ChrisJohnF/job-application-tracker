const express = require("express");
const path = require("path");
const db = require("./database/database.js");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
    res.send("Job Application Tracker API is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});