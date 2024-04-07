// LIFF SDKの初期化とユーザープロファイルの取得
async function initializeLiff() {
    const liffId = '2000050276-Kjj7lW0L'; // あなたのLIFF IDに置き換えてください
    try {
        await liff.init({ liffId: liffId });
        if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            // フォームの隠しフィールドにユーザーIDとユーザー名をセット
            document.getElementById('userId').value = profile.userId;
            document.getElementById('userName').value = profile.displayName;
        } else {
            liff.login(); // ユーザーがログインしていない場合はログインを促す
        }
    } catch (error) {
        console.error('LIFF Initialization failed', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeLiff(); // ページ読み込み時にLIFFを初期化
});

// フォーム送信のイベントリスナー設定
document.getElementById('submitForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // デフォルトの送信を防止

    // フォームからのデータを集める
    const formData = {
        userId: document.getElementById('userId').value,
        userName: document.getElementById('userName').value,
        q1: document.querySelector('input[name="q1"]:checked').value,
        q2: document.getElementById('name').value,
        q3: document.getElementById('email').value,
        q4: document.getElementById('phone').value,
        q5: document.getElementById('dob').value,
        q6: document.querySelector('input[name="q6"]:checked').value,
        q7: document.getElementById('datetime').value,
    };

    // 予約確認メッセージの組み立て
    const msg = `以下の内容で仮予約を受け付けました。\nメニュー選択: ${formData.q1}\n名前: ${formData.q2}\nメール: ${formData.q3}\n電話: ${formData.q4}\n生年月日: ${formData.q5}\n性別: ${formData.q6}\n日時候補: ${formData.q7}`;

    // LINEトークにメッセージを送信
    try {
        await liff.sendMessages([{
            type: 'text',
            text: msg
        }]);
        console.log('Message sent');
        liff.closeWindow(); // メッセージ送信後にLIFFアプリを閉じる
    } catch (err) {
        console.error('Send Message failed', err);
    }
});
