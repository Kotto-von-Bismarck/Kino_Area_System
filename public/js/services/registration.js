const sign_In_Up = function(account, verifyType) {

    let jsonWtoken = localStorage.getItem('token');

    setInterval(() => { if (jsonWtoken) {
        fetch('/login', {
            method: "POST",
            body: JSON.stringify({jsonWtoken}),
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(res => {
            if (res.res != 'Добро пожаловать!') {
                setTimeout(() => {
                    window.location.replace("http://localhost:3000/index.html")
                },1000)
                return alert(`${ res.res }`)
            }
        })
    } },1500)

    async function postData(url, body) {            
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(body)
        })
        if(response.status == 404) {
            return alert('Пользователь не существует')
        }
        if(response.status == 400) {
            return alert('Неверный пароль')
        }
        if(response.status == 401) {
            return alert('Пользователь с данным ником уже существует')
        }
        if(response.status == 402) {
            return alert('Пользователь с данной почтой уже существует')
        }
        return await response.json()
    } 

    const registrationForm = document.querySelector('.registrationForm');
    
    if (verifyType == 'reg') {
        postData('/regist', account).then(data => {
            if (!data.error) {
                registrationForm.innerHTML = `
                    <img src="icons/logo.svg" alt="KinoArea" style="display: block; margin: 0 auto;">
                    <h3 class="subheader__item subheader__item_active" style="display: block; margin: 30px">
                        Успешная регистрация!
                    </h2>
                `;
                setTimeout(() => {
                    location.reload();
                },3000)
            } else {
                console.log(data);
            }
        });
    } 
    else if (verifyType == 'auth') {
        postData('/login', account).then(json => {
            if(json != undefined || json != null) {
                localStorage.setItem('token', json.token)
            }
            return json
        }).then((tok) => {
            jsonWtoken = tok.token;          
            fetch('/login', {
                method: "POST",
                body: JSON.stringify({jsonWtoken}),
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(res => {
                return res.json()
            }).then(res => {
                location.reload();
                return alert(`${ res.res }`)
            })
            
        })
    }
}

export default sign_In_Up;