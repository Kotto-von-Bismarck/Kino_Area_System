import constructComponent from "../services/request";

function achievements() {

    class AchievementSpumer {
        constructor(data) {
            this.src = data.imgPath;
            this.achievement = data.awardName;
            this.nomination = data.nomination;
            this.year = data.year;
            this.parent = document.querySelector('.achievement .achievement__contant');
        }
        render() {
            const element = document.createElement('div');
            element.classList.add('achievement__item');
            if (this.src == undefined) {
                this.src = 'icons/avards/none-award.png';
            }
            element.innerHTML = `
                <img src=${this.src} alt="achievement-image">
                <div class="achievementBOX">
                    <div class="position__nameRus">
                        ${this.achievement}
                    </div>
                    <div class="position__position">
                        ${this.nomination}
                    </div>
                    <div class="position__nameEng">
                        ${this.year}
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    };
    const thisFilmPage = document.querySelector('.body'),
          thisFilmName = thisFilmPage.getAttribute('id')
    constructComponent('/api/getFilmAchievements', thisFilmName, AchievementSpumer);
};

export default achievements;