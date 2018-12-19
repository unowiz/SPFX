import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import MockHttpClient from "./MockHttpClient";

import styles from './GetSharePointListItemsIiWebPart.module.scss';
import * as strings from 'GetSharePointListItemsIiWebPartStrings';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export interface IGetSharePointListItemsIiWebPartProps {
  description: string;
  listName: string;
}

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;

}


export default class GetSharePointListItemsIiWebPart extends BaseClientSideWebPart<IGetSharePointListItemsIiWebPartProps> {
  
  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('${this.properties.listName}')/Items`, 
    SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      debugger;
      return response.json();
    });
  }

  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
    .then((data: ISPList[]) => {
      let listData: ISPLists = { value: data };
      return listData;
    }) as Promise<ISPLists>;
  }

  private _renderListAsync(): void {
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderList(response.value);
      });
    } else {
      this._getListData()
      .then((response) => {
        this._renderList(response.value);
      });
    }
  }

  private _renderList(items: ISPList[]): void {
    let html: string = '<table border=1 width=100% style="border-collapse: collapse;">';
    html += `
      <th>Title</th>
    `;

    items.forEach((item: ISPList) => {
      html += `
        <tr>
          <td>${item.Title}</td>
        </tr>
      `;
    });

    html += `</table>`;
    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.getSharePointListItemsIi }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <div id="spListContainer"></div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

      this._renderListAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
