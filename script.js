document.addEventListener('DOMContentLoaded', function () {
    const liffId = "2000050276-Kjj7lW0L"; // ここにLIFF IDを設定
    initializeLiff(liffId);

    document.getElementById('formConfirmationBtn').addEventListener('click', function() {
        // フォームデータの収集
        const formData = new FormData();
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
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

function initializeLiff(liffId) {
    liff.init({
        liffId: liffId
    }).then(() => {
        if (liff.isLoggedIn()) {
            initializeApp();
            // 初期化成功後、ボタンにクリックイベントリスナーを追加
            document.getElementById('formStart').addEventListener('click', () => {
                // ここで指定したパスに遷移
                liff.navigate('/form.html');
            });
        } else {
            liff.login(); // ユーザーがログインしていない場合はログインを促す
        }
    }).catch((err) => {
        console.error('LIFF Initialization failed', err);
    });
}

function initializeApp() {
    liff.getProfile().then(profile => {
        const userId = profile.userId;
        const displayName = profile.displayName;
    }).catch(err => console.error(err));
}