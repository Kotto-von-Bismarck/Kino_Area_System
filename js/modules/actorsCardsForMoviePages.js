import constructComponent from "../services/request";

function actors() {

    class ActorsSpumer {
        constructor(data) {
            this.src = data.src;
            this.RusName = data.RusName;
            this.EngName = data.EngName;
            this.Role = data.Role;
            this.parent = document.querySelector('.actorsWindow .actors-area');
        }
        render() {
            const element = document.createElement('div');
            element.classList.add('actor-item');

            if (this.src == undefined) {
                this.src = 'images/actors/universal-actor-icon.png'
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
    constructComponent('http://localhost:3000/actorsCardsData', ActorsSpumer);
};

export default actors;