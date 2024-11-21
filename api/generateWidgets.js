// api/generateWidget.js
export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { html, css, js } = req.body;

    if (!html || !css || !js) {
        return res.status(400).json({ message: 'Fehlende HTML, CSS oder JS Eingabe' });
    }

    try {
        // Generiere den vollständigen Widget-Inhalt
        const widgetContent = `
        <!DOCTYPE html>
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
        </html>
        `;

        // Encode den Widget-Inhalt in Base64
        const encodedContent = Buffer.from(encodeURIComponent(widgetContent)).toString('base64');

        // Basis-URL der Website (ersetze dies durch deine tatsächliche URL)
        const baseUrl = 'https://hamerjava.github.io/Editor';

        // Generiere die Widget-URL
        const widgetUrl = `${baseUrl}/widget.html#content=${encodedContent}`;

        // Rückgabe der Widget-URL
        res.status(200).json({ widgetUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fehler bei der Widget-Generierung' });
    }
}
