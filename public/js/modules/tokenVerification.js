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
                    if (res.res == 'Добро пожаловать!') {
                        const signButtons = document.querySelectorAll('.autorisation');
                        const accIco = document.createElement('div');
                        accIco.innerHTML = '<a class="alterButtonOnP" href="profile.html"><span>Профиль</span></a>';

                        let bigTablet = window.matchMedia("(max-width: 768px)");

                        if (bigTablet.matches == true && signButtons.length > 0) {
                            signButtons[0].replaceWith(accIco);
                        } else if (bigTablet.matches == false && signButtons.length > 0) {
                            signButtons[0].replaceWith(accIco);
                        }
                       
                    }
                })
            } 
        },1200)
    }
    
}
export default tokenVerification;