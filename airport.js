
function drawAirport(ctx) {
    // Background
    ctx.fillStyle = "#24362f";
    ctx.fillRect(0, 0, 1000, 650);

    // Runway
    ctx.fillStyle = "#353a40";
    ctx.fillRect(60, 170, 880, 100);

    ctx.strokeStyle = "#aeb5b5";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 170, 880, 100);

    // Runway centerline
    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 3;
    ctx.setLineDash([25, 20]);

    ctx.beginPath();
    ctx.moveTo(80, 220);
    ctx.lineTo(920, 220);
    ctx.stroke();

    ctx.setLineDash([]);

    // Runway numbers
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 23px Arial";
    ctx.fillText("27", 80, 205);
    ctx.fillText("09", 890, 205);

    // Main taxiway Alpha
    ctx.strokeStyle = "#a99a63";
    ctx.lineWidth = 24;

    ctx.beginPath();
    ctx.moveTo(100, 430);
    ctx.lineTo(900, 430);
    ctx.stroke();

    // Taxiway centerline
    ctx.strokeStyle = "#e4d9a3";
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 12]);

    ctx.beginPath();
    ctx.moveTo(100, 430);
    ctx.lineTo(900, 430);
    ctx.stroke();

    // Taxiway Bravo
    ctx.beginPath();
    ctx.moveTo(700, 430);
    ctx.lineTo(700, 270);
    ctx.stroke();

    ctx.setLineDash([]);

    // Hold-short marking
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(680, 290);
    ctx.lineTo(720, 290);
    ctx.stroke();

    // Gates
    const gates = [150, 350, 550];

    gates.forEach((x, i) => {
        ctx.strokeStyle = "#b6c5ba";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(x, 530);
        ctx.lineTo(x, 470);
        ctx.lineTo(x, 430);
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Arial";
        ctx.fillText("GATE " + (i + 1), x - 25, 555);
    });

    // Taxiway labels
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 15px Arial";

    ctx.fillText("TAXIWAY ALPHA", 350, 465);
    ctx.fillText("TAXIWAY BRAVO", 715, 315);
    ctx.fillText("HOLD SHORT", 730, 290);
}
