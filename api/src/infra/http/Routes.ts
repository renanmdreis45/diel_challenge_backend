import express from 'express';
import { ControllerFactory } from '@application/factory/ControllerFactory';
import { getPagination, getFilters, validateBody } from './middleware';
import { createTaskSchema, updateTaskSchema } from './schemas/TaskSchema';

export default class Routes {
    constructor(readonly controllerFactory: ControllerFactory) { }

    routes(): express.Router {
        const router = express.Router();

        const { taskController } =
            this.controllerFactory.controllers();

        router.get('/', (req, res) => res.sendStatus(200));

        router.get(
            '/task',
            getPagination,
            getFilters,
            taskController.getAll.bind(taskController)
        );

        router.get('/task/:id', taskController.getOne.bind(taskController));
        router.post(
            '/task',
            validateBody(createTaskSchema),
            taskController.create.bind(taskController)
        );
        router.put(
            '/task/:id',
            validateBody(updateTaskSchema),
            taskController.update.bind(taskController)
        );

        router.delete(
            '/task/:id', 
            taskController.delete.bind(taskController)
        );

        return router;
    }
}