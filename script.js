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

// LIFF AppのエンドポイントURL
const liffEndpointUrl = "https://liff.line.me/2000050276-Kjj7lW0L/form.html";

// パーマリンクを作成するための関数
function createPermanentLink(pageUrl) {
liff.permanentLink
    .createUrlBy(pageUrl)
    .then((permanentLink) => {
    console.log(permanentLink);
    })
    .catch((error) => {
    console.log(error);
    });
}