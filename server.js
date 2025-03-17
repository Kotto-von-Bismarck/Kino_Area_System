import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";
// import jwt from 'jsonwebtoken';

// import http from "http";
// import path from "path";

// import {fileURLToPath} from 'url';

// import fs from "fs";
// import multer from "multer";

const app = express();

// const httpServer = http.createServer(app);
// const PORT = process.env.PORT;

// httpServer.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });
// const __filename = fileURLToPath(import.meta.url),
//       __dirname = path.dirname(__filename);

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "public/contentDB.sqlite",
});

try {
    await sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
}

// const handleError = (err, res) => {
//   res
//     .status(500)
//     .contentType("text/plain")
//     .end("Oops! Something went wrong!");
// };

// const upload = multer({
//   dest: "/public/img/uploadedPrImg"
// });

// const CatalogItem = sequelize.define(
//     'CatalogItem',
//     {
//         catalogItemID: { 
//             allowNull: false,
//             primaryKey: true,
//             type: DataTypes.UUID,
//             defaultValue: Sequelize.UUIDV4
//         },
//         image: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         category: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         price: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//         description: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     },
//     {
//       freezeTableName: true,
//     }
// )

// const actorsCardsData = [
//     {
//     src: "images/actors/escape-from-pretoria/DanielRadcliffe.png",
//     rusName: "Дэниэл Рэдклифф",
//     engName: "Daniel Radcliffe",
//     roleInFilm: "Тим Дженкин, Побег из Претории;"
//     },
//     {
//     src: "images/actors/escape-from-pretoria/DanielWebber.png",
//     rusName: "Даниэль Уэббер",
//     engName: "Daniel Webber",
//     roleInFilm: "Стивен Ли, Побег из Претории;"
//     },
//     {
//     src: "images/actors/escape-from-pretoria/IanHart.png",
//     rusName: "Иэн Харт",
//     engName: "Ian Hart",
//     roleInFilm: "Денис Гольдберг, Побег из Претории;"
//     },
//     {
//     src: "images/actors/escape-from-pretoria/MarkLeonardWinter.png",
//     rusName: "Марк Леонард Винтер",
//     engName: "Mark Leonard Winter",
//     roleInFilm: "Леонард Фонтейн, Побег из Претории;"
//     },
//     {
//     src: "images/actors/escape-from-pretoria/NathanPage.png",
//     rusName: "Нэйтан Пейдж",
//     engName: "Nathan Page",
//     roleInFilm: "Монго, Побег из Претории;"
//     },
//     {
//     src: "images/actors/escape-from-pretoria/RatidzoMambo.png",
//     rusName: "Ратидзо Мамбо",
//     engName: "Ratidzo Mambo",
//     roleInFilm: "Женщина, Побег из Претории;"
//     },
//     {
//     src: "images/actors/escape-from-pretoria/JeanetteCronin.png",
//     rusName: "Жанетт Кронин",
//     engName: "Jeanette Cronin",
//     roleInFilm: "Женщина, Побег из Претории;"
//     },
//     {
//     src: "images/actors/escape-from-pretoria/AdamTuominen.png",
//     rusName: "Адам Туоминен",
//     engName: "Adam Tuominen",
//     roleInFilm: "Джереми Кронин, Побег из Претории;"
//     },
//     {
//     src: "images/actors/escape-from-pretoria/AdamOvadia.png",
//     rusName: "Адам Овадия",
//     engName: "Adam Ovadia",
//     roleInFilm: "Ван Задельхофф, Побег из Претории;"
//     },
//     {
//     src: "images/actors/escape-from-pretoria/StephenHunter.png",
//     rusName: "Стивен Хантер",
//     engName: "Stephen Hunter",
//     roleInFilm: "Мужчина, Побег из Претории;"
//     },

//     {
//     src: "images/actors/joker/hoakin-fenicks.png",
//     rusName: "Хоакин Феникс",
//     engName: "Joaquin Phoenix",
//     roleInFilm: "Артур Флек, Джокер;"
//     },
//     {
//     src: "images/actors/joker/robert-de-niro.png",
//     rusName: "Роберт Де Ниро",
//     engName: "Robert De Niro",
//     roleInFilm: "Мюррей Франклин, Джокер;"
//     },
//     {
//     src: "images/actors/joker/zazi-bitz.png",
//     rusName: "Зази Битц",
//     engName: "Zazi Bitz",
//     roleInFilm: "Софи Дюмон, Джокер;"
//     },
//     {
//     src: "images/actors/joker/rensis-konroi.png",
//     rusName: "Фрэнсис Конрой",
//     engName: "Frensis Konroi",
//     roleInFilm: "Пенни Флек (мать Артура), Джокер;"
//     },
//     {
//     src: "images/actors/joker/brett-kallen.png",
//     rusName: "Бретт Каллен",
//     engName: "Brett Kallen",
//     roleInFilm: "Томас Уэйн, Джокер;"
//     },
//     {
//     src: "images/actors/joker/shei-uigem.png",
//     rusName: "Шей Уигэм",
//     engName: "Shei Uigem",
//     roleInFilm: "детектив Берк, Джокер;"
//     },
//     {
//     src: "images/actors/joker/bill-kemp.png",
//     rusName: "Билл Кэмп",
//     engName: "Bill Kemp",
//     roleInFilm: "детектив Гаррити, Джокер;"
//     },
//     {
//     src: "images/actors/joker/glenn-flesher.png",
//     rusName: "Гленн Флешлер",
//     engName: "Glenn Flesher",
//     roleInFilm: "Рэндалл, Джокер;"
//     },
//     {
//     src: "images/actors/joker/josh-peis.png",
//     rusName: "Джош Пэйс",
//     engName: "Josh Peis",
//     roleInFilm: "Хойт Вон, Джокер;"
//     },
//     {
//     src: "images/actors/joker/li-gill.png",
//     rusName: "Ли Гилл",
//     engName: "Li Gill",
//     roleInFilm: "Гари, Джокер;"
//     },
    
//     {
//     src: "images/actors/star-wars/adam-driver.png",
//     rusName: "Адам Драйвер",
//     engName: "Adam Driver",
//     roleInFilm: "Кайло Рен, Звёздные войны: Скайуокер Восход;"
//     },
//     {
//     src: "images/actors/star-wars/daisy-ridly.png",
//     rusName: "Дейзи Ридли",
//     engName: "Daisy Ridley",
//     roleInFilm: "Рей, Звёздные войны: Скайуокер Восход;"
//     },
//     {
//     src: "images/actors/star-wars/carrie-fisher.png",
//     rusName: "Кэрри Фишер",
//     engName: "Carrie Fisher",
//     roleInFilm: "Лея Органа, Звёздные войны: Скайуокер Восход;"
//     },
//     {
//     src: "images/actors/star-wars/donal-gilson.png",
//     rusName: "Донал Глисон",
//     engName: "Domhnall Gleeson",
//     roleInFilm: "генерал Армитаж Хакс, Звёздные войны: Скайуокер Восход;"
//     },
//     {
//     src: "images/actors/star-wars/mark-hamill.png",
//     rusName: "Марк Хэмилл",
//     engName: "Mark Hamill",
//     roleInFilm: "Люк Скайуокер, Звёздные войны: Скайуокер Восход;"
//     },
//     {
//     src: "images/actors/star-wars/john-boega.png",
//     rusName: "Джон Бойега",
//     engName: "John Boyega",
//     roleInFilm: "Финн, Звёздные войны: Скайуокер Восход;"
//     },
//     {
//     src: "images/actors/star-wars/entony-daniels.png",
//     rusName: "Энтони Дэниелс",
//     engName: "Anthony Daniels",
//     roleInFilm: "C-3PO, Звёздные войны: Скайуокер Восход;"
//     },
//     {
//     src: "images/actors/star-wars/naomy-aki.png",
//     rusName: "Наоми Аки",
//     engName: "Naomi Ackie",
//     roleInFilm: "Джанна, Звёздные войны: Скайуокер Восход;"
//     },
//     {
//     src: "images/actors/star-wars/oscar-aizek.png",
//     rusName: "Оскар Айзек",
//     engName: "Oscar Isaac",
//     roleInFilm: "По Дэмерон, Звёздные войны: Скайуокер Восход;"
//     },
//     {
//     src: "images/actors/star-wars/richard-grand.png",
//     rusName: "Ричард Э. Грант",
//     engName: "Richard E. Grant",
//     roleInFilm: "генерал Энрик Прайд, Звёздные войны: Скайуокер Восход;"
//     },

//     {
//     src: "images/actors/gents/matthew-mcconaughey.png",
//     rusName: "Мэттью Макконахи",
//     engName: "Mattew McConaughey",
//     roleInFilm: "Michael Pearson, Джентльмены;"
//     },
//     {
//     src: "images/actors/gents/charly-hannem.png",
//     rusName: "Чарли Ханнэм",
//     engName: "Charlie Hunnam",
//     roleInFilm: "Raymond Smith, Джентльмены;"
//     },
//     {
//     src: "images/actors/gents/henry-golding.png",
//     rusName: "Генри Голдинг",
//     engName: "Henry Golding",
//     roleInFilm: "Dry Eye, Джентльмены;"
//     },
//     {
//     src: "images/actors/gents/hugh-grand.png",
//     rusName: "Хью Грант",
//     engName: "Hugh Grant",
//     roleInFilm: "Fletcher, Джентльмены;"
//     },
//     {
//     src: "images/actors/gents/mishel-dockery.png",
//     rusName: "Мишель Докери",
//     engName: "Michelle Dockery",
//     roleInFilm: "Rosalind Pearson, Джентльмены;"
//     },
//     {
//     src: "images/actors/gents/jeremy-strong.png",
//     rusName: "Джереми Стронг",
//     engName: "Jeremy Strong",
//     roleInFilm: "Matthew, Джентльмены;"
//     },
//     {
//     src: "images/actors/gents/eddy-marsan.png",
//     rusName: "Эдди Марсан",
//     engName: "Eddie Marsan",
//     roleInFilm: "Big Dave, Джентльмены;"
//     },
//     {
//     src: "images/actors/gents/jeison-vong.png",
//     rusName: "Джейсон Вонг",
//     engName: "Jason Wong",
//     roleInFilm: "Phuc, Джентльмены;"
//     },
//     {
//     src: "images/actors/gents/kolin-farrell.png",
//     rusName: "Колин Фаррелл",
//     engName: "Colin Farrell",
//     roleInFilm: "Coach, Джентльмены;"
//     },
//     {
//     src: "images/actors/gents/lain-reny.png",
//     rusName: "Лайн Рени",
//     engName: "Lyne Renée",
//     roleInFilm: "Jackie, Джентльмены;"
//     },
    
//     {
//     src: "images/actors/ford-vs-ferrari/caitríona-balfe.png",
//     rusName: "Катрина Балф",
//     engName: "Caitríona Balfe",
//     roleInFilm: "Молли Майлз, Ford против Ferrari;"
//     },
//     {
//     src: "images/actors/ford-vs-ferrari/christian-bale.png",
//     rusName: "Кристиан Бейл",
//     engName: "Christian Bale",
//     roleInFilm: "Кен Майлз, Ford против Ferrari;"
//     },
//     {
//     src: "images/actors/ford-vs-ferrari/matt-damon.png",
//     rusName: "Мэтт Дэймон",
//     engName: "Matt Damon",
//     roleInFilm: "Кэрролл Шелби, Ford против Ferrari;"
//     },
//     {
//     src: "images/actors/ford-vs-ferrari/tracy-letts.png",
//     rusName: "Трэйси Леттс",
//     engName: "Tracy Letts",
//     roleInFilm: "Генри Форд II, Ford против Ferrari;"
//     },
//     {
//     src: "images/actors/ford-vs-ferrari/jon-bernthal.png",
//     rusName: "Джон Бернтал",
//     engName: "Jon Bernthal",
//     roleInFilm: "Ли Якокка, Ford против Ferrari;"
//     },
//     {
//     src: "images/actors/ford-vs-ferrari/noah-jupe.png",
//     rusName: "Ноа Джуп",
//     engName: "Noah Jupe",
//     roleInFilm: "Питер Майлз, Ford против Ferrari;"
//     },
//     {
//     src: "images/actors/ford-vs-ferrari/josh-lucas.png",
//     rusName: "Джош Лукас",
//     engName: "Josh Lucas",
//     roleInFilm: "Лео Биби, Ford против Ferrari;"
//     },
//     {
//     src: "images/actors/ford-vs-ferrari/remo-girone.png",
//     rusName: "Ремо Джироне",
//     engName: "Remo Girone",
//     roleInFilm: "Энцо Феррари, Ford против Ferrari;"
//     },
//     {
//     src: "images/actors/ford-vs-ferrari/ray-mckinnon.png",
//     rusName: "Рэй Маккиннон",
//     engName: "Ray McKinnon",
//     roleInFilm: "Фил Ремингтон, Ford против Ferrari;"
//     },
//     {
//     src: "images/actors/ford-vs-ferrari/jj-fild.png",
//     rusName: "Джей Джей Филд",
//     engName: "JJ Feild",
//     roleInFilm: "Рой Ланн, Ford против Ferrari;"
//     },
    
//     {
//     src: "images/actors/3022/omar-epps.png",
//     rusName: "Омар Эппс",
//     engName: "Omar Epps",
//     roleInFilm: "John Laine, 3022;"
//     },
//     {
//     src: "images/actors/3022/kate-walsh.png",
//     rusName: "Кейт Уолш",
//     engName: "Kate Walsh",
//     roleInFilm: "Jackie Miller, 3022;"
//     },
//     {
//     src: "images/actors/3022/angus-macfadyen.png",
//     rusName: "Энгус Макфадьен",
//     engName: "Angus Macfadyen",
//     roleInFilm: "Richard Valin, 3022;"
//     },
//     {
//     rusName: "Джорджа Фокс",
//     engName: "Jorja Fox",
//     roleInFilm: "Diane Ures, 3022;"
//     },
//     {
//     src: "images/actors/3022/miranda-cosgrove.png",
//     rusName: "Миранда Косгров",
//     engName: "Miranda Cosgrove",
//     roleInFilm: "Lisa Brown, 3022;"
//     },
//     {
//     src: "images/actors/3022/enver-gjokaj.png",
//     rusName: "Энвер Гьокай",
//     engName: "Enver Gjokaj",
//     roleInFilm: "Vincent Bernard, 3022;"
//     },
//     {
//     src: "images/actors/3022/haaz-sleiman.png",
//     rusName: "Хааз Слейман",
//     engName: "Haaz Sleiman",
//     roleInFilm: "Thomas Dahan, 3022;"
//     },
//     {
//     src: "images/actors/3022/sara-tomko.png",
//     rusName: "Сара Томко",
//     engName: "Sara Tomko",
//     roleInFilm: "Pangea, 3022;"
//     },

//     {
//     src: "images/actors/ing-bast/bred-pitt.png",
//     rusName: "Брэд Питт",
//     engName: "Brad Pitt",
//     roleInFilm: "Альдо Рейн, Бесславные ублюдки;"
//     },
//     {
//     src: "images/actors/ing-bast/mellany-loran.png",
//     rusName: "Мелани Лоран",
//     engName: "Mélanie Laurent",
//     roleInFilm: "Шошанна Дрейфюс, Бесславные ублюдки;"
//     },
//     {
//     src: "images/actors/ing-bast/daniel-brule.png",
//     rusName: "Даниэль Брюль",
//     engName: "Daniel Brühl",
//     roleInFilm: "Фредерик Цоллер, Бесславные ублюдки;"
//     },
//     {
//     src: "images/actors/ing-bast/diana-kruger.png",
//     rusName: "Диайан Крюгер",
//     engName: "Diane Kruger",
//     roleInFilm: "Бриджит фон Хаммерсмарк, Бесславные ублюдки;"
//     },
//     {
//     src: "images/actors/ing-bast/maikl-fassbender.png",
//     rusName: "Майкл Фассбендер",
//     engName: "Michael Fassbender",
//     roleInFilm: "Арчи Хикокс, Бесславные ублюдки;"
//     },
//     {
//     src: "images/actors/ing-bast/august-diehl.png",
//     rusName: "Август Диль",
//     engName: "August Diehl",
//     roleInFilm: "Дитер Хельстром, Бесславные ублюдки;"
//     },
//     {
//     src: "images/actors/ing-bast/eli-roth.png",
//     rusName: "Элай Рот",
//     engName: "Eli Roth",
//     roleInFilm: "Донни Доновиц, Бесславные ублюдки;"
//     },
//     {
//     src: "images/actors/ing-bast/till-shwaiger.png",
//     rusName: "Тиль Швайгер",
//     engName: "Til Schweiger",
//     roleInFilm: "Хуго Штиглиц, Бесславные ублюдки;"
//     },
//     {
//     src: "images/actors/ing-bast/omar-doom.png",
//     rusName: "Омар Дум",
//     engName: "Omar Doom",
//     roleInFilm: "Омар Ульмар, Бесславные ублюдки;"
//     },

//     {
//     src: "images/actors/django/jamie-foxx.png",
//     rusName: "Джейми Фокс",
//     engName: "Jamie Foxx",
//     roleInFilm: "Джанго Фримен, Джанго освобождённый;"
//     },
//     {
//     src: "images/actors/ing-bast/christoph-waltz.png",
//     rusName: "Кристоф Вальц",
//     engName: "Christoph Waltz",
//     roleInFilm: "доктор Кинг Шульц, Джанго освобождённый; Ганс Ланда, Бесславные ублюдки;"
//     },
//     {
//     src: "images/actors/django/leonardo-di-caprio.png",
//     rusName: "Леонардо Ди Каприо",
//     engName: "Leonardo DiCaprio",
//     roleInFilm: "Кэлвин Кэнди, Джанго освобождённый;"
//     },
//     {
//     src: "images/actors/django/carry-washington.png",
//     rusName: "Керри Вашингтон",
//     engName: "Kerry Washington",
//     roleInFilm: "Broomhilda von Shaft, Джанго освобождённый;"
//     },
//     {
//     src: "images/actors/django/samuel-l-jackson.png",
//     rusName: "Сэмюэл Л. Джексон",
//     engName: "Samuel L. Jackson",
//     roleInFilm: "Стивен, Джанго освобождённый;"
//     },
//     {
//     src: "images/actors/django/walton-goggins.png",
//     rusName: "Уолтон Гоггинс",
//     engName: "Walton Goggins",
//     roleInFilm: "Билли Крэш, Джанго освобождённый;"
//     },
//     {
//     src: "images/actors/django/dennis-kristopher.png",
//     rusName: "Деннис Кристофер",
//     engName: "Dennis Christopher",
//     roleInFilm: "Леонид Моги, Джанго освобождённый;"
//     },
//     {
//     src: "images/actors/django/james-remar.png",
//     rusName: "Джеймс Ремар",
//     engName: "James Remar",
//     roleInFilm: "Эйс Спек / Бутч Пух, Джанго освобождённый;"
//     },
//     {
//     src: "images/actors/django/don-djonson.png",
//     rusName: "Дон Джонсон",
//     engName: "Don Johnson",
//     roleInFilm: "Спенсер Беннет, Джанго освобождённый;"
//     },
//     {
//     src: "images/actors/django/laura-cayouette.png",
//     rusName: "Лора Кайюэтт",
//     engName: "Laura Cayouette",
//     roleInFilm: "Lara-Lee Candie-Fitzwilly, Джанго освобождённый;"
//     },

//     {
//     src: "images/actors/druk/mads-mikkelsen.png",
//     rusName: "Мадс Миккельсен",
//     engName: "Mads Mikkelsen",
//     roleInFilm: "Мартин, Ещё по одной;"
//     },
//     {
//     src: "images/actors/druk/thomas-bo-larsen.png",
//     rusName: "Томас Бо Ларсен",
//     engName: "Thomas Bo Larsen",
//     roleInFilm: "Томми, Ещё по одной;"
//     },
//     {
//     src: "images/actors/druk/magnus-millang.png",
//     rusName: "Магнус Милланг",
//     engName: "Magnus Millang",
//     roleInFilm: "Николай, Ещё по одной;"
//     },
//     {
//     src: "images/actors/druk/lars-ranthe.png",
//     rusName: "Ларс Ранте",
//     engName: "Lars Ranthe",
//     roleInFilm: "Петер, Ещё по одной;"
//     },
//     {
//     src: "images/actors/druk/maria-bonnevie.png",
//     rusName: "Мария Бонневи",
//     engName: "Maria Bonnevie",
//     roleInFilm: "Аника, Ещё по одной;"
//     },
//     {
//     src: "images/actors/druk/helene-reingaard-neumann.png",
//     rusName: "Хелене Рейнгор Неуман",
//     engName: "Helene Reingaard Neumann",
//     roleInFilm: "Amalie, Ещё по одной;"
//     },
//     {
//     src: "images/actors/druk/susse-wold.png",
//     rusName: "Суссе Вольд",
//     engName: "Susse Wold",
//     roleInFilm: "The Principal, Ещё по одной;"
//     },
//     {
//     src: "images/actors/druk/albert-rudbeck-lindhardt.png",
//     rusName: "Альберт Рудбек Линдхардт",
//     engName: "Albert Rudbeck Lindhardt",
//     roleInFilm: "Себастьян, Ещё по одной;"
//     },
//     {
//     src: "images/actors/druk/martin-greis.png",
//     rusName: "Мартин Грайс",
//     engName: "Martin Greis",
//     roleInFilm: "Overtjener, Ещё по одной;"
//     },
//     {
//     src: "images/actors/druk/frederik-winther.png",
//     rusName: "Фредерик Винтер",
//     engName: "Frederik Winther",
//     roleInFilm: "Мальте, Ещё по одной;"
//     }
// ]

const Actor = sequelize.define(
    'Actor',
    {
        actorID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        imgPath: {
            type: DataTypes.STRING,
        },
        nameRus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nameEng: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleInFilm: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
      freezeTableName: true,
    }
)
// setTimeout(()=>{
//     actorsCardsData.forEach(item => {
//         Actor.create({ 
//             imgPath: item.src, 
//             nameRus: item.rusName, 
//             nameEng: item.engName, 
//             roleInFilm: item.roleInFilm
//         });
//     })
// },5000)


// маршрут на добавление товара в каталог
// app.post(
//     "/upload",  
//     upload.single("file"),
//      (req, res) => {
//         const tempPath = req.file.path,
//               targetPath = path.join(__dirname, `./uploads/${req.file.originalname}`);  
  
//         if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//             fs.rename(tempPath, targetPath, err => {
//                 if (err) {
//                     console.log(err);
//                     return handleError(err, res);
//                 }
    
//                 CatalogItem.create({ 
//                     image: req.file.originalname, 
//                     title: req.body.title, 
//                     category: req.body.category,
//                     price: req.body.price,
//                     description: req.body.desc
//                 });

//                 fs.rename(targetPath, (path.join(__dirname, `./public/img/uploadedPrImg/${req.file.originalname}`)), err => {
//                     if (err) {
//                         console.log(err);
//                         return handleError(err, res);
//                     }

//                     res
//                         .status(200)
//                         .contentType("text/plain")
//                         .end(`Успешно добавлен товар : ${req.body.title}`);
//                 });
//             });
//         } else {
//             fs.unlink(tempPath, err => {
//                 if (err) return handleError(err, res);
        
//                 res
//                     .status(403)
//                     .contentType("text/plain")
//                     .end("Only .png files are allowed!");
//             });
//         }
//     }
// );

// // маршрут на обновление записи
// app.post('/api/itemUpdateData', (req, res) => {

//     const {itemUpdateData} = req.body;

//     let data = itemUpdateData;
    
//     for (let field in data) {
//         if ( data[field] === '' ) {
//             data[field] = null;
//         }
//     }
//     Customer.update(
//         {
//             email: data.email,
//             name: data.name,
//             phoneNum: data.phoneNum
//         },
//         {
//             where: {
//                 customerID: data.id
//             }
//         }
//     )

//     res.send(data);
// });

// // маршрут на создание записи 
// app.post('/api/postData', (req, res) => {
//     const {itemData} = req.body;

//     let data = itemData;
    
//     for (let field in data) {
//         if ( data[field] === '' ) {
//             data[field] = null;
//         }
//     }

//     Customer.create({ 
//         email: data.email, 
//         name: data.name, 
//         phoneNum: data.phoneNum
//     });

//     res.send(data);
// });

// // маршрут на получение всех товаров
// app.get('/api/catalogItemData', (req, res) => {
//     CatalogItem.findAll({raw:true})
//     .then(catalogItem => {
//         res.send(catalogItem);
//     })
//     .catch(e => console.log(`error: ${e}`));
// });

// // маршрут на получение всех клиентов
// app.get('/api/customerData', (req, res) => {
//     Customer.findAll({raw:true})
//     .then(сustomer => {
//         res.send(сustomer);
//     })
//     .catch(e => console.log(`error: ${e}`));
// });



// // маршрут на удаление элемента по id
// app.post('/api/deleteData', async (req, res) => {
//     console.log(req.headers.table);
//     if (req.headers.table == 'request') {
//         await Message.destroy({ where: { requestID: req.body.id } });
//         res.send(req.body.id);
//     } else if (req.headers.table == 'customer') {
//         await Customer.destroy({ where: { customerID: req.body.id } });
//         res.send(req.body.id);
//     } else if (req.headers.table == 'order') {
//         await Order.destroy({ where: { orderID: req.body.id } });
//         res.send(req.body.id);
//     }else if (req.headers.table == 'product') {
//         await CatalogItem.destroy({ where: { catalogItemID: req.body.id } });
//         res.send(req.body.id);
//     }
// });

// const Admin = sequelize.define('Admin', 
//     {
//         nickname: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     },
//     {
//       freezeTableName: true,
//     }
// );

// // маршрут на авторизацию администратора
// app.post('/login', async (request, response) => {
//     if (request.body.jsonWtoken) {
//         jwt.verify(request.body.jsonWtoken, "2315", (err, decoded) => {
//             if (err) {
//                 response.send( {res: 'Время сессии истекло, войдите ещё раз!'} )
//             } else if (decoded) {
//                 response.send( {res: 'Добро пожаловать, администратор!'} )
//             }
            
//         })
        
//     } else {
//         const { nickname, password } = request.body

//         let admin = await Admin.findOne( {where: {nickname: nickname}} )

//         if(admin == null){
//             return response.sendStatus(404)
//         }
//         if(admin.password != password){
//             return response.sendStatus(400)
//         }

//         let token = jwt.sign( { nickname: nickname }, "2315", { expiresIn: "30m" } )
//         response.send( { token } )
//     }
// })

sequelize.sync()
app.listen(3000, () => {
    console.log('Сервер запущен')
})

// Admin.create( { nickname: 'Dmitry_admin123', password: 'Ya@Dmin' } )

// await Order.destroy({
//     truncate: true,
//   })