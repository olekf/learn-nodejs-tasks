import express from 'express';
import util from 'util';
import userRepository from './userRepository';

const app = express();
const router = express.Router();

app.listen(3000);
app.use(express.json());
app.use(router);

router.param('id', (req, res, next, id) => {
    const user = userRepository.getUserById(id);
    if (user.id === undefined) {
        const err = new Error(util.format('User not Found: %s', id));
        err.status = 404;
        return next(err);
    }
    req.user = user;
    return next();
});

router.route('/users/:id')
    .get((req, res) => {
        res.json(req.user);
    })
    .put((req, res) => {
        const updatedUser = userRepository.updateUser(req.user.id, req.body);
        res.json(updatedUser);
    })
    .delete((req, res) => {
        userRepository.removeUser(req.user.id);
        res.sendStatus(200);
    });

router.route('/users')
    .get((req, res) => {
        const loginSubstring = req.query.loginSubstring;
        const limit = req.query.limit;
        if (loginSubstring === undefined || limit === undefined) {
            res.json(userRepository.getAllUsers());
        } else {
            res.json(userRepository.getAutoSuggestUsers(loginSubstring, Number.parseInt(limit, 10)));
        }
    })
    .post((req, res) => {
        const storedUser = userRepository.createUser(req.body);
        res.json(storedUser);
    });
