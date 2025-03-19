import express from "express";
import cors from "cors";
import { Sequelize, DataTypes, Op } from "sequelize";
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
                        let shortAchievsInfo = achievs.map(item =>
                            Object.assign( item, 
                                { 
                                    awardName: 'Премия?',
                                    imgPath: 'icons/avards/awardGoldenGlobe.png'
                                }
                            )
                        );
                        awards.push([...shortAchievsInfo]);
                        // awards.push(['номинация на премию', ...achievs]);
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