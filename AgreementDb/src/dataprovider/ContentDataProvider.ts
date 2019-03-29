import { sp  } from "@pnp/sp";

export interface IAgreement {
    AgreementName: string,
    CustomerAgreementNr: number,
    AgreementType: string,
    ContactPerson: string,
    DeliveryType: string,
    AgreementStartDate: string,
    AgreementEndDate: string,
    AgreementEnded: boolean,
    LastPriceAdjustment: string,
    NextPriceAdjustment: string,
    SalesManager: string,
    Customer: string,
}

export default class ContentDataProvider {
    constructor() {    }
    
    public async getContent(): Promise<IAgreement[]> {
        let Agreements: IAgreement[] = [];

        const items = await sp.web.lists.getByTitle('Avtal Demo').items
            .select('Title,CustomerAgreementNr,AgreementType,ContactPerson,DeliveryType,AgreementStartDate,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term')
            .expand('SalesManager,TaxCatchAll')
            .get();

        items.forEach(item => {
            Agreements.push({
                AgreementName: item.Title,
                CustomerAgreementNr: item.CustomerAgreementNr,
                AgreementType: item.AgreementType,
                ContactPerson: item.ContactPerson,
                DeliveryType: item.DeliveryType,
                AgreementStartDate: item.AgreementStartDate,
                AgreementEndDate: item.AgreementEndDate,
                AgreementEnded: item.AgreementEnded,
                LastPriceAdjustment: item.LastPriceAdjustment,
                NextPriceAdjustment: item.NexPriceAdjustment,
                Customer: item.TaxCatchAll[0].Term,
                SalesManager: item.SalesManager.FirstName + ' ' + item.SalesManager.LastName,
            });
        });

        
        console.log(items);
        return new Promise<IAgreement[]>(async (resolve) => {
            resolve(Agreements);
        });
    }
}
