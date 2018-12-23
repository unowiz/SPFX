import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'UsePnpWebPartStrings';
import UsePnp from './components/UsePnp';
import { IUsePnpProps } from './components/IUsePnpProps';
import { sp } from "@pnp/sp";
import { IListItem } from "./IListItem";

export interface IUsePnpWebPartProps {
  description: string;
}

export default class UsePnpWebPart extends BaseClientSideWebPart<IUsePnpWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IUsePnpProps > = React.createElement(
      UsePnp,
      {
        loadListItems: this.loadListItems,
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private async loadListItems(): Promise<IListItem[]> {
    const result: IListItem[] = await sp.web.lists.getByTitle("List with colors").items.select('Title', 'Color').orderBy('Color', true).get();
    return(result);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
