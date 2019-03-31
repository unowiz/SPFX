import * as React from 'react';
import styles from './AgreementDb.module.scss';
import { IAgreementDbProps } from './IAgreementDbProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IViews, IList } from "../../../dataprovider/ContentDataProvider";
import { DetailsList, IGroup, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import * as moment from 'moment';

export interface IViewState {
  viewItems: IViews[];
  listItems: IList[];
}

export default class AgreementDb extends React.Component<IAgreementDbProps, IViewState> {
  constructor(props: IAgreementDbProps) {
    super(props);

    this.state = {
      viewItems: [],
      listItems: [],
    };
  }

  public componentDidMount(): void {
    this.props.provider.getView().then((items: IViews[]) => {
      this.setState({
        viewItems: items
      });
    });

    this.props.provider.getContent().then((listItems: IList[]) => {
      this.setState({
        listItems: listItems
      });
    });
  }

  public render(): React.ReactElement<IAgreementDbProps> {
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
            <a href={this.props["linkurl" + i]} id={this.props["linkurl" + i]}>
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
}
