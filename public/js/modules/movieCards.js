import MainPageRequest from "../services/MainPageRequests";

function movieCards() {
    class MovieCard {
        constructor(data) {
            this.src = data.primaryPoster;
            this.movieID = data.movieID;
            this.mark = parseFloat(data.markMZ).toFixed(2);
            this.title = data.rusTitle;
            this.genre = data.genre;
            this.year = data.year;
            this.parent = document.querySelector(data.parentHTML);
        }
        render() {
            const element = document.createElement('div');
            if (!this.movieID) {
                this.movieID = '404-page'
            }
            element.classList.add(`cardItem`);

            // painting items

            if (this.mark > 0 && this.mark <= 1) {
                this.markItem = '1.svg';
            } else if (this.mark > 1 && this.mark <= 2) {
                this.markItem = '2.svg';
            } else if (this.mark > 2 && this.mark <= 3) {
                this.markItem = '3.svg';
            } else if (this.mark > 3 && this.mark <= 4) {
                this.markItem = '4.svg';
            } else if (this.mark > 4 && this.mark <= 5) {
                this.markItem = '5.svg';
            } else if (this.mark > 5 && this.mark <= 6) {
                this.markItem = '6.svg';
            } else if (this.mark > 6 && this.mark <= 7) {
                this.markItem = '7.svg';
            } else if (this.mark > 7 && this.mark <= 8) {
                this.markItem = '8.svg';
            } else if (this.mark > 8 && this.mark <= 9) {
                this.markItem = '9.svg';
            } else if (this.mark > 9) {
                this.markItem = '10.svg';
            } 

            // detection of the genre
            const genres = this.genre.toLowerCase().split(', '),
                  genreType = [];            

            genres.forEach(item => {
                switch (item) {
                    case 'триллер': genreType.push('thriller')
                        break;
                    case 'драма': genreType.push('drama')
                        break;
                    case 'криминал': genreType.push('crime')
                        break;
                    case 'фантастика': genreType.push('fantastic')
                        break;
                    case 'фэнтези': genreType.push('fantasy')
                        break;
                    case 'боевик': genreType.push('actionmovie')
                        break;
                    case 'приключения': genreType.push('adventures')
                        break;
                    case 'приключение': genreType.push('adventures')
                        break;
                    case 'комедия': genreType.push('comedy')
                        break;
                    case 'биография': genreType.push('biography')
                        break;
                    case 'спорт': genreType.push('sport')
                        break;
                    case 'мультфильм': genreType.push('cartoon')
                        break;
                    case 'ужасы': genreType.push('horror')
                        break;
                    case 'вестерн': genreType.push('western')
                        break;
                }
            })

            this.genreType = genreType.join(' ');

            const redirectBTN = document.createElement('button');
            redirectBTN.innerHTML = '<span>Узнать больше</span>';
            redirectBTN.classList.add("cardItem__rectangle");
            redirectBTN.addEventListener('click', () => {
                localStorage.setItem('lastViewed', this.movieID);
                if (this.movieID == '404-page') {
                    location.href = '404-page.html'
                } else {
                    location.href = 'movie-page.html'
                }
            })
            
            element.innerHTML = `
                <div class="cardItem__imageBox">
                    <div class="cardItem__markItem">
                        <img src="icons/moviePagesMarks/${this.markItem}">
                        <span>${this.mark}</span>
                    </div>
                    <img src=${this.src} loading="lazy" class="cardItem__image">
                </div>
                <h4 class="cardItem__movieTitle ${this.year}">
                    ${this.title}
                </h4>
                <h6 class="cardItem__movieGanre ${this.genreType}">
                    ${this.genre}
                </h6>
            `;
            element.firstElementChild.append(redirectBTN);
            this.parent.append(element);

        }
    }

    // cinemaNow

    MainPageRequest('/api/getTrends', MovieCard);

    // popular

    new MovieCard({
        primaryPoster: 'images/popular/forrest-gump.png',
        markMZ: '8.91',
        rusTitle: 'Форрест Гамп',
        genre: 'Драма, комедия, мелодрама, история, военный',
        parentHTML: '.popular .movieCards',
        year: '1994'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/onece-upon-a-time-in-Hollywood.png',
        markMZ: '7.7',
        rusTitle: 'Однажды в… Голливуде',
        genre: 'Драма, комедия',
        parentHTML: '.popular .movieCards',
        year: '2019'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/hacksaw-ridge.png',
        markMZ: '8.2',
        rusTitle: 'По соображениям совести',
        genre: 'Биография, драма,  боевик',
        parentHTML: '.popular .movieCards',
        year: '2016'
    }).render();

    new MovieCard({
        primaryPoster: 'images/filmPosters/inglouriousbasterds.png',
        movieID: 'c413f28c-d318-4501-b5e7-4621fdb0c273',
        markMZ: '8',
        rusTitle: 'Бесславные ублюдки',
        genre: 'Драма, военный, комедия, боевик',
        parentHTML: '.popular .movieCards',
        year: '2009'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/jurassic-world.png',
        markMZ: '6.94',
        rusTitle: 'Мир Юрского Периода',
        genre: 'Фантастика, приключения, боевик',
        parentHTML: '.popular .movieCards',
        year: '2015'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/it.png',
        markMZ: '7.34',
        rusTitle: 'Оно',
        genre: 'Детектив, драма, фэнтези, ужасы',
        parentHTML: '.popular .movieCards',
        year: '2017'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/venom.png',
        markMZ: '6.91',
        rusTitle: 'Веном',
        genre: 'Ужасы, триллер, боевик, фантастика',
        parentHTML: '.popular .movieCards',
        year: '2018'
    }).render();
    
    new MovieCard({
        primaryPoster: 'images/filmPosters/joker.png',
        movieID: 'f0285eaa-1b88-427b-8e3f-0a9d9c80d7fe',
        markMZ: '8.5',
        rusTitle: 'Джокер',
        genre: 'Триллер, драма, криминал',
        parentHTML: '.popular .movieCards',
        year: '2019'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/toy-story.png',
        markMZ: '7.8',
        rusTitle: 'История игрушек 4',
        genre: 'Мультфильм, фэнтези, комедия, приключения',
        parentHTML: '.popular .movieCards',
        year: '2019'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/Midsommar.png',
        markMZ: '7.1',
        rusTitle: 'Солнцестояние',
        genre: 'Ужасы, триллер, драма',
        parentHTML: '.popular .movieCards',
        year: '2019'
    }).render();
    
    new MovieCard({
        primaryPoster: 'images/filmPosters/django.png',
        movieID: '2208374b-5297-4c21-ae20-f6f67960b06d',
        markMZ: '8.2',
        rusTitle: 'Джанго освобождённый',
        genre: 'Вестерн, комедия, драма, боевик',
        parentHTML: '.popular .movieCards',
        year: '2012'
    }).render();

    new MovieCard({
        primaryPoster: 'images/filmPosters/bonetamagafk.png',
        markMZ: '6.9',
        rusTitle: 'Костяной томагавк',
        genre: 'Вестерн, ужасы',
        parentHTML: '.popular .movieCards',
        year: '2015'
    }).render();

    new MovieCard({
        primaryPoster: 'images/filmPosters/paddington.png',
        markMZ: '8.1',
        rusTitle: 'Приключения Паддингтона 2',
        genre: 'Фентези, комедия, приключения',
        parentHTML: '.popular .movieCards',
        year: '2017'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/velikan.png',
        markMZ: '6.1',
        rusTitle: 'Большой и добрый великан',
        genre: 'Фентези, приключения',
        parentHTML: '.popular .movieCards',
        year: '2016'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/macdack.png',
        markMZ: '7.6',
        rusTitle: 'Основатель',
        genre: 'Биография, драма',
        parentHTML: '.popular .movieCards',
        year: '2016'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/deadpool.png',
        markMZ: '7.6',
        rusTitle: 'Дэдпул',
        genre: 'Боевик, комедия',
        parentHTML: '.popular .movieCards',
        year: '2016'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/bro.png',
        markMZ: '8.32',
        rusTitle: 'Брат',
        genre: 'Драма, боевик',
        parentHTML: '.popular .movieCards',
        year: '1997'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/visit.png',
        markMZ: '6.21',
        rusTitle: 'Визит',
        genre: 'Ужасы',
        parentHTML: '.popular .movieCards',
        year: '2015'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/krampus.png',
        markMZ: '5.8',
        rusTitle: 'Крампус',
        genre: 'Ужасы, фэнтези, комедия',
        parentHTML: '.popular .movieCards',
        year: '2015'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/goosebumps.png',
        markMZ: '6.24',
        rusTitle: 'Ужастики',
        genre: 'Приключения, комедия, фэнтези',
        parentHTML: '.popular .movieCards',
        year: '2015'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/earth.png',
        markMZ: '8.9',
        rusTitle: 'Земля: Один потрясающий день',
        genre: 'Документальный, семейный',
        parentHTML: '.popular .movieCards',
        year: '2017'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/coco.png',
        markMZ: '8.7',
        rusTitle: 'Тайна Коко',
        genre: 'Фэнтези, комедия, приключения, семейный',
        parentHTML: '.popular .movieCards',
        year: '2017'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/van-gogh.png',
        markMZ: '8.2',
        rusTitle: 'Ван Гог. С любовью Винсент',
        genre: 'Биография, драма, преступление',
        parentHTML: '.popular .movieCards',
        year: '2017'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/goosebumps-2.png',
        markMZ: '6.04',
        rusTitle: 'Ужастики 2',
        genre: 'Фэнтези, комедия, приключения',
        parentHTML: '.popular .movieCards',
        year: '2018'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/house-that-jack-built.png',
        markMZ: '7.02',
        rusTitle: 'Дом, который построил Джек',
        genre: 'Триллер, драма, преступление, ужасы',
        parentHTML: '.popular .movieCards',
        year: '2018'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/hugo.png',
        markMZ: '8.1',
        rusTitle: 'Кузя и семейка троллей',
        genre: 'Мультфильм, семейный',
        parentHTML: '.popular .movieCards',
        year: '2018'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/maigret.png',
        markMZ: '7.12',
        rusTitle: 'Мегрэ: Ночь на перекрёстке',
        genre: 'Драма, преступление, детектив',
        parentHTML: '.popular .movieCards',
        year: '2017'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/klaus.png',
        markMZ: '8.72',
        rusTitle: 'Клаус',
        genre: 'Семейный, приключения',
        parentHTML: '.popular .movieCards',
        year: '2019'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/lion-the-king.png',
        markMZ: '7.2',
        rusTitle: 'Король лев',
        genre: 'Семейный, приключения',
        parentHTML: '.popular .movieCards',
        year: '2019'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/greenland.png',
        markMZ: '6.8',
        rusTitle: 'Гренландия',
        genre: 'Боевик, драма',
        parentHTML: '.popular .movieCards',
        year: '2020'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/wolfs-legend.png',
        markMZ: '8.2',
        rusTitle: 'Легенда о волках',
        genre: 'Приключения, семейный',
        parentHTML: '.popular .movieCards',
        year: '2020'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/druk.png',
        movieID: '03b2e6dd-0f34-4c97-9748-7c2ea0a07ce6',
        markMZ: '7.6',
        rusTitle: 'Ещё по одной',
        genre: 'Драма, комедия',
        parentHTML: '.popular .movieCards',
        year: '2020'
    }).render();

    new MovieCard({
        primaryPoster: 'images/popular/alita.png',
        markMZ: '7.22',
        rusTitle: 'Алита: боевой ангел',
        genre: 'Боевик, фантастика',
        parentHTML: '.popular .movieCards',
        year: '2019'
    }).render();

    new MovieCard({
        primaryPoster: 'images/filmPosters/escape.png',
        movieID: '12249b49-a322-4502-b118-e9154fe7733e',
        markMZ: '6.7',
        rusTitle: 'Побег из Претории',
        genre: 'Триллер',
        parentHTML: '.popular .movieCards',
        year: '2020'
    }).render();
};

export default movieCards;