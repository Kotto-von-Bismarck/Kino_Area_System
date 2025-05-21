function tokenVerification () {
    let jsonWtoken = localStorage.getItem('token');

    const bodySelector = document.querySelector('.body').classList[1];

    if (bodySelector == 'profilePageSelector') {
        setInterval(() => { 
            if (jsonWtoken) {
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
            } 
        },1200)
    } else if (bodySelector == 'mainPageSelector' || bodySelector == 'moviePageBody') {
        setInterval(() => {
            fetch('/login', {
                method: "POST",
                body: JSON.stringify({jsonWtoken}),
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(res => {
                return res.json()
            }).then(res => {
                const signButtons = document.querySelectorAll('.autorisation');
                let bigTablet = window.matchMedia("(max-width: 768px)");
                
                if (res.res == 'Добро пожаловать!') {
                    const accIco = document.createElement('div');
                    accIco.innerHTML = '<a class="alterButtonOnP" href="profile.html"><span>Профиль</span></a>';

                    if (bigTablet.matches == true && signButtons.length > 0) {
                        signButtons[0].replaceWith(accIco);
                    } else if (bigTablet.matches == false && signButtons.length > 0) {
                        signButtons[0].replaceWith(accIco);
                    }
                } else {
                    if (bigTablet.matches == true && signButtons.length > 0) {
                        signButtons[1].innerHTML = '<span>Войти</span>';
                        signButtons[1].style.pointerEvents = "auto"
                    } else if (bigTablet.matches == false && signButtons.length > 0) {
                        signButtons[0].innerHTML = '<span>Войти</span>';
                        signButtons[0].style.pointerEvents = "auto"
                    }
                }
            })
        },1200)   
    }
    
}
export default tokenVerification;