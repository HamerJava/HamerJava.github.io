let currentWidgetUrl = null;

// Live Preview Event Listener für alle Textareas
document.getElementById("htmlInput").addEventListener("input", updatePreview);
document.getElementById("cssInput").addEventListener("input", updatePreview);
document.getElementById("jsInput").addEventListener("input", updatePreview);

// Initial Preview beim Laden
document.addEventListener("DOMContentLoaded", updatePreview);

// Copy Button Event Listener
document.getElementById("copyButton").addEventListener("click", generateAndCopyUrl);

function updatePreview() {
    const widgetContent = generateWidgetContent();
    const iframe = document.getElementById("widgetPreview");
    iframe.srcdoc = widgetContent;
}

function generateAndCopyUrl() {
    const widgetContent = generateWidgetContent();
    try {
        // Encode widget content als Base64
        const encodedContent = btoa(encodeURIComponent(widgetContent));
        
        const baseUrl = window.location.origin;
        currentWidgetUrl = `${baseUrl}/widget.html#content=${encodedContent}`;
        
        const urlContainer = document.querySelector('.url-container');
        urlContainer.innerHTML = `
            <div class="url-display">
                <span>Widget URL:</span>
                <code>${currentWidgetUrl}</code>
            </div>`;
        urlContainer.classList.add('visible');
        
        navigator.clipboard.writeText(currentWidgetUrl);
        showNotification('Widget URL kopiert!');
    } catch (error) {
        showNotification('Fehler beim Generieren der Widget-URL', 'error');
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
    
    // Berechne die tatsächliche Größe des Widgets aus der Preview
    const iframe = document.getElementById("widgetPreview");

    
    return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-Frame-Options" content="ALLOWALL">
    <meta http-equiv="Content-Security-Policy" content="frame-ancestors *">
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}</script>
</body>
</html>`;
}