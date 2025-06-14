import constructComponent from "../services/request";
function actors() {
    class ActorsSpumer {
        constructor(data) {            
            this.src = data.imgPath;
            this.RusName = data.nameRus;
            this.EngName = data.nameEng;
            this.Role = data.name;
            this.parent = document.querySelector('.actorsWindow .actors-area');
        }
        render() {          
            const element = document.createElement('div');
            element.classList.add('actor-item');
            if (this.src == undefined) { this.src = 'universal-actor-icon.svg' }
            element.innerHTML = `
                <img src="images/actors/${this.src}" loading="lazy">
                <div>
                    <div class="position__nameRus">
                        ${this.RusName}
                    </div>
                    <div class="position__nameEng">
                        ${this.EngName}
                    </div>
                    <div class="position__position">
                        ${this.Role}
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    };
    const localMovieID = localStorage.getItem('lastViewed');
    constructComponent('/api/getActorsList', localMovieID, ActorsSpumer);
};
export default actors;