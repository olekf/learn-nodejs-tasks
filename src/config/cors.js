const whitelist = ['http://example1.com', 'http://example2.com', `http://localhost:${process.env.PORT}`];

export const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            return callback(null, true);
        }

        return callback(new Error(`Not allowed by CORS: ${origin}`));
    }
};
