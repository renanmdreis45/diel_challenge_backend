import { TaskUseCaseFactory } from "./useCase/TaskUseCaseFactory";

export class UseCaseFactory {
    constructor(readonly repositories: any) { }

    useCases() {
        return {
            task: new TaskUseCaseFactory(this.repositories.taskRepository).useCases(),
        };
    }
}