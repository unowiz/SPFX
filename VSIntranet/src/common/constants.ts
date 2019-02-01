import { SettingsRepository } from "../repositories/SettingsRepository";
import { UserProfileRepository } from "../repositories/UserProfileRepository/UserProfileRepository";
import { CacheManager } from "./CacheManager";

/**
 * A class full of constants.
 */
export class Constants {
    /**
     * The version of the code base. This is used to handle automatic cache purge when a new release is deployed.
     */
    public static Version: string = "0.0.0.2";

    /**
     * The url to the global site collection.
     */
    public static GlobalUrl: string = "https://securitassp.sharepoint.com/sites/global"; //window.location.origin;

    /**
     * The web relative url of the list where the divider/widget items are stored
     */
    public static DividerListUrl: string = "/Lists/DividerLink";
    
    /**
     * The id of the schema extension for user settings
     */
    public static UserSettingsSchemaExtensionId = "extroqpgteq_verisureUserSettings";
}
