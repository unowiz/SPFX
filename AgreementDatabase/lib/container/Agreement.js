var Agreement = (function () {
    function Agreement(Title, AgreementName, CustomerAgreementNr, AgreementType, SalesManager, ContactPerson, DeliveryType, AgreementStartDate, AgreementEndDate, AgreementEnded, LastPriceAdjustment, NextPriceAdjustment) {
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
    return Agreement;
}());
export default Agreement;
//# sourceMappingURL=Agreement.js.map