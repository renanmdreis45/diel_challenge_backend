import Task from "@domain/entity/Task";
import { TaskRepository } from "../../repository";

export class CreateTask {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(title: string, description: string, duration: string, initDate: Date) {
        const task = Task.create(title, description, duration, initDate);

        this.taskRepository.create(task);

        return task;
    }
}