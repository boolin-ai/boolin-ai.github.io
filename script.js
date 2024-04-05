document.addEventListener('DOMContentLoaded', function() {
    const liffId = '2000050276-Kjj7lW0L'; // ここにあなたのLIFF IDをセットしてください。

    // LIFF SDKの初期化
    liff.init({
        liffId: liffId
    })
    .then(() => {
    })
    .catch(err => {
        console.error('LINEログイン失敗', err);
    });
});

// フォーム送信のイベントリスナー設定
document.getElementById('submitForm').addEventListener('submit', function(event) {
    event.preventDefault(); // デフォルトの送信を防止

    // IDトークンの取得
    const idToken = liff.isLoggedIn() ? liff.getIDToken() : null;

    // フォームからのデータを集める
    const formData = {
        q1: document.querySelector('input[name="q1"]:checked').value,
        q2: document.getElementById('name').value,
        q3: document.getElementById('email').value,
        q4: document.getElementById('phone').value,
        q5: document.getElementById('dob').value,
        q6: document.querySelector('input[name="q6"]:checked').value,
        q7: document.getElementById('datetime').value,
    };

    // ここでサーバーへIDトークンとformDataを送信
    sendIdTokenAndFormDataToServer(idToken, formData);

    // 予約確認メッセージの組み立て
    const msg = `以下の内容で仮予約を受け付けました。\n
        メニュー選択: ${formData.q1}\n
        名前: ${formData.q2}\n
        メール: ${formData.q3}\n
        電話: ${formData.q4}\n
        生年月日: ${formData.q5}\n
        性別: ${formData.q6}\n
        日時候補: ${formData.q7}`;

    // LINEトークにメッセージを送信
    liff.sendMessages([{
        type: 'text',
        text: msg
    }])
    .then(() => {
        console.log('Message sent');
    })
    .catch(err => {
        console.error('Send Message failed', err);
    });
});

// IDトークンとフォームデータをサーバーに送信する関数
function sendIdTokenAndFormDataToServer(idToken, formData) {
    fetch('https://script.google.com/macros/s/AKfycbzw2rBkbo4q3sVhb6kZqHVLhNacbCSSjcQvCowow1zbwkcrLkrIifMVbT5Xzek31dLN/exec', {
        method: 'POST',
        mode: 'no-cors', // CORSポリシーを無視
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken: idToken, formData: formData })
    })
    // .then(response => response.json())
    .then(data => {
        console.log('サーバーからのレスポンス:', data);
        liff.closeWindow(); // 応答後にLIFFアプリを閉じる
    })
    .catch(error => {
        console.error('サーバーでのエラー:', error);
    });
}

