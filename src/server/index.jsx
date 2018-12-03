import fs from 'fs'
import path from 'path'

import express from 'express'

import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../common/App'

const resolve = dir => path.resolve(__dirname, dir)

const app = express()

const htmlStr= fs.readFileSync(resolve('../client/template/index.html'), 'utf-8')

app.use('/public', express.static(resolve('../../public')))

app.get('*', (req, res) => {
  // throw new Error('error')
  const markup = renderToString(<App />)
  res.send(htmlStr.replace('{{content}}', markup))
})

app.listen(3000, () => {
  console.log('server listen on port 3000...')
})