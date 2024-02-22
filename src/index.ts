// Importamos los módulos necesarios
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import path from 'path';
// Importar base de datos
import db from "./database/db.ts"
// Importar routes
import userRouter from './routes/userRouter';
import productRouter from './routes/productRouter';
import cartRouter from './routes/cartRouter';
import registerRouter from './routes/registerRouter';
import loginRouter from './routes/loginRouter';

// Nueva aplicación Express
const app = express();

// Middleware CORS para permitir solicitudes de origen cruzado
app.use(cors());

// Parseamos el cuerpo de las solicitudes entrantes en un formato JSON
app.use(express.json());

// Parseamos el cuerpo de las solicitudes entrantes con pares clave-valor codificados en url
app.use(express.urlencoded({ extended: true }));

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

// Ruta principal
app.get('/', [
    (req, res, next) => {
        res.send('Home')
    }
]);

// Definimos las rutas para nuestros endpoints
app.use('/routes/users', userRouter);
app.use('/routes/products', productRouter);
app.use('/routes/cart', cartRouter);
app.use('/routes/order', orderRouter);
app.use('/routes/register', registerRouter);
app.use('/routes/login', loginRouter);

// Middleware para registrar la fecha de la solicitud
app.use((req, res, next) => {
    console.log(new Date().toLocaleDateString());
    next();
});

// Middleware global
app.use(function(req, res, next) {
    console.log('Middleware global');
    next();
});

// Middleware de autenticación:
function authMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('Necesitas estar autenticado para realizar esta acción');
    }
}
app.use(authMiddleware);

// Middleware de validación:
function validationMiddleware(req, res, next) {
    // Aquí puedes validar los datos de la solicitud. Por ejemplo:
    if (!req.body.name) {
        res.status(400).send('El nombre es requerido');
    } else {
        next();
    }
}
app.use('/ruta', validationMiddleware);

// Middleware de manejo de errores:
function errorHandlerMiddleware(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('¡Ups! Algo salió mal.');
}
app.use(errorHandlerMiddleware);

// Conectar a MySQL. 
const connection = mysql.createConnection({host: 'localhost', user: 'root', password: '', database: 'nombrebd'});
connection.connect();

// Servimos archivos estáticos desde la carpeta 'public'
app.use('/static', express.static(path.join(__dirname, 'public')));

// Configuramos el motor de vistas y la carpeta de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Sincronizamos todos los modelos con la base de datos
(async () => {
    await db.sequelize.sync();
})();

// Iniciamos el servidor en el puerto 8000
app.listen(8000, () => console.log("SERVER STARTED"));
