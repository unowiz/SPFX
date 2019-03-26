import * as React from 'react';
import styles from './AgreementDatabase.module.scss';
import { IAgreementDatabaseProps } from './IAgreementDatabaseProps';
import { escape } from '@microsoft/sp-lodash-subset';
import AgreementContainer from "../../../container/AgreementContainer";
import { IAgreementDataProvider } from "../../../interface/IAgreementDataProvider";
import AgreementDataProvider from "../../../dataprovider/AgreementDataProvider";

export default class AgreementDatabase extends React.Component<IAgreementDatabaseProps, {}> {
  constructor(props: IAgreementDatabaseProps) {
    super(props);
  }

  public render(): React.ReactElement<IAgreementDatabaseProps> {
    const provider: IAgreementDataProvider = new AgreementDataProvider(this.props.context.pageContext.web.absoluteUrl, this.props.context);
    return (
      <AgreementContainer provider={provider} />
    );
  }
}
