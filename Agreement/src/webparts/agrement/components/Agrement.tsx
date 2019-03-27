import * as React from 'react';
import styles from './Agrement.module.scss';
import { IAgrementProps } from './IAgrementProps';
import { IAgreement } from "../../../dataprovider/contentDataProvider";
import { escape } from '@microsoft/sp-lodash-subset';
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import * as moment from 'moment';

export interface IAgrementState {
  originalitems: IAgreement[];
}

export default class Agrement extends React.Component<IAgrementProps, IAgrementState> {
  constructor(props: IAgrementProps) {
    super(props);

    this.state = {
      originalitems: [],
    }
  }

  private viewFields: IViewField[] = [

      {
        name: "AgreementName",
        displayName: "Agreement Name",
        maxWidth: 80,
        minWidth: 50,
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
        name: "ContactPerson",
        displayName: "Contact Person",
        isResizable: true
      },
      {
        name: "SalesManager",
        displayName: "Sales Manager",
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
        render: (item: IAgreement) => {
           let agreementStartDate = moment(item.AgreementStartDate).format('YYYY-MM-DD');
            return (<span>{agreementStartDate}</span>);
            }
      },
      {
        name: "AgreementEndDate",
        displayName: "Agreement End Date",
        isResizable: true,
        render: (item: IAgreement) => {
          let agreementEndDate = moment(item.AgreementEndDate).format('YYYY-MM-DD');
           return (<span>{agreementEndDate}</span>);
           }
      },
      {
        name: "AgreementEnded",
        displayName: "Agreement Ended",
        isResizable: true,
        render: (item: IAgreement) => {
          const agreementEnded = item.AgreementEnded;
          if(agreementEnded == true) {
            return (<span>Ja</span>);
          } else {
            return (<span>Nej</span>);
          }

          }
      },
      {
        name: "LastPriceAdjustment",
        displayName: "Last Price Adjustment",
        isResizable: true,
        render: (item: IAgreement) => {
          let lastPriceAdjustment = moment(item.LastPriceAdjustment).format('YYYY-MM-DD');
           return (<span>{lastPriceAdjustment}</span>);
           }
      },
      {
        name: "NextPriceAdjustment",
        displayName: "Next Price Adjustment",
        isResizable: true,
        render: (item: IAgreement) => {
          let nextPriceAdjustment = moment(item.NextPriceAdjustment).format('YYYY-MM-DD');
           return (<span>{nextPriceAdjustment}</span>);
           }
      }

]

  public componentDidMount(): void {
    this.props.provider.getContent().then((items: IAgreement[]) => {
        this.setState({
            originalitems: items
        });
    });


  }

  private generateBoxes(nrofboxes: string): JSX.Element {
    const boxes: JSX.Element[] = [];
    const size: number = 12 / Number(nrofboxes);
    const clsName: string = "ms-Grid-col ms-lg" + size + " ms-xl" + size;

    for (var i = 1; i <= Number(nrofboxes); i++){
      boxes.push(
        <div className={"ms-Grid-col ms-lg" + size + " ms-xl" + size + " " + styles["adw-link-box-container"]}>
          <div className={styles["link-box"]}>
            <a href={this.props["linkurl" + i]}>
              <h4 className={styles["link-box-header-container"]}>
                <small className={styles["link-box-header-title"]}>{this.props["linktitle" + i]}</small>
                <span className={styles["link-box-header-text"]}>{this.props["linktext" + i]}</span>
              </h4>
            </a>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        {boxes}
      </React.Fragment>
    );

  }

  private generateList(): JSX.Element {
    return (
      <React.Fragment>
        <div className={styles["adw-link-list-container"] + " ms-Grid-col ms-xl12"}>
          <ListView
                items = {this.state.originalitems}
                viewFields={this.viewFields}
            />
          </div>
      </React.Fragment>
    );
  }

  public render(): React.ReactElement<IAgrementProps> {
    console.log(this.state.originalitems);
    return (
      <React.Fragment>
        <div className="ms-Grid-col ms-lg12 ms-xl12">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-lg12 ms-xl12">
              <div className={styles['main-box']}>
                <h1 className={styles['link']}>{this.props.headertext}</h1>
              </div>
            </div>
          </div>

          {this.generateBoxes(this.props.nrofboxes)}
          <div className={`ms-Grid-row ${styles['separator']}`}>
            <hr className={styles["adw-separator"]} />
          </div>

          {this.generateList()}


</div>

      </React.Fragment>
    );
  }

}
