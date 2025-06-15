import interactionWithProfileData from "../services/interactionWithProfileData";

function profileGenerator() {

    class ProfileGenerator {
        constructor(data) {
            this.src = data.avatar;
            this.nickname = data.nickname;
            this.username = data.username;
            this.userbio = data.userbio;
            this.surname = data.surname;
            this.email = data.email;
            this.gender = data.gender;
            this.usercity = data.usercity ? data.usercity : 'не указан';
            this.userbirthday = data.userbirthday;
            this.parent = document.querySelector('.profileContentBox');
        }
        render() {

            let birthday = this.userbirthday ? this.userbirthday.slice(5,7) : null;

            switch (birthday) {
                case '01':
                    birthday = 'января'
                    break;
                case '02':
                    birthday = 'февраля'
                    break;
                case '03':
                    birthday = 'марта'
                    break;
                case '04':
                    birthday = 'апреля'
                    break;
                case '05':
                    birthday = 'мая'
                    break;
                case '06':
                    birthday = 'июня'
                    break;
                case '07':
                    birthday = 'июля'
                    break;
                case '08':
                    birthday = 'августа'
                    break;
                case '09':
                    birthday = 'сентября'
                    break;
                case '10':
                    birthday = 'октября'
                    break;
                case '11':
                    birthday = 'ноября'
                    break;
                case '12':
                    birthday = 'декабря'
                    break;
                default:
                    birthday = 'не указан'
                    break;
            }

            if (birthday != 'не указан') {
                birthday = `${this.userbirthday.slice(-2)} ${birthday} ${this.userbirthday.slice(0,4)}`;
            }

            switch (this.gender) {
                case 'male':
                    this.gender = 'мужской'
                    break;
                case 'female':
                    this.gender = 'женский'
                    break;
                default:
                    this.gender = 'не указан'
                    break;
            }
            this.parent.firstElementChild.innerHTML = `
                <div class="profileContentBox__header">
                    <h2 class="profileTitle">
                        Ваш профиль
                    </h2>
                    <button class="profileSettings" onclick="document.querySelector('.profileMainBox').classList.toggle('hide'); document.querySelector('.profileSettingsBox').classList.toggle('hide');">
                        <img src="icons/profileIcons/settingsNut.svg">
                        <span>Настройки</span>
                    </button>
                </div>
                <div class="profileContentBox__body">
                    <div class="avatarBox">
                        <img src=${this.src ? 'uploadedAvatars/' + this.src : 'images/users-avatars/universal-avatar-max.svg'} alt="avatar" class="avatar">
                    </div>
                    <div class="profileDescr">
                        <h1 class="userName">${this.nickname.slice(-25)}</h1>
                        <p class="userBio">
                            ${this.userbio ? this.userbio : 'Добавьте пару слов о себе'}
                        </p>
                        <div class="userParams">
                            <div class="userParams__title">Фамилия</div>
                            <div class="userParams__data">${this.surname}</div>

                            <div class="userParams__title">Имя</div>
                            <div class="userParams__data">${this.username}</div>

                            <div class="userParams__title">E-mail</div>
                            <div class="userParams__data">${this.email}</div>

                            <div class="userParams__title">Пол:</div>
                            <div class="userParams__data">${this.gender}</div>

                            <div class="userParams__title">День рождения:</div>
                            <div class="userParams__data">${birthday}</div>

                            <div class="userParams__title">Город:</div>
                            <div class="userParams__data">${this.usercity == 'virtualCity' ? 'В моём городе нет кинотеатров-партнёров Movie zone' : this.usercity}</div>
                        </div>
                    </div>
                </div>
                <div class="profileContentBox__footer">
                    <div class="countItem">
                        <span class="countItem__quantity">0</span>
                        <span class="countItem__title">Друзья</span>
                    </div>
                    <div class="countItem">
                        <span class="countItem__quantity">0</span>
                        <span class="countItem__title">Избранное</span>
                    </div>
                    <div class="countItem">
                        <span class="countItem__quantity">0</span>
                        <span class="countItem__title">Рецензии</span>
                    </div>
                    <div class="countItem">
                        <span class="countItem__quantity">0</span>
                        <span class="countItem__title">Ожидаемые фильмы</span>
                    </div>
                    <div class="countItem">
                        <span class="countItem__quantity">0</span>
                        <span class="countItem__title">Билеты и сеансы</span>
                    </div>
                </div>
            `;
            this.parent.lastElementChild.innerHTML = `
                <div class="profileContentBox__header">
                    <h2 class="profileTitle">
                        Настройки профиля
                    </h2>
                    <button class="profileSettings" onclick="document.querySelector('.profileMainBox').classList.toggle('hide'); document.querySelector('.profileSettingsBox').classList.toggle('hide');">
                        <img src="icons/profileIcons/closeVector.svg">
                        <span>Закрыть</span>
                    </button>
                </div>
                <div class="profileContentBox__settings">
                    <form class="editProfileForm" name="requestForEditProfile" method="post" enctype="multipart/form-data" action="/upload">
                        <div class="input-file-row avatarBox">
                            <div class="avatarImgBox">
                                <img src=${this.src ? 'uploadedAvatars/' + this.src : 'images/users-avatars/avatar-frame.svg'} alt="avatar" class="avatar">
                            </div>
                            <label class="input-file">
                                <span>Загрузить аватар</span>
                                <input type="file" name="file" accept="image/png">
                                <p>имя файла</p>
                            </label>
                        </div>
                        <div class="profileDescr">
                            <label class="labelFirstName" for="firstname">Ваше имя</label>
                            <input maxlength="30" class="inputFirstName" required placeholder="${this.username}" value="${this.username}" name="firstname" type="text">

                            <label class="labelSurname" for="surname">Ваша фамилия</label>
                            <input maxlength="30" class="inputSurname" required placeholder="${this.surname}" name="surname" type="text" value="${this.surname}">

                            <label class="labelGender" for="gender">Ваш пол</label>
                            <select class="selectGender" name="gender">
                                <option ${this.gender == 'мужской' ? "selected" : ''} value="male">мужской</option>
                                <option ${this.gender == 'женский' ? "selected" : ''} value="female">женский</option>
                            </select>

                            <label class="labelBirthday" for="birthday">Ваша дата рождения</label>
                            <input ${this.userbirthday ? `value="${this.userbirthday}"` : ''} class="inputBirthday" required type="date" name="birthday">

                            <label class="labelEmail" for="email">Ваш E-mail</label>
                            <input value="${this.email}" maxlength="35" class="inputEmail" required name="email" type="email" placeholder="${this.email}">

                            <label class="labelNickname" for="nickname">Ваш логин</label>
                            <input value="${this.nickname}" maxlength="20" class="inputNickname" required name="nickname" type="text" placeholder="${this.nickname}">

                            <label class="labelCity" for="city">Ваш город</label>
                            <select class="selectCity" name="city">
                                <option ${this.usercity == "virtualCity" ? "selected" : ''} value="virtualCity">Моего города нет в списке</option>
                                <option ${this.usercity == "Новосибирск" ? "selected" : ''} value="Новосибирск">Новосибирск</option>
                                <option ${this.usercity == "Оренбург" ? "selected" : ''} value="Оренбург">Оренбург</option>
                                <option ${this.usercity == "Самара" ? "selected" : ''} value="Самара">Самара</option>
                                <option ${this.usercity == "Казань" ? "selected" : ''} value="Казань">Казань</option>
                                <option ${this.usercity == "Уфа" ? "selected" : ''} value="Уфа">Уфа</option>
                                <option ${this.usercity == "Екатеринбург" ? "selected" : ''} value="Екатеринбург">Екатеринбург</option>
                                <option ${this.usercity == "Тольятти" ? "selected" : ''} value="Тольятти">Тольятти</option>
                                <option ${this.usercity == "Сызрань" ? "selected" : ''} value="Сызрань">Сызрань</option>
                                <option ${this.usercity == "Саратов" ? "selected" : ''} value="Саратов">Саратов</option>
                                <option ${this.usercity == "Орск" ? "selected" : ''} value="Орск">Орск</option>
                                <option ${this.usercity == "Нижнекамск" ? "selected" : ''} value="Нижнекамск">Нижнекамск</option>
                            </select>

                            <textarea maxlength="200" class="userBio" name="userBio" placeholder="Обо мне (не более 200 символов)" type="text">${
                                this.userbio ? this.userbio : ''
                            }</textarea>

                            <input id="tokenInput" style="display: none" name="token" type="text">

                            <input class="submitData" name="userSub" type="submit" value="ㅤСохранить">
                        </div>
                    </form>
                </div>
            `;            
        }
    };

    const formCatchInterval = setInterval(() => {            
        if (document.querySelector('.profileContentBox__settings')) {
            const tokenInput = document.querySelector('#tokenInput');
            let JWT = localStorage.getItem('token');
            tokenInput.value = JWT
            let uploadImageForm;
            
            if (document.querySelector('.input-file input[type=file]')) {
                let dt = new DataTransfer();
                document.querySelector('.input-file input[type=file]').addEventListener('change', function () {
                    
                    if (this.files.length > 0) {
                        this.parentElement.style.display='none'
                    }
                    if(this.files[0].size > 2097152) {
                        alert("Размер файла слишком большой (максимум 2 МБ)");
                        this.value = "";
                        this.parentElement.style.display='flex'
                    } else {
                        document.querySelector('.input-file').lastElementChild.innerHTML = `... ${this.files[0].name.slice(-28)}`
                        uploadImageForm = document.forms.requestForPostCatalogItem;

                        const avatarImgBox = document.querySelector('.avatarImgBox');
                    
                        for ( let i = 0; i < this.files.length; i++ ){
                            let file = this.files.item(i);
                            dt.items.add(file);    
                    
                            let reader = new FileReader();
                            reader.readAsDataURL(file);

                            reader.onloadend = function() {
                                avatarImgBox.innerHTML = `
                                    <img alt="avatar" class="avatar" src="${reader.result}">
                                `;
                            }
                        };
                        this.files = dt.files;
                    }
                });
            }
            clearInterval(formCatchInterval);
        }
    }, 1000);

    const thisUserToken = localStorage.getItem('token');

    interactionWithProfileData('/api/getProfileData', thisUserToken, ProfileGenerator);
};

export default profileGenerator;