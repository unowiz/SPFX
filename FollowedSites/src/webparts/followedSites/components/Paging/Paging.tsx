import * as React from 'react';
import styles from './Paging.module.scss';
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { IPagingProps } from "./IPagingProps";
import { IPagingState } from "./IPagingState";

export class Paging extends React.Component<IPagingProps, IPagingState> {
  constructor(props: IPagingProps) {
    super(props);

    this.state = {
      currentPage: 0
    };
  }

  /**
   * Load the previous page
   */
  private _prevPage = (): void => {
    let { currentPage } = this.state;
    if (currentPage > 0) {
      currentPage--;
      // Update the current page
      this.setState({
        currentPage
      });
      // Update elements to render
      this._triggerUpdate(currentPage);
    }
  }

  /**
   * Load the previous page
   */
  private _nextPage = (): void => {
    let { currentPage } = this.state;
    if ((this.props.nrOfItems*(this.state.currentPage)) < this.props.allItems.length) {
      currentPage++;
      // Update the current page
      this.setState({
        currentPage
      });
      // Update elements to render
      this._triggerUpdate(currentPage);
    }
  }

  /**
   * Triggers the update function with the new batch of items
   */
  private _triggerUpdate = (pageNr: number): void => {
    let allItems = [...this.props.allItems];
    // Pass the next batch of items to render to the parent component
    this.props.fUpdateItems(allItems.splice((pageNr * this.props.nrOfItems), this.props.nrOfItems));
  }

  /**
   * componentWillReceiveProps lifecycle hook
   * @param nextProps
   */
  public componentWillReceiveProps(nextProps: IPagingProps): void {
    // Check if items were filtered
    if (this.props.allItems.length !== nextProps.allItems.length) {
      this.setState({
        currentPage: 0
      });
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IPagingProps> {
    if (this.props.nrOfItems && this.props.allItems && this.props.allItems.length > this.props.nrOfItems) {
      return (
        <div className={styles.paging}>
          <DefaultButton onClick={this._prevPage}
                         disabled={this.state.currentPage <= 0}>
            <Icon iconName="ChevronLeft" />
          </DefaultButton>

          <span className={styles.pagingNrLabels}>
            {this.state.currentPage + 1}/{Math.ceil(this.props.allItems.length/this.props.nrOfItems)}
          </span>

          <DefaultButton onClick={this._nextPage}
                         disabled={(this.props.nrOfItems*(this.state.currentPage+1)) >= this.props.allItems.length}>
            <Icon iconName="ChevronRight" />
          </DefaultButton>
        </div>
      );
    }

    return null;
  }
}
