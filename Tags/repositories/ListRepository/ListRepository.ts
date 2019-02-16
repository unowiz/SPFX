import { BaseRepository } from "../BaseRepository/BaseRepository";
import { RequestHeader } from "../BaseRepository/RequestHeader";
import { ResponseData } from "../BaseRepository/ResponseData";
import { Utilities } from "../../common/Utilities";
import FilterValue from "./FilterValue";
import { CacheManager } from "../../common/CacheManager";

import pnp, { Web } from "sp-pnp-js";

/**
 * Repository used to query SharePoint lists.
 */
export class ListRepository extends BaseRepository{
    private webUrl: string;
    constructor (webUrl: string) {
        super();
        webUrl = Utilities.trimUrl(webUrl);
        
        this.webUrl = webUrl;
    }

    /**
     * Gets items from the list with according to the provided parameters.
     * @param listTitle Title of the list to fetch items from.
     * @param cacheKey Key used to store the response in the cache. If this is null, the response is not cached.
     * @param itemCount Number of items to return
     * @param filter Logical expression for filtering list items
     * @param selectProperties An array containing the fields to be loaded.
     * @returns A Promise containing a ResponseData object holding the matching list items.
     */
    public getListItemsByTitle(listTitle: string, cacheKey: string, itemCount: number = 0, filter: string = null, selectProperties: Array<string> = null): Promise<ResponseData>{
        var cacheResult = cacheKey != null;
        var url = `${this.webUrl}/_api/web/lists/GetByTitle('${listTitle}')/items`;

        if (itemCount > 0) {
            url = Utilities.addQueryString(url, '$top', ''+itemCount);
        }

        if (filter) {
            url = Utilities.addQueryString(url, '$filter', filter);
        }

        if (selectProperties) {
            var value = selectProperties.join(',');
            url = Utilities.addQueryString(url, '$select', value);
        }

        var requestHeaders: Array<RequestHeader> = [{name: 'accept', value: 'application/json;odata=verbose' }];

        return this.get(url, requestHeaders, cacheResult, cacheKey);
    }

    public buildCaml(operator: string, fieldRef: string, value: string, seed: string): string {
        return `<${operator}>${fieldRef}${seed}</${operator}>`;
    }

    public getListItemsByUrlWithManagedMetadataFields(listUrl: string, cacheKey: string, caml:string): Promise<any[]> {
        var cacheResult = cacheKey != null;

        if (cacheResult) {
            let manager = new CacheManager();
            let cachedValue = manager.get(cacheKey);
            if (cachedValue) {
                return new Promise<any>((resolve) => {
                    resolve(cachedValue);
                });
            }
        }

        listUrl = listUrl.toLowerCase();
        if (listUrl.startsWith('/lists/')) {
            listUrl = `${this.webUrl}${listUrl}`;
        }

        listUrl = listUrl.replace(window.location.origin, '');

        return pnp.sp.web.getList(listUrl).getItemsByCAMLQuery({ViewXml: caml});
    }

    /**
     * Gets items from the list with according to the provided parameters.
     * @param listUrl Absolute, server relative OR web relative url to the list to fetch items from.
     * @param cacheKey Key used to store the response in the cache. If this is null, the response is not cached.
     * @param itemCount Number of items to return
     * @param filter Logical expression for filtering list items
     * @param selectProperties An array containing the fields to be loaded.
     * @returns A Promise containing a ResponseData object holding the matching list items.
     */
    public getListItemsByUrl(listUrl: string, cacheKey: string, itemCount: number = 0, filter: string = null, selectProperties: Array<string> = null, expandProperties: Array<string> = null): Promise<any[]>{
        var cacheResult = cacheKey != null;

        if (cacheResult) {
            let manager = new CacheManager();
            let cachedValue = manager.get(cacheKey);
            if (cachedValue) {
                return new Promise<any>((resolve) => {
                    resolve(cachedValue);
                });
            }
        }

        listUrl = listUrl.toLowerCase();
        if (listUrl.startsWith('/lists/')) {
            listUrl = `${this.webUrl}${listUrl}`;
        }

        listUrl = listUrl.replace(window.location.origin, '');

        var web = new Web(this.webUrl);

        var promise = web.getList(listUrl).items;

        if (filter) {
            promise = promise.filter(filter);
        }

        if (selectProperties) {
            let value = selectProperties.join(',');
            promise = promise.select(value);
        }

        if (expandProperties) {
            let value = expandProperties.join(',');
            promise = promise.expand(value);
        }

        return promise.get();
    }

    /**
     * Parses the provided ResponseData to an array of objects
     * @param data The ResponseData to be parsed.
     * @returns An array of objects representing the provided ResponseData.
     */
    public parseResponse(data: ResponseData): Array<object> {
        var result = data.json;
        
        if (!result.hasOwnProperty("d")) {
            return null;
        }

        var d = result["d"];

        if (!d.hasOwnProperty("results")) {
            return null;
        }
        
        return d['results'];
    }
}
