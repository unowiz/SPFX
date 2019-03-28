export interface IAgreement {
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
}
export default class ContentDataProvider {
    constructor();
    getContent(): Promise<IAgreement[]>;
}
