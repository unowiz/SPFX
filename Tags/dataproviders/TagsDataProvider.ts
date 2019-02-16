import { Constants } from "../common/constants";
import { ITagsDataProvider } from "../interfaces/ITagsDataProvider";
import { ListRepository } from "../repositories/ListRepository/ListRepository";
import Tags from "../containers/tags/Tags";
import { UserProfileRepository } from "../repositories/UserProfileRepository/UserProfileRepository";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { UserSettings } from "../common/UserSettings";
import * as _ from 'lodash';
import pnp from 'sp-pnp-js';

export default class TagsDataProvider implements ITagsDataProvider {
    private absoluteWebUrl: string;
    private context: WebPartContext;

    constructor(absoluteWebUrl: string, context: WebPartContext) {
        this.absoluteWebUrl = absoluteWebUrl;
        this.context = context;

        pnp.setup({
            spfxContext: this.context
        });
    }

    public async getUserTags(): Promise<Tags[]> {
        let allTags = await this.getAllTags();

        let userRepository = new UserProfileRepository(this.absoluteWebUrl);
        let userSettings = await userRepository.getUserExtensionValues(this.context);

        var result: Tags[] = [];

        if (userSettings == null || userSettings.QuickLinksWidgets == null) {
            result = allTags.filter((w) => { return w.defaultTag; });
        }
        else {
            var ids = userSettings.QuickLinksWidgets;

            for (let i = 0; i < 30; i++) {  
                let id = '' + ids[i];
                let t = allTags.filter((e) => { return e.id == id; });

                if (t.length == 0) {
                    continue;
                }

                result.push(t[0]);
            }
        }

        return new Promise<Tags[]>(async (resolve) => {
            resolve(result);
        });
    }

    public async getAllTags(): Promise<Tags[]> {
        var tagRepositoryUrl = new ListRepository(this.absoluteWebUrl);
        var cacheKey = "TagsAllTags"
        let tags = await tagRepositoryUrl.getListItemsByUrl(Constants.TagsListUrl, `local-${cacheKey}`);

        let result: Tags[] = [];
        tags.map((item) => {
            result.push(this.parseTag(item));
        });

        return new Promise<Tags[]>(async (resolve) => {
            resolve(result);
        });
    }

    public parseTag(item: object): Tags {
        let defaultValue = item["verDefault"];
        let active = true;

        return new Tags(item["Title"], item["ID"], active, defaultValue);
    }

    public saveSettingsData(selectedTags: Tags[]): Promise<any> {
        var userRepository = new UserProfileRepository(this.absoluteWebUrl);

        var userSettings = new UserSettings();

        var ids: number[] = [];

        selectedTags.map((w) => ids.push(Number(w.id)));

        userSettings.QuickLinksWidgets = ids;

        return userRepository.updateUserExtension(this.context, userSettings);
    }
}
