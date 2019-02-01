import { Constants } from '../common/constants';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { IAlertMessageDataProvider } from '../interfaces/IAlertMessageDataProvider';
import { ListRepository } from '../repositories/ListRepository/ListRepository';
import { MsGraphRepository } from '../repositories/MsGraphRepository/MsGraphRepository';
import { UserProfileRepository } from '../repositories/UserProfileRepository/UserProfileRepository';


import AlertMessage from '../containers/alertmessage/AlertMessage';
import { UserSettings, DividerWidgetsSetting } from '../common/UserSettings';
import * as _ from 'lodash';

export default class AlertMessageDataProvider implements IAlertMessageDataProvider {

    private absoluteWebUrl:string;
    private context:ApplicationCustomizerContext;

    constructor(absoluteWebUrl:string, context:ApplicationCustomizerContext) {
        this.absoluteWebUrl = absoluteWebUrl;
        this.context = context;
    }

    public async getUserAlerts(): Promise<any> {
        let allCountryAlerts = await this.getCountryAlerts();
        // let allClosedAlerts = await this.getUserClosedAlerts();
        
        let result = allCountryAlerts;

        return new Promise<object>(async (resolve) => {
            resolve(result);
        });
    }
    
    public async getCountryAlerts(): Promise<any> {
        let listRepository = new ListRepository(this.absoluteWebUrl);
        let alertList = "Alerts";
        let alertListFilter = "Active eq 1 and StartDate lt datetime'" + new Date().toISOString() + "' and OData__EndDate ge datetime'" + new Date().toISOString() + "'";
        let cacheKey = 'AlertMessage';
    
        let countryAlerts = await listRepository.getListItemsByTitle(alertList, cacheKey, 0, alertListFilter);

        let result = countryAlerts.json.d.results.map((item) => {return this.parseAlertMessage(item);});

        return new Promise<object>(async (resolve) => {
            resolve(result);
        });
    }

    public async getUserClosedAlerts(): Promise<any> {

        let graphRepository = new MsGraphRepository(this.context);

        let _userClosedAlerts = await graphRepository.getCurrentUser(true, null);

        let result;
        if(_userClosedAlerts) {
            let userClosedAlerts = _userClosedAlerts.json.d.results.map((item) => {return this.parseAlertMessage(item);});
        }
        else {
            result = null;
        }
        result = _userClosedAlerts;

        return new Promise<object>(async (resolve) => {
            resolve(result);
        });
    }

    public async saveUserClosedAlerts(): Promise<any> {

        return new Promise<object>(async (resolve) => {
            // resolve(result);
        });
    }    

    public async removeUserClosedAlerts(item: any): Promise<any> {

        debugger;

        // this.setState({
        //     items: _items,
        //     loading: false,
        //     closeAlertMessage: this.closeAlertMessage        
        // });


        // /me?$select=id,displayname,extroqpgteq_verisureUserSettings
        //{ "extroqpgteq_verisureUserSettings": {"ClosedAlertIds": "[1,2,3]"}}
        let msgraph_test = "[1,2,3]";
        let closedAlertsJSON = JSON.stringify(msgraph_test);        
        var userRepository = new UserProfileRepository(this.absoluteWebUrl);
        var userSettings = new UserSettings();
        userSettings.ClosedAlertIds = msgraph_test;

        return userRepository.updateUserExtension(this.context, userSettings);
    }    
    
    public parseAlertMessage(item: object): AlertMessage {
        return new AlertMessage(item["Title"], item["Message"], item["ID"], item["Active"]);
    }    
}