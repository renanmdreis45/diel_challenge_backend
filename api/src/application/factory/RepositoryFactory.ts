import {
    TaskRepositoryImpl,
} from '@infra/database/repository';

export class RepositoryFactory {
    constructor(readonly dbConnection: any) { }

    repositories() {
        return {
            taskRepository: new TaskRepositoryImpl(this.dbConnection),
        };
    }
}