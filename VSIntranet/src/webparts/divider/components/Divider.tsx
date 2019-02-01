import * as React from 'react';
import styles from './Divider.module.scss';
import { escape, merge, constant } from '@microsoft/sp-lodash-subset';
import { ListRepository } from '../../../repositories/ListRepository/ListRepository';
import { IDividerWebPartState } from './IDividerWebPartState';
import { IDividerwebpartProps } from './IDividerWebPartProps';
import { IDividerProps } from './IDividerProps';
import pnp, { graph, Items, CheckinType } from 'sp-pnp-js';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ResponseData } from "../../../repositories/BaseRepository/ResponseData";
import { Dialog, DialogType, DialogFooter, DialogContent} from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { CurrentUser } from 'sp-pnp-js/lib/sharepoint/siteusers';
import { getIconClassName, concatStyleSets } from '@uifabric/styling/lib';
import * as _ from 'lodash';
import { Constants } from '../../../common/constants';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { stringIsNullOrEmpty } from '@pnp/common';
import { CacheManager } from '../../../common/CacheManager';
import DividerContainer from '../../../containers/divider/DividerContainer';
import { IDividerDataProvider } from '../../../interfaces/IDividerDataProvider';
import DividerDataProvider from '../../../dataproviders/DividerDataProvider';


// export interface IDividerwebpartProps{
//   title: string;
//   numberOfItems: number;
//   cacheResult: boolean;
//   filter: string;
//   listTitle: string;
//   webUrl: string;
//   context: WebPartContext;
// }

export default class Divider extends React.Component<IDividerwebpartProps, IDividerWebPartState> {

  constructor(props: IDividerwebpartProps){
    super(props);
    this.state = {
      hasItems: false,
      items: [],
      loading: true,
      hideDialog: true,
    };
  }


  private _showDialog = (): void => {
    this.setState({hideDialog: false});
  }

  private _closeDialog = (): void => {
    this.setState({hideDialog: true});
  }

  public render(): React.ReactElement<IDividerwebpartProps> {
    const provider: IDividerDataProvider = new DividerDataProvider(this.props.context.pageContext.web.absoluteUrl, this.props.context);
    return (
      <DividerContainer provider={provider}/>
    );
  }
  
}
