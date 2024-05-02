import { TaskRepository } from '../../../application/repository/TaskRepository';
import Task from '../../../domain/entity/Task';
import { ListTaskResponse } from '../../../domain/interface/TaskList';

export class TaskRepositoryImpl implements TaskRepository {
    constructor(readonly dbConnection: any) { }

    async getOne(taskId: string): Promise<Task> {
        const taskData = await this.dbConnection('task')
            .where({ id: taskId })
            .first();

        const task = new Task(
            taskData.id,
            taskData.created_at,
            taskData.title,
            taskData.todo_date,
            taskData.updated_at,
            taskData.category_id ?? null,
        );

        return task;
    }

    async getAll(
        limit: Number,
        offset: Number,
        startDate?: Date | null,
        endDate?: Date | null,
    ): Promise<ListTaskResponse> {
        // count the total of tasks with the filters
        const { count, taskRows } =
            startDate && endDate
                ? await this.getAllWithFilters(limit, offset, startDate, endDate)
                : await this.getAllWithoutFilters(limit, offset);

        const tasks: Task[] = taskRows.map((task: any) => ({
            id: task.id,
            title: task.title,
            createdAt: task.created_at,
            updatedAt: task.updated_at,
            todoDate: task.todo_date ?? null,
            categoryId: task.category_id ?? null,
            done: task.done,
        }));

        return {
            count,
            tasks,
        };
    }

    private async getAllWithFilters(
        limit: Number,
        offset: Number,
        startDate?: Date | null,
        endDate?: Date | null
    ) {
        const [{ count }] = await this.dbConnection('task')
            .whereBetween('created_at', [startDate, endDate])
            .count();

        const taskRows = await this.dbConnection('task')
            .select('*')
            .limit(limit)
            .offset(offset)
            .whereBetween('created_at', [startDate, endDate])
            .orderBy('created_at', 'desc');

        return {
            count,
            taskRows,
        };
    }

    private async getAllWithoutFilters(
        limit: Number,
        offset: Number,
    ) {
        const [{ count }] = await this.dbConnection('task').count();

        const taskRows = await this.dbConnection('task')
            .select('*')
            .limit(limit)
            .offset(offset)
            .orderBy('created_at', 'desc');

        return {
            count,
            taskRows,
        };
    }

    async create(task: Task): Promise<void> {
        await this.dbConnection('task').insert({
            id: task.id,
            title: task.title,
            description: task.description,
            duration: task.duration,
            initDate: task.initDate,
            created_at: task.createdAt,
        });
    }
    async update(task: Task): Promise<void> {
        await this.dbConnection('task').where({ id: task.id }).update({
            title: task.title,
            descrioption: task.description,
            duration: task.duration,
            initDate: task.initDate,
            updated_at: task.updatedAt,
        });
    }

    async delete(taskId: string): Promise<void> {
        await this.dbConnection('task').where({id: taskId}).del();
    }
}