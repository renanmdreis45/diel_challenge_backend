import { TaskRepository } from "../../repository";

export class UpdateTask {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(taskId: string, title: string, description: string, duration: string, initDate: Date ) {

        const task = await this.taskRepository.getOne(taskId);
        task.update(title ?? task.title, description ?? task.description, duration ?? task.duration, initDate ?? task.initDate);
        await this.taskRepository.update(task);

        return task;

    }
}