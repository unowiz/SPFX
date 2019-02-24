var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './FollowedSites.module.scss';
import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { SortOrder } from "../FollowedSitesWebPart";
import { Link } from "office-ui-fabric-react/lib/components/Link";
import { TextField } from "office-ui-fabric-react/lib/components/TextField";
import * as strings from 'FollowedSitesWebPartStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Paging } from "./Paging/Paging";
var FollowedSites = (function (_super) {
    __extends(FollowedSites, _super);
    function FollowedSites(props) {
        var _this = _super.call(this, props) || this;
        _this._allFollowing = [];
        _this._updateFollowingSites = function (fSites) {
            var allSites = fSites.slice();
            // Check if array has to be limited
            if (_this.props.nrOfItems) {
                fSites = fSites.slice(0, _this.props.nrOfItems);
            }
            _this.setState({
                following: fSites,
                allFollowing: fSites,
                loading: false
            });
        };
        _this._updatePagedItems = function (pagedItems) {
            if (pagedItems) {
                _this.setState({
                    following: pagedItems
                });
            }
        };
        _this._onFilterChanged = function (val) {
            if (val) {
                var allSites = _this._allFollowing.slice();
                var filteredItems = allSites.filter(function (f) { return f.Name.toLowerCase().indexOf(val.toLowerCase()) !== -1; });
                _this._updateFollowingSites(filteredItems);
            }
            else {
                _this._updateFollowingSites(_this._allFollowing);
            }
        };
        _this.state = {
            following: null,
            allFollowing: [],
            loading: true,
            error: null
        };
        return _this;
    }
    FollowedSites.prototype.componentDidMount = function () {
        this._fetchFollowedSites();
    };
    FollowedSites.prototype._fetchFollowedSites = function () {
        var _this = this;
        this.setState({
            loading: true,
            error: null
        });
        //Types 4 === sites
        var apiUrl = this.props.context.pageContext.web.absoluteUrl + "/_api/social.following/my/followed(types=4)";
        this.props.context.spHttpClient.fetch(apiUrl, SPHttpClient.configurations.v1, {
            method: "GET"
        })
            .then(function (data) { return data.json(); })
            .then(function (data) {
            // Check if data was retrived
            if (data && data.value) {
                var fSites = data.value;
                // Check if items need to be sorted by their names
                if (_this.props.sortOrder && _this.props.sortOrder === SortOrder.name) {
                    fSites = fSites.sort(_this._sortByName);
                }
                else {
                    // last added item is last in the list, so we use reverse
                    fSites = data.value.reverse();
                }
                //Locally store the followed sites results
                _this._allFollowing = fSites.slice();
                // Pass sites to trigger state update
                _this._updateFollowingSites(fSites);
            }
            if (data && data.error) {
                _this.setState({
                    loading: false,
                    error: strings.error
                });
            }
        })
            .catch(function (err) {
            _this.setState({
                loading: false,
                error: strings.error
            });
        });
    };
    FollowedSites.prototype._sortByName = function (a, b) {
        if (a.Name.toLowerCase() < b.Name.toLowerCase())
            return -1;
        if (a.Name.toLowerCase() > b.Name.toLowerCase())
            return 1;
        return 0;
    };
    FollowedSites.prototype.render = function () {
        return (React.createElement("div", { className: styles.followedSites },
            React.createElement(WebPartTitle, { displayMode: this.props.displayMode, title: this.props.title, updateProperty: this.props.updateProperty }),
            this.state.loading && (React.createElement(Spinner, { label: strings.loading, size: SpinnerSize.large })),
            this.state.following ? (React.createElement("div", { className: styles.list },
                React.createElement("div", { className: styles.filter },
                    React.createElement(TextField, { placeholder: strings.SitesFilterLabel, iconProps: { iconName: 'Filter' }, underlined: true, onChanged: this._onFilterChanged })),
                React.createElement("ul", null, this.state.following.length > 0 ? (this.state.following.map(function (follow) { return (React.createElement("li", { key: follow.Id, className: styles.site },
                    React.createElement(Link, { href: follow.Uri, title: follow.Name }, follow.Name))); })) : (React.createElement("li", { className: styles.site }, strings.NoFollowSitesFoundMsg))),
                React.createElement(Paging, { allItems: this.state.allFollowing, nrOfItems: this.props.nrOfItems, fUpdateItems: this._updatePagedItems }))) : (!this.state.loading && (this.state.error ?
                React.createElement("span", { className: styles.error }, this.state.error) :
                React.createElement("span", { className: styles.noSites }, strings.NoFollowedSitesMsg)))));
    };
    return FollowedSites;
}(React.Component));
export default FollowedSites;
//# sourceMappingURL=FollowedSites.js.map