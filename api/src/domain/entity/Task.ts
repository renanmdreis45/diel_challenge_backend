import crypto from 'crypto';

export default class Task {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly duration: string,
        readonly initDate: Date,
        readonly createdAt: Date,
    ) {}

    create(title: string, description: string, duration: string, initDate: Date) {
        const taskId = crypto.randomUUID();


        return new Task(taskId, title, description, duration, initDate, new Date());
    }
}