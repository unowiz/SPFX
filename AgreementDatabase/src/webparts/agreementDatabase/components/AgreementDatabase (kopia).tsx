import * as React from 'react';
import styles from './AgreementDatabase.module.scss';
import { IAgreementDatabaseProps } from './IAgreementDatabaseProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IList } from "../../../dataprovider/ContentDataProvider";
import * as moment from 'moment';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

export interface IListState {
  filteredListItems: IList[];
  originalitems: IList[];
  groupByFields: IGrouping[];
  filter: boolean;
}

export default class AgreementDatabase extends React.Component<IAgreementDatabaseProps, IListState> {
  constructor(props: IAgreementDatabaseProps) {
    super(props);

    this.state = {
      originalitems: [],
      filteredListItems: [],
      groupByFields: [],
      filter: true

    };
    this.groupHandler = this.groupHandler.bind(this);
  }

  public componentDidMount(): void {
    this.props.provider.getContent().then((originalitems: IList[]) => {
      this.setState({
        filteredListItems: originalitems,
        originalitems: originalitems
      });
    });
  }


  private _viewFields: IViewField[] = [
    {
      name: "AgreementName",
      displayName: "Agreement Name",
      maxWidth: 25,
      minWidth: 25,
      sorting: true,
      isResizable: true
    },
    {
      name: "AgreementType",
      displayName: "Agreement Type",
      sorting: true,
      isResizable: true
    },
    {
      name: "ContactPerson",
      displayName: "Contact Person",
      sorting: true,
      isResizable: true
    },
    {
      name: "SalesManager",
      displayName: "Sales Manager",
      sorting: true,
      isResizable: true
    },
    {
      name: "Customer",
      displayName: "Customer",
      sorting: true,
      isResizable: true
    },
    {
      name: "DeliveryType",
      displayName: "Delivery Type",
      sorting: true,
      isResizable: true
    },
    {
      name: "AgreementStartDate",
      displayName: "Agreement Start Date",
      sorting: true,
      isResizable: true,
      render: (item: IList) => {
        let agreementStartDate = moment(item.AgreementStartDate).format('YYYY-MM-DD');
        return (<span>{agreementStartDate}</span>);
      }
    },
    {
      name: "AgreementEndDate",
      displayName: "Agreement End Date",
      sorting: true,
      isResizable: true,
      render: (item: IList) => {
        let agreementEndDate = moment(item.AgreementEndDate).format('YYYY-MM-DD');
        return (<span>{agreementEndDate}</span>);
      }
    },
    {
      name: "AgreementEnded",
      displayName: "Agreement Ended",
      minWidth: 50,
      isResizable: true,
      render: (item: IList) => {
        const agreementEnded = item.AgreementEnded;
        if (agreementEnded == true) {
          return (<span>Ja</span>);
        } else {
          return (<span>Nej</span>);
        }
      }
    },
    {
      name: "LastPriceAdjustment",
      displayName: "Last Price Adjustment",
      sorting: true,
      isResizable: true,
      render: (item: IList) => {
        let lastPriceAdjustment = moment(item.LastPriceAdjustment).format('YYYY-MM-DD');
        return (<span>{lastPriceAdjustment}</span>);
      }
    },
    {
      name: "NexPriceAdjustment",
      displayName: "Next Price Adjustment",
      sorting: true,
      isResizable: true,
      render: (item: IList) => {
        let nextPriceAdjustment = moment(item.NextPriceAdjustment).format('YYYY-MM-DD');
        return (<span>{nextPriceAdjustment}</span>);
      }
    }
  ];

  public render(): React.ReactElement<IAgreementDatabaseProps> {
    console.log(this.state.filteredListItems);
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
          {this._renderList()}
        </div>
      </React.Fragment>
    );
  }
  private generateBoxes(nrofboxes: string): JSX.Element {
    const boxes: JSX.Element[] = [];
    const size: number = 12 / Number(nrofboxes);
    const clsName: string = "ms-Grid-col ms-lg" + size + " ms-xl" + size;

    for (let i = 1; i <= Number(nrofboxes); i++) {
      boxes.push(
        <div className={"ms-Grid-col ms-lg" + size + " ms-xl" + size + " " + styles["adw-link-box-container"]}>
          <div className={styles["link-box"]}>
            <a onClick={(e) => this._handleRequest(this.props["linkurl" + i])} href="#" id={this.props["linkurl" + i]}>
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

  private _handleRequest(request: string): void {
    switch (request) {
      case 'Customer':
      case 'Sales Manager':
        this.groupHandler(request);
        break;
      case 'Agreement Ended':
        this.getEnded();
        break;
      case 'Last Price Adjustment':
        this.getPassed();
        break;
        case 'My Agreements':
        this.getMyAgreement();
        break;
      default:
        break;
    }
  }

  private _renderList(): any {
   
    if (this.state.filter) {
      return (<ListView
        items={this.state.filteredListItems}
        viewFields={this._viewFields}
      />)
    } else {
      return (<ListView
        items={this.state.originalitems}
        viewFields={this._viewFields}
        groupByFields={this.state.groupByFields}
      />)
    }
  }
  private getMyAgreement(): void {
    this.props.provider.getMyAgreement().then((originalitems: IList[]) => {
      this.setState({
        filteredListItems: originalitems,
        filter: true
      });
    });
  }

  private getEnded(): void {
    this.props.provider.getEnded().then((originalitems: IList[]) => {
      this.setState({
        filteredListItems: originalitems,
        filter: true
      });
    });
  }

  private getPassed(): void {
    this.props.provider.getPassed().then((originalitems: IList[]) => {
      this.setState({
        filteredListItems: originalitems,
        filter: true
      });
    });
  }

  private groupHandler(group: string): void {
    group = group.replace(/ +/g, "");
    this.setState({
      groupByFields: [{
        name: group,
        order: GroupOrder.ascending
      }],
      filter: false
    });
  }
}
