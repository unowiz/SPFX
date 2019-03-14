import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
} from "@microsoft/sp-webpart-base";
import { MSGraphClient } from "@microsoft/sp-http";
import * as strings from "SiteMembersWebPartStrings";
import SiteMembers from "./components/SiteMembers";
import { ISiteMembersProps } from "./components/ISiteMembersProps";

export interface ISiteMembersWebPartProps {
  title: string;
}

export default class SiteMembersWebPart extends BaseClientSideWebPart<ISiteMembersWebPartProps> {
  private graphClient: MSGraphClient;

  public onInit(): Promise<void> {
    return new Promise<void>(
      (resolve: () => void, reject: (error: any) => void): void => {
        this.context.msGraphClientFactory.getClient().then(
          (client: MSGraphClient): void => {
            this.graphClient = client;
            resolve();
          },
          err => reject(err)
        );
      }
    );
  }

  public render(): void {
    const element: React.ReactElement<ISiteMembersProps> = React.createElement(
      SiteMembers,
      {
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string): void => {
          this.properties.title = value;
        },
        graphClient: this.graphClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: []
        }
      ]
    };
  }
}
