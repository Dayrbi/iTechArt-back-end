import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth.routes';
import { filmsRouter } from './routes/films.routes';
import { cinemasRouter } from './routes/cinemas.routes';
import { sessionsRouter } from './routes/session.routes';
import { ordersRouter } from './routes/orders.routes';

const app = express();

const PORT = config.get('port') || 8080;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/movies', filmsRouter);
app.use('/api/cinemas', cinemasRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/orders', ordersRouter);

async function Start() {
  try {
    await mongoose.connect(config.get('mongoUrl'));
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (e) {
    let errorMessage = 'Failed to do something';
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    console.log('Server is not work', errorMessage);
    process.exit(1);
  }
}
Start();
