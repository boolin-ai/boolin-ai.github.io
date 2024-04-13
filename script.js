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
    formData.append('menu', document.querySelector('input[name="menu"]:checked').value);
    formData.append('fChoice', document.getElementById('f-choice').value);
    formData.append('sChoice', document.getElementById('s-choice').value);
    formData.append('tChoice', document.getElementById('t-choice').value);
    formData.append('name', document.getElementById('name').value);
    formData.append('furigana', document.getElementById('furigana').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('birthday', document.getElementById('birthday').value);
    formData.append('gender', document.querySelector('input[name="gender"]:checked').value);

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
    })
    .catch((error) => {
        console.error('データ送信失敗:', error);
    });


    // 送信メッセージの内容
    // const messageContent = createFlexMessage(formData);
    // sendMessage(messageContent);
}

// function createFlexMessage(formData) {

//     // フォームデータから名前を取得
//     const menu = formData.get('menu');
//     const fChoice = formData.get('fChoice'); 
//     const sChoice = formData.get('sChoice'); 
//     const tChoice = formData.get('tChoice'); 
//     const name = formData.get('name'); 
//     const furigana = formData.get('furigana'); 
//     const email = formData.get('email'); 
//     const phone = formData.get('phone'); 
//     const birthday = formData.get('birthday'); 
//     const gender = formData.get('gender'); 

//     return {
//         "type": "bubble",
//         "body": {
//           "type": "box",
//           "layout": "vertical",
//           "contents": [
//             {
//               "type": "text",
//               "text": "仮予約を受け付けました",
//               "weight": "bold",
//               "size": "md",
//               "color": "#BA9D5A"
//             },
//             {
//               "type": "text",
//               "text": "返信をしばらくお待ちください",
//               "size": "xxs",
//               "offsetTop": "md",
//               "offsetBottom": "xs"
//             },
//             {
//               "type": "box",
//               "layout": "vertical",
//               "margin": "lg",
//               "spacing": "sm",
//               "contents": [
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "診療",
//                       "color": "#F690A8",
//                       "size": "sm",
//                       "flex": 2
//                     },
//                     {
//                       "type": "text",
//                       "text": menu,
//                       "wrap": true,
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ]
//                 },
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "お名前",
//                       "color": "#F690A8",
//                       "size": "sm",
//                       "flex": 2
//                     },
//                     {
//                       "type": "text",
//                       "text": name,
//                       "wrap": true,
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ]
//                 },
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "フリガナ",
//                       "color": "#F690A8",
//                       "size": "sm",
//                       "flex": 2
//                     },
//                     {
//                       "type": "text",
//                       "text": furigana,
//                       "wrap": true,
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ]
//                 },
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "メール",
//                       "color": "#F690A8",
//                       "size": "sm",
//                       "flex": 2
//                     },
//                     {
//                       "type": "text",
//                       "text": email,
//                       "wrap": true,
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ]
//                 },
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "電話番号",
//                       "color": "#F690A8",
//                       "size": "sm",
//                       "flex": 2
//                     },
//                     {
//                       "type": "text",
//                       "text": phone,
//                       "wrap": true,
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ]
//                 },
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "生年月日",
//                       "color": "#F690A8",
//                       "size": "sm",
//                       "flex": 2
//                     },
//                     {
//                       "type": "text",
//                       "text": birthday,
//                       "wrap": true,
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ],
//                   "borderWidth": "none"
//                 },
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "性別",
//                       "color": "#F690A8",
//                       "size": "sm",
//                       "flex": 2
//                     },
//                     {
//                       "type": "text",
//                       "text": gender,
//                       "wrap": true,
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ]
//                 }
//               ],
//               "offsetTop": "md"
//             },
//             {
//               "type": "separator",
//               "margin": "xl"
//             },
//             {
//               "type": "box",
//               "layout": "vertical",
//               "spacing": "sm",
//               "contents": [
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "第一希望",
//                       "flex": 2,
//                       "size": "sm",
//                       "color": "#BA9D5A",
//                       "weight": "bold"
//                     },
//                     {
//                       "type": "text",
//                       "text": fChoice,
//                       "flex": 5,
//                       "size": "sm",
//                       "wrap": true
//                     }
//                   ]
//                 },
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "第二希望",
//                       "color": "#BA9D5A",
//                       "size": "sm",
//                       "flex": 2,
//                       "weight": "bold"
//                     },
//                     {
//                       "type": "text",
//                       "text": sChoice,
//                       "wrap": true,
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ]
//                 },
//                 {
//                   "type": "box",
//                   "layout": "baseline",
//                   "spacing": "sm",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "第三希望",
//                       "color": "#BA9D5A",
//                       "size": "sm",
//                       "flex": 2,
//                       "weight": "bold"
//                     },
//                     {
//                       "type": "text",
//                       "text": tChoice,
//                       "wrap": true,
//                       "size": "sm",
//                       "flex": 5
//                     }
//                   ]
//                 }
//               ],
//               "margin": "md"
//             }
//           ]
//         }
//     };
// }

// function sendMessage(flex) {
//         liff.sendMessages([{
//             type: "flex",
//             altText: "仮予約を受け付けました",
//             contents: flex
//         }]).then(() => {
//             console.log('Flex message sent successfully');
//             liff.closeWindow();
//         }).catch((error) => {})
// }