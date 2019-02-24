import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IFollowedSitesWebPartProps {
    title: string;
    nrOfItems: number;
    sortOrder: number;
}
export declare enum SortOrder {
    default = 1,
    name = 2,
}
export default class FollowedSitesWebPart extends BaseClientSideWebPart<IFollowedSitesWebPartProps> {
    private propertyFieldNumber;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected loadPropertyPaneResources(): Promise<void>;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
