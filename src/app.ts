/* eslint-disable simple-import-sort/imports */
/* eslint-disable prettier/prettier */
import express from 'express';
import path from 'path';
//import bodyParser from 'body-parser';

import { loadApiEndpoints } from './controllers/api';
import usuarioRoutes from './routes/usuario.router';
import parqueaderoRoutes from './routes/parqueadero.router';
// Create Express server
const app = express();
// Express configuration
app.set('port', process.env.PORT ?? 3000);
app.use(express.json()); // middeleware que transforma la req.body a un json
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);
app.use('/usuarios', usuarioRoutes);
app.use('/parqueaderos', parqueaderoRoutes);

loadApiEndpoints(app);

export default app;
