import express from 'express';
import { groupRepository } from '../models/group';
import { validatePostGroupSchema } from '../routes/validation';

export const groupRouter = express.Router();

groupRouter.param('id', (req, res, next, id) => {
    req.group = groupRepository.getGroupById(id);
    return next();
});

groupRouter.route('/:id')
    .get((req, res) => {
        res.json(req.group);
    });

groupRouter.route('/')
    .get((req, res) => {
        res.json(groupRepository.getAllGroups());
    })
    .post(validatePostGroupSchema())
    .post((req, res) => {
        const group = groupRepository.createGroup(req.body);
        res.json(group);
    });
