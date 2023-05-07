const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;
    if(req.url === '/')
    {
        fs.readFile("message.txt",(err, data)=>{
            if(err)
            {
                console.log(err)
            }
            res.write('<html>')
            res.write('<head><title>Enter Message</title></head>')
            res.write(`<body>${data}</body>`)
            res.write(`<body><form action = "/message" method = "POST"><input type="text" name="message"><button type = "submit">Send</button></form></body>`)
            res.write('</html>')
            return res.end()
        })          
    }
    else if(req.url === '/message' && req.method === 'POST')
    {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end',() => {
            const parsed = Buffer.concat(body).toString();
            const message = parsed.split('=')[1]
           
            fs.writeFileSync('message.txt',message, (err) => {
                if(err)
                {
                    console.log(err);
                }
                res.statusCode = 302;
                res.setHeader('Location','/')
                return res.end();
            })
        })
    }
    // else{
    //     res.setHeader('Content-type', 'text/html')
    //     res.write('<html>');
    //     res.write('<head><title>My First Page</title><head>')
    //     res.write('<body><h1>Welcome to my Node js Project</h1></body>')
    //     res.write('</html>')
    //     return res.end()
    // }
})
server.listen(3000)
