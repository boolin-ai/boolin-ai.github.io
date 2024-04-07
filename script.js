document.addEventListener('DOMContentLoaded', function() {
    const liffId = '2000050276-Kjj7lW0L'; // あなたのLIFF IDに置き換えてください
    initializeLiff(liffId);

    function initializeLiff(liffId) {
        liff.init({
            liffId: liffId
        }).then(() => {
            if (liff.isLoggedIn()) { // ユーザーがログインしているか確認
                liff.getProfile().then(profile => {
                    // フォームの隠しフィールドにユーザーIDとユーザー名をセット
                    document.getElementById('userId').value = profile.userId;
                    document.getElementById('userName').value = profile.displayName;
                }).catch((err) => {
                    console.log('Error getting profile: ', err);
                });
            } else {
                liff.login(); // ユーザーがログインしていない場合はログインプロセスを開始
            }
        }).catch((err) => {
            console.log('LIFF Initialization failed ', err);
        });
    }         
});


// フォーム送信のイベントリスナー設定
document.getElementById('submitForm').addEventListener('submit', function() {

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

    // 予約確認メッセージの組み立て
    const msg = `以下の内容で仮予約を受け付けました。\nメニュー選択: ${formData.q1}\n名前: ${formData.q2}\nメール: ${formData.q3}\n電話: ${formData.q4}\n生年月日: ${formData.q5}\n性別: ${formData.q6}\n日時候補: ${formData.q7}`;

    sendText(msg);
    
    function sendText(text) {
        liff.sendMessages([{
            'type': 'text',
            'text': text
        }]).then(function () {
            liff.closeWindow();
        }).catch(function (error) {
            window.alert('Failed to send message ' + error);
        });
    }

});
