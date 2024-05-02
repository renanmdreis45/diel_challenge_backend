import {
    GetTask,
    CreateTask,
    ListTask,
    UpdateTask,
    RemoveTask
} from '../../useCase/Task';

export class TaskUseCaseFactory {
    constructor(readonly taskRepository: any) { }

    useCases() {
        return {
            getOne: new GetTask(this.taskRepository),
            getAll: new ListTask(this.taskRepository),
            createTask: new CreateTask(this.taskRepository),
            updateTask: new UpdateTask(this.taskRepository),
            removeTask: new RemoveTask(this.taskRepository),
        };
    }
}