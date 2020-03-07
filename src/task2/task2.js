import express from 'express';
import { userRouter } from '../routes/user';

const app = express();

app.listen(3000);
app.use(express.json());
app.use('/users', userRouter);
