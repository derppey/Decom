const express = require('express')
const Gun = require('gun')

const app = express()
const port = 3030


app.use(Gun.serve)

const server = app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`)
  console.log(`🔫 Gun listening at http://localhost:${port}/gun`)
});

Gun({web: server})

module.exports = {
  Gun,
}