// api/generate-widget.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { html, css, js } = req.body;

    if (!html || !css || !js) {
      return res.status(400).json({ error: 'HTML, CSS, and JS code are required.' });
    }

    // Generate the widget content
    const widgetContent = generateWidgetContent(html, css, js);

    try {
      // Encode widget content as Base64
      const encodedContent = Buffer.from(encodeURIComponent(widgetContent)).toString('base64');

      // Generate the widget URL
      const baseUrl = req.headers['x-forwarded-proto'] + '://' + req.headers['host'];
      const widgetUrl = `${baseUrl}/widget.html#content=${encodedContent}`;

      res.status(200).json({ widgetUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

function generateWidgetContent(html, css, js) {
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
