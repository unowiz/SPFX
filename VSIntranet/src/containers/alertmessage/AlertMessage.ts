export default class AlertMessage {
    public title: string;
    public message: string;
    public id: string;
    public active: boolean;

    constructor(title: string, message: string, id: string, active: boolean)
    {
        this.title = title;
        this.message = message;
        this.id = id;
        this.active = active;
    }
}