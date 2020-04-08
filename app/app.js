const express = require('express')
const app = express()
const port = 8080

const contents = require("./contents")

const cors = require("cors")
app.use(cors({ origin: true, credentials: true }))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const data = {}

const cookie_middleware = require("./cookie_middleware")
app.use(cookie_middleware(data))

app.get('/', (req, res) => {
  console.log(req.query)
  
  // TODO: 配信をもっと高度な実装にする
  const userId = req.cookies.userId
  if (data[userId] > 2) {
    res.json({
      text: contents.popup
    })
  } else {
    res.json({
      text: contents.message
    })
  }
  
})

app.get('/count', (req, res) => {
  if (req.cookies.userId) {
    res.json({ count: data[req.cookies.userId] })
  } else {
    // TODO: cookieがない場合どうするか？
    res.json({ count: 0 })
  }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))