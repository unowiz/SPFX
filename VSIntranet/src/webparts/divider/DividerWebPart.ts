import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  WebPartContext
} from '@microsoft/sp-webpart-base';

import * as strings from 'DividerWebPartStrings';
import Divider from './components/Divider';
import { IDividerProps } from './components/IDividerProps';
import { IDividerwebpartProps } from "./components/IDividerWebPartProps";
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';


export interface IDividerWebPartProps {
  title: string; 
  filter: string;
  listTitle: string; 
  webUrl: string;
  numberOfItems: number;
  cacheResult: boolean; 
  context: WebPartContext;
  localList: string;
}

export default class DividerWebPart extends BaseClientSideWebPart<IDividerwebpartProps> {

  public render(): void {
    const element: React.ReactElement<IDividerwebpartProps > = React.createElement(
      Divider,
      {
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
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
              groupFields: []
            }
          ]
        }
      ]
    };
  }
}
