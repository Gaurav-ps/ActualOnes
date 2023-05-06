const http = require('http');
const server = http.createServer((req,res) => {
    console.log('Gps')
})
server.listen(4000)