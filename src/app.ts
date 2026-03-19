import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import router from './infra/http/routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);


export default app;