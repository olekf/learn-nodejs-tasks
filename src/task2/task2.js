import express from 'express';
import Joi from 'joi';
import userRepository from './userRepository';

const app = express();
const router = express.Router();

const optionalLoginRule = Joi.string().alphanum().min(3).max(30);
const optionalPasswordRule = Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/);
const optionalAgeRule = Joi.number().min(4).max(130);

const postUserSchema = Joi.object().keys({
    login: optionalLoginRule.required(),
    password: optionalPasswordRule.required(),
    age: optionalAgeRule.required()
});

const putUserSchema = Joi.object().keys({
    login: optionalLoginRule,
    password: optionalPasswordRule,
    age: optionalAgeRule
});

app.listen(3000);
app.use(express.json());
app.use('/', router);

router.param('id', (req, res, next, id) => {
    req.user = userRepository.getUserById(id);
    return next();
});

router.route('/users/:id')
    .get((req, res) => {
        res.json(req.user);
    })
    .put(validateSchema(putUserSchema))
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
    .post(validateSchema(postUserSchema))
    .post((req, res) => {
        const storedUser = userRepository.createUser(req.body);
        res.json(storedUser);
    });

function errorResponse(schemaErrors) {
    const errors = schemaErrors.map(error => {
        const { path, message } = error;
        return { path, message };
    });

    return {
        status: 'failed',
        errors
    };
}

function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
}
