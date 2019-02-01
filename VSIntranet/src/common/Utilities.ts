/**
 * Contains useful utility functions.
 */
export class Utilities {
    /**
     * 
     * @param url The url to add a query strings to.
     * @param queryStringName The name of the query string.
     * @param queryStringValue The value of the query string.
     */
    public static addQueryString(url: string, queryStringName: string, queryStringValue: string) {
        if (url.indexOf('?') > -1) {
            return `${url}&${queryStringName}=${queryStringValue}`;
        }

        return `${url}?${queryStringName}=${queryStringValue}`;
    }

    /**
     * Removes the trailing / if it exists.
     * @param url Url to trim
     * @returns Returns the url without a trailing /.
     */
    public static trimUrl(url: string): string {
        if (url == null) {
            return url;
        }
        
        return url.trimEnd("/");
    }
}