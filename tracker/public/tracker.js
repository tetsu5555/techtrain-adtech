window.onload = function() {
  alert("hello world");

  // credentials: 'same-origin'を追加。リクエスト URL が呼び出しスクリプトと同一オリジンの場合だけクレデンシャルを送りたい場合
  // credentials: 'include'を設定することで別のオリジンからのCookieがセットされるようになった
  fetch('http://localhost:8080', 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    }
  )
    .then(function(response) {
      console.log(response.headers['set-cookie']);
      console.log(response.headers.get('set-cookie'));
      console.log(response)
    })
}