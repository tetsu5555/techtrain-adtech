window.onload = async function() {
  // alert("trackerがロードされました");

  // credentials: 'same-origin'を追加。リクエスト URL が呼び出しスクリプトと同一オリジンの場合だけクレデンシャルを送りたい場合
  // credentials: 'include'を設定することで別のオリジンからのCookieがセットされるようになった
  const site_url = 'http://localhost:8080'
  const query = `?path=${window.location.pathname}`
  await fetch(site_url + query,
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
    setTimeout(() => {
      const el = document.createElement( 'html' );
      el.innerHTML = data.text
      document.body.appendChild(el)
    }, 1000)
  })
  .catch((reason) => {
    console.log(reason);
  });
}

// TODO: trackerっぽいやつを定義する
function hello_world() {
  console.log("hello world")
}