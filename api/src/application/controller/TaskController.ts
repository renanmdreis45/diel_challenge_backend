import { Request, Response } from 'express';
import { CreateTask, RemoveTask, UpdateTask} from '../useCase/Task';
import { GetTask } from '../useCase/Task/GetTask';
import { ListTask } from '../useCase/Task/ListTask';

export type TaskUseCases = {
    createTask: CreateTask;
    updateTask: UpdateTask;
    getOne: GetTask;
    getAll: ListTask;
    removeTask: RemoveTask;
};

export interface TaskController {
    getOne(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}