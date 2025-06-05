import express from "express";
import cors from "cors";
import { Sequelize, DataTypes, Op } from "sequelize";
import jwt from 'jsonwebtoken';

// import http from "http";
import path from "path";

import {fileURLToPath} from 'url';

import fs from "fs";
import multer from "multer";

const app = express();

// const httpServer = http.createServer(app);
// const PORT = process.env.PORT;

// httpServer.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });
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

const User = sequelize.define(
    'User',
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
    },
    {
      freezeTableName: true,
    }
)

// маршрут на получение данных пользователя
app.post('/api/getProfileData', async (req, res) => {
    const {token} = req.body;

    let user;

    jwt.verify(token, "2315", async (err, decoded) => {
        if (err) {
            res.send( {res: 'Время сессии истекло или пользователь не авторизован, войдите ещё раз!'} )
        } else if (decoded) {
            user = await User.findOne(
                {where: {nickname: decoded.nickname}}
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
app.post( "/upload", upload.single("file"), (req, res) => {
    const {token, firstname, surname, gender, birthday, email, nickname, city, userBio} = req.body;

    if (!req.file) {
        jwt.verify(token, "2315", async (err, decoded) => {
            if (err) {
                console.log(err);
                res
                    .status(401)
                    .contentType("html")
                    .end(
                        '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ошибка 401</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>alert("Возникла ошибка аутентификации");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000)</script>'
                    );
            } else if (decoded) {
                await User.update(
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
                        where: { nickname: decoded.nickname }
                    }
                ).then( () => {
                    let newToken = jwt.sign( { nickname: nickname }, "2315", { expiresIn: "120m" } );

                    res
                        .status(200)
                        .contentType("html")
                        .end(
                        `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Успешная операция</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>localStorage.setItem('token', '${newToken}');alert("Данные профиля успешно изменены");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000);</script>`
                        );
                })
            }
        })
    } else {
        const tempPath = req.file.path,
            extN = path.extname(req.file.originalname);

        let targetPath, newFileName, nick;

        jwt.verify(token, "2315", async (err, decoded) => {
            if (err) {
                console.log(err);
                res
                    .status(401)
                    .contentType("html")
                    .end(
                        '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ошибка 401</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>alert("Возникла ошибка аутентификации");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000)</script>'
                    );
            } else if (decoded) {
                nick = decoded.nickname;
                const user = await User.findOne( 
                    {where: {nickname: decoded.nickname}}
                );
                targetPath = path.join(
                    __dirname,
                    `./uploads/${user.userID}${extN}`
                );  
                newFileName = `${user.userID}${extN}`;
            }
        }).then( () => {        
            if (extN == '.png') {
                fs.rename(tempPath, targetPath, async err => {
                    if (err) {
                        console.log(err);
                        return res
                            .status(500)
                            .contentType("html")
                            .end(
                                '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ошибка 500</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>alert("Возникла непредвиденная шибка!");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000)</script>'
                            );
                    }

                    await User.update(
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
                            where: { nickname: nick }
                        }
                    ).then( () => {
                        fs.rename(targetPath, (path.join(__dirname, `./public/uploadedAvatars/${newFileName}`)), err => {
                            if (err) {
                                console.log(err);
                                return res
                                    .status(500)
                                    .contentType("html")
                                    .end(
                                        '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ошибка 500</title><link rel="apple-touch-icon" sizes="180x180" href="favicon_package_v0.16/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="favicon_package_v0.16/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="favicon_package_v0.16/favicon-16x16.png"><link rel="manifest" href="favicon_package_v0.16/site.webmanifest"><link rel="mask-icon" href="favicon_package_v0.16/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#ffffff"><link rel="stylesheet" href="css/style.min.css"></head><body class="body profilePageSelector" unselectable="no"><div class="container"><div class="profileMainBox fade"><div class="loading"><img class="logobottom" src="icons/forLoading/loadingLogo.svg"><img class="logotop" src="icons/forLoading/loadingDots.svg"></div></div></div></body><script>alert("Возникла непредвиденная шибка!");setTimeout(()=>{window.location.replace("http://localhost:3000/profile.html")},2000)</script>'
                                    );
                            } else {
                                let newToken = jwt.sign( { nickname: nickname }, "2315", { expiresIn: "120m" } );
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
        })
    }
});

// маршрут на получение всех актёров
app.post('/api/getActorsList', (req, res) => {
    const {filmName} = req.body;
    Actor.findAll({raw:true, 
        where: { roleInFilm: { [Op.substring] : filmName } }  
    })
    .then(actors => {        
        res.send(actors);
    })
    .catch(e => console.log(`error: ${e}`));
});

// маршрут на получение всех достижений кинокартины
app.post('/api/getFilmAchievements', (req, res) => {
    const {filmName} = req.body;
    let awards = [];

    Oscar.findAll({
        raw:true, 
        attributes: ['nomination', 'year'],
        where: { film: { [Op.substring] : filmName } }
    })
    .then(achievs => {
        let shortAchievsInfo = achievs.map(item =>
            Object.assign( item, 
                { 
                    awardName: 'Премия Оскар',
                    imgPath: 'icons/avards/awardOscar.png'
                }
            )
        );
        awards.push([...shortAchievsInfo]);
    })
    .then(() => {
        BritishAcademy.findAll({
            raw:true, 
            attributes: ['nomination', 'year'],
            where: { film: { [Op.substring] : filmName } }
        })
        .then(achievs => {
            let shortAchievsInfo = achievs.map(item =>
                Object.assign( item, 
                    { 
                        awardName: 'Премия Британской Киноакадемии',
                        imgPath: 'icons/avards/brit-academ.png'
                    }
                )
            );
            awards.push([...shortAchievsInfo]);
        })
        .then(() => {
            SAG.findAll({
                raw:true, 
                attributes: ['nomination', 'year'],
                where: { film: { [Op.substring] : filmName } }
            })
            .then(achievs => {
                let shortAchievsInfo = achievs.map(item =>
                    Object.assign( item, 
                        { 
                            awardName: 'Премия Гильдии Актёров',
                            imgPath: 'icons/avards/achievement243.png'
                        }
                    )
                );
                awards.push([...shortAchievsInfo]);
            })
            .then(() => {
                Saturn.findAll({
                    raw:true, 
                    attributes: ['nomination', 'year'],
                    where: { film: { [Op.substring] : filmName } }
                })
                .then(achievs => {
                    let shortAchievsInfo = achievs.map(item =>
                        Object.assign( item, 
                            { 
                                awardName: 'Премия Сатурн',
                                imgPath: 'icons/avards/saturn.png'
                            }
                        )
                    );
                    awards.push([...shortAchievsInfo]);
                })
                .then(() => {
                    NominationOnAward.findAll({
                        raw:true, 
                        attributes: ['nomination', 'year', 'award'],

                        where: { film: { [Op.substring] : filmName } }
                    })
                    .then(achievs => {
                        let shortAchievsInfo = achievs.map(item => {
                            let src = 'icons/avards/';
                            switch (item.award) {
                                case 'Сатурн':
                                    src += 'saturn-nomination.png';
                                    break;
                                case 'Золотой глобус':
                                    src += 'awardGoldenGlobe-nomination.png';
                                    break;
                                case 'Оскар':
                                    src += 'awardOscar-nomination.png';
                                    break;
                                case 'Британская академия':
                                    src += 'brit-academ-nomination.png';
                                    break;
                                case 'Эмми':
                                    src += 'emmi-nomination.png';
                                    break;
                            }
                            return Object.assign( item, 
                                { 
                                    awardName: `Номинация на премию ${item.award}`,
                                    imgPath: `${src}`
                                }
                            )
                        });
                        console.log(shortAchievsInfo);
                        awards.push([...shortAchievsInfo]);
                    })
                    .then(() => {
                        GoldenGlobes.findAll({
                            raw:true, 
                            attributes: ['nomination', 'year'],
                            where: { film: { [Op.substring] : filmName } }
                        })
                        .then(achievs => {
                            let shortAchievsInfo = achievs.map(item =>
                                Object.assign( item, 
                                    { 
                                        awardName: 'Премия Золотой Глобус',
                                        imgPath: 'icons/avards/awardGoldenGlobe.png'
                                    }
                                )
                            );
                            awards.push([...shortAchievsInfo]);
                        })
                        .then(() => {
                            let allAwards = [];
                            awards.forEach(award => {
                                if (award.length > 1) {
                                    award.forEach(obj => allAwards.push(obj))
                                } else if (award.length > 0 && award.length < 2) {
                                    allAwards.push(...award)
                                }
                            })
                            res.send(allAwards);
                        })
                    })
                })
            })
        })
    })
    .catch(e => console.log(`error: ${e}`));
});

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

// достижения
const Oscar = sequelize.define(
    'Oscar',
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
        film: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
      freezeTableName: true,
    }
)

const BritishAcademy = sequelize.define(
    'BritishAcademy',
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
        film: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
    }
)

const Saturn = sequelize.define(
    'Saturn',
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
        film: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
    }
)

const SAG = sequelize.define(
    'SAG',
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
        film: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
    }
)

const NominationOnAward = sequelize.define(
    'NominationOnAward',
    {
        nominationID: { 
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        award: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nomination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        film: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
    }
)

const GoldenGlobes = sequelize.define(
    'GoldenGlobes',
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
        film: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
      freezeTableName: true,
    }
)


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
        const { nickname, password } = request.body
        if (nickname) {
            console.log(request.body);

            let user = await User.findOne( {where: {nickname: nickname}} )

            if(user == null){
                return response.sendStatus(404)
            }
            if(user.password != password){
                return response.sendStatus(400)
            }

            let token = jwt.sign( { nickname: nickname }, "2315", { expiresIn: "120m" } )
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

    let user = await User.findOne( {where: {nickname: nickname}} );
    if(user != null){
        data = { error: '401' };
        return response.sendStatus(401)
    }
    user = await User.findOne( {where: {email: email}} );
    if(user != null){
        data = { error: '402' };
        return response.sendStatus(402)
    }

    User.create( { firstname: firstname, password: password, surname: surname, nickname: nickname, email: email, gender: null, birthday: null, city: null, avatar: null, userBio: null} );

    response.send( data )
})


sequelize.sync()
app.listen(3000, () => {
    console.log('Сервер запущен')
})

// User.create( { firstname: 'Оксана', password: '123', surname: 'Литвиненко', nickname: 'OxanaSun', email: 'oxana123@gmail.com'} )

// await User.destroy({
//     truncate: true,
//   })

// await User.drop()




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





// app.post('/api/createframesGroup', async (req, res) => {
//     const {PostersForMoviePostersSection, movieTitleRus, folderName} = req.body;

//     let movieIdishnik = movieTitleRus;

//     switch (movieIdishnik) {
//         case 'Побег из Претории':
//             movieIdishnik = '12249b49-a322-4502-b118-e9154fe7733e'
//             break;
//         case 'Джокер':
//             movieIdishnik = 'f0285eaa-1b88-427b-8e3f-0a9d9c80d7fe'
//             break;
//         case 'Звездные войны: Скайуокер. Восход':
//             movieIdishnik = '1353f720-7c58-4f2f-9326-8930af3d874e'
//             break;
//         case 'Джентльмены':
//             movieIdishnik = '5844f0b4-a9b6-4edd-9e92-de9df2747be5'
//             break;
//         case 'Ford против Ferrari':
//             movieIdishnik = 'e012c688-e3d1-4e23-8871-6387d9f6a1ee'
//             break;
//         case '3022':
//             movieIdishnik = '239dc840-396c-41f2-89f1-a95bce35861e'
//             break;
//         case 'Бесславные ублюдки':
//             movieIdishnik = 'c413f28c-d318-4501-b5e7-4621fdb0c273'
//             break;
//         case 'Джанго освобожденный':
//             movieIdishnik = '2208374b-5297-4c21-ae20-f6f67960b06d'
//             break;
//         case 'Еще по одной':
//             movieIdishnik = '03b2e6dd-0f34-4c97-9748-7c2ea0a07ce6'
//             break;
//     }     

//     Frames.create( { 
//         additionalPosters: PostersForMoviePostersSection,
//         framesFolder: folderName,
//         movieID: movieIdishnik,
//     } );
//     res.send({ title: 'success' })
// });





// const [results, metadata] = await sequelize.query(
//   "SELECT actorID, roleInFilm FROM Actor"
// )
// let newActors = results.map(obj => {
//     delete obj.roleInFilm;
//     delete obj.createdAt;
//     delete obj.updatedAt;
//     if (obj.imgPath) {        
//         obj.imgPath = (obj.imgPath.split(/[/]/).slice(-1)).toString();
//         return obj
//     } else {
//         return obj
//     }
// })

// newActors.forEach( actor => {
//     Actors.create( { actorID: actor.actorID, imgPath: actor.imgPath, nameRus: actor.nameRus, nameEng: actor.nameEng } );
// })

// let newRes = results.map(obj => {
//     let newObj = obj.roleInFilm.split(', ');
//     if (newObj.length < 3) {
//         return {
//             actorIdentifier: obj.actorID, 
//             character: newObj[0],
//             movie: newObj[1].slice(0, -1)
//         }
//     } 
//     else {
//         newObj = obj.roleInFilm.split('; ');
//         let specialObj = newObj.map(item => item.split(', '));
//         return [{
//             actorIdentifier: obj.actorID, 
//             character: specialObj[0][0],
//             movie: specialObj[0][1]
//         }, {
//             actorIdentifier: obj.actorID, 
//             character: specialObj[1][0],
//             movie: specialObj[1][1].slice(0, -1)
//         }]
//     }
    
// })
// let finalRes = [];
// newRes.forEach(item => {
//     if(item.length != undefined) {
//         finalRes.push(item[0]);
//         finalRes.push(item[1]);
//     } else {
//         finalRes.push(item);
//     }
// })

// finalRes = finalRes.map(obj => {
//     switch (obj.movie) {
//         case 'Побег из Претории':
//             obj.movie = '12249b49-a322-4502-b118-e9154fe7733e'
//             break;
//         case 'Джокер':
//             obj.movie = 'f0285eaa-1b88-427b-8e3f-0a9d9c80d7fe'
//             break;
//         case 'Звёздные войны: Скайуокер Восход':
//             obj.movie = '1353f720-7c58-4f2f-9326-8930af3d874e'
//             break;
//         case 'Джентльмены':
//             obj.movie = '5844f0b4-a9b6-4edd-9e92-de9df2747be5'
//             break;
//         case 'Ford против Ferrari':
//             obj.movie = 'e012c688-e3d1-4e23-8871-6387d9f6a1ee'
//             break;
//         case '3022':
//             obj.movie = '239dc840-396c-41f2-89f1-a95bce35861e'
//             break;
//         case 'Бесславные ублюдки':
//             obj.movie = 'c413f28c-d318-4501-b5e7-4621fdb0c273'
//             break;
//         case 'Джанго освобождённый':
//             obj.movie = '2208374b-5297-4c21-ae20-f6f67960b06d'
//             break;
//         case 'Ещё по одной':
//             obj.movie = '03b2e6dd-0f34-4c97-9748-7c2ea0a07ce6'
//             break;
//     }
//     return obj
// })
// let WNun = 0;
// while (WNun < 88) {
//     let obj = finalRes[WNun]
//     Characters.create( { 
//         name: obj.character,
//         actorId: obj.actorIdentifier,
//         movieID: obj.movie
//     } )
//     WNun++
// }

// 123321.truncate();