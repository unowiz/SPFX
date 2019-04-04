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
import styles from './AgreementDatabase.module.scss';
import * as moment from 'moment';
import { ListView, GroupOrder } from "@pnp/spfx-controls-react/lib/ListView";
var AgreementDatabase = (function (_super) {
    __extends(AgreementDatabase, _super);
    function AgreementDatabase(props) {
        var _this = _super.call(this, props) || this;
        _this._viewFields = [
            {
                name: "AgreementName",
                displayName: "Agreement Name",
                maxWidth: 25,
                minWidth: 25,
                sorting: true,
                isResizable: true
            },
            {
                name: "AgreementType",
                displayName: "Agreement Type",
                sorting: true,
                isResizable: true
            },
            {
                name: "ContactPerson",
                displayName: "Contact Person",
                sorting: true,
                isResizable: true
            },
            {
                name: "SalesManager",
                displayName: "Sales Manager",
                sorting: true,
                isResizable: true
            },
            {
                name: "Customer",
                displayName: "Customer",
                sorting: true,
                isResizable: true
            },
            {
                name: "DeliveryType",
                displayName: "Delivery Type",
                sorting: true,
                isResizable: true
            },
            {
                name: "AgreementStartDate",
                displayName: "Agreement Start Date",
                sorting: true,
                isResizable: true,
                render: function (item) {
                    var agreementStartDate = moment(item.AgreementStartDate).format('YYYY-MM-DD');
                    return (React.createElement("span", null, agreementStartDate));
                }
            },
            {
                name: "AgreementEndDate",
                displayName: "Agreement End Date",
                sorting: true,
                isResizable: true,
                render: function (item) {
                    var agreementEndDate = moment(item.AgreementEndDate).format('YYYY-MM-DD');
                    return (React.createElement("span", null, agreementEndDate));
                }
            },
            {
                name: "AgreementEnded",
                displayName: "Agreement Ended",
                minWidth: 50,
                isResizable: true,
                render: function (item) {
                    var agreementEnded = item.AgreementEnded;
                    if (agreementEnded == true) {
                        return (React.createElement("span", null, "Ja"));
                    }
                    else {
                        return (React.createElement("span", null, "Nej"));
                    }
                }
            },
            {
                name: "LastPriceAdjustment",
                displayName: "Last Price Adjustment",
                sorting: true,
                isResizable: true,
                render: function (item) {
                    var lastPriceAdjustment = moment(item.LastPriceAdjustment).format('YYYY-MM-DD');
                    return (React.createElement("span", null, lastPriceAdjustment));
                }
            },
            {
                name: "NexPriceAdjustment",
                displayName: "Next Price Adjustment",
                sorting: true,
                isResizable: true,
                render: function (item) {
                    var nextPriceAdjustment = moment(item.NextPriceAdjustment).format('YYYY-MM-DD');
                    return (React.createElement("span", null, nextPriceAdjustment));
                }
            }
        ];
        _this.state = {
            originalitems: [],
            filteredListItems: [],
            groupByFields: [],
            filter: true
        };
        _this.groupHandler = _this.groupHandler.bind(_this);
        return _this;
    }
    AgreementDatabase.prototype.componentDidMount = function () {
        var _this = this;
        this.props.provider.getContent().then(function (originalitems) {
            _this.setState({
                filteredListItems: originalitems,
                originalitems: originalitems
            });
        });
    };
    AgreementDatabase.prototype.render = function () {
        console.log(this.state.filteredListItems);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-xl12" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-xl12" },
                        React.createElement("div", { className: styles['main-box'] },
                            React.createElement("h1", { className: styles['link'] }, this.props.headertext)))),
                this.generateBoxes(this.props.nrofboxes),
                React.createElement("div", { className: "ms-Grid-row " + styles['separator'] },
                    React.createElement("hr", { className: styles["adw-separator"] })),
                this._renderList())));
    };
    AgreementDatabase.prototype.generateBoxes = function (nrofboxes) {
        var _this = this;
        var boxes = [];
        var size = 12 / Number(nrofboxes);
        var clsName = "ms-Grid-col ms-lg" + size + " ms-xl" + size;
        var _loop_1 = function (i) {
            boxes.push(React.createElement("div", { className: "ms-Grid-col ms-lg" + size + " ms-xl" + size + " " + styles["adw-link-box-container"] },
                React.createElement("div", { className: styles["link-box"] },
                    React.createElement("a", { onClick: function (e) { return _this._handleRequest(_this.props["linkurl" + i]); }, href: "#", id: this_1.props["linkurl" + i] },
                        React.createElement("h4", { className: styles["link-box-header-container"] },
                            React.createElement("small", { className: styles["link-box-header-title"] }, this_1.props["linktitle" + i]),
                            React.createElement("span", { className: styles["link-box-header-text"] }, this_1.props["linktext" + i]))))));
        };
        var this_1 = this;
        for (var i = 1; i <= Number(nrofboxes); i++) {
            _loop_1(i);
        }
        return (React.createElement(React.Fragment, null, boxes));
    };
    AgreementDatabase.prototype._handleRequest = function (request) {
        switch (request) {
            case 'Customer':
            case 'Sales Manager':
                this.groupHandler(request);
                break;
            case 'Agreement Ended':
                this.getEnded();
                break;
            case 'Last Price Adjustment':
                this.getPassed();
                break;
            case 'My Agreements':
                this.getMyAgreement();
                break;
            default:
                break;
        }
    };
    AgreementDatabase.prototype._renderList = function () {
        if (this.state.filter) {
            return (React.createElement(ListView, { items: this.state.filteredListItems, viewFields: this._viewFields }));
        }
        else {
            return (React.createElement(ListView, { items: this.state.originalitems, viewFields: this._viewFields, groupByFields: this.state.groupByFields }));
        }
    };
    AgreementDatabase.prototype.getMyAgreement = function () {
        var _this = this;
        this.props.provider.getMyAgreement().then(function (originalitems) {
            _this.setState({
                filteredListItems: originalitems,
                filter: true
            });
        });
    };
    AgreementDatabase.prototype.getEnded = function () {
        var _this = this;
        this.props.provider.getEnded().then(function (originalitems) {
            _this.setState({
                filteredListItems: originalitems,
                filter: true
            });
        });
    };
    AgreementDatabase.prototype.getPassed = function () {
        var _this = this;
        this.props.provider.getPassed().then(function (originalitems) {
            _this.setState({
                filteredListItems: originalitems,
                filter: true
            });
        });
    };
    AgreementDatabase.prototype.groupHandler = function (group) {
        group = group.replace(/ +/g, "");
        this.setState({
            groupByFields: [{
                    name: group,
                    order: GroupOrder.ascending
                }],
            filter: false
        });
    };
    return AgreementDatabase;
}(React.Component));
export default AgreementDatabase;
//# sourceMappingURL=AgreementDatabase.js.map