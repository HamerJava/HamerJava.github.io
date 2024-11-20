let currentWidgetUrl = null;

document.getElementById("previewButton").addEventListener("click", () => {
    const widgetContent = generateWidgetContent();
    const iframe = document.getElementById("widgetPreview");
    iframe.srcdoc = widgetContent;
});

document.getElementById("copyButton").addEventListener("click", generateAndCopyUrl);

function generateAndCopyUrl() {
    const widgetContent = generateWidgetContent();
    try {
        // Generiere eine eindeutige ID
        const widgetId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        
        // Speichere Widget im localStorage
        localStorage.setItem(`widget_${widgetId}`, widgetContent);
        
        // Generiere die Widget-URL
        const baseUrl = window.location.origin;
        currentWidgetUrl = `${baseUrl}/widget.html?id=${widgetId}`;
        
        // Zeige die URL an
        const urlContainer = document.querySelector('.url-container');
        urlContainer.innerHTML = `
            <div class="url-display">
                <span>Widget URL:</span>
                <code>${currentWidgetUrl}</code>
            </div>`;
        urlContainer.classList.add('visible');
        
        // Kopiere URL
        navigator.clipboard.writeText(currentWidgetUrl);
        showNotification('Widget URL kopiert!');
    } catch (error) {
        showNotification('Fehler beim Speichern des Widgets', 'error');
        console.error(error);
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function generateWidgetContent() {
    const html = document.getElementById("htmlInput").value;
    const css = document.getElementById("cssInput").value;
    const js = document.getElementById("jsInput").value;
    
    return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}</script>
</body>
</html>`;
}

// Event Listener für alle Textarea-Inputs
document.getElementById("htmlInput").addEventListener("input", updatePreview);
document.getElementById("cssInput").addEventListener("input", updatePreview);
document.getElementById("jsInput").addEventListener("input", updatePreview);

// Funktion für Live-Preview
function updatePreview() {
    const widgetContent = generateWidgetContent();
    const iframe = document.getElementById("widgetPreview");
    iframe.srcdoc = widgetContent;
}

// Initialisiere Preview beim Laden
document.addEventListener("DOMContentLoaded", updatePreview);
