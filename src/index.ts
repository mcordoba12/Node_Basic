import express, {Express , Request, Response} from 'express';

import { userRouter} from './routes/index';

const app: Express = express(); // Crear una instancia de Express


process.loadEnvFile(); // Cargar variables de entorno desde un archivo .env si existe

//console.log(process.env.PORT); // Imprimir el puerto desde las variables de entorno

const port = process.env.PORT || 3000; // Usar el puerto de las variables de entorno 

app.use(express.json()); // Middleware para analizar cuerpos JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar cuerpos codificados en URL


app.use('/api/users', userRouter.router); // Usar las rutas de usuario

app.get('/', (req: Request, res: Response) => {  //Cuando llegue un / diga hola mundo
  res.send('Hola Mundo'); // Responda con un mensaje sencillo
});

app.get('/api', (req: Request, res: Response) => { // Cuando llegue un /api diga hola api
  res.send('Hola API'); // Responda con un mensaje sencillo 
});

app.listen(port, () => {
  console.log(`Server is runnig on port 3000 ${port}`); // Registro cuando se inicia el servidor
}); // Inicie el servidor en el puerto 3000

export default app; // Exportar la instancia de la aplicación para pruebas o usos posteriores