import { Constants } from '../common/constants';
import { IDividerDataProvider } from '../interfaces/IDividerDataProvider';
import { ListRepository } from '../repositories/ListRepository/ListRepository';
import Widget, { WidgetSource } from '../containers/divider/Widget';
import WidgetSettingsItem from '../containers/divider/WidgetSettingsItem';
import { UserProfileRepository } from '../repositories/UserProfileRepository/UserProfileRepository';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { UserSettings, DividerWidgetsSetting } from '../common/UserSettings';
import * as _ from 'lodash';

export default class DividerDataProvider implements IDividerDataProvider {

    private absoluteWebUrl:string;
    private context:WebPartContext;
    constructor(absoluteWebUrl:string, context:WebPartContext) {
        this.absoluteWebUrl = absoluteWebUrl;
        this.context = context;
    }

    public async getUserWidgets(): Promise<any> {
        let allWidgets = await this.getAllWidgets();

        let userRepository = new UserProfileRepository(this.absoluteWebUrl);
        let userWidgetIds = await userRepository.getUserExtensionValues(this.context);

        let local = allWidgets.local.filter(function (e) {
            return this.indexOf(e) < 0;

        },
        userWidgetIds.DividerWidgets.l);

        let global = allWidgets.global.filter(function (e) {
            return this.indexOf(e) < 0;

        },
        userWidgetIds.DividerWidgets.g);

        let result = local.concat(global);

        return new Promise<object>(async (resolve) => {
            resolve(result);
        });
    }

    public async getAllWidgets(): Promise<any> {
        var repository = new ListRepository(Constants.GlobalUrl);
        var repositoryUserCountryUrl = new ListRepository(this.absoluteWebUrl);

        var cacheKey = "dividerLinksAllWidgets";

        let global = await repository.getListItemsByUrl(Constants.DividerListUrl, `global-${cacheKey}`);
        let local = await repositoryUserCountryUrl.getListItemsByUrl(Constants.DividerListUrl, `local-${cacheKey}`);

        let localWidgets = local.json.d.results.map((item) => {return this.parseWidget(item, WidgetSource.Local);});
        let globalWidgets = global.json.d.results.map((item) => {return this.parseWidget(item, WidgetSource.Global);});

        return new Promise<object>(async (resolve) => {
            resolve({
                local: localWidgets,
                global: globalWidgets
            });
        });
    }

    public parseWidget(item: object, source: WidgetSource): Widget {
        return new Widget(item["Title"], item["ID"], item["verUrl"], item["verIconName"], source);
    }

    public getSettingsData(): Promise<any> {
        var userRepository = new UserProfileRepository(this.absoluteWebUrl);
        return Promise.all([this.getAllWidgets(),userRepository.getUserExtensionValues(this.context)]).then((values) => {
            let local = new Array<WidgetSettingsItem>();
            let global = new Array<WidgetSettingsItem>();
            var allWidgets = values[0];
            var userSettings:UserSettings = values[1];

            local = allWidgets.local.map((l) => {
                return new WidgetSettingsItem(new Widget(l.title, l.id, l.url, l.icon, WidgetSource.Local), false);
            });

            global = allWidgets.global.map((g) => {
                return new WidgetSettingsItem(new Widget(g.title, g.id, g.url, g.icon, WidgetSource.Global), false);
            });

            return new Promise<any>((resolve) => { resolve(_.concat(local, global));});
        });
    }

    public saveSettingsData(selectedWidgets: WidgetSettingsItem[]): Promise<any>{
        var userRepository = new UserProfileRepository(this.absoluteWebUrl);
        
        var userSettings = new UserSettings();
        var widgetSettings = new DividerWidgetsSetting();

        widgetSettings.g = selectedWidgets.filter((w) => { if (w.widget.source === WidgetSource.Global &&  w.selected) return w;}).map(item => item.widget.id);
        widgetSettings.l = selectedWidgets.filter((w) => { if (w.widget.source === WidgetSource.Local &&  w.selected) return w;}).map(item => item.widget.id);
        
        userSettings.DividerWidgets = widgetSettings;
        
        return userRepository.updateUserExtension(this.context, userSettings);
    }
}