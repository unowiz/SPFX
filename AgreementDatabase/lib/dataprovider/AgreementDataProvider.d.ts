import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IAgreementDataProvider } from "../interface/IAgreementDataProvider";
import Agreement from "../container/Agreement";
import Views from "../container/Views";
export default class AgreementDataProvider implements IAgreementDataProvider {
    private absoluteWebUrl;
    private context;
    constructor(absoluteWebUrl: string, context: WebPartContext);
    getViews(): Promise<Views[]>;
    getAgreements(): Promise<Agreement[]>;
}
