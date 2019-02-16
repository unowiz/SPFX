import Tag from "../containers/tags/Tags";

export interface ITagsDataProvider {
    getUserTags(): Promise<Tag[]>;
    getAllTags(): Promise<Tag[]>;
    saveSettingsData(selectedTags: Tag[]): Promise<any>;
}  
