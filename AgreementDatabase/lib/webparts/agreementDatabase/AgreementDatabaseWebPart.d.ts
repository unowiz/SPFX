import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IAgreementDatabaseWebPartProps {
    description: string;
    headertext: string;
    nrofboxes: string;
    linktitle1: string;
    linktext1: string;
    linkurl1: string;
    linktitle2: string;
    linktext2: string;
    linkurl2: string;
    linktitle3: string;
    linktext3: string;
    linkurl3: string;
    linktitle4: string;
    linktext4: string;
    linkurl4: string;
    linktitle5: string;
    linktext5: string;
    linkurl5: string;
    linktitle6: string;
    linktext6: string;
    linkurl6: string;
}
export default class AgreementDatabaseWebPart extends BaseClientSideWebPart<IAgreementDatabaseWebPartProps> {
    onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected readonly disableReactivePropertyChanges: boolean;
}
