import constructComponent from "../services/request";

function achievements() {

    class AchievementSpumer {
        constructor(data) {
            this.src = '';
            this.achievement = data.awardName;
            this.nomination = data.nomination;
            this.year = data.year;
            this.isAwarded = data.isAwarded;
            this.parent = document.querySelector('.achievement .achievement__contant');
        }
        render() {
            const element = document.createElement('div');
            element.classList.add('achievement__item');

            if (this.achievement == 'наград нет') {
                this.parent.parentElement.parentElement.style.display = 'none';
            } else {
                if (this.isAwarded == 'received') {
                    switch (this.achievement) {
                        case 'Премия Оскар':
                            this.src = 'awardOscar.png'
                            break;
                        case 'Премия Британской Киноакадемии':
                            this.src = 'brit-academ.png'
                            break;
                        case 'Премия Гильдии Актёров':
                            this.src = 'achievement243.png'
                            break;
                        case 'Премия Сатурн':
                            this.src = 'saturn.png'
                            break;
                        case 'Премия Золотой Глобус':
                            this.src = 'awardGoldenGlobe.png'
                            break;
                        case 'Премия Эмми':
                            this.src = 'emmi.png'
                            break;
                        default: 'none-award.png'
                            break;
                    }
                } else {
                    switch (this.achievement) {
                        case 'Премия Оскар':
                            this.src = 'awardOscar-nomination.png'
                            this.achievement = 'Номинация на премию Оскар'
                            break;
                        case 'Премия Британской Киноакадемии':
                            this.src = 'brit-academ-nomination.png'
                            this.achievement = 'Номинация на премию Британской Киноакадемии'
                            break;
                        case 'Премия Гильдии Актёров':
                            this.src = 'achievement243.png'
                            this.achievement = 'Номинация на премию Гильдии Актёров'
                            break;
                        case 'Премия Сатурн':
                            this.src = 'saturn-nomination.png'
                            this.achievement = 'Номинация на премию Сатурн'
                            break;
                        case 'Премия Золотой Глобус':
                            this.src = 'awardGoldenGlobe-nomination.png'
                            this.achievement = 'Номинация на премию Золотой Глобус'
                            break;
                        case 'Премия Эмми':
                            this.src = 'emmi-nomination.png'
                            this.achievement = 'Номинация на премию Эмми'
                            break;
                        default: 'none-award.png'
                            break;
                    }
                }
                element.innerHTML = `
                    <img src="icons/avards/${this.src}" alt="achievement-image">
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
        }
    };
    const localMovieID = localStorage.getItem('lastViewed');
    constructComponent('/api/getAwards', localMovieID, AchievementSpumer);
};
export default achievements;