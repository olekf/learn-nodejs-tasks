import express from 'express';
import { userRepository } from '../models/user';
import { validatePostUserSchema, validatePutUserSchema } from '../routes/validation';

export const userRouter = express.Router();

userRouter.param('id', (req, res, next, id) => {
    req.user = userRepository.getUserById(id);
    return next();
});

userRouter.route('/:id')
    .get((req, res) => {
        res.json(req.user);
    })
    .put(validatePostUserSchema())
    .put((req, res) => {
        const updatedUser = userRepository.updateUser(req.user.id, req.body);
        res.json(updatedUser);
    })
    .delete((req, res) => {
        userRepository.removeUser(req.user.id);
        res.sendStatus(200);
    });

userRouter.route('/')
    .get((req, res) => {
        const loginSubstring = req.query.loginSubstring;
        const limit = req.query.limit;
        if (loginSubstring === undefined || limit === undefined) {
            res.json(userRepository.getAllUsers());
        } else {
            res.json(userRepository.getAutoSuggestUsers(loginSubstring, Number.parseInt(limit, 10)));
        }
    })
    .post(validatePutUserSchema())
    .post((req, res) => {
        const storedUser = userRepository.createUser(req.body);
        res.json(storedUser);
    });
