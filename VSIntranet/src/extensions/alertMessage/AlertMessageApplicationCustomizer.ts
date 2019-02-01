import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, 
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'AlertMessageApplicationCustomizerStrings';
import { IAlertMessageApplicationCustomizerProps } from './components/IAlertMessageApplicationCustomizerProps';
import AlertMessage from './components/AlertMessage';

const LOG_SOURCE: string = 'AlertMessageApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAlertMessageApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AlertMessageApplicationCustomizer
  extends BaseApplicationCustomizer<IAlertMessageApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // let topPlaceholder: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    let topPlaceholder = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose }
    );    

    let context = this.context.pageContext;

    if (true) {
      const element : React.ReactElement<IAlertMessageApplicationCustomizerProps> = React.createElement(
        AlertMessage,{
          context: this.context,
        }
      );

      ReactDom.render(element, topPlaceholder.domElement);
    }    

    // const element: React.ReactElement<IDividerwebpartProps > = React.createElement(
    //   Divider,
    //   {
    //     context: this.context,
    //   }
    // );

    // ReactDom.render(element, this._topPlaceholder.domElement);

    return Promise.resolve();
  }  

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom alert message placeholders.');
  }  
}
