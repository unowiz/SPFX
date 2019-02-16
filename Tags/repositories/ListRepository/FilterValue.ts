export default class FilterValue
{
    public value:string;
    public fieldName:string;
    public fieldType:string;

    constructor(value:string, fieldName:string, fieldType:string = null)
    {
        this.value = value;
        this.fieldName = fieldName;
        this.fieldType = fieldType;
    }
}