import express from 'express';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
routes(app);

export default app;
