import express from 'express';
import userRepository from './userRepository';

const app = express();
const router = express.Router();

app.listen(3000);
app.use(express.json());
app.use(router);

router.param('id', (req, res, next, id) => {
    req.user = userRepository.getUserById(id);
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
