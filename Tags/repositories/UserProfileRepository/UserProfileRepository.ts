import { BaseRepository } from "../BaseRepository/BaseRepository";
import { Utilities } from "../../common/Utilities";
import { ResponseData } from "../BaseRepository/ResponseData";
import { RequestHeader } from "../BaseRepository/RequestHeader";
import { MsGraphRepository } from "../MsGraphRepository/MsGraphRepository";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { WebPart } from "@pnp/sp";
import { UserSettings } from "../../common/UserSettings";
import { Constants } from "../../common/constants";
import { CacheManager } from "../../common/CacheManager";

export class UserProfileRepository extends BaseRepository {
    private url: string;
    private readonly userSettingsCacheKey = 'UserProfileRepository-UserSettings';

    private context: WebPartContext;
    /**
     * Constructor.
     * @param url Absolut url to the web used for fetching user profiles.
     */
    constructor(url: string){
        super();

        this.url = Utilities.trimUrl(url);
    }

    /**
     * Returns the value for the provided property for from the current users User Profile.
     * @param propertyName Name of the property to fethc.
     * @returns The profile value.
     */
    public getCurrentUserProperties() : Promise<ResponseData> {
        var cacheKey = 'verisuries-getCurrentUserProperty';
        let url = `${this.url}/_api/sp.userprofiles.peoplemanager/getmyproperties`;
        
        let requestHeaders: Array<RequestHeader> = [{name: 'accept', value: 'application/json;odata=verbose' }];
        

        return this.get(url, requestHeaders, true, cacheKey);
    }

    /**
     * Updates the user with the provided settings object.
     * @param context The WebPartContext to be used for calling MS Graph.
     * @param settings The UserSettings object holding the updated values to be written to the user.
     */
    public updateUserExtension(context:any, settings:UserSettings): Promise<any> {
        let graphManager = new MsGraphRepository(context);

        let cacheManager = new CacheManager();
        cacheManager.set(this.userSettingsCacheKey, null);

        return graphManager.patchUserSettings(settings);
    }

    /**
     * TODO: This is a temporary function and it should be moved into getCurrentUserProperties (and that function should return a typed result).
     * @param context The WebPartContext to be used for calling MS Graph.
     * @returns The current users settings.
     */
    public async getUserExtensionValues(context: any): Promise<UserSettings> {
        // let cacheManager = new CacheManager();
        // let cachedValue = cacheManager.get(this.userSettingsCacheKey);
        // if (cachedValue) {
        //     return new Promise<UserSettings>(async (resolve) => {
        //         resolve(JSON.parse(cachedValue));
        //     });
        // }
        
        let graphManager = new MsGraphRepository(context);
        let result:Promise<any>;
        try{
            result = await graphManager.getQuery(`/me/extensions/${Constants.UserSettingsSchemaId}`);
        }
        catch (error){
            console.log("Couldnt find UserSettings extension, create it");
            let content = {
                "@odata.type": "microsoft.graph.openTypeExtension",
                "extensionName": `${Constants.UserSettingsSchemaId}`,
                "ClosedAlertIds": null,
                "QuickLinksWidgets": null
              };

            graphManager.postQuery(`/me/extensions`, JSON.stringify(content));

            return new Promise<UserSettings>(async (resolve) => {
                resolve(null);
            });
        }
        
        let userSettings:UserSettings = new UserSettings();
        userSettings.ClosedAlertIds = result["ClosedAlertIds"];
        userSettings.QuickLinksWidgets = result["QuickLinksWidgets"];

        // cacheManager.set(this.userSettingsCacheKey, userSettings);

        return new Promise<UserSettings>(async (resolve) => {
            resolve(userSettings);
        });
    }

     /**
     * Parses the provided ResponseData to an object holding all user profile properties
     * @param data The ResponseData to be parsed.
     * @returns An object representing the provided ResponseData.
     */
    public parseResponse(data: ResponseData): object {
        var result = data.json;
        
        if (!result.hasOwnProperty("d")) {
            return null;
        }

        return result["d"];
    }
}