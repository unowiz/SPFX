import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'AgreementDatabaseWebPartStrings';
import AgreementDatabase from './components/AgreementDatabase';
import { IAgreementDatabaseProps } from './components/IAgreementDatabaseProps';
import { setup as pnpSetup } from "@pnp/common";
import ContentDataProvider from "../../dataprovider/ContentDataProvider";

export interface IAgreementDatabaseWebPartProps {
  description: string;
  viewName: string;
  headertext: string;
  nrofboxes: string;
  linktitle1: string;
  linktext1: string;
  linkurl1: string;
  linktitle2: string;
  linktext2: string;
  linkurl2: string;
  linktitle3: string;
  linktext3: string;
  linkurl3: string;
  linktitle4: string;
  linktext4: string;
  linkurl4: string;
  linktitle5: string;
  linktext5: string;
  linkurl5: string;
  linktitle6: string;
  linktext6: string;
  linkurl6: string;
}

export default class AgreementDatabaseWebPart extends BaseClientSideWebPart<IAgreementDatabaseWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
    pnpSetup({
        spfxContext: this.context
      });
    });
  }
  public render(): void {
    const contentProvider: ContentDataProvider = new ContentDataProvider();
    const element: React.ReactElement<IAgreementDatabaseProps > = React.createElement(
      AgreementDatabase,
      {
        description: this.properties.description,
        provider: contentProvider,
        headertext: this.properties.headertext,
        nrofboxes: this.properties.nrofboxes,
        linktitle1: this.properties.linktitle1,
        linktext1: this.properties.linktext1,
        linkurl1: this.properties.linkurl1,
        linktitle2: this.properties.linktitle2,
        linktext2: this.properties.linktext2,
        linkurl2: this.properties.linkurl2,
        linktitle3: this.properties.linktitle3,
        linktext3: this.properties.linktext3,
        linkurl3: this.properties.linkurl3,
        linktitle4: this.properties.linktitle4,
        linktext4: this.properties.linktext4,
        linkurl4: this.properties.linkurl4,
        linktitle5: this.properties.linktitle5,
        linktext5: this.properties.linktext5,
        linkurl5: this.properties.linkurl5,
        linktitle6: this.properties.linktitle6,
        linktext6: this.properties.linktext6,
        linkurl6: this.properties.linkurl6
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
          displayGroupsAsAccordion: true,
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "General",
              groupFields: [
                PropertyPaneTextField('headertext', {
                  label: "Text"
                }),
                PropertyPaneDropdown('nrofboxes', {
                  label: "Number of navigation boxes",
                  options: [
                    {text: "1", key: "1"},
                    {text: "2", key: "2"},
                    {text: "3", key: "3"},
                    {text: "4", key: "4"},
                    {text: "6", key: "6"},
                  ]
                })
              ]
            },
            {
              isCollapsed: true,
              groupName: "Navigation box 1",
              groupFields: [
                PropertyPaneTextField('linktitle1', {
                  label: "Title",
                }),
                PropertyPaneTextField('linktext1', {
                  label: "Text"
                }),
                PropertyPaneTextField('linkurl1', {
                  label: "Url"
                })
              ]
            },
            {
              isCollapsed: true,
              groupName: "Navigation box 2",
              groupFields: [
                PropertyPaneTextField('linktitle2', {
                  label: "Title"
                }),
                PropertyPaneTextField('linktext2', {
                  label: "Text"
                }),
                PropertyPaneTextField('linkurl2', {
                  label: "Url"
                })
              ]
            },
            {
              isCollapsed: true,
              groupName: "Navigation box 3",
              groupFields: [
                PropertyPaneTextField('linktitle3', {
                  label: "Title"
                }),
                PropertyPaneTextField('linktext3', {
                  label: "Text"
                }),
                PropertyPaneTextField('linkurl3', {
                  label: "Url"
                })
              ]
            },
            {
              isCollapsed: true,
              groupName: "Navigation box 4",
              groupFields: [
                PropertyPaneTextField('linktitle4', {
                  label: "Title"
                }),
                PropertyPaneTextField('linktext4', {
                  label: "Text"
                }),
                PropertyPaneTextField('linkurl4', {
                  label: "Url"
                })
              ]
            },
            {
              isCollapsed: true,
              groupName: "Navigation box 5",
              groupFields: [
                PropertyPaneTextField('linktitle5', {
                  label: "Title"
                }),
                PropertyPaneTextField('linktext5', {
                  label: "Text"
                }),
                PropertyPaneTextField('linkurl5', {
                  label: "Url"
                })
              ]
            },
            {
              isCollapsed: true,
              groupName: "Navigation box 6",
              groupFields: [
                PropertyPaneTextField('linktitle6', {
                  label: "Title"
                }),
                PropertyPaneTextField('linktext6', {
                  label: "Text"
                }),
                PropertyPaneTextField('linkurl6', {
                  label: "Url"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
