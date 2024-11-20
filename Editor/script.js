// Vorschau generieren
document.getElementById("previewButton").addEventListener("click", () => {
    const html = document.getElementById("htmlInput").value;
    const css = `<style>${document.getElementById("cssInput").value}</style>`;
    const js = `<script>${document.getElementById("jsInput").value}<\/script>`;
    const iframe = document.getElementById("widgetPreview");
    iframe.srcdoc = `${css}${html}${js}`;
});

// Widget speichern
document.getElementById("saveButton").addEventListener("click", () => {
    const html = document.getElementById("htmlInput").value;
    const css = `<style>${document.getElementById("cssInput").value}</style>`;
    const js = `<script>${document.getElementById("jsInput").value}<\/script>`;
    const widgetContent = `${css}${html}${js}`;

    // Einzigartige URL generieren
    const blob = new Blob([widgetContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Auf GitHub speichern (hier müsstest du mit GitHub API oder einem externen Tool arbeiten)
    alert(`Widget-URL: ${url}`);
});
