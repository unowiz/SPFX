import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import { IFooterProps } from "./component/IFooterProps";
import { Footer } from "./component/Footer";

import * as strings from 'FooerApplicationCustomizerStrings';

const LOG_SOURCE: string = 'FooerApplicationCustomizer';

export interface IFooerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  
}

export default class FooerApplicationCustomizer
  extends BaseApplicationCustomizer<IFooerApplicationCustomizerProperties> {

    private static _bottomPlaceholder?: PlaceholderContent;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    

    return this._renderPlaceHolder();
  }

  private _renderPlaceHolder(): Promise<void> {
    if (!FooerApplicationCustomizer._bottomPlaceholder) {
      FooerApplicationCustomizer._bottomPlaceholder = this.context.placeholderProvider
        .tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose }
        );
    }

    if(!FooerApplicationCustomizer._bottomPlaceholder) {
      return;
    }

    const elem: React.ReactElement<IFooterProps> = React.createElement(
      Footer,
      {
        context: this.context
      }
    );

    ReactDom.render(elem, FooerApplicationCustomizer._bottomPlaceholder.domElement);
  }

  private _onDispose(): void {
    console.log('[FooerApplicationCustomizer._onDispose] Disposed custom buttom placeholder.');
  }
}
