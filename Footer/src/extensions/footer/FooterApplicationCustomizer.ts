import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
//import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'FooterApplicationCustomizerStrings';
import Footer from './components/Footer';

const LOG_SOURCE: string = 'FooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  //testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class FooterApplicationCustomizer
  extends BaseApplicationCustomizer<IFooterApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let placeholder: PlaceholderContent;

    placeholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);

    const elem = React.createElement(Footer);
    ReactDOM.render(elem, placeholder.domElement);

    return Promise.resolve();
  }
}
