var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var selectedAircraft = null;
var lastFrame = 0;

function selectAircraft(id) {
    selectAircraft = aircraft.find(p => p.id === id) || null;

    renderAircraftList();
    renderFlightInfo();
}

function renderAircraftList() {
    const list = document.getElementById("aircraftList");
    list.innerHTML = "";

    aircraft.forEach(plane => {
        const button = document.createElement("button");

        button.className = "aircraft-entry";
        if (selectAircraft === plane) {
            button.classList.add("selected");
        }

        button.innerHTML = `
            <strong>${plane.id}</strong>
            <small>${plane.type} · ${plane.status}</small>
        `;

        button.addEventListener("click", () => {
            selectedAircraft(plane.id);
        });

        list.appendChild(button);
    });
}

function renderFlightInfo() {
    const info = document.getElementById("flightInfo");

    if (selectedAircraft) {
        info.textContent = "Select an aircraft";
        return;
    }

    const p = selectedAircraft;

     info.innerHTML = `
        <strong>${p.id}</strong>
        <p>Airline: ${p.airline}</p>
        <p>Aircraft: ${p.type}</p>
        <p>Position: ${Math.round(p.x)}, ${Math.round(p.y)}</p>
        <p>Status: <span class="status">${p.status}</span></p>
        <p>Ground speed: ${p.speed} knots</p>
    `;

}

document.querySelectorAll("[data-command]").forEach(button => {
    button.addEventListener("click", () => {
        issueATCCommand(
            selectAircraft,
            button.dataset.command
        );
    });
});

canvas.addEventListener("click", event => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * canvas.width / rect.width;
    const Y = (event.clientY - rect.top) * canvas.height / rect.height;

    let closest = null;
    let closestDistance = 30;

    aircraft.forEach(plane => {
        const distance = Math.hypot(
            plane.x - x,
            plane.y - y
        );

        if (distance < closestDistance) {
            closest = plane;
            closestDistance=distance;
        }
    });

    if (closest) {
        selectAircraft(closest.id);
    }
});

function gameLoop(timestamp) {
    const dt = Math.min((timestamp - lastFrame) / 1000, 0.05);
    lastFrame = timestamp;
    updateAircraft(dt);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAirport(ctx);
    aircraft.forEach(plane => {
        drawAircraft(
            ctx,
            plane,
            selectAircraft === plane
        );
    });

    requestAnimationFrame(gameLoop);
}

function updateClock() {
    document.getElementById("clock").textContent =
        new Date().toLocalTimeString();
}

function startGame() {
    aircraft.forEach(plane => {
        pilotCall(plane, "Ground, requesting taxi.");
    });

    renderAircraftList();
    renderFlightInfo();
    updateClock();
    setInterval(updateClock, 1000);
    requestAnimationFrame(gameLoop);
}

startGame();