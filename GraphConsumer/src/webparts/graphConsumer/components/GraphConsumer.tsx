import * as React from 'react';
import styles from './GraphConsumer.module.scss';
import * as strings from "GraphConsumerWebPartStrings";
import { IGraphConsumerProps } from './IGraphConsumerProps';
import { IGraphConsumerState } from "./IGraphConsumerState";
import { ClientMode } from "./ClientMode";
import { IUserItem } from "./IUserItem";
import { escape } from '@microsoft/sp-lodash-subset';

import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
} from "office-ui-fabric-react/lib/DocumentCard";

import {
  autobind,
  PrimaryButton,
  TextField,
  Label,
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode
 } from "office-ui-fabric-react";

 import { AadHttpClient, MSGraphClient } from "@microsoft/sp-http";

 let _usersListColumns = [
   {
     key: 'displayName',
     name: 'Display Name',
     fieldName: 'displayName',
     minWidth: 50,
     maxWidth: 100,
     isResizable: true
   },
   {
    key: 'mail',
    name: 'Mail',
    fieldName: 'mail',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  },
  {
    key: 'userPrincipalName',
    name: 'User Principal Name',
    fieldName: 'userPrincipalName',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
 ];

export default class GraphConsumer extends React.Component<IGraphConsumerProps, IGraphConsumerState> {
  constructor(props: IGraphConsumerProps, state: IGraphConsumerState) {
    super(props);

    //Initialize state
    this.state = {
      users: [],
      searchFor: ""
    };
  }

  public render(): React.ReactElement<IGraphConsumerProps> {
    return (
      <div className={ styles.graphConsumer }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Search for a user!</span>
              <p className={ styles.form}>
                <TextField
                  label={ strings.SearchFor }
                  required={ true }
                  value={ this.state.searchFor }
                  onChanged={ this._onSearchForChanged }
                  onGetErrorMessage={ this._getSearchForErrorMessage }
                />
              </p>
              <p className={ styles.form }>
                <PrimaryButton
                  text='Search'
                  title='Search'
                  onClick={ this._search }
                />
              </p>
              {
                (this.state.users != null && this.state.users.length > 0) ?
                  <p className={ styles.form }>
                    <DetailsList
                      items={ this.state.users }
                      columns={ _usersListColumns }
                      setKey='set'
                      checkboxVisibility={ CheckboxVisibility.hidden }
                      selectionMode={ SelectionMode.none }
                      layoutMode={ DetailsListLayoutMode.fixedColumns }
                      compact={ true }
                    />
                  </p>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  @autobind
  private _onSearchForChanged(newValue: string): void {
    //Update the component state acordingly to the current user
    this.setState({
      searchFor: newValue,
    });
  }

  private _getSearchForErrorMessage(value: string): string {
    //The search for text cannot contain spaces
    return (value == null || value.length == 0 || value.indexOf(" ") < 0)
      ? ''
      : `${strings.SearchForValidationErrorMessage}`;
  }

  @autobind
  private _search(): void {
    console.log(this.props.clientMode);

    //Based on the clientmode value search users
    switch (this.props.clientMode) {
      case ClientMode.aad:
        this._searchWithAad();
        break;

      case ClientMode.graph:
        this._searchWithGraph();
        break;
    }
  }

  // Get data using AaHttpClient
  private _searchWithAad(): void {
    console.log("Using _searchWithAad() method");

    this.props.context.aadHttpClientFactory
    .getClient('https://graph.microsoft.com')
    .then((client: AadHttpClient) => {
      //Search user with given name, surname or displayname
      return client
      .get(
        `https://graph.microsoft.com/v1.0/users?$select=displayName,mail,userPrincipalName&$filter=(givenName%20eq%20'${escape(this.state.searchFor)}')%20or%20(surname%20eq%20'${escape(this.state.searchFor)}')%20or%20(displayName%20eq%20'${escape(this.state.searchFor)}')`,
        AadHttpClient.configurations.v1
      );
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      //Prepae the output array
      var users: Array<IUserItem> = new Array<IUserItem>();

      //Log the result in the console for testing purposes
      console.log(json);

      //Map the JSON response to the ouput array
      json.value.map((item: any) => {
        users.push({
          displayName: item.displayName,
          mail: item.mail,
          userPrincipalName: item.userPrincipalName,
        });
      });

      // Update the state
      this.setState(
        { users: users }
      );
    })
    .catch(error => {
      console.error(error);
    });
  }

  // Get data using Graph
  private _searchWithGraph(): void {
    console.log("Using _searchWithAad() method");

    this.props.context.msGraphClientFactory
    .getClient()
    .then((client: MSGraphClient): void => {
      client
      .api("users")
      .version("v1.0")
      .select("displayName,mail,userPrincipalName")
      .filter(`(givenName eq '${escape(this.state.searchFor)}') or (surname eq '${escape(this.state.searchFor)}') or (displayName eq '${escape(this.state.searchFor)}')`)
      .get((err, res) => {
        if (err) {
          console.error(err);
          return;
        }

        var users: Array<IUserItem> = new Array<IUserItem>();

        // Map JSON response to the ouput array
        res.value.map((item: any) => {
          users.push({
            displayName: item.displayName,
            mail: item.mail,
            userPrincipalName: item.userPrincipalName,
          });
        });

        //Update the compoenent state
        this.setState(
          { users: users, }
        );
      });
    });
  }
}
