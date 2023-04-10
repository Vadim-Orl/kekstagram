const server = http.createServer((req, res) => {
  if (req.url !== '/') return res.end('404');
  res.writeHead(200, {
    'Content-Type': 'text/html',
  })

  const json = {
    // Data...
  }

  res.write(JSON.stringify(json))
  res.end()
});

server.listen(8081)
