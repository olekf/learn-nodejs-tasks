import express from 'express';
import morgan from 'morgan';
import { userRouter } from '../routes/user';

const app = express();

app.listen(3000);
app.use(express.json());
app.use(morgan(':method :url'));
app.use('/users', userRouter);
