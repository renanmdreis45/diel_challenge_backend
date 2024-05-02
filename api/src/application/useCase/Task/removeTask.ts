import { TaskRepository } from "../../repository";

export class RemoveTask {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(taskId: string) {
        await this.taskRepository.delete(taskId);
    }
}