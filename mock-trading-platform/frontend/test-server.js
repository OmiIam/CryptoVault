const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <head><title>Test Server</title></head>
      <body>
        <h1>Test Server Running!</h1>
        <p>If you can see this, the server connectivity works.</p>
        <p>Backend should be at: <a href="http://localhost:8000/api/assets">http://localhost:8000/api/assets</a></p>
      </body>
    </html>
  `);
});

const PORT = 3002;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log(`Network: http://0.0.0.0:${PORT}`);
});