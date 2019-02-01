import Widget from "../containers/divider/Widget";
import WidgetSettingsItem from "../containers/divider/WidgetSettingsItem";

export interface IDividerDataProvider {  
    getUserWidgets(): Promise<any>;
    getSettingsData(): Promise<any>;
    getAllWidgets(): Promise<Widget[]>;
    saveSettingsData(selectedWidgets: WidgetSettingsItem[]): Promise<any>;
}  
