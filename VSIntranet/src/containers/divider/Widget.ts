export enum WidgetSource {
    Global,
    Local
}

export default class Widget {
    public title: string;
    public url: string;
    public icon: string;
    public id: string;
    public source: WidgetSource;

    constructor(title: string, id: string, url: string, icon:string, source:WidgetSource)
    {
        this.title = title;
        this.url = url;
        this.icon = icon;
        this.id = id;
        this.source = source;
    }
}