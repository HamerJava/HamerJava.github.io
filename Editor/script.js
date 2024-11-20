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
        // Komprimiere den Content
        const compressed = compress(widgetContent);
        
        const baseUrl = window.location.origin;
        currentWidgetUrl = `${baseUrl}/w#${compressed}`;
        
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

// Hilfsfunktion zum Komprimieren des Contents
function compress(content) {
    // Entferne unnötige Whitespaces
    content = content.replace(/\s+/g, ' ').trim();
    
    // Base64 kodieren und URL-sicher machen
    return btoa(encodeURIComponent(content))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
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
    const width = iframe.contentDocument.documentElement.scrollWidth;
    const height = iframe.contentDocument.documentElement.scrollHeight;
    
    return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-Frame-Options" content="ALLOWALL">
    <meta http-equiv="Content-Security-Policy" content="frame-ancestors *">
    <style>
        body {
            margin: 0;
            width: ${width}px;
            height: ${height}px;
            overflow: hidden;
        }
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>${js}</script>
</body>
</html>`;
}
