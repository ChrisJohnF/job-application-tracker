async function loadApplications() {

    const response = await fetch("http://localhost:5000/api/applications");

    const applications = await response.json();

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