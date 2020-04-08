module.exports = (data) => {
  return function (req, res, next) {
    console.log("cookie", req.cookies)
    const path = req.query.path
    const userId = req.cookies.userId

    // Cookieが発行されていない場合
    if (!userId) {
      // 初回訪問
      // TODO: 被らないキーを発行する
      // uuidを使う
      const userId_cookie = Date.now()
      res.cookie("userId", userId_cookie);
      data[userId] = {}
      data[userId][path] = {}
      data[userId][path]["count"] = 1
      console.log("this is data", data)
      return next()
    }

    // Cookieは発行されているが、データがメモリから消えてしまっている場合
    // 空のオブジェクトを設定するし、count 1にする
    if (!data[userId]) {
      data[userId] = {}
      data[userId][path] = {}
      data[userId][path]["count"] = 1
      console.log("this is data", data)
      return next()
    }

    if (!data[userId][path]) {
      data[userId][path] = {}
    }

    // 二回以降の訪問
    // 該当するパスに訪問があればcount up、なければcount 1を設定する
    if (data[userId][path]["count"]) {
      data[userId][path]["count"] = data[userId][path]["count"] + 1
    } else {
      // 新しいパスを訪問した場合
      data[userId][path]["count"] = 1
    }

    console.log("this is data", data)
    next()
  }
}