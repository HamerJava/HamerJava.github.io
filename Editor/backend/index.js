// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json({ limit: '1mb' }));

// API endpoint to receive HTML, CSS, and JS code
app.post('/generate-widget', (req, res) => {
  const { html, css, js } = req.body;

  if (!html || !css || !js) {
    return res.status(400).json({ error: 'HTML, CSS, and JS code are required.' });
  }

  // Generate the widget content
  const widgetContent = generateWidgetContent(html, css, js);

  // Encode the content
  const encodedContent = Buffer.from(encodeURIComponent(widgetContent)).toString('base64');

  // Generate the widget URL
  const baseUrl = req.protocol + '://' + req.get('host');
  const widgetUrl = `${baseUrl}/widget.html#content=${encodedContent}`;

  res.json({ widgetUrl });
});

// Function to generate widget content
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

// Serve the widget.html file
app.get('/widget.html', (req, res) => {
  res.sendFile(__dirname + '/widget.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
