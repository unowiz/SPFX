// import Widget from "../containers/divider/Widget";
// import WidgetSettingsItem from "../containers/divider/WidgetSettingsItem";

export interface IAlertMessageDataProvider {
    getUserAlerts() : Promise<any>;
    getUserClosedAlerts(): Promise<any>;
    getCountryAlerts() : Promise<any>; 
    removeUserClosedAlerts(item: any) :  Promise<any>;
    saveUserClosedAlerts(): Promise<any>;
    // saveSettingsData(selectedWidgets: WidgetSettingsItem[]): Promise<any>;
}  
