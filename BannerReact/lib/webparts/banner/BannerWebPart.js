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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-webpart-base';
import * as strings from 'BannerWebPartStrings';
import Banner from './components/Banner';
var BannerWebPart = (function (_super) {
    __extends(BannerWebPart, _super);
    function BannerWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BannerWebPart.prototype.render = function () {
        var element = React.createElement(Banner, __assign({}, this.properties, { propertyPane: this.context.propertyPane, domElement: this.context.domElement, useParallaxInt: this.displayMode === DisplayMode.Read && !!this.properties.bannerImage && this.properties.useParallax }));
        ReactDom.render(element, this.domElement);
    };
    BannerWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(BannerWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BannerWebPart.prototype, "propertiesMetadata", {
        get: function () {
            return {
                'bannerText': { isSearchablePlainText: true },
                'bannerImage': { isImageSource: true },
                'bannerLink': { isLink: true }
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Validation
     */
    BannerWebPart.prototype._validationImageField = function (imgVal) {
        if (imgVal) {
            var urlSplit = imgVal.split(".");
            if (urlSplit && urlSplit.length > 0) {
                var extName = urlSplit.pop().toLowerCase();
                if (["jpg", "jpeg", "png", "gif"].indexOf(extName) === -1) {
                    return strings.BannerValidationNotImage;
                }
            }
        }
        return "";
    };
    // execute before property panel
    BannerWebPart.prototype.loadPropertyPaneResources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var PropertyFieldNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import('@pnp/spfx-property-controls/lib/propertyFields/number')];
                    case 1:
                        PropertyFieldNumber = (_a.sent()).PropertyFieldNumber;
                        this.propertyFieldNumber = PropertyFieldNumber;
                        return [2 /*return*/];
                }
            });
        });
    };
    BannerWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    groups: [
                        {
                            groupName: strings.BannerConfigName,
                            groupFields: [
                                PropertyPaneTextField('bannerText', {
                                    label: strings.BannerTextField,
                                    multiline: true,
                                    maxLength: 200,
                                    value: this.properties.bannerText
                                }),
                                PropertyPaneTextField('bannerImage', {
                                    label: strings.BannerImageUrlField,
                                    onGetErrorMessage: this._validationImageField,
                                    value: this.properties.bannerImage
                                }),
                                PropertyPaneTextField('bannerLink', {
                                    label: strings.BannerLinkField,
                                    value: this.properties.bannerLink
                                }),
                                this.propertyFieldNumber('bannerHeight', {
                                    key: "bannerHeight",
                                    label: strings.BannerNumberField,
                                    value: this.properties.bannerHeight,
                                    maxValue: 500,
                                    minValue: 100
                                }),
                                PropertyPaneToggle('useParallax', {
                                    label: strings.BannerParallaxField,
                                    checked: this.properties.useParallax
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return BannerWebPart;
}(BaseClientSideWebPart));
export default BannerWebPart;
//# sourceMappingURL=BannerWebPart.js.map