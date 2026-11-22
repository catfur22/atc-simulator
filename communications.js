function addRadioMessage(message, type = "pilot") {
    const log = document.getElementById("radioLog");
    const entry = document.createElement("div");
    entry.className = "radio-message " + type;
    entry.textContent = message;
    log.prepend(entry);
    
    while (log.children.length > 20) {
        log.lastChild.remove();
    }
}

function pilotCall(plane, message) {
    addRadioMessage(plane.id + ": " + message, "pilot");
}

function groundCall(plane, message) {
    addRadioMessage("GROUND: " + plane.id + ", " + message, "ground");
}