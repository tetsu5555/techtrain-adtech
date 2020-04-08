window.onload = async function() {
  alert("trackerがロードされました");

  // credentials: 'same-origin'を追加。リクエスト URL が呼び出しスクリプトと同一オリジンの場合だけクレデンシャルを送りたい場合
  // credentials: 'include'を設定することで別のオリジンからのCookieがセットされるようになった
  await fetch('http://localhost:8080', 
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
    console.log(response)
  })

  await fetch('http://localhost:8080/count', 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    }
  )
  .then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  })
  .then((data) => {
    console.log(data)
    if (data.count >= 5)  {
      const div = document.createElement("div")
      div.innerText = "5回以上の訪問ありがとうございます！！"
      document.body.appendChild(div)
    }
  })
  .catch((reason) => {
    console.log(reason);
  });
}