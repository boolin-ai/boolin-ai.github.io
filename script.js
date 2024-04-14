let userId = ''; // グローバルスコープでの変数宣言
let displayName = ''; // グローバルスコープでの変数宣言

document.addEventListener('DOMContentLoaded', function () {
    const liffId = "2000050276-Kjj7lW0L"; // ここにLIFF IDを設定
    initializeLiff(liffId);

    // ボタンがクリックされたときのイベントリスナーを設定
    const formSubmitBtn = document.getElementById('formSubmitBtn');
    if (formSubmitBtn) {
        formSubmitBtn.addEventListener('click', submitForm);
    }
});

function initializeLiff(liffId) {
    liff.init({
        liffId: liffId
    }).then(() => {
        if (liff.isLoggedIn()) {
            initializeApp();
        } else {
            liff.login(); // ユーザーがログインしていない場合はログインを促す
        }
    }).catch((err) => {
        console.error('LIFF初期化に失敗しました', err);
    });
}

function initializeApp() {
    liff.getProfile().then(profile => {
        userId = profile.userId; // グローバル変数に代入
        displayName = profile.displayName; // グローバル変数に代入
    }).catch(err => console.error(err));
}

function submitForm(e) {
    e.preventDefault(); // フォームのデフォルト送信を防止

    // フォームデータの収集
    const formData = new FormData(); // `form`要素の参照があれば、`new FormData(formElement)`とすることも可能です。
    formData.append('userId', userId);
    formData.append('displayName', displayName);
    formData.append('name', document.getElementById('name').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('birthday', document.getElementById('birthday').value);
    formData.append('gender', document.querySelector('input[name="gender"]:checked').value);
    formData.append('menu', document.querySelector('input[name="menu"]:checked').value);
    formData.append('fChoice', document.getElementById('f-choice').value);
    formData.append('sChoice', document.getElementById('s-choice').value);
    formData.append('tChoice', document.getElementById('t-choice').value);


    let object = {};
    formData.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);
    
    fetch('https://prima-pr.com/wp-json/myapi/v1/submit/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: json
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data)
        liff.closeWindow();
    })
    .catch((error) => {
        console.error('データ送信失敗:', error);
    });
}
