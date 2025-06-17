import express from "express";
import cors from "cors";
import { Sequelize, DataTypes, Op, where } from "sequelize";
import jwt from 'jsonwebtoken';

import path from "path";

import {fileURLToPath} from 'url';

import fs from "fs";
import multer from "multer";

const app = express();

const __filename = fileURLToPath(import.meta.url),
      __dirname = path.dirname(__filename);

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

const upload = multer({
  dest: "/public/img/users-avatars/uploadAvatars"
});

const _server_401_response_ = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ошибка 401</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>alert("Возникла ошибка аутентификации");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000)</script>';
const _server_500_response_ = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ошибка 500</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>alert("Возникла непредвиденная шибка!");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000)</script>';

const Movies = sequelize.define(
    'Movies',
    {
        movieID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        background: {
            type: DataTypes.STRING,
        },
        rusTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        engTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        markMZ: {
            type: DataTypes.STRING,
            allowNull: false
        },
        markIMDB: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likesQuantity: {
            type: DataTypes.INTEGER,
        },
        dislikesQuantity: {
            type: DataTypes.INTEGER,
        },
        primaryPoster: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slogan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        screenwriter: {
            type: DataTypes.STRING,
            allowNull: false
        },
        operator: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        producer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        composer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        editor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ageRating: {
            type: DataTypes.STRING,
            allowNull: false
        },
        madeIn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directorRusName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directorEngName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directorImg: {
            type: DataTypes.STRING,
        },
        worldPremiere: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rusPremiere: {
            type: DataTypes.STRING,
            allowNull: false
        },
        worldwideBoxOffice: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

const Actors = sequelize.define(
    'Actors',
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
    }
)

const Characters = sequelize.define(
    'Characters',
    {
        characterID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

Actors.hasMany(Characters, { foreignKey: 'actorId' });
Movies.hasMany(Characters, { foreignKey: 'movieID' });

const Quotes = sequelize.define(
    'Quotes',
    {
        quoteID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        quote: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quoteAuthor: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

Characters.hasMany(Quotes, { foreignKey: 'authorID' });
Movies.hasMany(Quotes, { foreignKey: 'movieID' });

const Frames = sequelize.define(
    'Frames',
    {
        framesGroupID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        additionalPosters: {
            type: DataTypes.STRING,
            allowNull: false
        },
        framesFolder: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

Movies.hasOne(Frames, { foreignKey: 'movieID', onDelete: "cascade"});

const Studios = sequelize.define(
    'Studios',
    {
        studiosGroupID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        production: {
            type: DataTypes.STRING,
        },
        effects: {
            type: DataTypes.STRING,
        },
        dubbing: {
            type: DataTypes.STRING,
        },
    }
)

Movies.hasOne(Studios, { foreignKey: 'movieID', onDelete: "cascade"});

const Trailers = sequelize.define(
    'Trailers',
    {
        trailerID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        fullsizePreview: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trailer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likesQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dislikesQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

Movies.hasOne(Trailers, { foreignKey: 'movieID', onDelete: "cascade"});

const NewTrailers = sequelize.define(
    'NewTrailers',
    {
        newTrailerID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        fullsizePreview: {
            type: DataTypes.STRING,
            allowNull: false
        },
        miniPreview: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trailer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likesQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dislikesQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

const AvailableAwards = sequelize.define(
    'AvailableAwards',
    {
        awardUnicName: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
        }
    }
)

const Awards = sequelize.define(
    'Awards',
    {
        awardID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        nomination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAwarded: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

Movies.hasMany(Awards, { foreignKey: 'movieID' });
AvailableAwards.hasMany(Awards, { foreignKey: 'awardName' });

const Users = sequelize.define(
    'Users',
    {
        userID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userBio: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        reviews: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tickets: {
            type: DataTypes.STRING,
            allowNull: true
        },       
    }
)

const Reviews = sequelize.define(
    'Reviews',
    {
        reviewID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        reviewType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likesQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dislikesQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }
)

Users.hasMany(Reviews, { foreignKey: 'authorID' });
Movies.hasMany(Reviews, { foreignKey: 'movieID' });

const Subscribes = sequelize.define(
    'Subscribes',
    {
        subscribeID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

const Sessions = sequelize.define(
    'Sessions',
    {
        sessionID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seatsPlan: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "[1,'vacant'];[2,'vacant'];[3,'vacant'];[4,'vacant'];[5,'vacant'];[6,'vacant'];[1,'vacant'];[2,'vacant'];[3,'vacant'];[4,'vacant'];[5,'vacant'];[6,'vacant'];[1,'vacant'];[2,'vacant'];[3,'vacant'];[4,'vacant'];[5,'vacant'];[6,'vacant'];[1,'vacant'];[2,'vacant'];[3,'vacant'];[4,'vacant'];[5,'vacant'];[6,'vacant']"
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)
Movies.hasMany(Sessions, { foreignKey: 'movieID' });

const Tickets = sequelize.define(
    'Tickets',
    {
        ticketID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        seats: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)
Sessions.hasMany(Tickets, { foreignKey: 'sessionID' });
Users.hasOne(Tickets, { foreignKey: 'userID'});

// Sessions.truncate();

// Sessions.create({
//     time: "13:00",
//     city: "Оренбург",
//     movieID: "f0285eaa-1b88-427b-8e3f-0a9d9c80d7fe"
// })
// Sessions.create({
//     time: "15:00",
//     city: "Оренбург",
//     movieID: "12249b49-a322-4502-b118-e9154fe7733e"
// })
// Sessions.create({
//     time: "18:00",
//     city: "Оренбург",
//     movieID: "03b2e6dd-0f34-4c97-9748-7c2ea0a07ce6"
// })

// маршрут на получение билетов пользователя
app.post('/api/getTickets', (req, res) => {
    const { frontData } = req.body;

    jwt.verify(frontData, "2315", async (err, decoded) => {
        if (err) {
            res.send( {res: 'Время сессии истекло!'} )
        } else if (decoded) {
            Tickets.findAll({
                where: {userID: decoded.id}
            })
            .then(tickets => {
                const results = tickets.map(item => item = {
                    id: item.ticketID,
                    seats: item.seats
                })
                res.send(results);
            }).catch(e => console.log(`error: ${e}`));
        }
    })
});

// маршрут на бронирование мест в кинозале
app.post('/api/bookingTickets', async (req, res) => {
    const {sessionID, userToken, seats, price, format} = req.body;

    // console.log(req.body);

    Sessions.findOne({
        attributes: ['seatsPlan'],
        where: {sessionID: sessionID}
    }).then( async (plan) => {
        let userSeats = seats.split(';');
        userSeats.splice(-1);
        
        userSeats = userSeats.map(item => {
            let seat, row;

            let myItem = item.trim().split(', ');
            seat = myItem[0].split(': ');
            row = myItem[1].split(': ');

            return item = [+seat[1], +row[1]]
        });

        let cinemaPlan = plan.dataValues.seatsPlan;
        cinemaPlan = cinemaPlan.split(';');
        cinemaPlan = cinemaPlan.map(item => [+item.slice(1,2), item.slice(-8,-2)]);

        userSeats.forEach(item => {
            let occupiedPlace = (6 * item[1]) - (6 - item[0]);
            let thisSeat = cinemaPlan[(occupiedPlace - 1)];
            thisSeat[1] = 'occupd';
        });
        
        let finalPlanStr = `[${cinemaPlan[0][0]},'${cinemaPlan[0][1]}'];[${cinemaPlan[1][0]},'${cinemaPlan[1][1]}'];[${cinemaPlan[2][0]},'${cinemaPlan[2][1]}'];[${cinemaPlan[3][0]},'${cinemaPlan[3][1]}'];[${cinemaPlan[4][0]},'${cinemaPlan[4][1]}'];[${cinemaPlan[5][0]},'${cinemaPlan[5][1]}'];[${cinemaPlan[6][0]},'${cinemaPlan[6][1]}'];[${cinemaPlan[7][0]},'${cinemaPlan[7][1]}'];[${cinemaPlan[8][0]},'${cinemaPlan[8][1]}'];[${cinemaPlan[9][0]},'${cinemaPlan[9][1]}'];[${cinemaPlan[10][0]},'${cinemaPlan[10][1]}'];[${cinemaPlan[11][0]},'${cinemaPlan[11][1]}'];[${cinemaPlan[12][0]},'${cinemaPlan[12][1]}'];[${cinemaPlan[13][0]},'${cinemaPlan[13][1]}'];[${cinemaPlan[14][0]},'${cinemaPlan[14][1]}'];[${cinemaPlan[15][0]},'${cinemaPlan[15][1]}'];[${cinemaPlan[16][0]},'${cinemaPlan[16][1]}'];[${cinemaPlan[17][0]},'${cinemaPlan[17][1]}'];[${cinemaPlan[18][0]},'${cinemaPlan[18][1]}'];[${cinemaPlan[19][0]},'${cinemaPlan[19][1]}'];[${cinemaPlan[20][0]},'${cinemaPlan[20][1]}'];[${cinemaPlan[21][0]},'${cinemaPlan[21][1]}'];[${cinemaPlan[22][0]},'${cinemaPlan[22][1]}'];[${cinemaPlan[23][0]},'${cinemaPlan[23][1]}']`;

        let clientID;

        jwt.verify(userToken, "2315", async (err, decoded) => {
            if (decoded) {
                clientID = decoded.id;
            } else if (err) {
                console.log(err);
                    return res
                        .status(401)
                        .contentType("html")
                        .end ( _server_401_response_ )
            }
        })

        await Sessions.update(
            { seatsPlan: finalPlanStr },
            { where: {sessionID: sessionID} }
        ).then( async () => {
            await Tickets.create({
                seats: `${price}; ${format}`,
                sessionID: sessionID,
                userID: clientID,
            })
            return res.send({ res: 'Успешное бронирование' });
        }).catch(e => console.log(`error: ${e}`));
    })
});

// маршрут на получение сеансов на сегодня
app.post('/api/getSessions', (req, res) => {
    const { frontData } = req.body;
    sequelize.query(
        `SELECT Sessions.*, Movies.ageRating, Movies.rusTitle, Movies.primaryPoster, Movies.movieID FROM Sessions JOIN Movies ON Movies.movieID = Sessions.movieID WHERE city = '${frontData}'`
    ).then(([results, metadata]) => {
        const reviews = results.map(item => item = {
            movieID: item.movieID,
            rusTitle: item.rusTitle,
            primaryPoster: item.primaryPoster,
            sessionID: item.sessionID,
            time: item.time,
            seatsPlan: item.seatsPlan,
            ageRating: item.ageRating
        })
        res.send(reviews);
    }).catch(e => console.log(`error: ${e}`));
});

// маршрут на создание записи о подписки на e-mail рассылку
app.post('/api/newEmailSubscriber', async (req, res) => {
    const {frontData} = req.body;

    await Subscribes.findOne({where: {email: frontData}})
    .then((subscriber) => {
        if (subscriber) {
            return res.send({ res: 'Вы уже подписаны' });
        } else {
            Subscribes.create( { email: frontData } )
            .then(()=> {
                return res.send({ res: 'Подписка оформлена' });
            })
        }
    }).catch(e => console.log(`error: ${e}`));
});

// маршрут на публикацию рецензии к фильму
app.post( "/publicReview", upload.single("file"), async (req, res) => {
    const {token, title, movieId, reviewBody, reviewType} = req.body;

    let ourUser;

    jwt.verify(token, "2315", async (err, decoded) => {
        if (decoded) {
            ourUser = await Users.findOne({
                raw: true, 
                attributes: ['userID'],
                where: {userID: decoded.id}
            });
        } else if (err) {
            console.log(err);
                return res
                    .status(401)
                    .contentType("html")
                    .end ( _server_401_response_ )
        }
    }).then( async () => {
        await Reviews.findOne({
            raw: true, 
            attributes: ['reviewID'],
            where: {authorID: ourUser.userID, movieID: movieId}
        }).then( (review) => {
            if (review != null) {
                Reviews.update(
                    {
                        reviewType: reviewType,
                        text: reviewBody,
                        title: title,
                    },
                    {
                        where: { reviewID: review.reviewID }
                    }
                )
            } else {
                Reviews.create(
                    {
                        reviewType: reviewType,
                        text: reviewBody,
                        title: title,
                        likesQuantity: 0,
                        dislikesQuantity: 0,
                        movieID: movieId,
                        authorID: ourUser.userID

                    }
                )
            }
            
            console.log(review);
            res
                .status(200)
                .contentType("html")
                .end(
                `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Успешная операция</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>alert("Рецензия была добавлена");setTimeout(()=>{window.location.replace("http://localhost:3000/movie-page.html")},2000);</script>`
                );
        })
    })
});

// маршрут на получение всех отзывов к кинокартине
app.get('/api/getReviews', (req, res) => {
    const {filmname} = req.headers;
    sequelize.query(
        `SELECT Reviews.*, Users.nickname, Users.avatar FROM Reviews JOIN Users ON Users.userID = Reviews.authorID WHERE movieID = '${filmname}'`
    ).then(([results, metadata]) => {
        const reviews = results.map(item => item = {
            avatar: item.avatar,
            nickname: item.nickname,
            reviewtitle: item.title,
            time: item.updatedAt,
            reviewclass: item.reviewType,
            reviewtext: item.text,
            likesQuantity: item.likesQuantity,
            dislikesQuantity: item.dislikesQuantity
        })
        // console.log(reviews);
        res.send(reviews);
    }).catch(e => console.log(`error: ${e}`));
});

// маршрут на получение всех отзывов конкретного пользователя
app.post('/api/getUserReviews', (req, res) => {
    const {frontData} = req.body;
    
    jwt.verify(frontData, "2315", async (err, decoded) => {
        if (err) {
            res.send( {res: 'Время сессии истекло!'} )
        } else if (decoded) {
            sequelize.query(
                `SELECT Reviews.*, Movies.rusTitle, Movies.primaryPoster FROM Reviews JOIN Movies ON Movies.movieID = Reviews.movieID WHERE authorID = '${decoded.id}'`
            ).then(([results, metadata]) => {
                const reviews = results.map(item => item = {
                    avatar: item.primaryPoster,
                    nickname: item.rusTitle,
                    reviewtitle: item.title,
                    time: item.updatedAt,
                    reviewclass: item.reviewType,
                    reviewtext: item.text,
                    likesQuantity: item.likesQuantity,
                    dislikesQuantity: item.dislikesQuantity,
                    parentSelector: '.profileReviewBox'
                })
                res.send(reviews);
            }).catch(e => console.log(`error: ${e}`));
        }
    })
});

// маршрут на получение части данных пользователя
app.get('/api/getNickAndAvatar', async (req, res) => {
    const {token} = req.headers;
    let user;

    jwt.verify(token, "2315", async (err, decoded) => {
        if (err) {
            res.send( {res: 'Время сессии истекло или пользователь не авторизован, войдите ещё раз!'} )
        } else if (decoded) {
            user = await Users.findOne(
                {where: {userID: decoded.id}}
            );

            const data = { 
                avatar: user.avatar,
                nickname: user.nickname
            };

            res.send( data )
        }
    })    
});

// маршрут на получение данных пользователя
app.post('/api/getProfileData', async (req, res) => {
    const {token} = req.body;

    let user;

    jwt.verify(token, "2315", async (err, decoded) => {
        if (err) {
            res.send( {res: 'Время сессии истекло или пользователь не авторизован, войдите ещё раз!'} )
        } else if (decoded) {
            user = await Users.findOne(
                {where: {userID: decoded.id}}
            );

            const data = { 
                avatar: user.avatar,
                username: user.firstname,
                surname: user.surname,
                nickname: user.nickname,
                email: user.email, 
                gender: user.gender, 
                userbirthday: user.birthday, 
                usercity: user.city, 
                userbio: user.userBio
            };

            res.send( data )
        }
    })    
});

// маршрут на редактирование пользовательских данных
app.post( "/upload", upload.single("file"), async (req, res) => {
    const {token, firstname, surname, gender, birthday, email, nickname, city, userBio} = req.body;

    let ourUser;

    jwt.verify(token, "2315", async (err, decoded) => {
        if (decoded) {
            ourUser = await Users.findOne( {where: {userID: decoded.id}} );
        } else if (err) {
            console.log(err);
                return res
                    .status(401)
                    .contentType("html")
                    .end ( _server_401_response_ )
        }
    })

    
    let userWithSimilarNickname = await Users.findOne( {where: {nickname: nickname}} );
    let userWithSimilarEmail = await Users.findOne( {where: {email: email}} );

    // console.log(userWithSimilarNickname);
    // console.log(userWithSimilarEmail);
    // console.log(ourUser.nickname, ourUser.email, ourUser.userID);

    if (userWithSimilarNickname) {
        if (userWithSimilarNickname.dataValues.nickname == nickname && userWithSimilarNickname.dataValues.userID != ourUser.userID) {
            return res
            .status(401)
            .contentType("html")
            .end( _server_401_response_ );
        }
    }
    if (userWithSimilarEmail) {
        if (userWithSimilarEmail.dataValues.email == email && userWithSimilarEmail.dataValues.userID != ourUser.userID) {
            return res
            .status(401)
            .contentType("html")
            .end( _server_401_response_ );
        }
    }

    console.log(req.file)

    if (!req.file) {
        await Users.update(
            {
                firstname: firstname,
                surname: surname,
                nickname: nickname,
                email: email,
                gender: gender,
                birthday: birthday,
                city: city,
                userBio: userBio,        
            },
            {
                where: { userID: ourUser.userID }
            }
        ).then( () => {
            let newToken = jwt.sign( { nickname: nickname, id: ourUser.userID  }, "2315", { expiresIn: "10m" } );

            res
                .status(200)
                .contentType("html")
                .end(
                `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Успешная операция</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>localStorage.setItem('token', '${newToken}');alert("Данные профиля успешно изменены");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000);</script>`
                );
        })
    } else {
        const tempPath = req.file.path,
            extN = path.extname(req.file.originalname);
            
        let targetPath = path.join( __dirname, `./uploads/${ourUser.userID}${extN}`);  
        let newFileName = `${ourUser.userID}${extN}`;

        if (extN == '.png') {
            fs.rename(tempPath, targetPath, async err => {
                if (err) {
                    console.log(err);
                    return res
                        .status(500)
                        .contentType("html")
                        .end( _server_500_response_ );
                }

                await Users.update(
                    {
                        firstname: firstname,
                        surname: surname,
                        nickname: nickname,
                        email: email,
                        gender: gender,
                        birthday: birthday,
                        city: city,
                        avatar: newFileName,
                        userBio: userBio,        
                    },
                    {
                        where: { userID: ourUser.userID }
                    }
                ).then( () => {
                    fs.rename(targetPath, (path.join(__dirname, `./public/uploadedAvatars/${newFileName}`)), err => {
                        if (err) {
                            console.log(err);
                            return res
                                .status(500)
                                .contentType("html")
                                .end( _server_500_response_ );
                        } else {
                            let newToken = jwt.sign( { nickname: nickname,  id: ourUser.userID }, "2315", { expiresIn: "10m" } );
                            res
                                .status(200)
                                .contentType("html")
                                .end(
                                `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Успешная операция</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>localStorage.setItem('token', '${newToken}');alert("Данные профиля успешно изменены");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000);</script>`
                                );
                            }
                        });           
                    })
            })
        } else {
            res
                .status(415)
                .contentType("html")
                .end(
                    '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ошибка 415</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>alert("Ошибка! Неверный формат загрузки данных");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000)</script>'
                );
        }
    }
});

// маршрут на получение всех достижений кинокартины
app.get('/api/getAwards', (req, res) => {
    const {filmname} = req.headers;
    Awards.findAll({
        raw: true, 
        attributes: ['awardName', 'nomination', 'year', 'isAwarded'],
        where: { movieID: { [Op.substring] : filmname } }
    })
    .then(awards => {
        res.send(awards);
    })
    .catch(e => console.log(`error: ${e}`));
});

// маршрут на получение афиши
app.get('/api/getTrends', (req, res) => {
    Movies.findAll({
        raw: true, 
        attributes: ['movieID', 'rusTitle', 'markMZ', 'genre', 'year', 'primaryPoster']
    })
    .then(movies => {
        let trends = movies.reverse().slice(0, 8);
        trends = trends.map(movie =>
            Object.assign(movie, 
                { 
                    parentHTML: '.cinemaNow .movieCards'
                }
            )
        );
        res.send(trends);
    })
    .catch(e => console.log(`error: ${e}`));
});

// маршрут на получение новых трейлеров
app.get('/api/getNewTrailers', (req, res) => {
    NewTrailers.findAll({
        raw: true, 
        attributes: ['newTrailerID', 'fullsizePreview', 'miniPreview', 'trailer', 'likesQuantity', 'title', 'dislikesQuantity']
    })
    .then(newTrailers => {        
        res.send(newTrailers);
    })
    .catch(e => console.log(`error: ${e}`));
});

// маршрут на получение данных фильма
app.get('/api/getMovie', (req, res) => {
    const { filmname } = req.headers;

    Movies.findOne({
        where: { movieID: { [Op.substring] : filmname } }  
    })
    .then(movie => {
        res.send(movie.dataValues);
    })
    .catch(e => console.log(`error: ${e}`));
});

// маршрут на получение данных студий
app.get('/api/getStudios', (req, res) => {
    const { filmname } = req.headers;

    Studios.findOne({
        where: { movieID: { [Op.substring] : filmname } }  
    })
    .then(studio => {
        res.send(studio.dataValues);
    })
    .catch(e => console.log(`error: ${e}`));
});

// маршрут на получение трейлера к фильму
app.get('/api/getTrailer', (req, res) => {
    const { filmname } = req.headers;

    Trailers.findOne({
        raw: true, 
        attributes: ['fullsizePreview', 'trailer', 'likesQuantity', 'dislikesQuantity', 'title', 'trailerID'],
        where: { movieID: { [Op.substring] : filmname } }  
    })
    .then(trailer => {
        res.send(trailer);
    })
    .catch(e => console.log(`error: ${e}`));
});

// маршрут на получение данных актёров и их ролей
app.get('/api/getActorsList', async (req, res) => {
    const { filmname } = req.headers;
    sequelize.query(
        `SELECT Characters.name, Characters.movieID, Actors.imgPath, Actors.nameRus, Actors.nameEng FROM Characters JOIN Actors ON Actors.actorID = Characters.actorId WHERE movieID = '${filmname}'`
    ).then(([results, metadata]) => {          
        res.send(results);
    });      
});

// маршрут на получение постеров и кадров из фильма
app.get('/api/getFrames', (req, res) => {
    const { filmname } = req.headers;

    Frames.findOne({
        raw: true, 
        attributes: ['additionalPosters', 'framesFolder'],
        where: { movieID: { [Op.substring] : filmname } }  
    })
    .then(framesGroup => {        
        res.send(framesGroup);
    })
    .catch(e => console.log(`error: ${e}`));
});

// маршрут на получение цитат из фильма
app.get('/api/getQuotes', (req, res) => {
    const { filmname } = req.headers;

    Quotes.findAll({
        raw: true, 
        attributes: ['quote', 'quoteAuthor'],
        where: { movieID: { [Op.substring] : filmname } }  
    })
    .then(QuotesGroup => {        
        res.send(QuotesGroup);
    })
    .catch(e => console.log(`error: ${e}`));
});


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

// маршрут на авторизацию
app.post('/login', async (request, response) => {
    if (request.body.jsonWtoken) {
        jwt.verify(request.body.jsonWtoken, "2315", (err, decoded) => {
            if (err) {
                response.send( {res: 'Время сессии истекло, войдите ещё раз!'} )
            } else if (decoded) {
                response.send( {res: 'Добро пожаловать!'} )
            }
        })
    } else {
        const { nickname, password, id } = request.body
        if (nickname) {
            console.log(request.body);

            let user = await Users.findOne( {where: {nickname: nickname}} )

            if(user == null){
                return response.sendStatus(404)
            }
            if(user.password != password){
                return response.sendStatus(400)
            }

            let token = jwt.sign( { nickname: nickname, id: user.userID }, "2315", { expiresIn: "30m" } )
            response.send( { token } )
        } else {
            response.send( {res: 'Время сессии истекло, войдите ещё раз!'} )
        }
    }
})

// маршрут на регистрацию
app.post('/regist', async (request, response) => {
    const { firstname, surname, nickname, password, email } = request.body;

    let data = request.body;

    let user = await Users.findOne( {where: {nickname: nickname}} );
    if(user != null){
        data = { error: '401' };
        return response.sendStatus(401)
    }
    user = await Users.findOne( {where: {email: email}} );
    if(user != null){
        data = { error: '402' };
        return response.sendStatus(402)
    }

    Users.create( { firstname: firstname, password: password, surname: surname, nickname: nickname, email: email, gender: null, birthday: null, city: null, avatar: null, userBio: null} );

    response.send( data )
})

sequelize.sync()
app.listen(3000, () => {
    console.log('Сервер запущен')
})

// const [results, metadata] = await sequelize.query(
//   `DROP TABLE User`
// )
 
// console.log(results);

// 123321.truncate();