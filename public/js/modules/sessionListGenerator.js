import MainPageRequest from "../services/MainPageRequests";

function sessionListGenerator() {
    class PromocodeItem {
        constructor(data) {
            this.movieID = data.movie;
            this.poster = data.poster;
            this.title = data.title;
            this.parent = data.parent;
        }
        render() {
            document.querySelector('#userCity').parentElement.innerHTML=`Получить промокод для онлайн-кинотеатра`;

            function makePromocode(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }

            const promocodeBTN = document.createElement('button');
            promocodeBTN.innerHTML = 'Генерировать промокод';
            promocodeBTN.classList.add("rectangle");
            promocodeBTN.addEventListener('click', () => {
                document.querySelector('#promocodeValue').innerHTML = `${makePromocode(10)}`;
            })
            const redirectBTN = document.createElement('button');
            redirectBTN.innerHTML = 'Перейти в онлайн кинотеатр для оплаты';
            redirectBTN.classList.add("rectangle");
            redirectBTN.addEventListener('click', () => {
                location.href = document.querySelector('.selectCinema').value
            })
            const element = document.createElement('div');
            element.classList.add('promocodeItem');

            element.innerHTML = `
                <img src=${this.poster} loading="lazy">
                <div class="promocodeForm">
                    <h2>${this.title}</h2>
                    <div class="search__movieDescr">
                        <span class="position__nameEng">
                            Для разового просмотра кинокартины: выберете желаемый онлайн-кинотеатр, сгенерируйте и скопируйте промокод, оплатите промокод на выбранной площадке. Приятного просмотра!
                        </span>
                    </div>
                    <select class="selectCinema" name="cinema">
                        <option value="https://hd.kinopoisk.ru/">Кинопоиск</option>
                        <option value="https://kion.ru/">Кион</option>
                        <option value="https://www.ivi.ru/">Иви</option>
                        <option value="https://wink.ru/">Wink</option>
                    </select>
                    <div class="dtn-special-section">
                        <p id="promocodeValue">ваш промокод</p>
                    </div>
                </div>
            `;
            element.lastElementChild.lastElementChild.append(promocodeBTN);
            element.lastElementChild.lastElementChild.append(redirectBTN);
            this.parent.innerHTML = '';
            this.parent.append(element);
        }
    };

    class SessionListGenerator {
        constructor(data) {
            this.src = data.primaryPoster;
            this.movieID = data.movieID;
            this.title = data.rusTitle;
            this.genre = data.genre;
            this.parent = document.querySelector('.profileTicketsBox');
        }
        render() {
            const BuyTicketBTN = document.createElement('button');
            BuyTicketBTN.innerHTML = 'Забронировать билет(ы)';
            BuyTicketBTN.classList.add("rectangle");
            BuyTicketBTN.addEventListener('click', () => {
                console.log(this.movieID);
                console.log('Ticket');
            })
            const BuyCodeBTN = document.createElement('button');
            BuyCodeBTN.innerHTML = 'Получить промокод';
            BuyCodeBTN.classList.add("rectangle");
            BuyCodeBTN.addEventListener('click', () => {
                new PromocodeItem({
                    movie: this.movieID,
                    poster: this.src,
                    title: this.title,
                    parent: this.parent
                }).render()
            })
            const element = document.createElement('div');
            element.classList.add('search__item');

            element.innerHTML = `
                <img src=${this.src} style="max-height: 150px" loading="lazy">
                <div class="search__movieDescr">
                    <span class="position__nameRus">
                        ${this.title}
                    </span>
                    <span class="position__nameEng">
                        ${'18+'}
                    </span>
                    <span class="position__position" style="font-size:">                        
                        ${'18.06'} | ${'21:00'}
                    </span>
                </div>
                <div class="dtn-special-section"> </div>
            `;
            element.lastElementChild.append(BuyTicketBTN);
            element.lastElementChild.append(BuyCodeBTN);
            this.parent.append(element);
            
            if (document.querySelector('#ticketsLoading')) {
                const DIVelem = document.createElement('div');
                document.querySelector('#ticketsLoading').replaceWith(DIVelem);
            }
        }
    };

    MainPageRequest('/api/getTrends', SessionListGenerator);
};

export default sessionListGenerator;