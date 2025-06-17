import MainPageRequest from '../services/MainPageRequests';
import constructComponent from "../services/request";

function videoPlayer() {
    class TrailerTab {
        constructor(data, ...classes) {
            this.src = data.miniPreview;
            this.title = data.title;
            this.classes = classes;
            this.parent = document.querySelector(data.tabParent);
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'sliderItem';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <div class="closeTrailer">
                    <img class="trailer__img" src=${this.src}>
                    <div>
                        <i class="fa-solid fa-play fa-play-events-none"></i>
                        <div class="activeCard">
                            <div>Текущий трейлер</div>
                        </div>
                    </div>
                </div>
                <h2 class="closeTrailer__title">
                    ${this.title} 
                </h2>
            `;
            this.parent.append(element);
        }
    }
    
    class TrailerActiveTab {
        constructor(data, ...classes) {
            this.src = data.trailer;
            this.title = data.title;
            this.classes = classes;
            this.poster = data.fullsizePreview;
            this.likeVolume = data.likesQuantity;
            this.disVolume = data.dislikesQuantity;
            this.id = data.trailerID == undefined ? data.newTrailerID : data.trailerID;
            this.parent = document.querySelector(data.parent);
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'openTrailerWrapper';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            // назначение уникальных id

            this.videoID = `VideoID-${this.id}`;
            this.buttonID = `ButtonID-${this.id}`;
            this.mobButtonID = `MobButtonID-${this.id}`;
            this.volumeID = `VolumeID-${this.id}`;
            this.progressID = `ProgressID-${this.id}`;
            this.currentTimeID = `currentTimeID-${this.id}`;
            this.volNoneID = `volNoneID-${this.id}`;
            this.playerToolsID = `playerToolsID-${this.id}`;
            this.scrinModID = `scrinModID-${this.id}`;
            this.openTrailer = `openTrailer-${this.id}`;

            element.innerHTML = `
                <div class="trailer__openTrailer" id=${this.openTrailer}>
                    <video class="trailer__video" id=${this.videoID} poster=${this.poster}>
                        <source src=${this.src} type="video/mp4">
                    </video>
                    <div class="player-tools" id=${this.playerToolsID}>
                        <button type="button" id=${this.buttonID} class="play-pause NONEMOB">
                            <i class="fa-solid fa-play"></i>
                        </button>
                        <div class="bottom-tools">
                            <button type="button" id=${this.mobButtonID} class="playPauseMobile MOBILE">
                                <i class="fa-solid fa-play"></i>
                            </button>
                            <div class="volume-tools">
                                <button type="button" id=${this.volNoneID} class="volume-none">
                                    <i class="fa-solid fa-volume-high"></i>
                                </button>
                                <div>
                                    <input type="range" class="volume" id=${this.volumeID} min="0" max="100">
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progressValue">
                                    <p id=${this.currentTimeID}>00 : 00</p>
                                </div>
                                <progress id=${this.progressID} max="100" value="0"></progress>
                            </div>
                            <button type="button" id=${this.scrinModID} class="scrin-mod">
                                <i class="fa-solid fa-expand"></i>
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div class="trailerDescr">
                    <div class="firstFlex">
                        <h2 class="trailerDescr__title">
                            ${this.title}
                        </h2>
                        <div class="trailerDescr__social">
                            <div><i class="fa-brands fa-vk"></i></div>
                            <div><i class="fa-brands fa-instagram"></i></div>
                            <div><i class="fa-brands fa-facebook-f"></i></div>
                            <div><i class="fa-brands fa-twitter"></i></div>
                            <div><a href="#socialID"><i class="fa-solid fa-ellipsis fa-spin-pulse"></i></a></div>
                        </div>
                    </div>
                    <div class="secondFlex">
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
            `;
            this.parent.append(element);

            // плеер

            const video = document.querySelector(`#${this.videoID}`),
                  playerTools = document.querySelector(`#${this.playerToolsID}`),
                  playButton = document.querySelector(`#${this.buttonID}`),
                  mobilePlayButton = document.querySelector(`#${this.mobButtonID}`),
                  volume = document.querySelector(`#${this.volumeID}`),
                  volOff = document.querySelector(`#${this.volNoneID}`),
                  progress = document.querySelector(`#${this.progressID}`),
                  videoCurrentTime = document.querySelector(`#${this.currentTimeID}`),
                  scrinModID = document.querySelector(`#${this.scrinModID}`),
                  thisScrin = document.querySelector(`#${this.openTrailer}`);

            playButton.addEventListener("click", function() {
                if (video.paused == true) {
                    video.play();
                    playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
                } else {
                    video.pause();
                    playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
                }
            });

            mobilePlayButton.addEventListener("click", function() {
                if (video.paused == true) {
                    video.play();
                    mobilePlayButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
                } else {
                    video.pause();
                    mobilePlayButton.innerHTML = '<i class="fa-solid fa-play"></i>';
                }
            });

            scrinModID.addEventListener("click" , function() {
                if (!document.fullscreenElement) {
                    thisScrin.requestFullscreen();
                    scrinModID.innerHTML = '<i class="fa-solid fa-compress"></i>';
                } else {
                    document.exitFullscreen();
                    scrinModID.innerHTML = '<i class="fa-solid fa-expand"></i>';
                }
            });

            volume.addEventListener("input", function() {
                let v = this.value;
                video.volume = v / 100;
                if (v == 0) {
                    volOff.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
                } else {
                    volOff.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                } 
            });

            volOff.addEventListener("click", function() {
                if (volume.value == 0) {
                    volume.value = 50;
                    video.volume = 50 / 100;
                    volOff.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                } else {
                    volume.value = 0;
                    video.volume = 0;
                    volOff.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
                } 
            });

            video.addEventListener("timeupdate", function() {
                progress.value = ((video.currentTime * 100) / video.duration);

                const minutes = Math.floor((+(video.currentTime).toFixed(0) / 60) % 60);
                let seconds = +(video.currentTime).toFixed(0);
                
                if (seconds > 59) {
                    seconds = (+(video.currentTime).toFixed(0)) - (Math.floor((+(video.currentTime).toFixed(0) / 60) % 60) * 60);
                } else {
                    seconds = seconds;
                }
                function getZero(num) {
                    if (num >= 0 && num < 10) {
                        return `0${num}`;
                    } else {
                        return num;
                    }
                }
                videoCurrentTime.innerHTML = `${getZero(minutes)} : ${getZero(seconds)}`;

                if (progress.value == 100) {
                    playButton.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i>';
                    mobilePlayButton.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i>';
                    playerTools.style.background = 'rgba(29, 125, 160, 0.7)';
                    playerTools.style.borderRadius = '10px';
                } else {
                    playerTools.style.background = 'none';
                    playerTools.style.borderRadius = '0px';
                }

                
            });

            progress.addEventListener("click", function() {
                this.value = ((event.offsetX * 100) / this.offsetWidth);
                video.currentTime = video.duration * event.offsetX / this.offsetWidth;
            });
        }
    }
    const body = document.querySelector('.body');
    if (!body.classList.contains('mainPageSelector')){
        const localMovieID = localStorage.getItem('lastViewed');
        constructComponent('/api/getTrailer', localMovieID, TrailerActiveTab);
    } else {
        MainPageRequest('/api/getNewTrailers', [TrailerActiveTab, TrailerTab]);
    }
};

export default videoPlayer;