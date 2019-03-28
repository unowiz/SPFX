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
import styles from './AgreementContainer.module.scss';
import { ListView } from "@pnp/spfx-controls-react/lib/ListView";
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
var AgreementContainer = (function (_super) {
    __extends(AgreementContainer, _super);
    function AgreementContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.viewFields = [
            {
                name: "Title",
                linkPropertyName: "Title.ServerRelativeUrl",
                displayName: "Agreement Name",
                maxWidth: 25,
                minWidth: 25,
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
                name: "SalesManager",
                displayName: "Sales Manager",
                isResizable: true,
            },
            {
                name: "ContactPerson",
                displayName: "Contact Person",
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
                    var localizedEndDate = new Date(item.AgreementStartDate);
                    return (React.createElement("span", null, localizedEndDate.toLocaleString()));
                }
            },
            {
                name: "AgreementEndDate",
                displayName: "Agreement End Date",
                isResizable: true
            },
            {
                name: "AgreementEnded",
                displayName: "Agreement Ended",
                isResizable: true,
                render: function (item) {
                    var AgreementEnded = item.AgreementEnded;
                    if (AgreementEnded == false) {
                        return (React.createElement("span", null, "Nej"));
                    }
                    else {
                        return (React.createElement("span", null, "Ja"));
                    }
                }
            },
            {
                name: "LastPriceAdjustment",
                displayName: "Last Price Adjustment",
                isResizable: true
            },
            {
                name: "NextPriceAdjustment",
                displayName: "Next Price Adjustment",
                isResizable: true
            }
        ];
        _this.state = {
            agreements: [],
            views: []
        };
        return _this;
    }
    AgreementContainer.prototype.componentDidMount = function () {
        var _this = this;
        this.props.provider.getAgreements().then(function (agreements) {
            _this.setState({
                agreements: agreements
            });
        });
        this.props.provider.getViews().then(function (views) {
            _this.setState({
                views: views
            });
        });
    };
    AgreementContainer.prototype.render = function () {
        var viewArray = [];
        {
            this.state.views.map(function (view, index) {
                return viewArray.push({ key: view.Title, Title: view.Title });
            });
        }
        ;
        return (React.createElement("div", { className: styles.agreementDatabase },
            React.createElement(Dropdown, { placeHolder: "Filter", label: "Filter label", options: this.state.views.map(function (view) { return { key: view.ID, text: view.Title }; }) }),
            React.createElement(ListView, { items: this.state.agreements, viewFields: this.viewFields })));
    };
    return AgreementContainer;
}(React.Component));
export default AgreementContainer;
//# sourceMappingURL=AgreementContainer.js.map