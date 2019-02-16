import { Web } from "@pnp/sp";
import { Settings, SPListConfigurationProvider} from "@pnp/config-store";
import { Constants } from "../common/constants";
import { CacheManager } from "../common/CacheManager";
import { UserProfileRepository } from "./UserProfileRepository/UserProfileRepository";

/**
 * Class for fetching settings.
 */
export class SettingsRepository { 
    private settings = new Settings();
    private countrySettings = new Settings();
    private rootWeb = new Web(Constants.GlobalUrl);

    /**
     * Returns the url for the provided country name
     * @param countryName The name of the country as specified in the Countries list in the global site collection.
     * @returns The url for the country.
     */
    private async getCountryUrl(countryName: string): Promise<string> {
        const provider = new SPListConfigurationProvider(this.rootWeb, "Countries", "Title", "verUrl");
        const wrappedProvider = provider.asCaching();
        await this.countrySettings.load(wrappedProvider);
        return new Promise<string>((resolve) => {resolve(this.countrySettings.get(countryName));});
    }

    /**
     * Returns the configured value for the provided key.
     * @param key The key for the setting to return.
     * @returns The value associated with the provided key from the Settings list.
     */
    public async getSetting(key: string): Promise<string> {
        const provider = new SPListConfigurationProvider(this.rootWeb, "Settings");
        const wrappedProvider = provider.asCaching();
        await this.settings.load(wrappedProvider);
        return new Promise<string>((resolve) => { resolve(this.settings.get(key)); } );
    }

    /**
     * Returns the url to the country site collection that the current user belongs to.
     * @returns Country site url
     */
    public CountryUrl(): Promise<string> {
        return this.getUserCountry();
    }

    /**
     * Returns the url to the users country site based on the current user profile.
     * @returns The url to the current users country site collection.
     */
    private async getUserCountry(): Promise<string>{
        var cacheKey = "getUserCountryCacheKey";
        
        var cacheManager = new CacheManager();
        var cachedValue = cacheManager.get(cacheKey);

        if (cachedValue) {
            return new Promise<string>((resolve) => { resolve(cachedValue);});
        }
        
        let settings = new SettingsRepository();
        var userProps;

        let profileRepository = new UserProfileRepository(Constants.GlobalUrl);
        await profileRepository.getCurrentUserProperties().then((response) => {
            userProps = profileRepository.parseResponse(response);
        });

        let countryProp = userProps.UserProfileProperties.results.find((el) => { return el.Key === "Department";});

        let country = countryProp ? countryProp.Value : "Sweden";


        var countryUrl = settings.getCountryUrl(country);

        countryUrl.then((response) => {
            cacheManager.set(cacheKey, response);
        });

        return countryUrl;
    }
}