webpackJsonp79b60292_249c_43e5_b0dc_a61a52aa3997_0_0_1([0],{

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var TextField_1 = __webpack_require__(152);
var telemetry = __webpack_require__(153);
var Utilities_1 = __webpack_require__(2);
var strings = __webpack_require__(149);
var PropertyFieldNumberHost = (function (_super) {
    __extends(PropertyFieldNumberHost, _super);
    function PropertyFieldNumberHost(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Validate if field value is a number
         * @param value
         */
        _this._validateNumber = function (value) {
            if (isNaN(Number(value))) {
                return strings.NotNumberValidationMessage + " " + value + ".";
            }
            var nrValue = parseInt(value);
            // Check if number is lower or equal to minimum value
            if (_this.props.minValue && nrValue < _this.props.minValue) {
                return strings.MinimumNumberValidationMessage + " " + _this.props.minValue;
            }
            // Check if the number is greater than the maximum value
            if (_this.props.maxValue && nrValue > _this.props.maxValue) {
                return strings.MaximumNumberValidationMessage + " " + _this.props.maxValue;
            }
            if (_this.props.onGetErrorMessage) {
                return _this.props.onGetErrorMessage(nrValue);
            }
            else {
                return '';
            }
        };
        /**
         * On field change event handler
         */
        _this._onChanged = function (value) {
            // Update state
            _this.setState({
                value: value
            });
            if (!isNaN(Number(value))) {
                var nrValue = parseInt(value);
                if ((!_this.props.minValue || nrValue >= _this.props.minValue) && (!_this.props.maxValue || nrValue <= _this.props.maxValue)) {
                    // Trigger change for the web part
                    _this.props.onChanged(nrValue);
                }
            }
        };
        telemetry.track('PropertyFieldNumber', {
            disabled: props.disabled
        });
        _this.state = {
            value: _this.props.value ? _this.props.value.toString() : null
        };
        _this._async = new Utilities_1.Async(_this);
        _this._delayedChange = _this._async.debounce(_this._onChanged, _this.props.deferredValidationTime ? _this.props.deferredValidationTime : 200);
        return _this;
    }
    /**
     * Render field
     */
    PropertyFieldNumberHost.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(TextField_1.TextField, { label: this.props.label, ariaLabel: this.props.ariaLabel, onChanged: this._delayedChange, value: this.state.value, description: this.props.description, placeholder: this.props.placeholder, errorMessage: this.props.errorMessage, onGetErrorMessage: this._validateNumber, deferredValidationTime: this.props.deferredValidationTime, disabled: this.props.disabled })));
    };
    return PropertyFieldNumberHost;
}(React.Component));
exports.default = PropertyFieldNumberHost;



/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(48);
var sp_webpart_base_1 = __webpack_require__(49);
var PropertyFieldNumberHost_1 = __webpack_require__(150);
var PropertyFieldNumberBuilder = (function () {
    function PropertyFieldNumberBuilder(_targetProperty, _properties) {
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.targetProperty = _targetProperty;
        this.properties = _properties;
        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }
    PropertyFieldNumberBuilder.prototype._render = function (elem, context, changeCallback) {
        var props = this.properties;
        var element = React.createElement(PropertyFieldNumberHost_1.default, __assign({}, props, { onChanged: this._onChanged.bind(this) }));
        ReactDOM.render(element, elem);
        if (changeCallback) {
            this._onChangeCallback = changeCallback;
        }
    };
    PropertyFieldNumberBuilder.prototype._dispose = function (elem) {
        ReactDOM.unmountComponentAtNode(elem);
    };
    PropertyFieldNumberBuilder.prototype._onChanged = function (value) {
        if (this._onChangeCallback) {
            this._onChangeCallback(this.targetProperty, value);
        }
    };
    return PropertyFieldNumberBuilder;
}());
function PropertyFieldNumber(targetProperty, properties) {
    return new PropertyFieldNumberBuilder(targetProperty, __assign({}, properties, { onRender: null, onDispose: null }));
}
exports.PropertyFieldNumber = PropertyFieldNumber;



/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(51), exports);


/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var telemetry_js_1 = __webpack_require__(50);
var version_1 = __webpack_require__(154);
var sp_core_library_1 = __webpack_require__(10);
var CONTROL_TYPE = "property";
function track(componentName, properties) {
    if (properties === void 0) { properties = {}; }
    var telemetry = telemetry_js_1.default.getInstance();
    telemetry.trackEvent(componentName, __assign({ version: version_1.version, controlType: CONTROL_TYPE, debug:  true ? "true" : "false", environment: sp_core_library_1.EnvironmentType[sp_core_library_1.Environment.type] }, properties));
}
exports.track = track;



/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.version = "1.14.1";



/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(151));
__export(__webpack_require__(150));



/***/ })

});
//# sourceMappingURL=0.0_63639a215a0b766de85c.js.map