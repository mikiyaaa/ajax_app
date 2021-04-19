const { func } = require("assert-plus");

function check() {
  // 表示されている全てのメモを取得
  const posts = document.querySelectorAll(".post");
  posts.forEach(function(post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    // メモをクリックした時の処理
    post.addEventListener("click", () => {
      // どのメモをクリックしたのか、カスタムデータで取得
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクト生成
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化、設定
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスのタイプを指定
      XHR.responseType = "json";
      // sendでリクエスト送信
      XHR.send();

      // レスポンスを受け取った時の処理
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了
          return null;
        }
        // レスポンスされたデータを変数itemへ(postはコントローラーから)
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読(true)状態であれば、cssを適用
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読(false)ならカスタムデータを削除
          post.removeAttribute("data-check");
        }

      };
    });
  });
}
setInterval(check, 1000);