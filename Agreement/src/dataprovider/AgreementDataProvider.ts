import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IAgreementDataProvider } from "../interface/IAgreementDataProvider";
import { sp } from '@pnp/sp';
import Agreement from "../container/Agreement";
import Views from "../container/Views";

export default class AgreementDataProvider implements IAgreementDataProvider {
    private absoluteWebUrl: string;
    private context: WebPartContext;

    constructor(absoluteWebUrl: string, context: WebPartContext) {
        this.absoluteWebUrl = absoluteWebUrl;
        this.context = context;

        sp.setup({
            spfxContext: this.context
        });
    }

    public async getViews(): Promise<Views[]> {
        
        let View: Views[] = [];
        const views = await sp.web.lists.getById('823e0102-5928-4f8a-bcda-f1794bd9026b').views
        .get();
        console.log(views);
        views.forEach(view => {
            View.push({
                Id: view.Id,
                Title: view.Title,
                Url: view.ServerRelativeUrl
            });
        });

        return new Promise<Views[]>(async(resolve) => {
            resolve(View);
        });
    }

    public async getAgreements(): Promise<Agreement[]> {
        let select = '*';
        let Agreements: Agreement[] = [];
    
        const items = await sp.web.lists.getById('823e0102-5928-4f8a-bcda-f1794bd9026b').items
          .select(select)
          .get();

        items.forEach(item => {
            Agreements.push({
                Title: item.Title,
                AgreementName: item.Title,
                CustomerAgreementNr: item.CustomerAgreementNr,
                AgreementType: item.AgreementType,
                ContactPerson: item.ContactPerson,
                DeliveryType: item.DeliveryType,
                AgreementStartDate: item.AgreementStartDate,
                AgreementEndDate: item.AgreementEndDate,
                AgreementEnded: item.AgreementEnded,
                LastPriceAdjustment: item.LastPriceAdjustment,
                NextPriceAdjustment: item.NextPriceAdjustment,

            });
        });

        return new Promise<Agreement[]>(async(resolve) => {
            resolve(Agreements);
        });

      }
}