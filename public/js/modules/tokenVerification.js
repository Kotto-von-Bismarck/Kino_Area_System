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
        },1500)
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
                        accIco.innerHTML = '<a href="profile.html"><img src="icons/testAva.svg" alt="avatar"></a>';

                        let bigTablet = window.matchMedia("(min-width: 768px)");

                        if (bigTablet.matches == true && signButtons.length > 0) {
                            console.log(signButtons);
                            
                            signButtons[0].replaceWith(accIco);
                        } else if (bigTablet.matches == false && signButtons.length > 0) {
                            signButtons[1].replaceWith(accIco);
                        }
                       
                    }
                })
            } 
        },1500)
    }
    
}
export default tokenVerification;