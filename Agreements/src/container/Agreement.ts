export default class Agreement {
    public AgreementName: string;
    public CustomerAgreementNr: number;
    public AgreementType: string;
    public ContactPerson: string;
    public DeliveryType: string;
    public AgreementStartDate: string;
    public AgreementEndDate: string;
    public AgreementEnded: string;
    public LastPriceAdjustment: string;
    public NextPriceAdjustment: string;
    constructor(
        AgreementName: string,
        CustomerAgreementNr: number,
        AgreementType: string,
        ContactPerson: string,
        DeliveryType: string,
        AgreementStartDate: string,
        AgreementEndDate: string,
        AgreementEnded: string,
        LastPriceAdjustment: string,
        NextPriceAdjustment: string,
    ) {
        this.AgreementName = AgreementName;
        this.CustomerAgreementNr = CustomerAgreementNr;
        this.AgreementType = AgreementType;
        this.ContactPerson = ContactPerson;
        this.DeliveryType = DeliveryType;
        this.AgreementStartDate = AgreementStartDate;
        this.AgreementEndDate = AgreementEndDate;
        this.AgreementEnded = AgreementEnded;
        this.LastPriceAdjustment = LastPriceAdjustment;
        this.NextPriceAdjustment = NextPriceAdjustment;
    }
}