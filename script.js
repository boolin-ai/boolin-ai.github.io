let userId = ''; // グローバルスコープでの変数宣言
let displayName = ''; // グローバルスコープでの変数宣言

document.addEventListener('DOMContentLoaded', function () {
    const liffId = "2000050276-Kjj7lW0L"; // ここにLIFF IDを設定
    initializeLiff(liffId);
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
        console.error('LIFF Initialization failed', err);
    });
}

function initializeApp() {
    liff.getProfile().then(profile => {
        userId = profile.userId; // グローバル変数に代入
        displayName = profile.displayName; // グローバル変数に代入
        
        // 「予約へ進む」ボタンの設定
        const formStartBtn = document.getElementById('formStart');
        if (formStartBtn) {
            formStartBtn.addEventListener('click', () => {
                // LIFFアプリ内の特定のページへの恒久的なリンクを生成
                liff.permanentLink.createUrlBy('ここにLIFFアプリの特定のページのURL').then(permanentLink => {
                    // 生成された恒久的なリンクを使ってページ遷移
                    window.location.href = permanentLink;
                }).catch(error => {
                    console.error('Error creating permanent link:', error);
                });
            });
        }
    }).catch(err => console.error(err));
}

// フォーム送信イベントリスナーの設定は、`form.html`がロードされた後でなければなりません。
// そのため、`formSubmitBtn`の設定は`initializeApp`の外で行うことができません。
// `formSubmitBtn`関連のコードは、`form.html`内でこのスクリプトが再度読み込まれた場合にのみ実行されるように配置する必要があります。

function submitForm(e) {
    e.preventDefault(); // フォームのデフォルト送信を防止

    // フォームデータの収集
    const formData = new FormData(); // `form`要素の参照があれば、`new FormData(formElement)`とすることも可能です。
    formData.append('userId', userId);
    formData.append('displayName', displayName);
    formData.append('menu', document.querySelector('input[name="menu"]:checked').value);
    formData.append('name', document.getElementById('name').value);
    formData.append('furigana', document.getElementById('furigana').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('birthday', document.getElementById('birthday').value);
    formData.append('gender', document.querySelector('input[name="gender"]:checked').value);
    
    // Ajaxリクエストの設定
    fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log('Success:', data))
    .catch((error) => {
        console.error('Error:', error);
    });
}

// この部分は`form.html`内にある場合、もしくはフォーム送信ボタンが存在することを確認した上で実行する
const formSubmitBtn = document.getElementById('formSubmitBtn');
if (formSubmitBtn) {
    formSubmitBtn.addEventListener('click', submitForm);
}

