import { WebPartContext } from '@microsoft/sp-webpart-base';
import { MSGraphClient } from "@microsoft/sp-http";
import { Utilities } from '../../common/Utilities';
import { UserSettings } from '../../common/UserSettings';
import { Constants } from '../../common/constants';

/**
 * Repository for querying MS Graph.
 * In order for this to work, you need to deploy the solution package to the
 * App Catalog and then approve the requested permissions in 'API management' in the new
 * Admin Center.
 * 
 * Add permissions as needed in the 'webApiPermissionRequests' section in 'package-solution.json'
 */
export class MsGraphRepository{
    private context: WebPartContext;
    
    //what about ApplicationCustomizerContext?
    constructor(context: any) {
        this.context = context;
    }

    /**
     * Returns the current user
     * @param includeExtensions True if MS Graph extensions associated with the current user should be loaded; false otherwise. 
     * @param propertiesToLoad An array containing the properties to load for the user. If null, all properties will be loaded.
     */
    public getCurrentUser(includeExtensions: boolean, propertiesToLoad: Array<string> = null):Promise<any> {
        var url = "/me";

        if (propertiesToLoad) {
            if (propertiesToLoad.indexOf('id') < 0 && includeExtensions) {
                propertiesToLoad.push('id'); // id must be included when we're loading extensions.
            }

            var properties = propertiesToLoad.join(',');
            url = Utilities.addQueryString(url, '$select', properties);
        }
        else {
            url = Utilities.addQueryString(url, '$select', 'id');
        }

        if (includeExtensions) {
            url = Utilities.addQueryString(url, '$expand', 'extensions');
        }
        
        return this.getQuery(url);
    }

    /**
     * Querys the MS Graph based on the provided query.
     * @param query Query to use when fetching data from MS Graph.
     */
    public getQuery(query: string) : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
                client.api(query)
                .get((error, response) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(response);
                });
            });
        }); 
    }
    
    /**
     * Patch the MS Graph based on the provided query and content.
     * @param query Query to use when posting data to MS Graph.
     */
    public patchQuery(query: string, content: any) : Promise<any> {

        content = `{"${Constants.UserSettingsSchemaExtensionId}":${content}}`;

        let content_test = "{'extroqpgteq_verisureUserSettings': {'ClosedAlertIds': '[1,2,3]'}}";

        return new Promise<any>((resolve, reject) => {
            this.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
                client.api(query)
                .patch(content_test, (error, response) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(response);
                });
            });
        }); 
    }
         
    /**
     * Patch the MS Graph based on the provided query and post.
     * @param settings A UserSettings object containing the updated values.
     */
    public patchUserSettings(settings: UserSettings) : Promise<any> {
        var url = "/me";
        return this.patchQuery(url, JSON.stringify(settings));
    }  
}
