export default class Views {
    public Title: string;
    public Id: string;
    public Url: string;
    constructor(
        Title: string,
        Id: string,
        Url: string
    ) {
        this.Title = Title;
        this.Id = Id;
        this.Url = Url;
    }
}