/// <reference types="react" />
import * as React from 'react';
import { IFollowedSitesProps } from './IFollowedSitesProps';
import { IFollowedSitesState } from "./IFollowedSitesState";
export default class FollowedSites extends React.Component<IFollowedSitesProps, IFollowedSitesState> {
    private _allFollowing;
    constructor(props: IFollowedSitesProps);
    componentDidMount(): void;
    private _fetchFollowedSites();
    private _updateFollowingSites;
    private _sortByName(a, b);
    private _updatePagedItems;
    private _onFilterChanged;
    render(): React.ReactElement<IFollowedSitesProps>;
}
