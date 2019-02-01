import * as React from 'react';
import { IBingTranslationWebpartProps } from './IBingTranslationWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';



export default class BingTranslationWebpart extends React.Component<IBingTranslationWebpartProps, {}> {
  private addWidget() {
    var s=document.createElement('script');
    s.type='text/javascript';
    s.charset='UTF-8';
    s.src=((location && location.href && location.href.indexOf('https') == 0)?'https://ssl.microsofttranslator.com':'http://www.microsofttranslator.com')+'/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=False&ui=true&settings=Manual&from=';var p=document.getElementsByTagName('head')[0]||document.documentElement;p.insertBefore(s,p.firstChild); 
  }

  private moveSearchBox() {
    let x= document.querySelectorAll('[class^=root-]')[0];
    x.setAttribute('hidden', null);
    
    document.getElementById('searchBoxContainer').appendChild(document.querySelectorAll('[class^=searchCell]')[0]); 
  }

  public render(): React.ReactElement<IBingTranslationWebpartProps> {
    return (
      <div>
      {/* <div id="MicrosoftTranslatorWidget" className="Dark">
      </div> */}
      {
        //setTimeout(this.addWidget, 0)
      }

      <style>
        div[class^='root-'] {}
      </style>

      <div id="searchBoxContainer">

      </div>

        {
          setTimeout(this.moveSearchBox, 0)
        }

      </div>
    );
  }
}