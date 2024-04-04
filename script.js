document.addEventListener('DOMContentLoaded', function() {
    // LIFF IDを設定してLIFF SDKを初期化
    const liffId = '2000050276-Kjj7lW0L';
    liff.init({
        liffId: liffId 
    })
    .then(() => {
        // 初期化が成功したら何か処理を行う（今回は特になし）
    })
    .catch(err => {
        // 初期化が失敗した場合のエラーハンドリング
        console.error('LINEログイン失敗', err);
    });

    // フォーム送信のイベントリスナー設定
    document.getElementById('submitForm').addEventListener('submit', function(event) {
        event.preventDefault(); // デフォルトの送信を防止

        // ユーザープロファイルを取得して、フォームデータを処理
        liff.getProfile().then(profile => {
            const userName = profile.displayName;
            const userId = profile.userId;

            // フォームからのデータを集める
            const formData = {
                lineUserId: userId,
                lineUserName: userName,
                q1: document.querySelector('input[name="q1"]:checked').value,
                q2: document.getElementById('name').value,
                q3: document.getElementById('email').value,
                q4: document.getElementById('phone').value,
                q5: document.getElementById('dob').value,
                q6: document.querySelector('input[name="q6"]:checked').value,
                q7: document.getElementById('datetime').value,
            };

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

            // GASへのPOSTリクエストを送信
            fetch('https://script.google.com/macros/s/AKfycbzw2rBkbo4q3sVhb6kZqHVLhNacbCSSjcQvCowow1zbwkcrLkrIifMVbT5Xzek31dLN/exec', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // データ送信が成功したらLIFFアプリを閉じる
                liff.closeWindow();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
        .catch(err => {
            console.error('Failed to get user profile', err);
        });
    });
});
