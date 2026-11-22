
function issueATCCommand(plane, command) {
    if (!plane) {
        addRadioMessage("Select an aircraft first.", "warning");
        return;
    }

    if (command === "taxi") {
        if (plane.status !== "At gate") {
            addRadioMessage("Aircraft is not at a gate.", "warning");
            return;
        }

        assignRoute(plane, [
            { x: plane.x, y: 430 },
            { x: 700, y: 430 },
            { x: 700, y: 295 }
        ], "Holding short RWY 27");

        plane.status = "Taxiing to runway 27";

        groundCall(
            plane,
            "taxi to runway 27 via Alpha and Bravo, hold short of runway 27."
        );

        setTimeout(() => {
            addRadioMessage(
                plane.id + ": Taxi to runway 27 via Alpha and Bravo, holding short.",
                "pilot"
            );
        }, 1200);
    }

    else if (command === "cross") {
        if (plane.status !== "Holding short RWY 27") {
            addRadioMessage(
                "Aircraft must be holding short before requesting crossing clearance.",
                "warning"
            );
            return;
        }

        assignRoute(plane, [
            { x: 700, y: 140 }
        ], "Runway crossed");

        plane.status = "Crossing runway 27";

        groundCall(plane, "cross runway 27.");

        setTimeout(() => {
            addRadioMessage(
                plane.id + ": Crossing runway 27",
                "pilot"
            );
        }, 1200);
    }

    else if (command === "hold") {
        plane.route = [];
        plane.speed = 0;
        plane.status = "Holding position";

        groundCall(plane, "hold position.");

        setTimeout(() => {
            addRadioMessage(
                plane.id + ": Holding position.",
                "pilot"
            );
        }, 1200);
    }

    else if (command === "handoff") {
        if (plane.status !== "Runway crossed") {
            addRadioMessage(
                "Aircraft must complete its runway crossing first.",
                "warning"
            );
            return;
        }

        plane.status = "Handed off to Tower";

        groundCall(plane, "contact Tower.");

        setTimeout(() => {
            addRadioMessage(
                plane.id + ": Contact Tower.",
                "pilot"
            );
        }, 1200);
    }

    renderAircraftList();
    renderFlightInfo();
}