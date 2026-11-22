var aircraft = [
    {
        id: "UAL204",
        airline: "UNITED",
        type: "B738",
        x: 150,
        y: 530,
        color: "#65baff",
        heading: 0,
        speed: 0,
        status: "At Gate",
        route: [],
        targetStatus: ""
    },
    
    {
        id: "DAL512",
        airline: "DELTA",
        type: "A320",
        x: 350,
        y: 530,
        color: "#ff8585",
        heading: 0,
        speed: 0,
        status: "At Gate",
        route: [],
        targetStatus: ""
    },

    {
        id: "SWA831",
        airline: "SOUTHWEST",
        type: "B737",
        x: 550,
        y: 530,
        color: "#f4c367",
        heading: 0,
        speed: 0,
        status: "At Gate",
        route: [],
        targetStatus: "",
    }
];

function assignRoute(plane, points, finalStatus) {
    plane.route = points.map(p => ({x: p.x, y: p.y}));
    plane.targetStatus = finalStatus;
}

function updateAircraft(dt) {
    aircraft.forEach(plane => {
        if (plane.route.legnth === 0) return;

        const target = plane.route[0];
        const dx = target.x - plane.x;
        const dy = target.y = plane.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 3) {
            plane.x = target.x;
            plane.y = target.y;
            plane.route.shift();

            if(plane.route.length === 0) {
                plane.status = plane.targetStatus;
                plane.speed = 0;
            }
            return;
        }

        const speed = 65;
        const movement = Math.min(speed*dt, distance);
        plane.x += dx / distance*movement;
        plane.y += dy / distance*movement;
        plane.heading=Math.atan2(dy, dx) + Math.PI / 2;
        plane.speed = 15;
    });
}

function drawAircraft(ctx, plane, selected) {
    ctx.save();
    ctx.translate(plane.x, plane.y);
    ctx.rotate(plane.heading);
    ctx.fillStyle = plane.color;
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(5, 8);
    ctx.lineTo(0, 5);
    ctx.lineTo(-5, 8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    if (selected) {
        ctx.strokeStyle = "#ffff00";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(plane.x, plane.y, 22, 0, Math.PI*2);
        ctx.stroke();
    }

    ctx.fillStyle = "ffffff";
    ctx.font = "bold 13px Ariel";
    ctx.fillText(plane.id, plane.x + 15, plane.y - 12);
}