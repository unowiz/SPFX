import * as React from 'react';
import styles from './AgreementContainer.module.scss';
import { IAgreementDataProvider } from "../interface/IAgreementDataProvider";
import Agreement from "./Agreement";

export interface IAgreementContainerProps {
    provider: IAgreementDataProvider;
}

export interface IAgreementContainerState {
    agreements: Agreement[];
}

export default class AgreementContainer extends React.Component<IAgreementContainerProps, IAgreementContainerState> {
    constructor(props: IAgreementContainerProps) {
        super(props);

        this.state = {
            agreements: []
        }
    };

    

    public componentDidMount(): void {
        this.props.provider.getAgreements().then((agreements) => {
            this.setState({
                agreements: agreements
            });
        });
        
    }

    public render(): JSX.Element {
        console.log(this.state.agreements);
        return (
            <div className={ styles.agreementDatabase }>
                {this.state.agreements.map((agreement, index) => this.renderAgreements(agreement, index))}
            </div>
          );
    }
    private renderAgreements(agreement: Agreement, index: number): any {
        
        return (
            <p>
                {agreement.AgreementName}
            </p>
        )
    }
}
