import express from 'express';
import jwt from 'jsonwebtoken';
import { validateAuthenticateSchema } from './validation';
import { userRepository } from '../models/user';

export const authRouter = express.Router();

const loginPath = '/login';
const secret = process.env.JWT_SECRET || 'JWT_SECRET';

authRouter.route('*')
    .all((req, res, next) => {
        if (req.path === loginPath) {
            return next();
        }

        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(401).send('No token provided');
        } else {
            jwt.verify(token, secret, err => {
                if (err) {
                    res.status(403).send('Failed to authenticate token');
                } else {
                    return next();
                }
            });
        }
    });

authRouter.route(loginPath)
    .post(validateAuthenticateSchema())
    .post((req, res) => {
        const user = userRepository.getUserByLogin(req.body.username);

        if (!user || user.password !== req.body.password) {
            res.status(403).send('Bad username/password combination');
        } else {
            const payload = { userId: user.id };
            const token = jwt.sign(payload, secret, { expiresIn: 120 });
            res.send(token);
        }
    });
