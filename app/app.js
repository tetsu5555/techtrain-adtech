const express = require('express')
const app = express()
const port = 8080

const cors = require("cors")
app.use(cors({ origin: true, credentials: true }))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/', (req, res) => {

  console.log(req.cookies)
  
  res.cookie("msg", "hoge");
  
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))