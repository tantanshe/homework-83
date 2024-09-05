import express from 'express';
import mongoose from 'mongoose';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/', artistsRouter);
app.use('/', albumsRouter);
app.use('/', tracksRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost');

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);