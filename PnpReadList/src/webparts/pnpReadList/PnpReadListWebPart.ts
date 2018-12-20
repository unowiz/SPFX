import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PnpReadListWebPart.module.scss';
import * as strings from 'PnpReadListWebPartStrings';

import MockHttpClient from "./MockHttpClient";
import pnp from "sp-pnp-js";

export interface IPnpReadListWebPartProps {
  description: string;
}

export interface ISPList {
  Title: string;
}

export default class PnpReadListWebPart extends BaseClientSideWebPart<IPnpReadListWebPartProps> {
  private _getMockListData(): Promise<ISPList[]> {
    return MockHttpClient.get()
    .then((data: ISPList[]) => {
      const listData: ISPList[] = [
        { Title: 'Barclays'},
        { Title: 'Press Office in Melborne'},
        { Title: 'Vodaphone'},
        { Title: 'Manager in New York'},
      ];
      return listData;
    }) as Promise<ISPList[]>;
  }

  private _getListData(): Promise<ISPList[]> {
    return pnp.sp.web.lists.getByTitle("My List").items.get()
    .then((items: any) => {
      return items;
    });
  }

  private _renderListAsync(): void {
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((items) => {
        this._renderList(items);
      })
    } else {
      this._getListData()
      .then((items) => {
        this._renderList(items);
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
        <tr><td>${item.Title}</td></tr>
      `;
    });
    html += `<table>`;
    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }

  
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.pnpReadList }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <div id="spListContainer" />
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
