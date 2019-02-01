import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Constants } from '../../common/constants';
import '../../prototypes/stringPrototypes';
import { SettingsRepository } from '../../repositories/SettingsRepository';

const LOG_SOURCE: string = 'RootRedirectApplicationCustomizer';

export interface IRootRedirectApplicationCustomizerProperties {
}

export default class RootRedirectApplicationCustomizer
  extends BaseApplicationCustomizer<IRootRedirectApplicationCustomizerProperties> {

  public onInit(): Promise<void> {
    var settingsRepository = new SettingsRepository();
    settingsRepository.CountryUrl().then((result) => {

      var location:string = window.location.href.trimEnd("/").toLowerCase();
      var globalUrl = Constants.GlobalUrl.trimEnd("/").toLowerCase();
   
      if (location != globalUrl || window.location.href.indexOf("redirect=0") > -1) {
        return;
      }

      window.location.replace(result);
    }).catch((error) => {
      console.log("ERROR: " + error);
    });

    return Promise.resolve();
  }
}
