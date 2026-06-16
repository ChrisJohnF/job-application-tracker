async function loadApplications() {

    const response = await fetch("http://localhost:5000/api/applications");

    const applications = await response.json();

    updateDashboard(applications);

    const container = document.getElementById("applications-container");

    container.innerHTML = "";

    applications.forEach(application => {

        container.innerHTML += `
            <div class="application-card">
                <h3>${application.company}</h3>
                <p>${application.position}</p>
                <p>Status: ${application.status}</p>
            </div>
        `;

    });

}

loadApplications();

const form = document.getElementById("application-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const company = document.getElementById("company").value;
    const position = document.getElementById("position").value;

    const response = await fetch(
        "http://localhost:5000/api/applications",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                company,
                position,
                status: "Beworben"
            })
        }
    );

    if (response.ok) {

        form.reset();

        loadApplications();

    }

});

function updateDashboard(applications) {
    const totalApplications = applications.length;

    const interviewCount = applications.filter(app =>
        app.status === "Interview"
    ).length;

    const rejectionCount = applications.filter(app =>
        app.status === "Absage"
    ).length;

    const offerCount = applications.filter(app =>
        app.status === "Angebot"
    ).length;

    document.getElementById("total-applications").textContent = totalApplications;
    document.getElementById("interview-count").textContent = interviewCount;
    document.getElementById("rejection-count").textContent = rejectionCount;
    document.getElementById("offer-count").textContent = offerCount;
}