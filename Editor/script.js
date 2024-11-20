let currentWidgetUrl = null;

// Vorschau generieren
document.getElementById("previewButton").addEventListener("click", () => {
    const widgetContent = generateWidgetContent();
    const iframe = document.getElementById("widgetPreview");
    iframe.srcdoc = widgetContent;
});

// Widget speichern und URL generieren
document.getElementById("saveButton").addEventListener("click", async () => {
    const widgetContent = generateWidgetContent();
    
    try {
        const response = await saveToGitHub(widgetContent);
        currentWidgetUrl = `https://hamerjava.github.io/widgets/${response.filename}`;
        
        const urlContainer = document.querySelector('.url-container');
        urlContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="flex: 1;">Widget URL: ${currentWidgetUrl}</span>
                <button onclick="copyToClipboard('${currentWidgetUrl}')" class="secondary-button">
                    Kopieren
                </button>
            </div>`;
        urlContainer.classList.add('visible');
    } catch (error) {
        alert('Fehler beim Speichern des Widgets: ' + error.message);
        console.error(error);
    }
});

// URL kopieren
document.getElementById("copyButton").addEventListener("click", () => {
    if (!currentWidgetUrl) {
        alert('Bitte speichern Sie zuerst das Widget');
        return;
    }
    
    navigator.clipboard.writeText(currentWidgetUrl)
        .then(() => alert('URL wurde in die Zwischenablage kopiert!'))
        .catch(err => alert('Fehler beim Kopieren der URL'));
});

function generateWidgetContent() {
    const html = document.getElementById("htmlInput").value;
    const css = document.getElementById("cssInput").value;
    const js = document.getElementById("jsInput").value;
    
    return `
<!DOCTYPE html>
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

async function saveToGitHub(content) {
    try {
        // Generiere einen einzigartigen Dateinamen basierend auf Timestamp
        const timestamp = new Date().getTime();
        const filename = `widget_${timestamp}`;
        
        // Erstelle einen neuen Branch für das Widget
        const response = {
            filename: `${filename}/index.html`
        };

        // Speichere den Inhalt lokal (als Beispiel)
        localStorage.setItem(`widget_${timestamp}`, content);
        
        return response;
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
        throw error;
    }
}

// Hilfsfunktion zum Kopieren der URL
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert('URL wurde in die Zwischenablage kopiert!'))
        .catch(err => alert('Fehler beim Kopieren der URL'));
}
