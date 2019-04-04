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
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField, PropertyPaneDropdown } from '@microsoft/sp-webpart-base';
import * as strings from 'AgreementDatabaseWebPartStrings';
import AgreementDatabase from './components/AgreementDatabase';
import { setup as pnpSetup } from "@pnp/common";
import ContentDataProvider from "../../dataprovider/ContentDataProvider";
var AgreementDatabaseWebPart = (function (_super) {
    __extends(AgreementDatabaseWebPart, _super);
    function AgreementDatabaseWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgreementDatabaseWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            pnpSetup({
                spfxContext: _this.context
            });
        });
    };
    AgreementDatabaseWebPart.prototype.render = function () {
        var contentProvider = new ContentDataProvider();
        var element = React.createElement(AgreementDatabase, {
            description: this.properties.description,
            provider: contentProvider,
            headertext: this.properties.headertext,
            nrofboxes: this.properties.nrofboxes,
            linktitle1: this.properties.linktitle1,
            linktext1: this.properties.linktext1,
            linkurl1: this.properties.linkurl1,
            linktitle2: this.properties.linktitle2,
            linktext2: this.properties.linktext2,
            linkurl2: this.properties.linkurl2,
            linktitle3: this.properties.linktitle3,
            linktext3: this.properties.linktext3,
            linkurl3: this.properties.linkurl3,
            linktitle4: this.properties.linktitle4,
            linktext4: this.properties.linktext4,
            linkurl4: this.properties.linkurl4,
            linktitle5: this.properties.linktitle5,
            linktext5: this.properties.linktext5,
            linkurl5: this.properties.linkurl5,
            linktitle6: this.properties.linktitle6,
            linktext6: this.properties.linktext6,
            linkurl6: this.properties.linkurl6
        });
        ReactDom.render(element, this.domElement);
    };
    AgreementDatabaseWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(AgreementDatabaseWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    AgreementDatabaseWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    displayGroupsAsAccordion: true,
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: "General",
                            groupFields: [
                                PropertyPaneTextField('headertext', {
                                    label: "Text"
                                }),
                                PropertyPaneDropdown('nrofboxes', {
                                    label: "Number of filter boxes",
                                    options: [
                                        { text: "1", key: "1" },
                                        { text: "2", key: "2" },
                                        { text: "3", key: "3" },
                                        { text: "4", key: "4" },
                                        { text: "6", key: "6" },
                                    ]
                                })
                            ]
                        },
                        {
                            isCollapsed: true,
                            groupName: "Filter box 1",
                            groupFields: [
                                PropertyPaneTextField('linktitle1', {
                                    label: "Title",
                                }),
                                PropertyPaneTextField('linktext1', {
                                    label: "Text"
                                }),
                                PropertyPaneTextField('linkurl1', {
                                    label: "Column Name"
                                })
                            ]
                        },
                        {
                            isCollapsed: true,
                            groupName: "Filter box 2",
                            groupFields: [
                                PropertyPaneTextField('linktitle2', {
                                    label: "Title"
                                }),
                                PropertyPaneTextField('linktext2', {
                                    label: "Text"
                                }),
                                PropertyPaneTextField('linkurl2', {
                                    label: "Column Name"
                                })
                            ]
                        },
                        {
                            isCollapsed: true,
                            groupName: "Filter box 3",
                            groupFields: [
                                PropertyPaneTextField('linktitle3', {
                                    label: "Title"
                                }),
                                PropertyPaneTextField('linktext3', {
                                    label: "Text"
                                }),
                                PropertyPaneTextField('linkurl3', {
                                    label: "Column Name"
                                })
                            ]
                        },
                        {
                            isCollapsed: true,
                            groupName: "Filter box 4",
                            groupFields: [
                                PropertyPaneTextField('linktitle4', {
                                    label: "Title"
                                }),
                                PropertyPaneTextField('linktext4', {
                                    label: "Text"
                                }),
                                PropertyPaneTextField('linkurl4', {
                                    label: "Column Name"
                                })
                            ]
                        },
                        {
                            isCollapsed: true,
                            groupName: "Filter box 5",
                            groupFields: [
                                PropertyPaneTextField('linktitle5', {
                                    label: "Title"
                                }),
                                PropertyPaneTextField('linktext5', {
                                    label: "Text"
                                }),
                                PropertyPaneTextField('linkurl5', {
                                    label: "Column Name"
                                })
                            ]
                        },
                        {
                            isCollapsed: true,
                            groupName: "Filter box 6",
                            groupFields: [
                                PropertyPaneTextField('linktitle6', {
                                    label: "Title"
                                }),
                                PropertyPaneTextField('linktext6', {
                                    label: "Text"
                                }),
                                PropertyPaneTextField('linkurl6', {
                                    label: "Column Name"
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    Object.defineProperty(AgreementDatabaseWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return AgreementDatabaseWebPart;
}(BaseClientSideWebPart));
export default AgreementDatabaseWebPart;
//# sourceMappingURL=AgreementDatabaseWebPart.js.map