document.title = " ControlPanel";

function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

window.addEventListener("load", () => {
    const existing = document.getElementById("mission-control-widget");
    if (existing) existing.remove();

    const widget = document.createElement("div");
    widget.id = "mission-control-widget";

    widget.innerHTML = `
        <div style="font-weight:600;">${getGreeting()}, Leo</div>
    `;

    widget.style.position = "fixed";
    widget.style.top = "5px";
    widget.style.right = "10px";
    widget.style.padding = "12px 16px";
    widget.style.borderRadius = "16px";
    widget.style.backdropFilter = "blur(16px)";
    widget.style.background = "rgba(15,23,42,0.7)";
    widget.style.border = "1px solid rgba(255,255,255,0.1)";
    widget.style.zIndex = "9999";
    widget.style.transition = "opacity 1s ease";

    document.body.appendChild(widget);

    setTimeout(() => {
        widget.style.opacity = "0";

        setTimeout(() => {
            widget.remove();
        }, 1000);
    }, 5000);
});
