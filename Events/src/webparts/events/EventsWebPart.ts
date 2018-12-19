import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'EventsWebPartStrings';
import Events from './components/Events';
import { IEventsProps } from './components/IEventsProps';
import { MSGraphClient } from "@microsoft/sp-http";
import { PropertyFieldNumber } from "@pnp/spfx-property-controls/lib/PropertyFieldNumber";
/*import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { values } from '@uifabric/utilities/lib';*/

export interface IEventsWebPartProps {
  description: string;
  title: string;
  nrOfEvents: string;
}

export default class EventsWebPart extends BaseClientSideWebPart<IEventsWebPartProps> {

  public render(): void {
    this.context.msGraphClientFactory.getClient()
      .then((client:MSGraphClient): void => {
        const element: React.ReactElement<IEventsProps > = React.createElement(
          Events,
          {
            graphClient: client,
            title: this.properties.title,
            displayMode: this.displayMode,
            nrOfEvents: this.properties.nrOfEvents,
            fUpdateProperty: (value: string) => {
              this.properties.title = value;
            }
          }
        );
    
        ReactDom.render(element, this.domElement);
      });
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
                }),
                PropertyFieldNumber('nrOfEvents', {
                  key: 'nrOfEvents',
                  label: strings.NrOfEventsToShow,
                  value: this.properties.nrOfEvents,
                  minValue: 1,
                  maxValue: 10
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
