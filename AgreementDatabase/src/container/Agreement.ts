export default class Agreement {
    public Title: string;
    public AgreementName: string;
    public CustomerAgreementNr: number;
    public AgreementType: string;
    public SalesManager: string;
    public ContactPerson: string;
    public DeliveryType: string;
    public AgreementStartDate: string;
    public AgreementEndDate: string;
    public AgreementEnded: boolean;
    public LastPriceAdjustment: string;
    public NextPriceAdjustment: string;
    constructor(
        Title: string,
        AgreementName: string,
        CustomerAgreementNr: number,
        AgreementType: string,
        SalesManager: string,
        ContactPerson: string,
        DeliveryType: string,
        AgreementStartDate: string,
        AgreementEndDate: string,
        AgreementEnded: boolean,
        LastPriceAdjustment: string,
        NextPriceAdjustment: string,
    ) {
        this.Title = Title;
        this.AgreementName = AgreementName;
        this.CustomerAgreementNr = CustomerAgreementNr;
        this.AgreementType = AgreementType;
        this.SalesManager = SalesManager;
        this.ContactPerson = ContactPerson;
        this.DeliveryType = DeliveryType;
        this.AgreementStartDate = AgreementStartDate;
        this.AgreementEndDate = AgreementEndDate;
        this.AgreementEnded = AgreementEnded;
        this.LastPriceAdjustment = LastPriceAdjustment;
        this.NextPriceAdjustment = NextPriceAdjustment;
    }
}