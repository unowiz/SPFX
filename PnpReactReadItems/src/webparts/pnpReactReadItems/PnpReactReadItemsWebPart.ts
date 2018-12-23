import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PnpReactReadItemsWebPartStrings';
import PnpReactReadItems from './components/PnpReactReadItems';
import { IPnpReactReadItemsProps } from './components/IPnpReactReadItemsProps';

// PnP imports
import { sp } from "@pnp/sp";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import { PropertyFieldTermPicker, IPickerTerms } from "@pnp/spfx-property-controls/lib/PropertyFieldTermPicker";
// import { Subscription } from '@pnp/sp/src/subscriptions';

export interface IPnpReactReadItemsWebPartProps {
  title: string;
  list: string;
  term: IPickerTerms;
}

export default class PnpReactReadItemsWebPart extends BaseClientSideWebPart<IPnpReactReadItemsWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_=> {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IPnpReactReadItemsProps > = React.createElement(
      PnpReactReadItems,
      {
        context: this.context,
        displayMode: this.displayMode,
        title: this.properties.title,
        updateTitle: (value: string) => {
          this.properties.title = value;
        },
        list: this.properties.list,
        term: this.properties.term
      }
    );

    ReactDom.render(element, this.domElement);
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
                  label: 'Selec a list',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  baseTemplate: 101, // document libraries
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyFieldTermPicker('term', {
                  label: 'Select a term',
                  panelTitle: 'Select a term',
                  initialValues: this.properties.term,
                  allowMultipleSelections: false,
                  excludeSystemGroup: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'termSetsPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
