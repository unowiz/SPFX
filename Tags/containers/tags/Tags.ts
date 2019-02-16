export default class Tags {
    public title: string;
    public id: string;
    public active: boolean;
    public defaultTag: boolean;

    constructor(title: string, id: string, active: boolean, defaultTag: boolean = false) {
        this.title = title;
        this.id = id;
        this.active = active;
        this.defaultTag = defaultTag;
    }
}