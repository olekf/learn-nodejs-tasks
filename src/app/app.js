import express from 'express';
import morgan from 'morgan';
import { userRouter } from '../routes/user';
import { authRouter } from '../routes/auth';
import { logger } from '../config/winston';

const app = express();

app.listen(3000);
app.use(express.json());
app.use(morgan(':method :url'));
app.use('/', authRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} Error message: ${err.message}`);
    res.status(500).send('Internal Server Error');
    next();
});
