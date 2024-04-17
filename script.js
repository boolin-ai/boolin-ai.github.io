let userId = ''; // グローバルスコープでの変数宣言
let displayName = ''; // グローバルスコープでの変数宣言

document.addEventListener('DOMContentLoaded', function () {
    const liffId = "2000980430-xkw3rOyX"; // ここにLIFF IDを設定
    initializeLiff(liffId);
});

function initializeLiff(liffId) {
    liff.init({
        liffId: liffId
    }).then(() => {
        if (liff.isLoggedIn()) {
            initializeApp();
            setupFormSubmitButton();
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

function setupFormSubmitButton() {
    // ボタンがクリックされたときのイベントリスナーを設定
    const formSubmitBtn = document.getElementById('formSubmitBtn');
    if (formSubmitBtn) {
        formSubmitBtn.addEventListener('click', submitForm);
    }
}

function submitForm(e) {
    e.preventDefault(); // フォームのデフォルト送信を防止
    showLoading(); //ローディングアニメーション

    // フォームデータの収集
    const formData = new FormData(); // `form`要素の参照があれば、`new FormData(formElement)`とすることも可能です。
    formData.append('userId', userId);
    formData.append('displayName', displayName);
    formData.append('name', document.getElementById('name').value);
    formData.append('phone', document.getElementById('phone').value);
    // 生年月日をYYYY-MM-DD形式で整形して追加
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value.padStart(2, '0'); // 月を2桁に整形
    const day = document.getElementById('day').value.padStart(2, '0'); // 日を2桁に整形
    const birthday = `${year}-${month}-${day}`;
    formData.append('birthday', birthday);
    formData.append('gender', document.querySelector('input[name="gender"]:checked').value);
    formData.append('menu', document.querySelector('input[name="menu"]:checked').value);
    formData.append('fChoice', document.getElementById('f-choice').value);
    formData.append('sChoice', document.getElementById('s-choice').value);
    formData.append('message', document.getElementById('message').value);

    if (liff.isLoggedIn()) {
        liff.sendMessages([{
            "type": "flex",
            "altText": "this is a flex message",
            "contents": creativeFlex(formData)
        }]).then(() => {
            console.log('Message sent');
        }).catch(err => {
            console.error('Send Message Error:', err);
        });
    } else {
        console.error("User is not logged in.");
    }

    // サーバー送信
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

function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'block';
}

function creativeFlex(formData) {
    // FormDataから値を取得
    const name = formData.get('name');
    const phone = formData.get('phone');
    const birthday = formData.get('birthday');
    const gender = formData.get('gender');
    const menu = formData.get('menu');
    const fChoice = formData.get('fChoice');
    const sChoice = formData.get('sChoice');
    const message = formData.get('message');

    return {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "仮予約を受け付けました",
                    "weight": "bold",
                    "size": "md",
                    "color": "#A4A0A0"
                },
                {
                    "type": "text",
                    "text": "返信をしばらくお待ちください",
                    "size": "xxs",
                    "offsetTop": "md",
                    "offsetBottom": "xs"
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "margin": "lg",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "診療",
                                    "color": "#F690A8",
                                    "size": "sm",
                                    "flex": 2
                                },
                                {
                                    "type": "text",
                                    "text": menu,
                                    "wrap": true,
                                    "size": "sm",
                                    "flex": 5
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "お名前",
                                    "color": "#F690A8",
                                    "size": "sm",
                                    "flex": 2
                                },
                                {
                                    "type": "text",
                                    "text": name,
                                    "wrap": true,
                                    "size": "sm",
                                    "flex": 5
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "電話番号",
                                    "color": "#F690A8",
                                    "size": "sm",
                                    "flex": 2
                                },
                                {
                                    "type": "text",
                                    "text": phone,
                                    "wrap": true,
                                    "size": "sm",
                                    "flex": 5
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "生年月日",
                                    "color": "#F690A8",
                                    "size": "sm",
                                    "flex": 2
                                },
                                {
                                    "type": "text",
                                    "text": birthday,
                                    "wrap": true,
                                    "size": "sm",
                                    "flex": 5
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "性別",
                                    "color": "#F690A8",
                                    "size": "sm",
                                    "flex": 2
                                },
                                {
                                    "type": "text",
                                    "text": gender,
                                    "wrap": true,
                                    "size": "sm",
                                    "flex": 5
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "separator",
                    "margin": "xl"
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "第一希望",
                                    "flex": 2,
                                    "size": "sm",
                                    "color": "#A4A0A0",
                                    "weight": "bold"
                                },
                                {
                                    "type": "text",
                                    "text": fChoice,
                                    "flex": 5,
                                    "size": "sm",
                                    "wrap": true
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "第二希望",
                                    "color": "#A4A0A0",
                                    "size": "sm",
                                    "flex": 2,
                                    "weight": "bold"
                                },
                                {
                                    "type": "text",
                                    "text": sChoice,
                                    "wrap": true,
                                    "size": "sm",
                                    "flex": 5
                                }
                            ]
                        }
                    ],
                    "margin": "md"
                }
            ]
        }
    };
}
