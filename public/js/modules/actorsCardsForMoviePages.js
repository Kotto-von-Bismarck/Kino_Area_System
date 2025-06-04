import constructComponent from "../services/request";

function actors() {

    class ActorsSpumer {
        constructor(data) {            
            this.src = data.imgPath;
            this.RusName = data.nameRus;
            this.EngName = data.nameEng;
            this.Role = data.roleInFilm[0][0];
            this.parent = document.querySelector('.actorsWindow .actors-area');
        }
        render() {          
            const element = document.createElement('div');
            element.classList.add('actor-item');

            if (this.src == undefined) {
                this.src = 'images/actors/universal-actor-icon.svg'
            }

            element.innerHTML = `
                <img src=${this.src}>
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

    const thisFilmPage = document.querySelector('.body'),
          thisFilmName = thisFilmPage.getAttribute('id')
    constructComponent('/api/getActorsList', thisFilmName, ActorsSpumer);
};

export default actors;