const express = require('express')
const fs = require('fs')
const http = require('http');
const app = express()
const port = 8908

const server = http.createServer(app);

const BASE_DIR = __dirname
console.log(BASE_DIR)

server.on('checkContinue', (req, res) => {
    res.writeContinue()

    // Create a write stream to the file
    const writeStream = fs.createWriteStream(createDirectoryTree(req.url))

    req.on('data', (chunk) => {
        writeStream.write(chunk);
    })

    req.on('end', () => {
        // Close the write stream when the request body ends
        writeStream.end(() => {
            res.end(); // Send the final response
        })
    })
})

app.all('*', (req, res) => {
    const req_method = req.method
    const req_url = req.url
    const req_query = req.query
    const req_body = req.body
    const contentType = req.get('content-type')
    const expect = req.get('expect')
    const files = req.files

    const logLine = req_method + ': ' + req_url + "\n"
    console.log(logLine)

    switch (req_method) {
        case 'GET':
            dumpFileContents(res, req_url)
            break
        case 'HEAD':
            headFileContents(res, req_url)
            break
        case 'POST':
            if (expect === '100-continue') {
                res.status(100).send('Continue')
            } else {
                writeFileContents(res, req_url, req_body)
            }
            break
        case 'PUT':
            writeFileContents(res, req_url, req_body)
            break
        case 'DELETE':
            if (!isFileExist(req_url)) {
                res.status(404).send('File not found')
                return
            }
            fs.unlinkSync(BASE_DIR + req_url)
            res.status(200).send('File deleted')
            break
        default:
            res.status(404).send('Method not supported')
    }
})


function isFileExist(path) {
    if (!path.startsWith('/')) {
        path = '/' + path
    }
    return fs.existsSync(BASE_DIR + path)
}

function dumpFileContents(res, path) {
    if (!path.startsWith('/')) {
        path = '/' + path
    }

    if (!isFileExist(path)) {
        res.status(404).send('File not found')
        return
    }
    res.sendFile(BASE_DIR + path)
}

function headFileContents(res, path) {
    if (!path.startsWith('/')) {
        path = '/' + path
    }

    if (!isFileExist(path)) {
        res.status(404).send('File not found')
        return
    }

    const stats = fs.statSync(BASE_DIR + path)
    res.set('Content-Length', stats.size)

    const ext = path.substring(path.lastIndexOf('.') + 1)
    contentType = 'application/octet-stream'
    switch (ext) {
        case 'txt':
        case 'md5':
        case 'sha1':
            contentType = 'text/plain'
            break
        case 'html':
            contentType = 'text/html'
            break
        case 'json':
            contentType = 'application/json'
            break
        case 'xml':
        case 'pom':
            contentType = 'application/xml'
            break
        default:
            contentType = 'application/octet-stream'
    }
    res.set('Content-Type', contentType)

    res.status(200).send()
}

function createDirectoryTree(path) {
    if (path === '' || path === '/') {
        return BASE_DIR
    }

    if (!path.startsWith('/')) {
        path = '/' + path
    }
    const filePath = BASE_DIR + path

    const dir = filePath.substring(0, filePath.lastIndexOf('/'))
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    return filePath
}

function writeFileContents(res, path, content) {
    const filePath = createDirectoryTree(path)

    fs.writeFileSync(filePath, content)
}

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})