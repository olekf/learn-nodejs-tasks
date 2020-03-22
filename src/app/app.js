import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { userRouter } from '../routes/user';
import { rootRouter } from '../routes/root';
import { logger } from '../config/winston';
import { corsOptions } from '../config/cors';

const app = express();

app.listen(3000);
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan(':method :url'));
app.use('/', rootRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} Error message: ${err.message}`);
    res.status(500).send('Internal Server Error');
    next();
});
