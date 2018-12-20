import * as React from 'react';
import styles from './UsePnp.module.scss';
import { IUsePnpProps } from './IUsePnpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton, autobind } from "office-ui-fabric-react";
import { IListItem } from "../IListItem";

export default class UsePnp extends React.Component<IUsePnpProps, {}> {




  public render(): React.ReactElement<IUsePnpProps> {
    return (
      <div className={ styles.usePnp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <DefaultButton
                text="Load list items"
                title="Load list items"
                onClick={this._loadListItems}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  @autobind
  private async _loadListItems(): Promise<void> {
    const items: IListItem[] = await this.props.loadListItems();
    console.log(items);
  }
}
