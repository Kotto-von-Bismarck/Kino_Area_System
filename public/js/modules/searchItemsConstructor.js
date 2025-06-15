function searchItems() {
    
    // Элементы поиска

    class searchItems {
        constructor(data) {
            this.img = data.img;
            this.titlerus = data.titlerus;
            this.titleeng = data.titleeng;
            this.genres = data.genres;
            this.mark = parseFloat(data.mark).toFixed(2);
            this.url = data.url;
            this.parent = data.parentSelector;
        }
        searchItemsConstruct() {
            const element = document.createElement('div');
            if (this.img === undefined) {
                this.img = "images/searchItems/defaultSearchItemImg.svg"
            }
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

            element.addEventListener('click', () => {
                localStorage.setItem('lastViewed', this.url);
                if (this.url == '#') {
                    location.href = '404-page.html'
                } else {
                    location.href = 'movie-page.html'
                }
            })

            element.innerHTML = `
                <img src=${this.img} loading="lazy">
                <div class="search__movieDescr">
                    <span class="position__nameRus">
                        ${this.titlerus}
                    </span>
                    <span class="position__nameEng">
                        ${this.titleeng}
                    </span>
                    <span class="position__position">
                        ${this.genres}
                    </span>
                </div>
                <div class="mark">
                    <img src="icons/moviePagesMarks/oldVer/${this.markItem}">
                    <span>${this.mark}</span>
                </div>
            `;
            this.parent.append(element);
            element.classList.add('search__item', 'hide');
        }
    };

    new searchItems({
        img: 'images/filmPosters/escape.png', 
        url: '12249b49-a322-4502-b118-e9154fe7733e', 
        titlerus: 'Побег из Претории', 
        titleeng: 'Escape from Pretoria', 
        genres: 'Триллер', 
        mark: '6.7', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/joker.png', 
        url: 'f0285eaa-1b88-427b-8e3f-0a9d9c80d7fe', 
        titlerus: 'Джокер', 
        titleeng: 'Joker', 
        genres: 'Триллер, драма, криминал', 
        mark: '8.5', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/star-wars.png', 
        url: '1353f720-7c58-4f2f-9326-8930af3d874e', 
        titlerus: 'Звёздные войны: Скайуокер. Восход', 
        titleeng: 'Star Wars: The Rise of Skywalker', 
        genres: 'Фантастика, фэнтези, боевик, приключения', 
        mark: '6.7', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/gents.png', 
        url: '5844f0b4-a9b6-4edd-9e92-de9df2747be5', 
        titlerus: 'Джентльмены', 
        titleeng: 'The Gentlemen', 
        genres: 'Боевик, комедия, криминал', 
        mark: '8', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/ford-vs-ferrari.png', 
        url: 'e012c688-e3d1-4e23-8871-6387d9f6a1ee',  
        titlerus: 'Ford против Ferrari', 
        titleeng: 'Ford vs Ferrari', 
        genres: 'Биография, спорт, драма, боевик', 
        mark: '8.1', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/3022.png', 
        url: '239dc840-396c-41f2-89f1-a95bce35861e',  
        titlerus: '3022', 
        titleeng: '3022', 
        genres: 'Фантастика, триллер', 
        mark: '4.9', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/chickens.png', 
        url: '#', 
        titlerus: 'Хищные птицы: Потрясающая история Харли Квинн', 
        titleeng: 'Birds of Prey', 
        genres: 'Боевик, криминал, комедия', 
        mark: '6.2', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/bad-guys.png', 
        url: '#', 
        titlerus: 'Плохие парни навсегда', 
        titleeng: 'Bad Boys for Life', 
        genres: 'Боевик, криминал, комедия', 
        mark: '6.9', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/forrest-gump.png', 
        url: '#', 
        titlerus: 'Форрест Гамп', 
        titleeng: 'Forrest Gump', 
        genres: 'Драма, комедия, мелодрама, история, военный', 
        mark: '8.91', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/onece-upon-a-time-in-Hollywood.png', 
        url: '#', 
        titlerus: 'Однажды в… Голливуде', 
        titleeng: 'Once Upon a Time in... Hollywood', 
        genres: 'Драма, комедия', 
        mark: '7.7', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/hacksaw-ridge.png', 
        url: '#', 
        titlerus: 'По соображениям совести', 
        titleeng: 'Hacksaw Ridge', 
        genres: 'Биография, драма,  боевик', 
        mark: '8.2', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/inglouriousbasterds.png', 
        url: 'c413f28c-d318-4501-b5e7-4621fdb0c273', 
        titlerus: 'Бесславные ублюдки', 
        titleeng: 'Inglourious Basterds', 
        genres: 'Драма, военный, комедия, боевик', 
        mark: '8', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/jurassic-world.png', 
        url: '#', 
        titlerus: 'Мир Юрского Периода', 
        titleeng: 'Jurassic World', 
        genres: 'Фантастика, приключения, боевик', 
        mark: '6.94', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/it.png', 
        url: '#', 
        titlerus: 'Оно', 
        titleeng: 'It', 
        genres: 'Детектив, драма, фэнтези, ужасы', 
        mark: '7.34', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/venom.png', 
        url: '#', 
        titlerus: 'Веном', 
        titleeng: 'Venom', 
        genres: 'Ужасы, триллер, боевик, фантастика', 
        mark: '6.91', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/toy-story.png', 
        url: '#', 
        titlerus: 'История игрушек 4', 
        titleeng: 'Toy Story 4', 
        genres: 'Мультфильм, фэнтези, комедия, приключения', 
        mark: '7.8', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/Midsommar.png', 
        url: '#', 
        titlerus: 'Солнцестояние', 
        titleeng: 'Midsommar', 
        genres: 'Ужасы, триллер, драма', 
        mark: '7.1', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/django.png', 
        url: '2208374b-5297-4c21-ae20-f6f67960b06d', 
        titlerus: 'Джанго освобождённый', 
        titleeng: 'Django Unchained', 
        genres: 'Вестерн, комедия, драма, боевик', 
        mark: '8.2', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/bonetamagafk.png', 
        url: '#', 
        titlerus: 'Костяной томагавк', 
        titleeng: 'Bone Tomahawk', 
        genres: 'Вестерн, ужасы', 
        mark: '6.9', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/filmPosters/paddington.png', 
        url: '#', 
        titlerus: 'Приключения Паддингтона 2', 
        titleeng: 'Paddington 2', 
        genres: 'Фентези, комедия, приключения', 
        mark: '8.1', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/velikan.png', 
        url: '#', 
        titlerus: 'Большой и добрый великан', 
        titleeng: 'The BFG', 
        genres: 'Фентези, приключения', 
        mark: '6.1', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/macdack.png', 
        url: '#', 
        titlerus: 'Основатель', 
        titleeng: 'The Founder', 
        genres: 'Биография, драма', 
        mark: '7.6', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/deadpool.png', 
        url: '#', 
        titlerus: 'Дэдпул', 
        titleeng: 'Deadpool', 
        genres: 'Боевик, комедия', 
        mark: '7.6', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/bro.png', 
        url: '#', 
        titlerus: 'Брат', 
        titleeng: 'Brother', 
        genres: 'Драма, боевик', 
        mark: '8.32', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/visit.png', 
        url: '#', 
        titlerus: 'Визит', 
        titleeng: 'The visit', 
        genres: 'Ужасы', 
        mark: '6.21', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/krampus.png', 
        url: '#', 
        titlerus: 'Крампус', 
        titleeng: 'Krampus', 
        genres: 'Ужасы, фэнтези, комедия', 
        mark: '5.8', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/goosebumps.png', 
        url: '#', 
        titlerus: 'Ужастики', 
        titleeng: 'Goosebumps', 
        genres: 'Приключения, комедия, фэнтези', 
        mark: '6.24', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/earth.png', 
        url: '#', 
        titlerus: 'Земля: Один потрясающий день', 
        titleeng: 'Earth: One Amazing Day', 
        genres: 'Документальный, семейный', 
        mark: '8.9', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/coco.png', 
        url: '#', 
        titlerus: 'Тайна Коко', 
        titleeng: 'Coco', 
        genres: 'Фэнтези, комедия, приключения, семейный', 
        mark: '8.7', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/van-gogh.png', 
        url: '#', 
        titlerus: 'Ван Гог. С любовью Винсент', 
        titleeng: 'Loving Vincent', 
        genres: 'Биография, драма, преступление', 
        mark: '8.2', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/goosebumps-2.png', 
        url: '#', 
        titlerus: 'Ужастики 2', 
        titleeng: 'Goosebumps 2', 
        genres: 'Приключения, комедия, фэнтези', 
        mark: '6.04', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/house-that-jack-built.png', 
        url: '#', 
        titlerus: 'Дом, который построил Джек', 
        titleeng: 'House that Jack built', 
        genres: 'Триллер, драма, преступление, ужасы', 
        mark: '7.02', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/hugo.png', 
        url: '#', 
        titlerus: 'Кузя и семейка троллей', 
        titleeng: 'Hugo', 
        genres: 'Мультфильм, семейный', 
        mark: '8.1', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/maigret.png', 
        url: '#', 
        titlerus: 'Мегрэ: Ночь на перекрёстке', 
        titleeng: 'Maigret: Night at the Crossroads', 
        genres: 'Драма, преступление, детектив', 
        mark: '7.12', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/klaus.png', 
        url: '#', 
        titlerus: 'Клаус', 
        titleeng: 'Klaus', 
        genres: 'Семейный, приключения', 
        mark: '8.72', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/lion-the-king.png', 
        url: '#', 
        titlerus: 'Король лев', 
        titleeng: 'The Lion King', 
        genres: 'Семейный, приключения', 
        mark: '7.2', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/greenland.png', 
        url: '#', 
        titlerus: 'Гренландия', 
        titleeng: 'Greenland', 
        genres: 'боевик, драма', 
        mark: '6.8', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/wolfs-legend.png', 
        url: '#', 
        titlerus: 'Легенда о волках', 
        titleeng: 'WolfWalkers', 
        genres: 'Приключения, семейный', 
        mark: '8.2', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/druk.png', 
        url: '03b2e6dd-0f34-4c97-9748-7c2ea0a07ce6', 
        titlerus: 'Ещё по одной', 
        titleeng: 'Druk', 
        genres: 'Драма, комедия', 
        mark: '7.6', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();

    new searchItems({
        img: 'images/popular/alita.png', 
        url: '#', 
        titlerus: 'Алита: боевой ангел', 
        titleeng: 'Alita: Battle Angel', 
        genres: 'Боевик, фантастика', 
        mark: '7.22', 
        parentSelector: document.querySelector('.search').querySelector('.search__varList')
    }).searchItemsConstruct();
};

export default searchItems;