import constructComponent from "../services/request";

function frames() {

    class FrameSpumer {
        constructor(data) {
            this.framesFolder = data.framesFolder;
            this.additionalPosters = data.additionalPosters;
            this.framesParent = document.querySelector('.movieFrames .movieFrames__contant-wrapper');
            this.postersParent = document.querySelector('.moviePosters .moviePosters__contant-wrapper');
        }
        render() {
            const postersWrapper = document.createElement('div');
            postersWrapper.classList.add('moviePosters__contant');

            const fakePoster = 'images/moviePagesPosters/fake-poster.svg';
            let postersGroup = [];
            
            if (this.additionalPosters.match(/[,]/g)) {
                postersGroup = this.additionalPosters.split(', ')
            } else {
                postersGroup = this.additionalPosters
            }
            
            postersWrapper.innerHTML = `
                <div class="moviePosters__item">
                    <img src=${
                        postersGroup[0] == undefined ? fakePoster : postersGroup[0]
                    }>
                </div>
                <div class="moviePosters__item">
                    <img src=${
                        postersGroup[1] == undefined ? fakePoster : postersGroup[1]
                    }>
                </div>
                <div class="moviePosters__item">
                    <img src=${
                        postersGroup[2] == undefined ? fakePoster : postersGroup[2]
                    }>
                </div>
            `;            
            this.postersParent.append(postersWrapper);

            const framesWrapper = document.createElement('div');
            framesWrapper.classList.add('movieFrames__contant');
            
            framesWrapper.innerHTML = `
                <div class="movieFrames__item_bigImg">
                    <img src="images/movieFrames/${this.framesFolder}/1.png">
                </div>
                <div class="movieFrames__item">
                    <img src="images/movieFrames/${this.framesFolder}/2.png">
                </div>
                <div class="movieFrames__item">
                    <img src="images/movieFrames/${this.framesFolder}/3.png">
                </div>
                <div class="movieFrames__item">
                    <img src="images/movieFrames/${this.framesFolder}/4.png">
                </div>
                <div class="movieFrames__item">
                    <img src="images/movieFrames/${this.framesFolder}/5.png">
                </div>
                <div class="movieFrames__item_bigImg">
                    <img src="images/movieFrames/${this.framesFolder}/6.png">
                </div>
            `;
            this.framesParent.append(framesWrapper);       
        }
    };
    const localMovieID = localStorage.getItem('lastViewed');
    constructComponent('/api/getFrames', localMovieID, FrameSpumer);
};
export default frames;