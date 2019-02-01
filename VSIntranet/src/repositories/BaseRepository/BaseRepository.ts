import { ResponseData } from "./ResponseData";
import { RequestHeader } from "./RequestHeader";
import { CacheManager } from "../../common/CacheManager";

export class BaseRepository {

    /**
     * Gets data from url
     * If cacheResult is true it will use the cacheKey to save the 
     * fetched result into the Cache
     * @param url The request url.
     * @param headers The request headers.
     * @param cacheResult True if a cached value should be returned.
     * @param cacheKey The cache key.
     */
    public async get(url: string, headers: Array<RequestHeader>, cacheResult: boolean, cacheKey: string) : Promise<ResponseData>
    {
        if (cacheResult){
            var cacheManager = new CacheManager();
            var cachedValue = cacheManager.get(cacheKey);

            if (cachedValue != null) {
                return new Promise<any>((resolve) => {
                    resolve(cachedValue);
                });
            }
        }

        return this.sendRequest(url, 'GET', null, headers, cacheResult, cacheKey);
    }

    /**
     * Posts the body to the provided url.
     * @param url The request url
     * @param body The body to add to the response.
     * @param headers The request headers.
     */
    public async post(url: string, body: string, headers: Array<RequestHeader> = null) : Promise<ResponseData>
    {

        return this.sendRequest(url, 'POST', body, headers, false, null);
    }

    /**
     * Parses the result from the provided XMLHttpRequest object.
     * @param xhr The XMLHttpRequest object to parse 
     * @returns A ResponseData object representing the result from the provided request.
     */
    private parseXHRResult(xhr: XMLHttpRequest): ResponseData {
        
        return {
            ok: xhr.status >= 200 && xhr.status < 300,
            body: xhr.responseText,
            headers: xhr.getAllResponseHeaders(),
            status: xhr.status,
            statusText: xhr.statusText,
            json: JSON.parse(xhr.responseText),
        };
    }

    /**
     * Creates an error response.
     * @param xhr The request.
     * @param message A custom message that will be included in the error response.
     */
    private errorResponse(xhr: XMLHttpRequest, message: string) : ResponseData {
        return {
            ok: false,
            body: message || xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            json: message || xhr.statusText,
            status: xhr.status,
            statusText: xhr.statusText
        };
    }

    /**
     * Sends a request based on the provided parameters.
     * The response will be stored in the cache if cacheResult is set to true.
     * @param url The request url
     * @param httpMethod The method for the request (GET, POST, etc.)
     * @param body The body of the request.
     * @param headers Array with request headers.
     * @param cacheResult True if the response should be cached.
     * @param cacheKey Key to store the response with in the cache.
     * @returns The promise for the request.
     */
    private async sendRequest(url: string, httpMethod: string, body: string, headers: Array<RequestHeader>, cacheResult: boolean, cacheKey: string) : Promise<ResponseData> {
        return new Promise<ResponseData>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(httpMethod, url);

            if (headers) {
                headers.forEach(h => xhr.setRequestHeader(h.name, h.value));
            }

            xhr.onload = evt => {
                var result = this.parseXHRResult(xhr);
                if (result.status >= 200 && result.status < 300 && cacheResult) {
                    var cacheManager = new CacheManager();
                    cacheManager.set(cacheKey, result);
                }

                resolve(result);
            };

            xhr.onerror = evt => {
                reject(this.errorResponse(xhr, 'Request failed!'));
            };

            if (httpMethod === 'POST') {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(body));
            }
            else {
                xhr.send();
            }
        });
    }
}
