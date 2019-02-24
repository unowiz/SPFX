import * as React from 'react';
import styles from './FollowedSites.module.scss';
import { SPHttpClientResponse, SPHttpClient } from "@microsoft/sp-http";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { SortOrder } from "../FollowedSitesWebPart";
import { Link } from "office-ui-fabric-react/lib/components/Link";
import { TextField } from "office-ui-fabric-react/lib/components/TextField";
import * as strings from 'FollowedSitesWebPartStrings';
import IFollowed from "../interfaces/IFollowed";
import { IFollowedSitesProps } from './IFollowedSitesProps';
import { IFollowedSitesState } from "./IFollowedSitesState";
import IFollowedResult from '../interfaces/IFollowedResult';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Paging } from "./Paging/Paging";

export default class FollowedSites extends React.Component<IFollowedSitesProps, IFollowedSitesState> {
  private _allFollowing: IFollowedResult[] = [];

  constructor(props: IFollowedSitesProps) {
    super(props);

    this.state = {
      following: null,
      allFollowing: [],
      loading: true,
      error: null
    };
  }

  public componentDidMount(): void {
    this._fetchFollowedSites();
  }

  private _fetchFollowedSites(): void {
    this.setState({
      loading: true,
      error: null
    });

    //Types 4 === sites
    const apiUrl = `${this.props.context.pageContext.web.absoluteUrl}/_api/social.following/my/followed(types=4)`;
    this.props.context.spHttpClient.fetch(apiUrl, SPHttpClient.configurations.v1, {
      method: "GET"
    })
    .then((data: SPHttpClientResponse) => data.json())
    .then((data: IFollowed) => {
      // Check if data was retrived
      if (data && data.value) {
        let fSites = data.value;

        // Check if items need to be sorted by their names
        if (this.props.sortOrder && this.props.sortOrder === SortOrder.name) {
          fSites = fSites.sort(this._sortByName);
        } else {
          // last added item is last in the list, so we use reverse
          fSites = data.value.reverse();
        }

        //Locally store the followed sites results
        this._allFollowing = [...fSites];

        // Pass sites to trigger state update
        this._updateFollowingSites(fSites);
      }

      if (data && data.error) {
        this.setState({
          loading: false,
          error: strings.error
        });
      }
    })
    .catch((err) => {
      this.setState({
        loading: false,
        error: strings.error
      });
    });
  }

  private _updateFollowingSites = (fSites: IFollowedResult[]): void => {
    const allSites = [...fSites];

    // Check if array has to be limited
    if (this.props.nrOfItems) {
      fSites = fSites.slice(0, this.props.nrOfItems);
    }

    this.setState({
      following: fSites,
      allFollowing: fSites,
      loading: false
    });
  }

  private _sortByName(a: IFollowedResult, b: IFollowedResult): number {
    if(a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
    if(a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
    return 0;
  }

  private _updatePagedItems = (pagedItems: IFollowedResult[]): void => {
    if (pagedItems) {
      this.setState({
        following: pagedItems
      });
    }
  }

  private _onFilterChanged = (val: string): void => {
    if (val) {
      const allSites = [...this._allFollowing];
      const filteredItems = allSites.filter(f => f.Name.toLowerCase().indexOf(val.toLowerCase()) !== -1);
      this._updateFollowingSites(filteredItems);
    } else {
      this._updateFollowingSites(this._allFollowing);
    }
  }

  public render(): React.ReactElement<IFollowedSitesProps> {
    return (
      <div className={ styles.followedSites }>
        <WebPartTitle displayMode={this.props.displayMode}
                      title={this.props.title}
                      updateProperty={this.props.updateProperty}
        />
        {
          this.state.loading && (
            <Spinner label={strings.loading}
                      size={SpinnerSize.large}
            />
          )
        }
        {
          this.state.following ? (
            <div className={styles.list}>
              <div className={styles.filter}>
                <TextField placeholder={strings.SitesFilterLabel}
                            iconProps={{ iconName: 'Filter' }}
                            underlined
                            onChanged={this._onFilterChanged}
                />
              </div>

              <ul>
                {
                  this.state.following.length > 0 ? (
                    this.state.following.map(follow => (
                      <li key={follow.Id} className={styles.site}>
                        <Link href={follow.Uri} title={follow.Name}>{follow.Name}</Link>
                      </li>
                    ))
                  ) : (
                    <li className={styles.site}>{strings.NoFollowSitesFoundMsg}</li>
                  )
                }
              </ul>
              <Paging allItems={this.state.allFollowing}
                      nrOfItems={this.props.nrOfItems}
                      fUpdateItems={this._updatePagedItems} />
            </div>
          ) : (
            !this.state.loading && (
              this.state.error ?
                <span className={styles.error}>{this.state.error}</span> :
                <span className={styles.noSites}>{strings.NoFollowedSitesMsg}</span>
            )
          )
        }
      </div>
    );
  }
}
