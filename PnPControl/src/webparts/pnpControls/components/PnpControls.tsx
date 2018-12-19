import * as React from 'react';
import * as moment from 'moment';
import styles from './PnpControls.module.scss';
import { IPnpControlsProps } from './IPnpControlsProps';
import { IPnpControlState } from "./IPnpControlsState";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/components/Spinner";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { ListView } from "@pnp/spfx-controls-react/lib/ListView";
import { SPHttpClient } from "@microsoft/sp-http";
import { IViewField } from "@pnp/spfx-controls-react/lib/controls/listView";
import { escape } from '@microsoft/sp-lodash-subset';

export default class PnpControls extends React.Component<IPnpControlsProps, IPnpControlState> {
  // the fields that need to be viewed in the list view
  private _viewFields: IViewField[] = [
    {
      name: "Id",
      displayName: "ID",
      maxWidth: 25,
      minWidth: 25,
      sorting: true
    },
    {
      name: "File.Name",
      linkPropertyName: "File.ServerRealtiveUrl",
      displayName: "Name",
      sorting: true
    },
    {
      name: "File.TimeCreated",
      displayName: "Created",
      minWidth: 150,
      render: (item: any) => {
        const created = item["File.TimeCreated"];
        if (created) {
          const createdDate = moment(created);
          return <span>{createdDate.format('DD/MM/YYYY HH:mm:ss')}</span>;
        }
      }
    }

  ];

  /**
   * Constructor
   */
  constructor(props: IPnpControlsProps) {
    super(props);

    this.state = {
      items: [],
      loading: false,
      showPlaceHolder: (this.props.list === null || this.props.list === "")
    };
  }

  /**
   * ComponentDidMount
   */
  public componentDidMount() {
    if(this.props.list !== null && this.props.list !== "") {
      this._getListItems();
    }
   }

   /**
    * componentDidUpdate
    */
   public componentDidUpdate(prevProps: IPnpControlsProps, prevState: IPnpControlState) {
     if (this.props.list !== prevProps.list) {
       if (this.props.list !== null && this.props.list !== "") {
         this._getListItems();
       } else {
         this.setState({
           showPlaceHolder: true
         });
       }
     }
   }

   /**
    * Retrieves items for the specified list
    */
   private _getListItems() {
     this.setState({
       loading: true
     });

     let restApi = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this.props.list.toString()}')/items?$expand=File`;

     this.props.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)
      .then(resp => {return resp.json(); })
      .then(items => {
        this.setState({
          items: items.value ? items.value : [],
          loading: false,
          showPlaceHolder: false
        });
      });
   }

   /**
    * Open the webpart property pane
    */
   private _configureWebPart() {
     this.props.context.propertyPane.open();
   }


  public render(): React.ReactElement<IPnpControlsProps> {
    // Check if placeholder neews to be shown
    if(this.state.showPlaceHolder) {
      return (
        <Placeholder 
          iconName="Edit"
          iconText="List view web part configuration"
          description="Please configure the web part before you can show the list view."
          buttonLabel="Configure"
          onConfigure={this._configureWebPart.bind(this)}
        />
      );
    }

    return (
      <div>
        {
          this.state.loading ? 
          (
            <Spinner size={SpinnerSize.large} label="retrieving results..." />
          ) : (
            this.state.items.length === 0 ? 
            (
              <Placeholder 
                iconName="InfoSolid"
                iconText="No items found"
                description="The list or library you selected does not contain items"
              />
            ) : (
              <div>
                <p className="ms-font-xl">{this.props.description}</p>
                <ListView 
                  items={this.state.items}
                  viewFields={this._viewFields}
                  iconFieldName="File.ServerRelativeUrl"
                />
              </div>
            )
          )
        }
      </div>
    );
  }
}
