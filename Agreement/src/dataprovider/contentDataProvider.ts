import { Web, sp, RenderListDataParameters, RenderListDataOptions } from "@pnp/sp";
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';

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
      SalesManager:string,
}

export default class ContentDataProvider {
  constructor(){

  }

  public async getContent(): Promise<IAgreement[]> {
    let select = "Title,CustomerAgreementNr,AgreementType,ContactPerson,DeliveryType,AgreementStartDate,AgreementEndDate,AgreementEnded,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName";
    let Agreements: IAgreement[] =[];

    const items = await sp.web.lists.getById('80B8C16E-7A22-4E98-AF0C-2DF556F1A8C8').items
          .select('Title,CustomerAgreementNr,AgreementType,ContactPerson,DeliveryType,AgreementStartDate,AgreementEndDate,AgreementEnded,LastPriceAdjustment,NexPriceAdjustment,SalesManager/FirstName, SalesManager/LastName')
          .expand('SalesManager')
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
                SalesManager:item.SalesManager.FirstName + ' ' + item.SalesManager.LastName,
            });
        });

        return new Promise<IAgreement[]>(async(resolve) => {
            resolve(Agreements);
        });

    /* return new Promise<IAgreement[]>((resolve) => {
      sp.web.getList('80B8C16E-7A22-4E98-AF0C-2DF556F1A8C8').get().then((items) => {
        let _items: IAgreement[] = [];

        items.Row.map((elem) => {
          const agreement: IAgreement = {
            Title: elem.Title,
            AgreementName: elem.AgreementName
          }
        });

        resolve(_items);
      });
    }); */

  }
}
