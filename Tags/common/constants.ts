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
    public static GlobalUrl: string = "https://securitassp.sharepoint.com/sites/americo-dev"; //window.location.origin;

    /**
     * The web relative url of the list where the QuickLinks/widget items are stored
     */
    public static QuickLinksListUrl: string = "/Lists/QuickLinks";

    /**
     * The web relative url of the list where the Tags items are stored
     */
    public static TagsListUrl: string = "/Lists/Tags";
    
    /**
     * The id of the schema extension for user settings
     */
    public static UserSettingsSchemaId = "com.verisure.usersettings";

    /**
     * The web relative url to the list holding the top level items of the mega menul
     */
    public static MegaMenuLevel1ItemsListUrl:string = "/Lists/MegaMenuItemsLevel1";
    
    /**
     * The web relative url to the list holding the level 2 items of the mega menul
     */
    public static MegaMenuLevel2ItemsListUrl:string = "/Lists/MegaMenuItemsLevel2";
}
