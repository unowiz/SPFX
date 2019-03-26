import * as React from 'react';
import styles from './AgreementContainer.module.scss';
import { IAgreementDataProvider } from "../interface/IAgreementDataProvider";
import Agreement from "./Agreement";
import Views from "./Views";
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
 import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

export interface IAgreementContainerProps {
    provider: IAgreementDataProvider;
}

export interface IAgreementContainerState {
    agreements: Agreement[];
    views: Views[];
}

export default class AgreementContainer extends React.Component<IAgreementContainerProps, IAgreementContainerState> {
    constructor(props: IAgreementContainerProps) {
        super(props);

        this.state = {
            agreements: [],
            views: []
        };
    }
    
    private viewFields: IViewField[] = [
        {
            name: "Title",
            linkPropertyName: "Title.ServerRelativeUrl",
            displayName: "Agreement Name",
            maxWidth: 25,
            minWidth: 25,
            sorting: true,
            isResizable: true
          },
          {
            name: "CustomerAgreementNr",
            displayName: "Customer Agreement Nr",
            maxWidth: 4,
            isResizable: true
          },
          {
            name: "AgreementType",
            displayName: "Agreement Type",
            isResizable: true
          },
          {
            name: "SalesManager",
            displayName: "Sales Manager",
            isResizable: true,

          },
          {
            name: "ContactPerson",
            displayName: "Contact Person",
            isResizable: true
          },
          {
            name: "DeliveryType",
            displayName: "Delivery Type",
            isResizable: true
          },
          {
            name: "AgreementStartDate",
            displayName: "Agreement Start Date",
            isResizable: true,
            render: (item: Agreement) => { 
                const localizedEndDate = new Date(item.AgreementStartDate); 
                return (<span>{localizedEndDate.toLocaleString()}</span>); 
                }
          },
          {
            name: "AgreementEndDate",
            displayName: "Agreement End Date",
            isResizable: true
          },
          {
            name: "AgreementEnded",
            displayName: "Agreement Ended",
            isResizable: true,
            render: (item: Agreement) => { 
              const AgreementEnded = item.AgreementEnded; 
              if(AgreementEnded == false) {
                return (<span>Nej</span>); 
              } else {
                return (<span>Ja</span>); 
              }
              }
          },
          {
            name: "LastPriceAdjustment",
            displayName: "Last Price Adjustment",
            isResizable: true
          },
          {
            name: "NextPriceAdjustment",
            displayName: "Next Price Adjustment",
            isResizable: true
          }
    ];

    public componentDidMount(): void {
        this.props.provider.getAgreements().then((agreements) => {
            this.setState({
                agreements: agreements
            });
        });

        this.props.provider.getViews().then((views) => {
          this.setState({
              views: views
          });
      });
        
    }

    public render(): JSX.Element {
      let viewArray = [];
      {this.state.views.map((view, index) => 
          viewArray.push({key:view.Title, Title:view.Title})
        )};

        return (
            <div className={ styles.agreementDatabase }>
             <Dropdown 
              placeHolder="Filter"
              label="Filter label"
              options={this.state.views.map((view:any) => {return {key:view.ID, text:view.Title};})}
            /> 
            <ListView 
                items = {this.state.agreements}
                viewFields={this.viewFields}
            />
            </div>
          );
    }
}
