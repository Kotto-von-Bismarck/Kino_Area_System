import constructComponent from "../services/request";

function moviePageContent () {
    class moviePageSpumer {
        constructor(data) {
            this.movieID = data.movieID
            this.movieCardItem = data.primaryPoster;
            this.movieTitleRus = data.rusTitle;
            this.movieTitleEng = data.engTitle;
            this.MovieZoneMark = parseFloat(data.markMZ).toFixed(2);
            this.IMDbMark = parseFloat(data.markIMDB).toFixed(2);
            this.shortMovieDescr = data.description;
            this.expectationsRating = data.rating;
            this.likesQuantity = data.likesQuantity
            this.dislikesQuantity = data.dislikesQuantity
            this.yearOfRelease = data.year;
            this.countryOfRelease = data.madeIn;
            this.slogan = data.slogan;
            this.director = data.directorRusName;
            this.Screenwriter = data.screenwriter;
            this.Producer = data.producer;
            this.Operator = data.operator;
            this.Composer = data.composer;
            this.Artist = data.artist;
            this.Editor = data.editor;
            this.Genre = data.genre;
            this.boxOffice = data.worldwideBoxOffice;
            this.PremiereWrld = data.worldPremiere;
            this.PremiereRF = data.rusPremiere;
            this.AgeLimit = data.ageRating;
            this.TimeLimit = data.duration;
            this.directorIMG = data.directorImg;
            this.directorNameRus = data.directorRusName;
            this.directorNameEng = data.directorEngName;

            // this.ProductionSpanList = data.ProductionSpanList;
            // this.SpecialEffectsSpanList = data.SpecialEffectsSpanList;
            // this.DubbingStudioSpanList = data.DubbingStudioSpanList;
            
            this.mainBackgroundImageSRC = data.background;
        }
        render() {

            const parentHTML = document.querySelector('.movieDescription');

            parentHTML.style.cssText = `background: url(${this.mainBackgroundImageSRC}) top center/105% no-repeat`;

            // painting MovieZoneMark
            if (this.MovieZoneMark <= 2) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/1.svg);"';
            } else if (this.MovieZoneMark > 2 && this.MovieZoneMark <= 3) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/2.svg);"';
            } else if (this.MovieZoneMark > 3 && this.MovieZoneMark <= 4) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/3.svg);"';
            } else if (this.MovieZoneMark > 4 && this.MovieZoneMark <= 5) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/4.svg);"';
            } else if (this.MovieZoneMark > 5 && this.MovieZoneMark <= 6) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/5.svg);"';
            } else if (this.MovieZoneMark > 6 && this.MovieZoneMark <= 7) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/6.svg);"';
            } else if (this.MovieZoneMark > 7 && this.MovieZoneMark <= 8) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/7.svg);"';
            } else if (this.MovieZoneMark > 8 && this.MovieZoneMark <= 9) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/8.svg);"';
            } else if (this.MovieZoneMark > 9 && this.MovieZoneMark <= 9.5) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/9.svg);"';
            } else if (this.MovieZoneMark > 9.5 && this.MovieZoneMark  <= 10) {
                this.MovieZoneMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/10.svg);"';
            }
            // painting IMDbMark
            if (this.IMDbMark <= 2) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/1.svg);"';
            } else if (this.IMDbMark > 2 && this.IMDbMark <= 3) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/2.svg);"';
            } else if (this.IMDbMark > 3 && this.IMDbMark <= 4) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/3.svg);"';
            } else if (this.IMDbMark > 4 && this.IMDbMark <= 5) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/4.svg);"';
            } else if (this.IMDbMark > 5 && this.IMDbMark <= 6) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/5.svg);"';
            } else if (this.IMDbMark > 6 && this.IMDbMark <= 7) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/6.svg);"';
            } else if (this.IMDbMark > 7 && this.IMDbMark <= 8) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/7.svg);"';
            } else if (this.IMDbMark > 8 && this.IMDbMark <= 9) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/8.svg);"';
            } else if (this.IMDbMark > 9 && this.IMDbMark <= 9.5) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/9.svg);"';
            } else if (this.IMDbMark > 9.5 && this.IMDbMark <= 10) {
                this.IMDbMarkBG = '"background-image: url(icons/moviePagesMarks/oldVer/10.svg);"';
            }

            // динамический рейтинг ожиданий
            if (this.expectationsRating != undefined) {
                this.procentBAR = this.expectationsRating;
                let n = +this.expectationsRating;
                if (n >= 75) {
                    this.procentBG = 'rgba(44, 161, 97, .4)';
                } else if (n < 75 && n >= 60) {
                    this.procentBG = 'rgba(136, 181, 31, 0.4)';
                } else if (n < 60 && n >= 45) {
                    this.procentBG = '#cb6d3673';
                } else if (n < 45) {
                    this.procentBG = '#cb403670';
                }
            } else {
                this.procentBAR = '0'; 
            }

            const childHTML = document.createElement('div');
            childHTML.classList.add('movieDescription__container');
            
            childHTML.innerHTML = `
                <div class="movieDescription__firstFlexBox">
                    <div class="first-con">
                        <img class="NONEMOB" src=${this.movieCardItem}>
                        <div class="third-con">
                            <div class="markBorder">
                                <i class="fa-solid fa-thumbs-up"></i>
                            </div>
                            <div class="markBorder">
                                <i class="fa-solid fa-thumbs-down fa-flip-horizontal"></i>
                            </div>
                            <div class="markBorder markBorder-procent">
                                <div class="procentBAR" style="width: ${this.procentBAR}%; background: ${this.procentBG};"></div>
                                <span class="procent">
                                    Рейтинг ожиданий ${this.expectationsRating}%
                                </span>
                            </div>
                            <div class="markBorder">
                                <i class="fa-solid fa-heart"></i>
                            </div>
                        </div>
                    </div>
                    <div class="second-con">
                        <h2 class="subheader__title">
                            ${this.movieTitleRus}
                        </h2>
                        <h4 class="subheader__subtitle">
                            ${this.movieTitleEng}
                        </h4>
                        <div class="markElipsoids">
                            <div class="mark">
                                <div class="numMark" style=${this.MovieZoneMarkBG}>
                                    <i>${this.MovieZoneMark}</i>
                                </div>
                                <span>Movie zone</span>
                            </div>
                            <div class="mark">
                                <div class="numMark" style=${this.IMDbMarkBG}>
                                    <i>${this.IMDbMark}</i>
                                </div>
                                <span>IMDb</span>
                            </div>
                        </div>
                        <p class="paragraph">
                            ${this.shortMovieDescr}
                        </p>
                        <div class="watchTrailer">
                            <a href="#trailerHeaderID">
                                <button class="watchTrailer__button">
                                    <span>
                                        <i class="fa-solid fa-play fa-play-events-none"></i>
                                        ㅤСмотреть трейлер
                                    </span>
                                </button>
                            </a>
                            <div class="watchTrailer__social">
                                <div><i class="fa-brands fa-vk"></i></div>
                                <div><i class="fa-brands fa-instagram"></i></div>
                                <div><i class="fa-brands fa-facebook-f"></i></div>
                                <div><i class="fa-brands fa-twitter"></i></div>
                                <div><i class="fa-brands fa-youtube"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="movieDescription__secondFlexBox">
                    <span class="title">
                        Год:	
                    </span>
                    <span class="descr">
                        ${this.yearOfRelease}
                    </span>
                    <span class="title">
                        Страна:	
                    </span>
                    <span class="descr">
                        ${this.countryOfRelease}
                    </span>
                    <span class="title">
                        Слоган:
                    </span>
                    <span class="descr">
                        ${this.slogan}
                    </span>
                    <span class="title">
                        Режиссер:	
                    </span>
                    <span class="descr">
                        ${this.director}
                    </span>
                    <span class="title">
                        Сценарий:
                    </span>
                    <span class="descr">
                        ${this.Screenwriter}
                    </span>
                    <span class="title">
                        Продюсер:
                    </span>
                    <span class="descr">
                        ${this.Producer}
                    </span>
                    <span class="title">
                        Оператор:	
                    </span>
                    <span class="descr">
                        ${this.Operator}
                    </span>
                    <span class="title">
                        Композитор:
                    </span>
                    <span class="descr">
                        ${this.Composer}
                    </span>
                    <span class="title">
                        Художник:
                    </span>
                    <span class="descr">
                        ${this.Artist}
                    </span>
                    <span class="title">
                        Монтаж:
                    </span>
                    <span class="descr">
                        ${this.Editor}
                    </span>
                    <span class="title">
                        Жанр:
                    </span>
                    <span class="descr">
                        ${this.Genre}
                    </span>
                    <span class="title">
                        Сборы в мире:	
                    </span>
                    <span class="descr">
                        $${this.boxOffice}
                    </span>
                    <span class="title">
                        Премьера (мир):
                    </span>
                    <span class="descr">
                        ${this.PremiereWrld}
                    </span>
                    <span class="title">
                        Премьера (РФ):	
                    </span>
                    <span class="descr">
                        ${this.PremiereRF}
                    </span>
                    <span class="title">
                        Возраст:
                    </span>
                    <span class="descr">
                        ${this.AgeLimit}
                    </span>
                    <span class="title">              
                        Время:
                    </span>
                    <span class="descr">
                        ${this.TimeLimit}
                    </span>
                </div>
                <div class="movieDescription__thirdFlexBox">
                    <div class="director">
                        <img src=${this.directorIMG} alt="directorIMG">
                        <div>
                            <div>
                                <span class="position__nameRus">
                                    ${this.directorNameRus}
                                </span>
                            </div>
                            <div>
                                <span class="position__nameEng">
                                    ${this.directorNameEng}
                                </span>
                            </div>
                            <div>
                                <span class="position__position">
                                    Режисёр
                                </span>
                            </div>                                    
                        </div>
                    </div>
                    <div class="movieInfo">
                        <h5 class="movieInfo__title">
                            Производство:
                        </h5>
                        <div class="movieInfo__descr">
                            ${this.ProductionSpanList}
                        </div>
                    </div>
                    <div class="movieInfo">
                        <h5 class="movieInfo__title">
                            Спецэффекты:
                        </h5>
                        <div class="movieInfo__descr">
                            ${this.SpecialEffectsSpanList}
                        </div>
                    </div>
                    <div class="movieInfo">
                        <h5 class="movieInfo__title">
                            Студия дубляжа:
                        </h5>
                        <div class="movieInfo__descr">
                            ${this.DubbingStudioSpanList}
                        </div>
                    </div>
                </div>
            `;
            parentHTML.firstElementChild.append(childHTML);
        }
    };

    const localMovieID = localStorage.getItem('lastViewed');
    
    console.log(typeof localMovieID);

    constructComponent('/api/getMovie', localMovieID, moviePageSpumer);
};

export default moviePageContent;