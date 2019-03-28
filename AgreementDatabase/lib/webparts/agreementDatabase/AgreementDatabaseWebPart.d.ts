import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, WebPartContext } from '@microsoft/sp-webpart-base';
export interface IAgreementDatabaseWebPartProps {
    description: string;
    context: WebPartContext;
}
export default class AgreementDatabaseWebPart extends BaseClientSideWebPart<IAgreementDatabaseWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
