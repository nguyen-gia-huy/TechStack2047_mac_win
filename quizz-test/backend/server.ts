import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { appConfig } from './configs/appConfig';
import { databaseConfig } from './configs/databaseConfig';
import authRoutes from './routes/auth.route';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());




app.use(authRoutes);

mongoose.connect(databaseConfig.mongoURI);

const PORT = appConfig.port;

app.listen(PORT, () => {
	console.log(`Server đang hoạt động trên localhost:${PORT}`);
});
