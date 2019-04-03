import { sp, Web } from "@pnp/sp";

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

let currentUser = '';
sp.web.currentUser.get().then(result => {
  currentUser = result.Title;
});

export default class ContentDataProvider {
  constructor() {}

  // Get current user
  

  // Get ended agreement not closed
  public async getEnded(): Promise<IList[]> {
    let today = new Date();
    let Agreements: IList[] = [];

    let select: string =
      "Title,CustomerAgreementNr,ContactPerson,DeliveryType,AgreementStartDate,AgreementType/Title,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term";
    const items = await sp.web.lists
      .getByTitle("AgreementDatabase")
      .items.select(select)
      .filter(
        `(AgreementEnded eq true) and (AgreementEndDate le '${today.toISOString()}')`
      )
      .expand("SalesManager,TaxCatchAll,AgreementType")
      .get();

    items.forEach(item => {
      Agreements.push({
        AgreementName: item.Title,
        CustomerAgreementNr: item.CustomerAgreementNr,
        AgreementType: item.AgreementType.Title,
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

  // Get last adjustment date passed
  public async getPassed(): Promise<IList[]> {
    let today = new Date();
    let Agreements: IList[] = [];

    let select: string =
      "Title,CustomerAgreementNr,ContactPerson,DeliveryType,AgreementStartDate,AgreementType/Title,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term";
    const items = await sp.web.lists
      .getByTitle("AgreementDatabase")
      .items.select(select)
      .filter(`LastPriceAdjustment le '${today.toISOString()}'`)
      .expand("SalesManager,TaxCatchAll,AgreementType")
      .get();

    items.forEach(item => {
      Agreements.push({
        AgreementName: item.Title,
        CustomerAgreementNr: item.CustomerAgreementNr,
        AgreementType: item.AgreementType.Title,
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

 // Get Sales manager's agreements
 public async getMyAgreement(): Promise<IList[]> {
  let Agreements: IList[] = [];
  let salesManagerName = '';

  let select: string =
    "Title,CustomerAgreementNr,ContactPerson,DeliveryType,AgreementStartDate,AgreementType/Title,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term";

    const managerName = await sp.web.lists
    .getByTitle("AgreementDatabase")
    .items.select("SalesManager/FirstName, SalesManager/LastName")
    .expand("SalesManager")
    .get();

    managerName.forEach(item => {
      salesManagerName = item.SalesManager.FirstName + " " + item.SalesManager.LastName
    });

  const items = await sp.web.lists
    .getByTitle("AgreementDatabase")
    .items.select(select)
    .filter(`${salesManagerName}' eq '${currentUser}'`)
    .expand("SalesManager,TaxCatchAll,AgreementType")
    .get();

  
  items.forEach(item => {
    Agreements.push({
      AgreementName: item.Title,
      CustomerAgreementNr: item.CustomerAgreementNr,
      AgreementType: item.AgreementType.Title,
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
  

  public async getContent(): Promise<IList[]> {
    let Agreements: IList[] = [];
    let select: string =
      "Title,CustomerAgreementNr,ContactPerson,DeliveryType,AgreementStartDate,AgreementType/Title,AgreementEndDate,AgreementEnded,Customer,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName,TaxCatchAll/ID,TaxCatchAll/Term";

    const items = await sp.web.lists
      .getByTitle("AgreementDatabase")
      .items.select(select)
      .expand("SalesManager,TaxCatchAll,AgreementType")
      .get();

    items.forEach(item => {
      Agreements.push({
        AgreementName: item.Title,
        CustomerAgreementNr: item.CustomerAgreementNr,
        AgreementType: item.AgreementType.Title,
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

    console.log(items);
    return new Promise<IList[]>(async resolve => {
      resolve(Agreements);
    });
  }
}
