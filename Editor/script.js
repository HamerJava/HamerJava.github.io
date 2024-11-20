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
        // Hier müsstest du die tatsächliche GitHub API Integration implementieren
        // Dies ist nur ein Beispiel für die Struktur
        const response = await saveToGitHub(widgetContent);
        currentWidgetUrl = `https://hamerjava.github.io/widgets/${response.filename}`;
        
        const urlContainer = document.querySelector('.url-container');
        urlContainer.textContent = `Widget URL: ${currentWidgetUrl}`;
        urlContainer.classList.add('visible');
    } catch (error) {
        alert('Fehler beim Speichern des Widgets');
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
    // Hier müsste die tatsächliche GitHub API Integration implementiert werden
    // Dies ist nur ein Platzhalter
    throw new Error('GitHub Integration noch nicht implementiert');
}
