import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'AgreementDatabaseWebPartStrings';
import AgreementDatabase from './components/AgreementDatabase';
import { IAgreementDatabaseProps } from './components/IAgreementDatabaseProps';


export interface IAgreementDatabaseWebPartProps {
  description: string;
  context: WebPartContext;
}

export default class AgreementDatabaseWebPart extends BaseClientSideWebPart<IAgreementDatabaseWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IAgreementDatabaseProps > = React.createElement(
      AgreementDatabase,
      {
        description: this.properties.description,
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
