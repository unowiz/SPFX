import * as React from 'react';
import styles from './SiteMembers.module.scss';
import { ISiteMembersProps } from './ISiteMembersProps';
import { ISiteMembersState } from "./ISiteMembersState";
import * as strings from 'SiteMembersWebPartStrings';
import { IUser, IUsers } from "./User";
import { List } from 'office-ui-fabric-react/lib/components/List';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { IPersonaSharedProps, Persona, PersonaSize,PersonaPresence } from "office-ui-fabric-react/lib/components/Persona";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export default class SiteMembers extends React.Component<ISiteMembersProps, ISiteMembersState> {
  constructor(props: ISiteMembersProps) {
    super(props);

    this.state = {
      loading: false,
      error: undefined,
      members: []
    };
  }

  public componentDidMount(): void {
    this._loadUsers();
  }

  private _loadUsers(): void {
    if (!this.props.graphClient) {
      return;
    }

    this.setState({
      members: []
    });

    let graphURI = "groups/{03bd0873-738d-42c7-affa-d1a09488f18e}/members";

    this.props.graphClient
      .api(graphURI)
      .version("v1.0")
      .select("displayName,mail,mobilePhone,jobTitle")
      .get((err: any, res: IUsers): void => {
        if (err) {
          this.setState({
            error: err.message ? err.message : strings.Error,
            loading: false
          });
          return;
        }

        if (res && res.value && res.value.length > 0) {
          this.setState({
            members: res.value,
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
        }
      });
  }


  private _renderMembers = (item: IUser, index: number | undefined): JSX.Element => {
    return (
      <Persona 
        text={item.displayName}
        primaryText={item.displayName}
        secondaryText={item.jobTitle}
        size={PersonaSize.size28}
      />
    )
  }

  public render(): React.ReactElement<ISiteMembersProps> {
    return (
      <div className={styles.siteMembers}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <WebPartTitle 
                displayMode={this.props.displayMode}
                title={this.props.title}
                updateProperty={this.props.updateProperty} className={styles.title} 
              />
              
              <List
                items={this.state.members}
                onRenderCell={this._renderMembers}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
