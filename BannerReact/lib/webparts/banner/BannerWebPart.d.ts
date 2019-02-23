import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
export interface IBannerWebPartProps {
    description: string;
    bannerText: string;
    bannerImage: string;
    bannerLink: string;
    bannerHeight: number;
    fullWidth: boolean;
    useParallax: boolean;
    useParallaxInt: boolean;
}
export default class BannerWebPart extends BaseClientSideWebPart<IBannerWebPartProps> {
    private propertyFieldNumber;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected readonly propertiesMetadata: IWebPartPropertiesMetadata;
    /**
     * Validation
     */
    private _validationImageField(imgVal);
    protected loadPropertyPaneResources(): Promise<void>;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
