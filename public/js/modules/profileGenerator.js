import interactionWithProfileData from "../services/interactionWithProfileData";

function profileGenerator() {

    class ProfileGenerator {
        constructor(data) {
            this.src = data.avatar;
            this.nickname = data.nickname;
            this.username = data.username;
            this.userbio = data.userbio ? data.userbio : 'Добавьте пару слов о себе';
            this.surname = data.surname;
            this.email = data.email;
            this.gender = data.gender;
            this.usercity = data.usercity ? data.usercity : 'не указан';
            this.userbirthday = data.userbirthday;
            this.parent = document.querySelector('.profileContentBox .profileMainBox');
        }
        render() {            
            if (!this.src) {
                this.src = 'images/users-avatars/universal-avatar-max.svg';
            } else {
                this.src = 'uploadedAvatars/' + this.src;
            }

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

            this.parent.innerHTML = `
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
                        <img src=${this.src} alt="avatar" class="avatar">
                    </div>
                    <div class="profileDescr">
                        <h1 class="userName">${this.nickname.slice(-25)}</h1>
                        <p class="userBio">
                            ${this.userbio}
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
                            <div class="userParams__data">${this.usercity}</div>
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
                        <span class="countItem__title">Комментарии</span>
                    </div>
                </div>
            `;
        }
    };

    const thisUserToken = localStorage.getItem('token');

    interactionWithProfileData('/api/getProfileData', thisUserToken, ProfileGenerator);
};

export default profileGenerator;