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
import Footer from "./component/Footer";
import * as strings from 'Footer2ApplicationCustomizerStrings';

const LOG_SOURCE: string = 'Footer2ApplicationCustomizer';
export interface IFooter2ApplicationCustomizerProperties {
  // This is an example; replace with your own property
  //testMessage: string;
}

export default class Footer2ApplicationCustomizer
  extends BaseApplicationCustomizer<IFooter2ApplicationCustomizerProperties> {
    private static _bottomPlaceholder?: PlaceholderContent;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    return this._renderPlaceholder();
  }

  private _renderPlaceholder(): Promise<void> {
    if(!Footer2ApplicationCustomizer._bottomPlaceholder) {
      Footer2ApplicationCustomizer._bottomPlaceholder = this.context.placeholderProvider
        .tryCreateContent(
          PlaceholderName.Bottom,
          {onDispose: this._onDispose}
        );
    }

    if(!Footer2ApplicationCustomizer._bottomPlaceholder) {
      return;
    }

    const elem: React.ReactElement<any> = React.createElement(
      Footer
    );

    ReactDom.render(elem, Footer2ApplicationCustomizer._bottomPlaceholder.domElement);
  }

  private _onDispose(): void {
    console.log('[Footer2ApplicationCustomizer._onDispose] Disposed custom alert message placeholders.');
  }
}
