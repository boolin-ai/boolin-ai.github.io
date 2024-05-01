document.addEventListener("DOMContentLoaded", function () {
  const liffId = "2000980430-xkw3rOyX"; // ここにLIFF IDを設定
  initializeLiff(liffId);
});

function initializeLiff(liffId) {
  liff
    .init({
      liffId: liffId,
    })
    .then(() => {
      if (liff.isLoggedIn()) {
        const idToken = liff.getIDToken(); // IDトークンを直接取得
        setupFormSubmitButton(idToken);
      } else {
        liff.login(); // ユーザーがログインしていない場合はログインを促す
      }
    })
    .catch((err) => {
      console.error("LIFF初期化に失敗しました", err);
    });
}

function setupFormSubmitButton(idToken) {
  // ボタンがクリックされたときのイベントリスナーを設定
  const formSubmitBtn = document.getElementById("formSubmitBtn");
  if (formSubmitBtn) {
    formSubmitBtn.addEventListener("click", function (e) {
      submitForm(e, idToken);
    });
  }
}

function submitForm(e, idToken) {
  e.preventDefault(); // フォームのデフォルト送信を防止
  showLoading(); //ローディングアニメーション

  console.log(idToken);
  // フォームデータの収集
  const formData = new FormData();
  formData.append("idToken", idToken);
  formData.append("name", document.getElementById("name").value);
  formData.append("phone", document.getElementById("phone").value);
  // 生年月日をYYYY-MM-DD形式で整形して追加
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value.padStart(2, "0"); // 月を2桁に整形
  const day = document.getElementById("day").value.padStart(2, "0"); // 日を2桁に整形
  const birthday = `${year}-${month}-${day}`;
  formData.append("birthday", birthday);
  formData.append(
    "gender",
    document.querySelector('input[name="gender"]:checked').value
  );
  formData.append(
    "menu",
    document.querySelector('input[name="menu"]:checked').value
  );
  formData.append("fChoice", document.getElementById("f-choice").value);
  formData.append("sChoice", document.getElementById("s-choice").value);
  formData.append("message", document.getElementById("message").value);

  if (liff.isLoggedIn()) {
    liff
      .sendMessages([
        {
          type: "text",
          text: "#仮予約お申し込み",
        },
      ])
      .then(() => {
        console.log("Message sent");
      })
      .catch((err) => {
        console.error("Send Message Error:", err);
      });
  } else {
    console.error("User is not logged in.");
  }

  // サーバー送信
  let object = {};
  formData.forEach((value, key) => (object[key] = value));
  let json = JSON.stringify(object);

  fetch("https://prima-pr.com/wp-json/myapi/v1/submit/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      liff.closeWindow();
    })
    .catch((error) => {
      console.error("データ送信失敗:", error);
    });
}

function showLoading() {
  document.getElementById("loadingOverlay").style.display = "block";
}
