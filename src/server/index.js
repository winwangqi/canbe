const express = require('express')

const app = express()

app.get('*', (req, res) => {
  res.send(__filename)
})

app.listen(3000, () => {
  console.log('server listen on port 3000...')
})