import * as React from 'react';
import AlertMessage from './AlertMessage';
import styles from './AlertMessageComponent.module.scss';

import { initializeIcons } from '@uifabric/icons';
initializeIcons();

export interface IAlertMessageCardProps {
  items: any;
}

export interface IAlertMessageCardState {
  isActive: boolean;
}

// export default class AlertMessageCard extends React.Component<IAlertMessageCardProps, IAlertMessageCardState> {
export default class AlertMessageCard extends React.Component<any, any> {
    constructor(props) {
      super(props);

      this.state = {
        title: props.title,
        message: props.message,
        id: props.id,
        active: props.active,
      };
    }

    public render(): JSX.Element {

    return (
      <div className={ styles.card }>
          <div className={ styles.text }>{this.state.message}</div>
          <button className={ styles.close } onClick={(e) => this.props.action(this.state.id, e)}>
            <i className="ms-Icon ms-Icon--Cancel" aria-hidden="true"></i>
          </button>
      </div>);
    }
}