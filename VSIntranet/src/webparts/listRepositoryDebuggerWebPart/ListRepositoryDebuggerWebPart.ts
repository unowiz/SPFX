import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListRepositoryDebuggerWebPartStrings';
import ListRepositoryDebugger from './components/ListRepositoryDebuggerWebPart';
import { IListRepositoryDebuggerWebPartProps } from './components/IListRepositoryDebuggerWebPartProps';
import { Constants } from '../../common/constants';

export interface IListRepositoryDebuggerWebPartProps {
  title: string;
  numberOfItems: number;
  cacheResult: boolean;
  filter: string;
  listTitle: string;
  webUrl: string;
}

export default class ListRepositoryDebuggerWebPart extends BaseClientSideWebPart<IListRepositoryDebuggerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListRepositoryDebuggerWebPartProps > = React.createElement(
      ListRepositoryDebugger,
      {
        title: this.properties.title,
        numberOfItems: this.properties.numberOfItems,
        cacheResult: this.properties.cacheResult,
        filter: this.properties.filter,
        listTitle: this.properties.listTitle,
        webUrl: this.properties.webUrl,
        context: this.context
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
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),

                PropertyPaneTextField('listTitle', {
                  label: strings.ListTitleFieldLabel
                }),

                PropertyPaneTextField('webUrl', {
                  label: strings.WebUrlFieldLabel
                }),

                PropertyPaneTextField('filter', {
                  label: strings.FilterFieldLabel
                }),

                PropertyPaneTextField('numberOfItems', {
                  label: strings.NumberOfItemsFieldLabel
                }),

                PropertyPaneCheckbox('cacheResult', {
                  text: strings.CacheFieldLabel,
                  checked: true
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
