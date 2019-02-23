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
import styles from './Banner.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import * as strings from 'BannerWebPartStrings';
var Banner = (function (_super) {
    __extends(Banner, _super);
    function Banner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scrollElm = null;
        _this._scrollElmRect = null;
        _this._parallaxElm = null;
        /**
         * Opens the property pane for configuration
         */
        _this._onConfigure = function () {
            _this.props.propertyPane.open();
        };
        /**
         * Set the parallax effect to the banner image element
         */
        _this._setParallaxEffect = function () {
            window.requestAnimationFrame(function () {
                var scrollElmTop = _this._scrollElmRect.top;
                var clientElmRect = _this.props.domElement.getBoundingClientRect();
                var clientElmTop = clientElmRect.top;
                var clientElmBottom = clientElmRect.bottom;
                if (clientElmTop < scrollElmTop && clientElmBottom > scrollElmTop) {
                    var vector = Math.round((scrollElmTop - clientElmTop) / 1.81);
                    _this._setTranslate(vector);
                }
                else if (clientElmTop >= scrollElmTop) {
                    _this._setTranslate(0);
                }
            });
        };
        return _this;
    }
    /**
     * Finds the scrollable parent
     */
    Banner.prototype._getScrollableParent = function () {
        var scrollElm = document.querySelector('div[data-is-scrollable="true"]');
        if (scrollElm) {
            return scrollElm;
        }
        return null;
    };
    /**
     * Set translate / parallax effect
     * @param vector
     */
    Banner.prototype._setTranslate = function (vector) {
        var r = "translate3d(0px, " + vector + "px, 0px)";
        this._parallaxElm.style.transform = r;
    };
    Banner.prototype._removeParallaxBinding = function () {
        if (this._scrollElm) {
            // Unbind the scroll event
            this._scrollElm.removeEventListener("scroll", this._setParallaxEffect);
        }
    };
    /**
     * Add or remove parallax binding to the banner
     */
    Banner.prototype._parallaxBinding = function () {
        if (this.props.useParallaxInt) {
            this._scrollElm = this._getScrollableParent();
            this._parallaxElm = this.props.domElement.querySelector("." + styles.bannerImg);
            if (this._scrollElm && this._parallaxElm) {
                // Get client rect info
                this._scrollElmRect = this._scrollElm.getBoundingClientRect();
                // Bind the scroll event
                this._scrollElm.addEventListener("scroll", this._setParallaxEffect);
            }
        }
        else {
            this._removeParallaxBinding();
        }
    };
    /**
     * Bind the parallax effect on mount
     */
    Banner.prototype.componentDidMount = function () {
        this._parallaxBinding();
    };
    /**
     * Bind the parallax effect on update
     * @param prevProps
     */
    Banner.prototype.componentDidUpdate = function (prevProps) {
        this._parallaxBinding();
    };
    /**
     * Unbind the parallax effect
     */
    Banner.prototype.componentWillUnmount = function () {
        this._removeParallaxBinding();
    };
    Banner.prototype.render = function () {
        if (this.props.bannerImage) {
            return (React.createElement("div", { className: styles.banner, style: {
                    height: this.props.bannerHeight ? this.props.bannerHeight + "px" : "280px"
                } },
                React.createElement("div", { className: styles.bannerImg, style: {
                        backgroundImage: "url('" + this.props.bannerImage + "')"
                    } }),
                React.createElement("div", { className: styles.bannerOverlay }),
                React.createElement("div", { className: styles.bannerText }, this.props.bannerLink ? (React.createElement("a", { href: this.props.bannerLink, title: escape(this.props.bannerText) }, escape(this.props.bannerText))) : (React.createElement("span", null, escape(this.props.bannerText))))));
        }
        else {
            return (React.createElement(Placeholder, { iconName: 'ImagePixel', iconText: strings.BannerPlaceholderIconText, description: strings.BannerPlaceholderDescription, buttonLabel: strings.BannerPlaceholderBtnLabel, onConfigure: this._onConfigure }));
        }
    };
    return Banner;
}(React.Component));
export default Banner;
//# sourceMappingURL=Banner.js.map