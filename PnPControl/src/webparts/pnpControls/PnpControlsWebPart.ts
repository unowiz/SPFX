import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PnpControlsWebPartStrings';
import PnpControls from './components/PnpControls';
import { IPnpControlsProps } from './components/IPnpControlsProps';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
//import { PropertyFieldTermPicker, IPickerTerm } from "@pnp/spfx-property-controls/lib/PropertyFieldTermPicker";


export interface IPnpControlsWebPartProps {
  lists: string | string[]; // Stores the list ID(s)
  //terms: IPickerTerm; // Keeps hold of the selected terms
  description: string;
}

export default class PnpControlsWebPart extends BaseClientSideWebPart<IPnpControlsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnpControlsProps > = React.createElement(
      PnpControls,
      {
        context: this.context,
        description: this.properties.description,
        list: this.properties.lists || ""
        //terms: this.properties.terms || null
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  baseTemplate: 101,
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
