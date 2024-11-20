let currentWidgetUrl = null;

document.getElementById("previewButton").addEventListener("click", () => {
    const widgetContent = generateWidgetContent();
    const iframe = document.getElementById("widgetPreview");
    iframe.srcdoc = widgetContent;
    generateAndCopyUrl();
});

document.getElementById("copyButton").addEventListener("click", generateAndCopyUrl);

function generateAndCopyUrl() {
    const widgetContent = generateWidgetContent();
    const timestamp = new Date().getTime();
    const filename = `widget_${timestamp}`;
    
    // Speichere den Widget-Inhalt im localStorage
    localStorage.setItem(filename, widgetContent);
    
    // Generiere die URL
    currentWidgetUrl = `${window.location.origin}/widgets/${filename}/index.html`;
    
    // Zeige die URL an
    const urlContainer = document.querySelector('.url-container');
    urlContainer.innerHTML = `Widget URL: ${currentWidgetUrl}`;
    urlContainer.classList.add('visible');
    
    // Kopiere die URL in die Zwischenablage
    navigator.clipboard.writeText(currentWidgetUrl)
        .then(() => alert('Widget URL wurde in die Zwischenablage kopiert!'))
        .catch(err => alert('Fehler beim Kopieren der URL'));
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
