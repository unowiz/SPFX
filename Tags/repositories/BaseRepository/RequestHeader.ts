/**
 * Represents a request header to be sent with an http request.s
 */
export class RequestHeader {
    public name: string;
    public value: string;
    constructor(name: string, value: string) {
        this.name =  name;
        this.value = value;
    }
}
