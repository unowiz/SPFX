import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReadItemsPnPWebPartStrings';
import ReadItemsPnP from './components/ReadItemsPnP';
import { IReadItemsPnPProps } from './components/IReadItemsPnPProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import { sp } from "@pnp/sp";

export interface IReadItemsPnPWebPartProps {
  description: string;
  list: string; // the selected list from the property panel
  title: string; // to change app name
}

export default class ReadItemsPnPWebPart extends BaseClientSideWebPart<IReadItemsPnPWebPartProps> {

  // create pnp 
  public onInit(): Promise<void> {
    return super.onInit().then(_=> {
      sp.setup({
        spfxContext: this.context
      });
    });
  }


  public render(): void {
    const element: React.ReactElement<IReadItemsPnPProps > = React.createElement(
      ReadItemsPnP,
      {
        description: this.properties.description,
        context: this.context, // pass the context to the component's property 
        title: this.properties.title,
        displayMode: this.displayMode,
        updateTitle: (value: string) => {
          this.properties.title = value;
        },
        list: this.properties.list // pass the listname to the component's property
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
                PropertyFieldListPicker('list', {
                  label: 'Select a list',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  baseTemplate: 100, // filtering for custom lists
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
