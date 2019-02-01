import * as React from 'react';
import { IAlertMessageApplicationCustomizerState } from './IAlertMessageApplicationCustomizerState';
import { IAlertMessageApplicationCustomizerProps } from './IAlertMessageApplicationCustomizerProps';
import { IAlertMessageDataProvider } from '../../../interfaces/IAlertMessageDataProvider';
import AlertMessageDataProvider from '../../../dataproviders/AlertMessageDataProvider';
import AlertMessageContainer from '../../../containers/alertmessage/AlertMessageContainer';

export default class AlertMessage extends React.Component<IAlertMessageApplicationCustomizerProps, IAlertMessageApplicationCustomizerState> {

  constructor(props: IAlertMessageApplicationCustomizerProps){
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  public render(): React.ReactElement<IAlertMessageApplicationCustomizerProps> {
    const provider: IAlertMessageDataProvider = new AlertMessageDataProvider(this.props.context.pageContext.web.absoluteUrl, this.props.context);
    return (
      <AlertMessageContainer provider={provider}/>
    );
  }
}
