require('dotenv').config()
const express = require('express');
const app = express();
const fs = require('fs')
const https = require('https')
const PORT = process.env.PORT

var privateKey = fs.readFileSync('./assets/generated-private-key.txt')
var certificate = fs.readFileSync('./assets/generated-csr.txt')

var options = {
  key: privateKey,
  cert: certificate
}

app.use(express.static('dist'))

https.createServer(options, app).listen(PORT, () => {
  console.log(`server listening on port ${PORT}`
})