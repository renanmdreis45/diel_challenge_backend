import crypto from 'crypto';

export default class Task {

    updatedAt?: Date;
    initDate?: Date;
    title?: string;
    duration?: string;
    description?: string;

    constructor(
        readonly id: string,
        readonly createdAt: Date,
        title?: string,
        description?: string,
        duration?: string,
        initDate?: Date,
        updatedAt?: Date,
    ) {
        this.title = title;
        this.initDate = initDate;
        this.updatedAt = updatedAt;
        this.duration = duration;
        this.description = description;
    }

    static create(title: string, description: string, duration: string, initDate: Date) {
        const taskId = crypto.randomUUID();


        return new Task(taskId, new Date(), title, description, duration, initDate);
    }

    update(title: string, description: string, duration: string, initDate: Date) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.initDate = initDate;
        this.updatedAt = new Date();
    }
}