import constructComponent from "../services/request";

function studiosContent () {
    class studiosSpumer {
        constructor(data) {
            this.production = data.production ? data.production : 'нет информации';
            this.effects = data.effects ? data.effects : 'нет информации';
            this.dubbing = data.dubbing ? data.dubbing : 'нет информации';
        }
        render() {
            const listCreator = (string) => {
                if (string.match(/[,]/g)) {
                    string = string.split(', ');
                    string = string.map((item, i) => `<span>${i+1}⠀${item}</span>`);
                    string = string.join('');
                    return string
                } else {
                    return `<span>1⠀${string}</span>`
                }
            }
            const parentHTML = document.querySelector('.Studios');

            parentHTML.innerHTML = `
                <div class="movieInfo">
                    <h5 class="movieInfo__title">
                        Производство:
                    </h5>
                    <div class="movieInfo__descr">
                        ${listCreator(this.production)}
                    </div>
                </div>
                <div class="movieInfo">
                    <h5 class="movieInfo__title">
                        Спецэффекты:
                    </h5>
                    <div class="movieInfo__descr">
                        ${listCreator(this.effects)}
                    </div>
                </div>
                <div class="movieInfo">
                    <h5 class="movieInfo__title">
                        Студия дубляжа:
                    </h5>
                    <div class="movieInfo__descr">
                        ${listCreator(this.dubbing)}
                    </div>
                </div>
            `;
        }
    };

    const localMovieID = localStorage.getItem('lastViewed');

    constructComponent('/api/getStudios', localMovieID, studiosSpumer);
};

export default studiosContent;