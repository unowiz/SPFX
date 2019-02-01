import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'BingTranslationWebpartWebPartStrings';
import BingTranslationWebpart from './components/BingTranslationWebpart';
import { IBingTranslationWebpartProps } from './components/IBingTranslationWebpartProps';

export interface IBingTranslationWebpartWebPartProps {
  description: string;
}

export default class BingTranslationWebpartWebPart extends BaseClientSideWebPart<IBingTranslationWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBingTranslationWebpartProps > = React.createElement(
      BingTranslationWebpart,
      {
        description: this.properties.description
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
