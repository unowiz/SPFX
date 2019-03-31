import { sp } from "@pnp/sp";

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
  constructor() {}

  public async getView(): Promise<IViews[]> {
    let views: IViews[] = [];

    const items = await sp.web.lists.getByTitle("Avtal Demo").views.get();

    items.forEach(item => {
      views.push({
        Title: item.Title,
        Id: item.Id
      });
    });

    console.log(views);
    return new Promise<IViews[]>(async resolve => {
      resolve(views);
    });
  }

  public async getContent(): Promise<IList[]> {
    let Agreements: IList[] = [];

    const items = await sp.web.lists
      .getByTitle("Avtal Demo")
      .items.select(
        "Title,CustomerAgreementNr,AgreementType,ContactPerson,DeliveryType,AgreementStartDate,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term"
      )
      .expand("SalesManager,TaxCatchAll")
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
        SalesManager:
          item.SalesManager.FirstName + " " + item.SalesManager.LastName
      });
    });

    return new Promise<IList[]>(async resolve => {
      resolve(Agreements);
    });
  }
}
