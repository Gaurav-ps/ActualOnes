const http = require('http');
const server = http.createServer((req,res) => {
    if(req.url === '/home')
    {
        res.setHeader('Content-type', 'text/html')
        res.write('<html>');
        res.write('<head><title>My First Page</title><head>')
        res.write('<body><h1>Welcome home</h1></body>')
        res.write('</html>')
        process.exit();
        return res.end()
        
    }

    if(req.url === '/about')
    {
        res.setHeader('Content-type', 'text/html')
        res.write('<html>');
        res.write('<head><title>My First Page</title><head>')
        res.write('<body><h1>Welcome to About Us page</h1></body>')
        res.write('</html>')
        return res.end()
    }
    if(req.url === '/node')
    {
        res.setHeader('Content-type', 'text/html')
        res.write('<html>');
        res.write('<head><title>My First Page</title><head>')
        res.write('<body><h1>Welcome to my Node js Project</h1></body>')
        res.write('</html>')
        return res.end()
    }
    
})
server.listen(5000)
