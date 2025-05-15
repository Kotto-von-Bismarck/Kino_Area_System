import interactionWithProfileData from "../services/interactionWithProfileData";

function profileGenerator() {

    class ProfileGenerator {
        constructor(data) {
            this.src = data.imgPath;
            this.nickname = data.nickname;
            this.username = data.username;
            this.userbio = data.userbio ? data.userbio : 'Добавьте пару слов о себе';
            this.surname = data.surname;
            this.email = data.email;
            this.gender = data.gender ? data.gender : 'не указан';
            this.usercity = data.usercity ? data.usercity : 'не указан';
            this.userbirthday = data.userbirthday ? data.userbirthday : 'не указан';
            this.parent = document.querySelector('.profileContentBox .profileMainBox');
        }
        render() {
            if (!this.src) {
                this.src = 'images/users-avatars/universal-avatar-max.svg';
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
                            <div class="userParams__data">${this.userbirthday}</div>

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