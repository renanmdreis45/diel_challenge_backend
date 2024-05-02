import { Request, Response } from 'express';
import { TaskController, TaskUseCases } from '@application/controller/TaskController';

export class TaskControllerImpl implements TaskController {
    constructor(readonly useCases: TaskUseCases) { }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;

        // chamar o useCase
        const task = await this.useCases.getOne.execute(id);

        // retornar o response
        res.status(200).json({
            task,
        });
    }

    async getAll(req: Request, res: Response) {
        const { limit, offset } = req.pagination;
        const { startDate, endDate } = req.filters;

        const tasks = await this.useCases.getAll.execute(
            limit,
            offset,
            startDate,
            endDate,
        );

        res.status(200).json(tasks);
    }

    async create(req: Request, res: Response) {
        const { title, description, duration, initDate } = req.body;
        const task = await this.useCases.createTask.execute(title, description, duration, initDate);

        res.status(200).json({
            task: task,
        });
    }

    async update(req: Request, res: Response) {
        const { id: taskId } = req.params;
        const { title, description, duration, initDate } = req.body;
        const task = await this.useCases.updateTask.execute(
            taskId,
            title,
            description,
            duration,
            initDate
        );

        res.status(201).json({ task: task });
    }

    async delete(req: Request, res: Response) {
        const { id: taskId } = req.params;
        await this.useCases.removeTask.execute(taskId);

        res.status(201).send("Task deletada com sucesso");
    }
}