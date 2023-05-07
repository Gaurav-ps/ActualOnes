const fs = require('fs');

const requestHandler = (req ,res) => {
    const url = req.url;
    const method = req.method;
    if(req.url === '/')
    {
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write(`<body><form action = "/message" method = "POST"><input type="text" name="message"><button type = "submit">Send</button></form></body>`)
        res.write('</html>')
        return res.end()       
    }
    if(req.url === '/message' && req.method === 'POST')
    {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end',() => {
            const parsed = Buffer.concat(body).toString();
            const message = parsed.split('=')[1]
            fs.writeFileSync('message.txt',message)
        })   
        res.statusCode = 302;
        res.setHeader('Location','/')
        return res.end();
        
    }

        res.setHeader('Content-type', 'text/html')
        res.write('<html>');
        res.write('<head><title>My First Page</title><head>')
        res.write('<body><h1>Welcome to my Node js Project</h1></body>')
        res.write('</html>')
        return res.end()
}

module.exports = requestHandler;