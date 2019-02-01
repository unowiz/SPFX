/**
 * Class responsible for holding the response data.
 */
export class ResponseData {
    public ok: boolean;
    public headers: string;
    public body: string;
    public json: any;
    public status: number;
    public statusText: string;
}