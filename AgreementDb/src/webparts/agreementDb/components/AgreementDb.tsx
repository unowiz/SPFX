import * as React from 'react';
import styles from './AgreementDb.module.scss';
import { IAgreementDbProps } from './IAgreementDbProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IAgreement } from '../../../dataprovider/ContentDataProvider';

import { DetailsList, IGroup, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import * as moment from 'moment';

export interface IAgrementState {
  originalitems: IAgreement[];
}

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px'
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden'
      }
    }
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px'
  },
});

export default class AgreementDb extends React.Component<IAgreementDbProps, IAgrementState> {
  constructor(props: IAgreementDbProps) {
    super(props);

    this.state = {
      originalitems: []
    }
  }

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

    for (var i = 1; i <= Number(nrofboxes); i++) {
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

  public render(): React.ReactElement<IAgreementDbProps> {
    
    const columns: IColumn[] = [
      {
        key: 'column1',
        name: 'File Type',
        className: classNames.fileIconCell,
        iconClassName: classNames.fileIconHeaderIcon,
        ariaLabel: 'Column operations for File type, Press to sort on File type',
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'name',
        minWidth: 16,
        maxWidth: 16,

      },
      {
        key: 'AgreementName',
        name: 'Agreement Name',
        fieldName: 'AgreementName',
        minWidth: 110,
        maxWidth: 110,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true
      },
      {
        key: 'CustomerAgreementNr',
        name: 'Customer Agreement Nr',
        fieldName: 'CustomerAgreementNr',
        minWidth: 50,
        maxWidth: 50,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'number',
        isPadded: true
      },
      {
        key: 'AgreementType',
        name: 'Agreement Type',
        fieldName: 'AgreementType',
        minWidth: 150,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true
      },
      {
        key: 'ContactPerson',
        name: 'Contact Person',
        fieldName: 'ContactPerson',
        minWidth: 110,
        maxWidth: 110,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true
      },
      {
        key: 'SalesManager',
        name: 'Sales Manager',
        fieldName: 'SalesManager',
        minWidth: 110,
        maxWidth: 110,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true
      },
      {
        key: 'Customer',
        name: 'Customer',
        fieldName: 'Customer',
        minWidth: 110,
        maxWidth: 110,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true
      },
      {
        key: 'DeliveryType',
        name: 'Delivery Type',
        fieldName: 'DeliveryType',
        minWidth: 80,
        maxWidth: 80,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true
      },
      {
        key: 'AgreementStartDate',
        name: 'Agreement Start Date',
        fieldName: 'AgreementStartDate',
        minWidth: 110,
        maxWidth: 110,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'number',
        isPadded: true,
        onRender: (item: IAgreement) => {
          let agreementStartDate = moment(item.AgreementStartDate).format('YYYY-MM-DD');
          return (<span>{agreementStartDate}</span>);
        }
      },
      {
        key: 'AgreementEndDate',
        name: 'Agreement End Date',
        fieldName: 'AgreementEndDate',
        minWidth: 110,
        maxWidth: 110,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'number',
        isPadded: true,
        onRender: (item: IAgreement) => {
          let agreementEndDate = moment(item.AgreementEndDate).format('YYYY-MM-DD');
          return (<span>{agreementEndDate}</span>);
        }
      },
      {
        key: 'AgreementEnded',
        name: 'Agreement Ended',
        fieldName: 'AgreementEnded',
        minWidth: 16,
        maxWidth: 16,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'string',
        isPadded: true,
        onRender: (item: IAgreement) => {
          const agreementEnded = item.AgreementEnded;
          if (agreementEnded == true) {
            return (<span>Ja</span>);
          } else {
            return (<span>Nej</span>);
          }
        }
      },
      {
        key: 'LastPriceAdjustment',
        name: 'Last Price Adjustment',
        fieldName: 'LastPriceAdjustment',
        minWidth: 110,
        maxWidth: 110,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'number',
        isPadded: true,
        onRender: (item: IAgreement) => {
          let lastPriceAdjustment = moment(item.LastPriceAdjustment).format('YYYY-MM-DD');
          return (<span>{lastPriceAdjustment}</span>);
        }
      },
      {
        key: 'NextPriceAdjustment',
        name: 'Next Price Adjustment',
        fieldName: 'NextPriceAdjustment',
        minWidth: 110,
        maxWidth: 110,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        data: 'number',
        isPadded: true,
        onRender: (item: IAgreement) => {
          let nextPriceAdjustment = moment(item.NextPriceAdjustment).format('YYYY-MM-DD');
          return (<span>{nextPriceAdjustment}</span>);
        }
      },
    ]
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
          <DetailsList
            items={this.state.originalitems}
            columns={columns}
          />
        </div>
      </React.Fragment>
    );
  }
}
