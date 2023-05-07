const http = require('http');
const server = http.createServer((req,res) => {
    console.log(req.headers, req.method, req.url);
    res.setHeader('Content-type', 'text/html')
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>')
    res.write('<body><h1>Welcome to my Node js Project</h1></body>')
    res.write('</html>')
    res.end()
})
server.listen(4000)