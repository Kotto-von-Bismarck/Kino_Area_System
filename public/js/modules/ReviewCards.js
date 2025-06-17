import constructComponent from "../services/request";
import MainPageRequest from "../services/MainPageRequests"
function reviews(){

    class ReviewCardsConstructor {
        constructor(data) {
            this.avatar = data.avatar;
            this.nickname = data.nickname;
            this.reviewtitle = data.reviewtitle;
            this.date = '';
            this.time = data.time;
            this.likeVolume = data.likesQuantity;
            this.disVolume = data.dislikesQuantity;
            this.reviewclass = data.reviewclass;
            this.reviewtext = data.reviewtext;
            this.parent = data.parentSelector;
            this.moviePoster = data.avatar;
        }
        ReviewCards() {
            const element = document.createElement('div');
            if (this.avatar === null) {
                this.avatar = "images/users-avatars/universal-avatar-mini.svg"
            } else {
                this.avatar = `uploadedAvatars/${this.avatar}`
            }
            if (this.parent == '.profileReviewBox') {
                this.avatar = this.moviePoster;
            }
            let creationTime = (this.time.split(' '))[1];
                creationTime = creationTime.slice(0,5) + ' UTC'
            let creationDate = (this.time.split(' '))[0];
                creationDate = `${creationDate.slice(8,10)}.${creationDate.slice(5,7)}.${creationDate.slice(0,4)}`;

            const parentHTML = document.querySelector(this.parent);

            element.innerHTML = `
                <div class="ReviewElement ${this.reviewclass}">
                    <div class="ReviewElement__header">
                        <div class="UserData">
                            <img src=${this.avatar} ${this.parent == '.profileReviewBox' ? 'style="border-radius: 5px"' : 'style="border-radius: 100%"'}>
                            <div class="NickName">${this.nickname}</div>
                        </div>
                        <div class="subheader__devider"></div>
                        <div class="ReviewElement__title">
                            <h4 class="ThisReviewTitle">
                                ${this.reviewtitle}
                            </h4>
                            <div class="ThisReviewDate">
                                <i class="date">${creationDate}</i>
                                <span>ㅤ|ㅤ</span>
                                <i class="time">${creationTime}</i>
                            </div>
                        </div>
                    </div>
                    <div class="ThisReviewText">
                        ${this.reviewtext}
                    </div>
                    <div class="ThisReviewmarks">
                        <div class="markBorderWrapper">
                            <div class="markBorder" onclick="this.firstElementChild.classList.toggle('activeLike'); this.parentElement.lastElementChild.firstElementChild.classList.remove('activeDis')">
                                <i class="fa-solid fa-thumbs-up"></i>
                                <div style="display: none" class="points">${this.likeVolume}</div>
                            </div>
                            <div class="markBorder" onclick="this.firstElementChild.classList.toggle('activeDis'); this.parentElement.firstElementChild.firstElementChild.classList.remove('activeLike')">
                                <i class="fa-solid fa-thumbs-down fa-flip-horizontal"></i>
                                <div style="display: none" class="points">${this.disVolume}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            if (this.parent == '.profileReviewBox') {
                if (document.querySelector('#reviewLoading')) {
                    const DIVelem = document.createElement('div');
                    document.querySelector('#reviewLoading').replaceWith(DIVelem);
                }
                parentHTML.append(element);
            } else {
                parentHTML.append(element);
            }
        }
    };

    if (document.querySelector('.profilePageSelector')) {
        const token = localStorage.getItem('token');
        MainPageRequest('/api/getUserReviews', [token, ReviewCardsConstructor]);
        
    } else {
        const localMovieID = localStorage.getItem('lastViewed');
        constructComponent('/api/getReviews', localMovieID, ReviewCardsConstructor);
    }
};
export default reviews;