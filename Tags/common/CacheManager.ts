import { Constants } from "./constants";

/**
 * Class that handles the cache.
 */
export class CacheManager {
    private cachePrefix: string = "VerisureCache";
    private versionNumberKey: string = this.cachePrefix + "VersionNumber";
    
    /**
    * Gets a value from the cache
    *
    * @param key Key stored in cache object
    * @returns The cached value
    */
    public get(key:string) : any {
        this.clearIfOldVersion();
        var stringValue = sessionStorage[this.cachePrefix + key];
        if (!stringValue) {
            return null;
        }

        var value = JSON.parse(stringValue);
        return value;
    }

    /**
    * Sets the provided value in the cache.
    *
    * @param key Key to associate the value with in the cache.
    * @param value The value to store in the cache.
    */
    public set(key:string, value: any) {
        this.clearIfOldVersion();
        sessionStorage[this.cachePrefix + key] = JSON.stringify(value);
    }

    /**
     * Clears the cache
     */
    public clear(){
        sessionStorage.clear();   
    }

    /**
    * Checks if the cache is from an old version of the project. The cache is cleared if it is.
    */
    private clearIfOldVersion() {
        var currentVersion = sessionStorage[this.versionNumberKey];

        if (currentVersion !== Constants.Version) {
            this.clear();
            sessionStorage[this.versionNumberKey] = Constants.Version;
        }
    }
}