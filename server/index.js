require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const fs = require('fs');
const https = require('https')

app.use(express.static('dist'))

var ssl = {
  key: fs.readFileSync("server/assets/server.key", 'utf8'),
  cert: fs.readFileSync("server/assets/e8f50324691bf90.crt", 'utf8'),
  ca: fs.readFileSync('server/assets/gd_bundle-g2-g1.crt', 'utf8'),
};
server = require('https').createServer(ssl, app);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})