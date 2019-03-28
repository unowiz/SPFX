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
import styles from './Agrement.module.scss';
import { ListView } from "@pnp/spfx-controls-react/lib/ListView";
import * as moment from 'moment';
var Agrement = (function (_super) {
    __extends(Agrement, _super);
    function Agrement(props) {
        var _this = _super.call(this, props) || this;
        _this.viewFields = [
            {
                name: "AgreementName",
                displayName: "Agreement Name",
                maxWidth: 80,
                minWidth: 50,
                sorting: true,
                isResizable: true
            },
            {
                name: "CustomerAgreementNr",
                displayName: "Customer Agreement Nr",
                maxWidth: 4,
                isResizable: true
            },
            {
                name: "AgreementType",
                displayName: "Agreement Type",
                isResizable: true
            },
            {
                name: "ContactPerson",
                displayName: "Contact Person",
                isResizable: true
            },
            {
                name: "SalesManager",
                displayName: "Sales Manager",
                isResizable: true
            },
            {
                name: "DeliveryType",
                displayName: "Delivery Type",
                isResizable: true
            },
            {
                name: "AgreementStartDate",
                displayName: "Agreement Start Date",
                isResizable: true,
                render: function (item) {
                    var agreementStartDate = moment(item.AgreementStartDate).format('YYYY-MM-DD');
                    return (React.createElement("span", null, agreementStartDate));
                }
            },
            {
                name: "AgreementEndDate",
                displayName: "Agreement End Date",
                isResizable: true,
                render: function (item) {
                    var agreementEndDate = moment(item.AgreementEndDate).format('YYYY-MM-DD');
                    return (React.createElement("span", null, agreementEndDate));
                }
            },
            {
                name: "AgreementEnded",
                displayName: "Agreement Ended",
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
                isResizable: true,
                render: function (item) {
                    var lastPriceAdjustment = moment(item.LastPriceAdjustment).format('YYYY-MM-DD');
                    return (React.createElement("span", null, lastPriceAdjustment));
                }
            },
            {
                name: "NextPriceAdjustment",
                displayName: "Next Price Adjustment",
                isResizable: true,
                render: function (item) {
                    var nextPriceAdjustment = moment(item.NextPriceAdjustment).format('YYYY-MM-DD');
                    return (React.createElement("span", null, nextPriceAdjustment));
                }
            }
        ];
        _this.state = {
            originalitems: [],
        };
        return _this;
    }
    Agrement.prototype.componentDidMount = function () {
        var _this = this;
        this.props.provider.getContent().then(function (items) {
            _this.setState({
                originalitems: items
            });
        });
    };
    Agrement.prototype.generateBoxes = function (nrofboxes) {
        var boxes = [];
        var size = 12 / Number(nrofboxes);
        var clsName = "ms-Grid-col ms-lg" + size + " ms-xl" + size;
        for (var i = 1; i <= Number(nrofboxes); i++) {
            boxes.push(React.createElement("div", { className: "ms-Grid-col ms-lg" + size + " ms-xl" + size + " " + styles["adw-link-box-container"] },
                React.createElement("div", { className: styles["link-box"] },
                    React.createElement("a", { href: this.props["linkurl" + i] },
                        React.createElement("h4", { className: styles["link-box-header-container"] },
                            React.createElement("small", { className: styles["link-box-header-title"] }, this.props["linktitle" + i]),
                            React.createElement("span", { className: styles["link-box-header-text"] }, this.props["linktext" + i]))))));
        }
        return (React.createElement(React.Fragment, null, boxes));
    };
    Agrement.prototype.generateList = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles["adw-link-list-container"] + " ms-Grid-col ms-xl12" },
                React.createElement(ListView, { items: this.state.originalitems, viewFields: this.viewFields }))));
    };
    Agrement.prototype.render = function () {
        console.log(this.state.originalitems);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-xl12" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-xl12" },
                        React.createElement("div", { className: styles['main-box'] },
                            React.createElement("h1", { className: styles['link'] }, this.props.headertext)))),
                this.generateBoxes(this.props.nrofboxes),
                React.createElement("div", { className: "ms-Grid-row " + styles['separator'] },
                    React.createElement("hr", { className: styles["adw-separator"] })),
                this.generateList())));
    };
    return Agrement;
}(React.Component));
export default Agrement;
//# sourceMappingURL=Agrement.js.map