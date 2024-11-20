let currentWidgetUrl = null;

document.getElementById("previewButton").addEventListener("click", () => {
    const widgetContent = generateWidgetContent();
    const iframe = document.getElementById("widgetPreview");
    iframe.srcdoc = widgetContent;
    generateAndCopyUrl();
});

document.getElementById("copyButton").addEventListener("click", generateAndCopyUrl);

const API_URL = 'https://api.jsonbin.io/v3/b';
const API_KEY = '$2a$10$YOUR_API_KEY'; // Ersetze dies mit deinem JSONBin API Key

async function generateAndCopyUrl() {
    const widgetContent = generateWidgetContent();
    try {
        // Speichere Widget in JSONBin
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({
                content: widgetContent,
                timestamp: new Date().getTime()
            })
        });
        
        const data = await response.json();
        const widgetId = data.metadata.id;
        
        // Generiere die Widget-URL
        currentWidgetUrl = `${window.location.origin}/widget/${widgetId}`;
        
        // Zeige die URL an
        const urlContainer = document.querySelector('.url-container');
        urlContainer.innerHTML = `
            <div class="url-display">
                <span>Widget URL:</span>
                <code>${currentWidgetUrl}</code>
            </div>`;
        urlContainer.classList.add('visible');
        
        // Kopiere URL
        await navigator.clipboard.writeText(currentWidgetUrl);
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
