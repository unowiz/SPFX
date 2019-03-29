import { IDataProvider } from "../interfaces/IDataProvider";
import Views from "../container/Views";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import pnp from "sp-pnp-js";
import { sp  } from "@pnp/sp";

export default class ContentDataProvider implements IDataProvider {
    private absoluteWebUrl: string;
    private context:WebPartContext;
    constructor(absoluteWebUrl:string, context:WebPartContext) {
        this.absoluteWebUrl = absoluteWebUrl;
        this.context = context;

        pnp.setup({
            spfxContext: this.context
        });
    }

    public async getViews(): Promise<Views[]> {
        let views: Views[] = [];

        sp.web.lists.getByTitle("Avtal Demo").views.get().then(function(data){  
            for(var i=0;i<data.length;i++){  
                console.log("View Title : " + data[i].Title);  
                console.log("View URL   : " + data[i].ServerRelativeUrl);  
            }  
              
        }).catch(function(data){  
        console.log(data);  
        });  
    }
}