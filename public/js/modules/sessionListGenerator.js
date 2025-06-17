import MainPageRequest from "../services/MainPageRequests";

function sessionListGenerator() {
    class BookingSeats {
        constructor(data) {
            this.movieID = data.movieID;
            this.poster = data.poster;
            this.title = data.title;
            this.parent = data.parent;
            this.sessionID = data.sessionID;
            this.ageRating = data.ageRating;
            this.seatsPlan = data.seatsPlan;
        }
        render() {
            if (document.querySelector('#userCity')) {
                document.querySelector('#userCity').parentElement.innerHTML=`Забронировать билеты`;
            }

            const element = document.createElement('div');
            element.classList.add('promocodeItem');

            this.seatsPlan = this.seatsPlan.split(';');

            this.seatsPlan = this.seatsPlan.map(item => [+item.slice(1,2), item.slice(-8,-2)]);          

            element.innerHTML = `
                <img class="POSTER_img" src=${this.poster} loading="lazy">
                <div class="promocodeForm">
                    <h2 style="text-align: center">${this.title}</h2>
                    <div class="seatsPlanWindow">
                        <div class="movie-container">
                            <label style="color:#fff" for="movie">Выберите формат:</label>
                            <select id="movie">
                                <option value="190">2D формат</option>
                                <option value="280">3D формат</option>
                            </select>
                        </div>
                        <div class="seatsPlan-wrapper">
                            <div class="screen">
                                <span>Экран</span>
                            </div>

                            <div data-row="1" class="row">
                                <div data-seat="1" class="seat ${this.seatsPlan[0][1]}"></div>
                                <div data-seat="2" class="seat ${this.seatsPlan[1][1]}"></div>
                                <div data-seat="3" class="seat ${this.seatsPlan[2][1]}"></div>
                                <div data-seat="4" class="seat ${this.seatsPlan[3][1]}"></div>
                                <div data-seat="5" class="seat ${this.seatsPlan[4][1]}"></div>
                                <div data-seat="6" class="seat ${this.seatsPlan[5][1]}"></div>
                            </div>

                            <div data-row="2" class="row">
                                <div data-seat="1" class="seat ${this.seatsPlan[6][1]}"></div>
                                <div data-seat="2" class="seat ${this.seatsPlan[7][1]}"></div>
                                <div data-seat="3" class="seat ${this.seatsPlan[8][1]}"></div>
                                <div data-seat="4" class="seat ${this.seatsPlan[9][1]}"></div>
                                <div data-seat="5" class="seat ${this.seatsPlan[10][1]}"></div>
                                <div data-seat="6" class="seat ${this.seatsPlan[11][1]}"></div>
                            </div>

                            <div data-row="3" class="row">
                                <div data-seat="1" class="seat ${this.seatsPlan[12][1]}"></div>
                                <div data-seat="2" class="seat ${this.seatsPlan[13][1]}"></div>
                                <div data-seat="3" class="seat ${this.seatsPlan[14][1]}"></div>
                                <div data-seat="4" class="seat ${this.seatsPlan[15][1]}"></div>
                                <div data-seat="5" class="seat ${this.seatsPlan[16][1]}"></div>
                                <div data-seat="6" class="seat ${this.seatsPlan[17][1]}"></div>
                            </div>

                            <div data-row="4" class="row">
                                <div data-seat="1" class="seat ${this.seatsPlan[18][1]}"></div>
                                <div data-seat="2" class="seat ${this.seatsPlan[19][1]}"></div>
                                <div data-seat="3" class="seat ${this.seatsPlan[20][1]}"></div>
                                <div data-seat="4" class="seat ${this.seatsPlan[21][1]}"></div>
                                <div data-seat="5" class="seat ${this.seatsPlan[22][1]}"></div>
                                <div data-seat="6" class="seat ${this.seatsPlan[23][1]}"></div>
                            </div>

                        </div>
                        <p style="background: none" class="text">Количество мест: <span id="count">0</span> к оплате <span id="total">0</span> рублей</p>
                        <form class="buyTickets" name="buyTickets" action="#">
                            <input required name="session" value="${this.sessionID}" type="text" style="display: none">
                            <input required name="user" type="text" value="${localStorage.getItem('token')}" style="display: none">
                            <button style="display: none" type="submit" id="btn-super">
                                <span>Забронировать билеты</span>
                            </button>
                            <button onclick="location.reload()" type="button">
                                <span>Отмена</span>
                            </button>
                        </form>
                    </div>
                </div>
            `;
            this.parent.innerHTML = '';
            this.parent.append(element);
        }
    };

    class PromocodeItem {
        constructor(data) {
            this.movieID = data.movie;
            this.poster = data.poster;
            this.title = data.title;
            this.parent = data.parent;
        }
        render() {
            if (document.querySelector('#userCity')) {
                document.querySelector('#userCity').parentElement.innerHTML=`Получить промокод для онлайн-кинотеатра`;
            }
            
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
            this.sessionID = data.sessionID;
            this.movieID = data.movieID;
            this.title = data.rusTitle;
            this.ageRating = data.ageRating;
            this.seatsPlan = data.seatsPlan;
            this.time = data.time;
            this.parent = document.querySelector('.profileTicketsBox');
        }
        render() {
            const BuyTicketBTN = document.createElement('button');
            BuyTicketBTN.innerHTML = 'Забронировать билет(ы)';
            BuyTicketBTN.classList.add("rectangle");
            BuyTicketBTN.addEventListener('click', () => {
                new BookingSeats({
                    movieID: this.movieID,
                    sessionID: this.sessionID,
                    ageRating: this.ageRating,
                    seatsPlan: this.seatsPlan,
                    poster: this.src,
                    title: this.title,
                    parent: this.parent,
                }).render()
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
                        ${this.ageRating}
                    </span>
                    <span class="position__position" style="font-size:">                        
                        Время начала: ${this.time}
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

    MainPageRequest('/api/getSessions', SessionListGenerator);
    document.querySelector('#sessionBTN').addEventListener('click', () => {
        document.querySelector('.profileTicketsBox').innerHTML="<div></div>";
        MainPageRequest('/api/getSessions', SessionListGenerator);
        
        const seatsIntervalCheck = setInterval(() => {            
            if (document.querySelector('.seat')) {
                const container = document.querySelector('.seatsPlan-wrapper');
                const seats = document.querySelectorAll('.row .seat:not(.occupd)');
                const count = document.getElementById('count');
                const total = document.getElementById('total');
                const movieSelect = document.getElementById('movie');

                let ticketPrice = +movieSelect.value;
                
                const buyTicketsForm = document.forms.buyTickets;

                // Update total and count
                function updateSelectedCount() {
                    const selectedSeats = document.querySelectorAll('.row .seat.selected');
                    
                    const selectedSeatsCount = selectedSeats.length;
                    
                    count.innerText = selectedSeatsCount;
                    total.innerText = selectedSeatsCount * ticketPrice;

                    if (!buyTicketsForm.price) {
                        const sumInput = document.createElement('input');
                        sumInput.setAttribute('name', `price`);
                        sumInput.setAttribute('value', `${selectedSeatsCount * ticketPrice}, ${selectedSeatsCount}`);
                        sumInput.style.display = 'none';
                        buyTicketsForm.append(sumInput);
                    } else {
                        buyTicketsForm.price.setAttribute('value', `${selectedSeatsCount * ticketPrice}, ${selectedSeatsCount}`);
                    }
                }

                // Movie select event
                movieSelect.addEventListener('change', e => {
                    ticketPrice = +e.target.value;
                    updateSelectedCount();
                });

                document.querySelector('#btn-super').addEventListener('click', (e) => {
                    e.preventDefault();
                    const bookingOBJ = {
                        sessionID: buyTicketsForm.session.value,
                        userToken: buyTicketsForm.user.value,
                        seats: buyTicketsForm.seat.value,
                        price: buyTicketsForm.price.value,
                        format: document.querySelector('#movie').value
                    };
                    
                    MainPageRequest('/api/bookingTickets', bookingOBJ);
                })

                // Seat click event
                container.addEventListener('click', e => {
                    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupd')) {
                        if (!e.target.classList.contains('selected')) {
                            e.target.classList.add('selected');
                            e.target.style.pointerEvents = 'none';
                        }

                        document.querySelector('#btn-super').style.display="flex";

                        if (!buyTicketsForm.seat) {
                            const seatsInput = document.createElement('input');
                            seatsInput.setAttribute('name', `seat`);
                            seatsInput.setAttribute('value', `seat: ${e.target.dataset.seat}, row: ${e.target.parentElement.dataset.row};`);
                            seatsInput.style.display = 'none';
                            buyTicketsForm.append(seatsInput);
                        } else {
                            buyTicketsForm.seat.setAttribute('value', `${buyTicketsForm.seat.value} seat: ${e.target.dataset.seat}, row: ${e.target.parentElement.dataset.row};`);
                        }
                        
                        updateSelectedCount();
                    }
                });
                clearInterval(seatsIntervalCheck);
            }
        }, 1000)
    });
};

export default sessionListGenerator;