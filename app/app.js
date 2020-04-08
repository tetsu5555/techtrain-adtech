const express = require('express')
const app = express()
const port = 8080

const cors = require("cors")
app.use(cors({ origin: true, credentials: true }))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const data = {}

app.get('/', (req, res) => {

  console.log("cookie", req.cookies)

  if (req.cookies.userId) {
    // 二回以降の訪問
    const userId = req.cookies.userId
    if (data[userId]) {
      data[userId] = data[userId] + 1
    }
  } else {
    // 初回訪問
    // TODO: 被らないキーを発行する
    const userId = Date.now()
    res.cookie("userId", userId);
    data[userId] = 1
  }

  console.log("this is data", data)
  
  res.send('Hello World!')
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