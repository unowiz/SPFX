import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'FollowedSitesWebPartStrings';
import FollowedSites from './components/FollowedSites';
import { IFollowedSitesProps } from './components/IFollowedSitesProps';

export interface IFollowedSitesWebPartProps {
  title: string;
  nrOfItems: number;
  sortOrder: number;
}

export enum SortOrder {
  default = 1,
  name
}

export default class FollowedSitesWebPart extends BaseClientSideWebPart<IFollowedSitesWebPartProps> {
  private propertyFieldNumber;

  public render(): void {
    const element: React.ReactElement<IFollowedSitesProps > = React.createElement(
      FollowedSites,
      {
        title: this.properties.title,
        nrOfItems: this.properties.nrOfItems,
        sortOrder: this.properties.sortOrder,
        context: this.context,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
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

  // create custom properties before properties panel is loaded
  protected async loadPropertyPaneResources(): Promise<void> {
    const { PropertyFieldNumber } = await import(
      '@pnp/spfx-property-controls/lib/propertyFields/number'
    );

    this.propertyFieldNumber = PropertyFieldNumber;
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
              groupFields: [
                this.propertyFieldNumber("nrOfItems", {
                  key: "nrOfItems",
                  label: strings.NrOfFollowedItemsLabel,
                  value: this.properties.nrOfItems
                }),
                PropertyPaneDropdown('description', {
                  label: strings.DescriptionFieldLabel,
                  selectedKey: this.properties.sortOrder,
                  options: [
                    {
                      key: SortOrder.default,
                      text: strings.SortOrderDefaultLabel
                    },
                    {
                      key: SortOrder.name,
                      text: strings.SortOrderDefaultLabel
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
