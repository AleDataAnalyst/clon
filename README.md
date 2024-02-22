index.ts
import express from 'express';: Importa el módulo Express, que es un marco de aplicación web para Node.js.
import cors from 'cors';: Importa el módulo CORS (Cross-Origin Resource Sharing), que permite solicitudes AJAX entre dominios.
import path from 'path';: Importa el módulo Path, que proporciona utilidades para trabajar con rutas de archivos y directorios.
import db from "./database/db.js";: Importa la configuración de la base de datos desde el archivo db.js.
import UserModel from '../models/UserModel.ts';: Importa el modelo de usuario desde el archivo UserModel.ts.
import ProductModel from '../models/productModel.ts';: Importa el modelo de producto desde el archivo productModel.ts.
import userRouter from './routes/users/userRouter';: Importa el router de usuario desde el archivo userRouter.
import productRouter from './routes/productRouter';: Importa el router de producto desde el archivo productRouter.
import loginRouter from './routes/loginRouter';: Importa el router de inicio de sesión desde el archivo loginRouter.
const app = express();: Crea una nueva aplicación Express.
app.use(cors());: Usa el middleware CORS en la aplicación Express.
app.use('/routes/users', userRouter);: Define la ruta para el router de usuario.
app.use('/routes/products', productRouter);: Define la ruta para el router de producto.
app.use('/routes/login', loginRouter);: Define la ruta para el router de inicio de sesión.
app.use(express.json());: Usa el middleware de análisis de JSON en la aplicación Express.
app.use(express.urlencoded({ extended: true }));: Usa el middleware de análisis de URL codificada en la aplicación Express.
app.use('/static', express.static(path.join(__dirname, 'public')));: Sirve archivos estáticos desde la carpeta ‘public’.
app.set('view engine', 'pug');: Configura el motor de vistas de la aplicación Express para usar Pug.
app.set('views', path.join(__dirname, 'views'));: Configura la carpeta de vistas de la aplicación Express.
(async () => { await db.sequelize.sync(); })();: Sincroniza todos los modelos con la base de datos.
app.use((req, res, next) => { console.log(new Date().toLocaleDateString()); next(); });: Usa un middleware para registrar la fecha de la solicitud.
app.get('/', [ (req, res, next) => { res.send('Home') } ]);: Define la ruta principal de la aplicación Express.
app.use(function(req, res, next) { console.log('Middleware global'); next(); });: Usa un middleware global.
app.listen(8000, () => console.log("SERVER STARTED"));: Inicia el servidor en el puerto 8000.