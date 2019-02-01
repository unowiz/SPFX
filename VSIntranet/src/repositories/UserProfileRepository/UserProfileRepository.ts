import { BaseRepository } from "../BaseRepository/BaseRepository";
import { Utilities } from "../../common/Utilities";
import { ResponseData } from "../BaseRepository/ResponseData";
import { RequestHeader } from "../BaseRepository/RequestHeader";
import { MsGraphRepository } from "../MsGraphRepository/MsGraphRepository";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { WebPart } from "@pnp/sp";
import { UserSettings, DividerWidgetsSetting } from "../../common/UserSettings";
import { Constants } from "../../common/constants";

export class UserProfileRepository extends BaseRepository {
    private url: string;
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
        debugger;
        return graphManager.patchUserSettings(settings);
    }

    /**
     * TODO: This is a temporary function and it should be moved into getCurrentUserProperties (and that function should return a typed result).
     * @param context The WebPartContext to be used for calling MS Graph.
     * @returns The current users settings.
     */
    public async getUserExtensionValues(context: WebPartContext): Promise<UserSettings> {
        let graphManager = new MsGraphRepository(context);
        let result = await graphManager.getQuery(`/me?$select=${Constants.UserSettingsSchemaExtensionId}`);

        let settings = new UserSettings();
        let widgets = result[Constants.UserSettingsSchemaExtensionId]["DividerWidgets"];

        settings.DividerWidgets = JSON.parse(widgets);

        return new Promise<UserSettings>(async (resolve) => {
            resolve(settings);
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