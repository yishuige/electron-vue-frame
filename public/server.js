// node 简单服务器启动，至于选择express 还是koa 凭君选择
const http = require('http')
const fs = require('fs')
const path = require('path')
const server = http.createServer((req, res) => {
    res.statusCode = 200
    let pathurl = path.join(__dirname, req.url)
    let parseurl = path.parse(pathurl)
    let html = ''
    if (parseurl.ext != '') {
        if (parseurl.ext == '.js') {
            res.setHeader('Content-Type', 'text/plain')
        } else if (parseurl.ext == '.css') {
            res.setHeader('Content-Type', 'text/css')
        } else if (parseurl.ext == '.html') {
            res.setHeader('Content-Type', 'text/html')
        }
        html = fs.readFileSync(path.join(__dirname, req.url))
    } else {
        res.setHeader('Content-Type', 'text/html')
        html = fs.readFileSync(path.join(__dirname, 'index.html'))
    }
    res.end(html)
})
server.listen('1337', '127.0.0.1', () => {})
