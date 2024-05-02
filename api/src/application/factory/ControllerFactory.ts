import {
    TaskControllerImpl,
} from '@infra/http/controller';

export class ControllerFactory {
    constructor(readonly useCasesFactory: any) { }

    controllers() {
        return {
            taskController: this.getControllerTask(),
        };
    }

    private getControllerTask() {
        const useCases = this.useCasesFactory.useCases().task;

        return new TaskControllerImpl({
            getOne: useCases.getOne,
            getAll: useCases.getAll,
            createTask: useCases.createTask,
            updateTask: useCases.updateTask,
            removeTask: useCases.removeTask,
        });
    }
}