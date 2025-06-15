import constructComponent from "../services/request";

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
            this.parent = document.querySelector(data.parentSelector);
        }
        ReviewCards() {
            const element = document.createElement('div');
            if (this.avatar === null) {
                this.avatar = "images/users-avatars/universal-avatar-mini.svg"
            } else {
                this.avatar = `uploadedAvatars/${this.avatar}`
            }
            let creationTime = (this.time.split(' '))[1];
                creationTime = creationTime.slice(0,5) + ' UTC'
            let creationDate = (this.time.split(' '))[0];
                creationDate = `${creationDate.slice(8,10)}.${creationDate.slice(5,7)}.${creationDate.slice(0,4)}`;

            element.innerHTML = `
                <div class="ReviewElement ${this.reviewclass}">
                    <div class="ReviewElement__header">
                        <div class="UserData">
                            <img src=${this.avatar} style="border-radius: 100%">
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
                            <div class="markBorder">
                                <i class="fa-solid fa-thumbs-up"></i>
                                <div class="points">${this.likeVolume}</div>
                            </div>
                            <div class="markBorder">
                                <i class="fa-solid fa-thumbs-down fa-flip-horizontal"></i>
                                <div class="points">${this.disVolume}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    };
    const localMovieID = localStorage.getItem('lastViewed');
    constructComponent('/api/getReviews', localMovieID, ReviewCardsConstructor);
};
export default reviews;