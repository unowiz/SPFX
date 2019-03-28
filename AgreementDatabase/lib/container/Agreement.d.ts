export default class Agreement {
    Title: string;
    AgreementName: string;
    CustomerAgreementNr: number;
    AgreementType: string;
    SalesManager: string;
    ContactPerson: string;
    DeliveryType: string;
    AgreementStartDate: string;
    AgreementEndDate: string;
    AgreementEnded: boolean;
    LastPriceAdjustment: string;
    NextPriceAdjustment: string;
    constructor(Title: string, AgreementName: string, CustomerAgreementNr: number, AgreementType: string, SalesManager: string, ContactPerson: string, DeliveryType: string, AgreementStartDate: string, AgreementEndDate: string, AgreementEnded: boolean, LastPriceAdjustment: string, NextPriceAdjustment: string);
}
