function tokenVerification () {
    let jsonWtoken = localStorage.getItem('token');

    const bodySelector = document.querySelector('.body').classList[1];

    if (bodySelector == 'profilePageSelector' && jsonWtoken) {
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
                if (res.res != 'Добро пожаловать!') {
                    setTimeout(() => {
                        window.location.replace("http://localhost:3000/index.html")
                    },1000)
                    return alert(`${ res.res }`)
                }
            })
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
                if (bodySelector == 'moviePageBody' && res.res == 'Добро пожаловать!') {
                    if (!document.querySelector('.myReview')) {
                        async function getNickAndAvatar(url, token) {            
                            const res = await fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Content-type': 'application/json',
                                    'token': `${token}`
                                }
                            })
                            if(!res.ok) { alert('не удалось загрузить контент') }
                            return await res.json()
                        } 

                        const addReviewBtn = document.querySelector('.AddMovieReviewButton');
                        const addReviewForm = document.createElement('div');
                        
                        const JWT = localStorage.getItem('token');
                        const movieID = localStorage.getItem('lastViewed');

                        getNickAndAvatar('/api/getNickAndAvatar', JWT).then(data => {
                            if (data.nickname) {
                            addReviewForm.innerHTML = `
                            <div class="ReviewContent myReview">
                                <div class="ReviewElement goodReview neutralReview badReview" style="box-shadow: none">
                                    <div class="ReviewElement__header">
                                        <div class="UserData">
                                            <img src="${data.avatar == null ? 'images/users-avatars/universal-avatar-mini.svg' : 'uploadedAvatars/' + data.avatar}">
                                            <h2 class="NickName">${data.nickname}</h2>
                                        </div>
                                    </div>
                                    <div class="ReviewElement__form">
                                        <form class="addReviewForm" name="requestForAddReview" method="post" enctype="multipart/form-data" action="/publicReview">
                                            <label class="title-label" for="title">Заголовок</label>
                                            <input maxlength="30" class="title-input" required placeholder="Заголовок рецензии" name="title" type="text">

                                            <label class="reviewType-label" for="reviewType">Тип рецензии</label>
                                            <select class="reviewType-select" name="reviewType">
                                                <option value="neutralReview">Нейтральная</option>
                                                <option value="goodReview">Положительная</option>
                                                <option value="badReview">Отрицательная</option>
                                            </select>

                                            <textarea class="reviewBody" name="reviewBody" placeholder="Ваше мнение" type="text"></textarea>

                                            <input id="tokenInput" style="display: none" name="token" type="text" value="${JWT}">
                                            <input id="movieIdInput" style="display: none" name="movieId" type="text" value="${movieID}">

                                            <input class="submitData" name="userSub" type="submit" value="Отправить">
                                        </form>
                                    </div>
                                </div>
                            </div>
                            `;
                            addReviewBtn.replaceWith(addReviewForm);
                            }
                        });
                    }
                }
            })
        },1200)   
    }    
}
export default tokenVerification;