import * as React from 'react';
import styles from './ReadItemsPnP.module.scss';
import { IReadItemsPnPProps, IReadItemsPnPState } from './IReadItemsPnPProps';
import { escape } from '@microsoft/sp-lodash-subset';

//Pnp Imports
import { sp } from "@pnp/sp";
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";

export default class ReadItemsPnP extends React.Component<IReadItemsPnPProps, IReadItemsPnPState> {

  private _viewFields: IViewField[] = [
    {
      name: "Title",
      displayName: "Title",
      linkPropertyName: 'File.ServerRelativeUrl',
      minWidth: 25,
      isResizable: true,
      sorting: true
    },
    {
      name: "AlertType",
      displayName: "Alert Type",
      minWidth: 25,
      isResizable: true,
      sorting: true
    },
    {
      name: "Message",
      displayName: "Message",
      minWidth: 25,
      isResizable: true,
      sorting: false
    },
    {
      name: "StartDate",
      displayName: "StartDate",
      minWidth: 25,
      isResizable: true,
      sorting: true
    },
    {
      name: "EndDate",
      displayName: "EndDate",
      minWidth: 25,
      isResizable: true,
      sorting: true
    }
  ]

  constructor(props: IReadItemsPnPProps) {
    super(props);

    this.state = {
      items: []
    }
  }


  public render(): React.ReactElement<IReadItemsPnPProps> {
    if (this.props.list == null || this.props.list === "" || this.props.list === undefined) {
      return (
        <Placeholder 
          iconName="Edit"
          iconText="Configure your webpart"
          description="Please configure the webpart"
          buttonLabel="Configure"
          onConfigure={this._onConfigure.bind(this)} // on click call _onConfigure method to open property panel
        />
      );
    }

    return (
      this.state.items.length === 0 ? 
      (
        <Placeholder 
          iconName="InfoSolid"
          iconText="No items found"
          description="No items to display"
        />
      ) : (
        <div>
          <WebPartTitle 
            displayMode={this.props.displayMode} 
            title={this.props.title}  
            updateProperty={this.props.updateTitle}
          />
          <ListView 
            items={this.state.items}
            viewFields={this._viewFields}
            selection={this._getSelection}
          />
        </div>
      )
    );
  }

  private _onConfigure() {
    this.props.context.propertyPane.open();
  }

  private async _getItems() {
    const items = await sp.web.lists.getById(this.props.list).items.get();

    //Update the state
    this.setState({
      items: items ? items : []
    });

    console.log('List items:', this.state.items);
  }

  public componentDidMount() {
    if (this.props.list !== null && this.props.list !== "" && this.props.list !== undefined) {
      this._getItems();
    }
  }

  public componentDidUpdate(prevProps: IReadItemsPnPProps, prevState: IReadItemsPnPState) {
    if(this.props.list !== prevProps.list) {
      if (this.props.list !== null && this.props.list !== "" && this.props.list !== undefined) {
        this._getItems();
      }
    }
  }

  private _getSelection(items: any[]) {
    console.log('Selected list items:', items);
  }
}
