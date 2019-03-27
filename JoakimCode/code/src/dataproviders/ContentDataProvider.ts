import { Web, sp, RenderListDataParameters, RenderListDataOptions } from "@pnp/sp";
import { IWebPartContext } from '@microsoft/sp-webpart-base';  
import { SPHttpClient } from '@microsoft/sp-http';  

export interface ICategory {
    name: string;
    links: ILink[];
}

export interface ILink {
    title: string;
    content: string;
    url: string;
    category: string;
    responsible: string;
    revised: string;
}

export default class ContentDataProvider {  

    constructor(){  
       
    } 
  
    public getContent(contenttypeid: string,  categoryfield: string, responsiblefield: string, revisedfield: string): Promise<ICategory[]> {  

        let params: RenderListDataParameters = {
            RenderOptions: RenderListDataOptions.ListData,
            ViewXml: `<View>
                        <ViewFields>
                            <FieldRef Name="` + responsiblefield + `"/>
                            <FieldRef Name="` + revisedfield + `"/>
                            <FieldRef Name="` + categoryfield + `"/>
                            <FieldRef Name="Title"/>
                            <FieldRef Name="CanvasContent1"/>
                            <FieldRef Name="FileRef"/>
                        </ViewFields>
                        <Query>
                            <Where>
                                <BeginsWith>
                                    <FieldRef Name='ContentTypeId' />
                                    <Value Type='ContentTypeId'>` + contenttypeid + `</Value>
                                </BeginsWith>
                            </Where>
                        </Query>
                      </View>`
        };
        return new Promise<ICategory[]>((resolve) => {  
            const dt:string = new Date().toISOString();
            sp.web.getList(window.location.pathname + '/SitePages').renderListDataAsStream(params).then((items) => {
                const _items: ICategory[] = [];

                const parser = new DOMParser();
                //).parseFromString(elem["CanvasContent1"], "text/html").documentElement.textContent;

                items.Row.map((elem) => {
                    if (elem[categoryfield] && elem[categoryfield].Label) {
                        let categoryName: string = elem[categoryfield].Label;

                        const category = _items.filter((cat: ICategory) => {
                            return (cat.name == categoryName);
                        });

                        const link: ILink = {
                            title: elem.Title,
                            content: parser.parseFromString(elem["CanvasContent1"], "text/html").documentElement.textContent,
                            url: elem.FileRef,
                            category: categoryName,
                            revised: elem[revisedfield],
                            responsible: elem[responsiblefield] && elem[responsiblefield].length 
                                ? elem[responsiblefield][0].title
                                : '?'
                        };
                        
                        if (category.length) {
                            category[0].links.push(link);
                        } else {
                            _items.push({name: categoryName, links: [link]});
                        }
                    }
                });

                resolve(_items);
            });
        });
    }
}  
  