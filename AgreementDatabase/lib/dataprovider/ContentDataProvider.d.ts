export interface IViews {
    Title: string;
    Id: string;
}
export interface IList {
    AgreementName: string;
    CustomerAgreementNr: number;
    AgreementType: string;
    ContactPerson: string;
    DeliveryType: string;
    AgreementStartDate: string;
    AgreementEndDate: string;
    AgreementEnded: boolean;
    LastPriceAdjustment: string;
    NextPriceAdjustment: string;
    SalesManager: string;
    Customer: string;
}
export default class ContentDataProvider {
    constructor();
    getEnded(): Promise<IList[]>;
    getPassed(): Promise<IList[]>;
    getMyAgreement(): Promise<IList[]>;
    getContent(): Promise<IList[]>;
}
