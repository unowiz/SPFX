import * as React from 'react';
import * as _ from 'lodash';
import { List } from 'office-ui-fabric-react/lib/List';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton, IButtonProps, PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

import styles from './AlertMessageComponent.module.scss';
import { CacheManager } from '../../common/CacheManager';
import { IAlertMessageDataProvider } from '../../interfaces/IAlertMessageDataProvider';
import AlertMessageCard from './AlertMessageCard';
import AlertMessage from './AlertMessage';

export interface IAlertMessageContainerProps {
  provider: IAlertMessageDataProvider;
}

export interface IAlertMessageContainerState {
  items: any[];
  loading: boolean;
  closeAlertMessage: any;
}

export default class AlertMessageContainer extends React.Component<IAlertMessageContainerProps, IAlertMessageContainerState> {

  constructor(props: IAlertMessageContainerProps) {
    super(props);

    this.closeAlertMessage = this.closeAlertMessage.bind(this);

    this.state =
      {
        items: [],
        loading: true,
        closeAlertMessage: this.closeAlertMessage
      };
  }

  public componentDidMount(): void {

    this.props.provider.getUserAlerts().then((result) => {
      let _items = result;

      //   cacheManager.set(cacheKey, result);

      this.setState({
        items: _items,
        loading: false,
        closeAlertMessage: this.closeAlertMessage        
      });
    });
  }

  private closeAlertMessage = (item: any, e: any) => {

    let _copy = JSON.parse(JSON.stringify(this.state.items));

    _.remove(_copy, {
        'id': item
    });

    this.setState({
      items: _copy,
      loading: false,
      closeAlertMessage: this.closeAlertMessage
     });
     
      //   cacheManager.set(cacheKey, result);

    // this.props.provider.removeUserClosedAlerts(item).then((result) => {
    //     //   let result = _.concat(allItems["local"], allItems["global"]);
    //     console.log("2");
    //     let _result = result;
    //     //   cacheManager.set(cacheKey, result);
    // });

  }

  public render(): JSX.Element {
    if (this.state.loading) {
      return <div>Loading</div>;
    }  

    return <div className={styles.container}>    
      {this.state.items.map((item) => {
          return <AlertMessageCard title={item.title} message={item.message} id={item.id} action={this.state.closeAlertMessage} />;
        })
      }
    </div>;
  }
}