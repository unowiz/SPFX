import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  WebPartContext
} from '@microsoft/sp-webpart-base';

import * as strings from 'TagsWebPartStrings';
import Tags from './components/Tags';
import { ITagsProps } from './components/ITagsProps';

export interface ITagsWebPartProps {
  context: WebPartContext;
}

export default class TagsWebPart extends BaseClientSideWebPart<ITagsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITagsProps> = React.createElement(
      Tags,
      {
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
              groupFields: []
            }
          ]
        }
      ]
    };
  }
}
