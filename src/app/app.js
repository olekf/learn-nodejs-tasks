import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { userRouter } from '../routes/user';
import { groupRouter } from '../routes/group';
import { authRouter } from '../routes/auth';
import { logger } from '../config/winston';
import { corsOptions } from '../config/cors';

const app = express();

app.listen(process.env.PORT);
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan(':method :url'));
app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.url} Error message: ${err.message}`);
    res.status(500).send('Internal Server Error');
    next();
});

process
    .on('unhandledRejection', (reason, promise) => {
        logger.error('Unhandled rejection', { rejectionReason: reason, rejectionPromise: promise });
    })
    .on('uncaughtException', err => {
        logger.error('Uncaught exception thrown', { uncaughtError: err });
        process.exit(1);
    });
