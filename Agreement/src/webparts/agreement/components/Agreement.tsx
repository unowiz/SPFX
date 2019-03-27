import * as React from 'react';
import styles from './Agreement.module.scss';
import { IAgreementProps } from './IAgreementProps';
import AgreementContainer from "../../../container/AgreementContainer";
import { IAgreementDataProvider } from "../../../interface/IAgreementDataProvider";
import AgreementDataProvider from "../../../dataprovider/AgreementDataProvider";

export default class AgreementDatabase extends React.Component<IAgreementProps, {}> {
  constructor(props: IAgreementProps) {
    super(props);
  }

  public render(): React.ReactElement<IAgreementProps> {
    const provider: IAgreementDataProvider = new AgreementDataProvider(this.props.context.pageContext.web.absoluteUrl, this.props.context);
    return (
      <AgreementContainer provider={provider} />
    );
  }
}
