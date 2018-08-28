'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.priceField = exports.iconToggleField = exports.OnOffToggleField = exports.selectField = exports.widgetField = exports.inputField = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNumberFormat = require('react-number-format');

var _reactNumberFormat2 = _interopRequireDefault(_reactNumberFormat);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _toCents = require('./toCents');

var _reactRedux = require('react-redux');

var _currencySymbolMap = require('currency-symbol-map');

var _currencySymbolMap2 = _interopRequireDefault(_currencySymbolMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var widgetField = function widgetField(props) {
    var widget = props.widget,
        label = props.label,
        type = props.type,
        _props$meta = props.meta,
        touched = _props$meta.touched,
        error = _props$meta.error,
        warning = _props$meta.warning;

    var WidgetComponent = widget;

    return _react2.default.createElement(
        'div',
        { className: 'form-group form-group-flex' },
        label && type !== 'hidden' && (type === 'text' || type === 'secure-string') && _react2.default.createElement(
            'label',
            { className: 'control-label form-label-flex-md' },
            label
        ),
        _react2.default.createElement(
            'div',
            { className: 'form-input-flex' },
            _react2.default.createElement(WidgetComponent, props),
            touched && (error && _react2.default.createElement(
                'span',
                { className: 'form-error' },
                error
            ) || warning && _react2.default.createElement(
                'span',
                { className: 'form-warning' },
                warning
            ))
        )
    );
};

var inputField = function inputField(props) {
    var className = props.className,
        input = props.input,
        placeholder = props.placeholder,
        label = props.label,
        type = props.type,
        _props$meta2 = props.meta,
        touched = _props$meta2.touched,
        error = _props$meta2.error,
        warning = _props$meta2.warning;

    var autofocus = props && props.willAutoFocus;
    if (!className) {
        className = 'default';
    }
    var formControlClass = 'form-control ' + className + '-input ' + (touched && error && 'has-error') + ' ' + (touched && warning && 'has-warning');

    var getInputField = function getInputField(type) {
        switch (type) {
            case 'textarea':
                return _react2.default.createElement('textarea', (0, _extends3.default)({ className: formControlClass }, input, { placeholder: label, autoFocus: autofocus }));
                break;
            case 'checkbox':
                return _react2.default.createElement('input', (0, _extends3.default)({ className: formControlClass + ' checkbox' }, input, { placeholder: label, type: type, autoFocus: autofocus }));
            default:
                return _react2.default.createElement('input', (0, _extends3.default)({ className: formControlClass }, input, { placeholder: placeholder || label, type: type, autoFocus: autofocus }));
        }
    };

    return _react2.default.createElement(
        'div',
        { className: 'form-group form-group-flex ' + className + '-group' },
        label && type !== 'hidden' && _react2.default.createElement(
            'label',
            { className: 'control-label form-label-flex-md ' + className + '-label' },
            label
        ),
        _react2.default.createElement(
            'div',
            { className: 'form-input-flex' },
            getInputField(type),
            touched && (error && _react2.default.createElement(
                'span',
                { className: 'form-error ' + className + '-error' },
                error
            ) || warning && _react2.default.createElement(
                'span',
                { className: 'form-warning ' + className + '-warning' },
                warning
            ))
        )
    );
};

var selectField = function (_React$Component) {
    (0, _inherits3.default)(selectField, _React$Component);

    function selectField(props) {
        (0, _classCallCheck3.default)(this, selectField);

        var _this = (0, _possibleConstructorReturn3.default)(this, (selectField.__proto__ || Object.getPrototypeOf(selectField)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(selectField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                options = _props.options,
                valueKey = _props.valueKey,
                input = _props.input;

            if (!input.value && options.length > 0) {
                var value = valueKey ? options[0][valueKey] : options[0].id;
                input.onChange(value);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _props2 = this.props,
                options = _props2.options,
                valueKey = _props2.valueKey,
                labelKey = _props2.labelKey,
                defaultValue = _props2.defaultValue,
                input = _props2.input;

            var self = this;
            //if there is a default value, set it, other wise, use the first option
            if ((!input.value || !options.find(function (option) {
                return option.id == input.value;
            })) && options.length > 0) {
                input.onChange(options[0].id);
            } else if (options.length == 0 && prevProps.options.length > 0) {
                input.onChange(undefined);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                input = _props3.input,
                label = _props3.label,
                type = _props3.type,
                options = _props3.options,
                valueKey = _props3.valueKey,
                labelKey = _props3.labelKey,
                _props3$meta = _props3.meta,
                touched = _props3$meta.touched,
                error = _props3$meta.error,
                warning = _props3$meta.warning;

            return _react2.default.createElement(
                'div',
                { className: 'form-group form-group-flex' },
                label && _react2.default.createElement(
                    'label',
                    { className: 'control-label form-label-flex-md' },
                    label
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-input-flex' },
                    _react2.default.createElement(
                        'select',
                        (0, _extends3.default)({ className: 'form-control' }, input, { placeholder: label }),
                        options && options.map(function (option, index) {
                            return _react2.default.createElement(
                                'option',
                                { key: index, value: valueKey ? option[valueKey] : option.id },
                                labelKey ? option[labelKey] : option.name
                            );
                        })
                    ),
                    touched && (error && _react2.default.createElement(
                        'span',
                        { className: 'form-error' },
                        error
                    ) || warning && _react2.default.createElement(
                        'span',
                        { className: 'form-warning' },
                        warning
                    ))
                )
            );
        }
    }]);
    return selectField;
}(_react2.default.Component);

var OnOffToggleField = function (_React$Component2) {
    (0, _inherits3.default)(OnOffToggleField, _React$Component2);

    function OnOffToggleField(props) {
        (0, _classCallCheck3.default)(this, OnOffToggleField);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (OnOffToggleField.__proto__ || Object.getPrototypeOf(OnOffToggleField)).call(this, props));

        _this2.state = {
            hover: false
        };

        _this2.toggle = _this2.toggle.bind(_this2);
        _this2.hoverOn = _this2.hoverOn.bind(_this2);
        _this2.hoverOff = _this2.hoverOff.bind(_this2);
        return _this2;
    }

    (0, _createClass3.default)(OnOffToggleField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var initialValue = this.props.input.value || false;
            if (this.props.input.onChange) {
                this.props.input.onChange(initialValue);
            }
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.props.input.onChange) {
                var newVal = !this.props.input.value;
                // this.props.setValue(newVal);
                this.props.input.onChange(newVal);
            }
        }
    }, {
        key: 'hoverOn',
        value: function hoverOn() {
            this.setState({ hover: true });
        }
    }, {
        key: 'hoverOff',
        value: function hoverOff() {
            this.setState({ hover: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props4 = this.props,
                faIcon = _props4.faIcon,
                icon = _props4.icon,
                color = _props4.color,
                input = _props4.input,
                label = _props4.label,
                type = _props4.type;

            var style = {};
            if (input.value === true) {
                style = (0, _extends3.default)({}, style, { color: "#ffffff", backgroundColor: color });
            } else if (this.state.hover) {
                style = (0, _extends3.default)({}, style, { color: color, borderColor: color });
            } else {
                style = (0, _extends3.default)({}, style, { color: "#dedede" });
            }

            return _react2.default.createElement(
                'div',
                { className: 'form-group form-group-flex' },
                label && _react2.default.createElement(
                    'label',
                    { className: 'control-label form-label-flex-md' },
                    label
                ),
                _react2.default.createElement(
                    'div',
                    { style: input.disabled && { "cursor": "not-allowed" }, className: 'iconToggleField slideToggle ' + (input.value && 'active') + ' ' + (!input.disabled && this.state.hover && 'hover'),
                        'data-tip': label, onMouseEnter: this.hoverOn, onMouseLeave: this.hoverOff, onClick: this.toggle },
                    _react2.default.createElement('span', { style: style, className: 'itf-icon' }),
                    _react2.default.createElement('input', { className: 'hidden checkbox',
                        name: input.name,
                        value: input.value || false,
                        placeholder: label,
                        type: type || "checkbox" })
                )
            );
        }
    }]);
    return OnOffToggleField;
}(_react2.default.Component);

var iconToggleField = function (_React$Component3) {
    (0, _inherits3.default)(iconToggleField, _React$Component3);

    function iconToggleField(props) {
        (0, _classCallCheck3.default)(this, iconToggleField);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (iconToggleField.__proto__ || Object.getPrototypeOf(iconToggleField)).call(this, props));

        _this3.state = {
            value: _this3.props.value || _this3.props.defaultValue,
            hover: false
        };

        _this3.toggle = _this3.toggle.bind(_this3);
        _this3.hoverOn = _this3.hoverOn.bind(_this3);
        _this3.hoverOff = _this3.hoverOff.bind(_this3);
        return _this3;
    }

    (0, _createClass3.default)(iconToggleField, [{
        key: 'toggle',
        value: function toggle() {
            var newVal = !this.state.value;
            this.setState({ value: newVal });
            this.props.setValue(newVal);
        }
    }, {
        key: 'hoverOn',
        value: function hoverOn() {
            this.setState({ hover: true });
        }
    }, {
        key: 'hoverOff',
        value: function hoverOff() {
            this.setState({ hover: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props5 = this.props,
                faIcon = _props5.faIcon,
                icon = _props5.icon,
                color = _props5.color,
                input = _props5.input,
                _props5$input = _props5.input,
                name = _props5$input.name,
                value = _props5$input.value,
                onChange = _props5$input.onChange,
                label = _props5.label,
                type = _props5.type,
                _props5$meta = _props5.meta,
                touched = _props5$meta.touched,
                error = _props5$meta.error,
                warning = _props5$meta.warning;

            var style = {};

            if (value == true || this.state.value == true) {
                style = (0, _extends3.default)({}, style, { color: "#ffffff", backgroundColor: color });
            } else if (this.state.hover) {
                style = (0, _extends3.default)({}, style, { color: color, borderColor: color });
            } else {
                style = (0, _extends3.default)({}, style, { color: "#dedede" });
            }

            return _react2.default.createElement(
                'div',
                { className: 'iconToggleField ' + (value || this.state.value && 'active') + ' ' + (this.state.hover && 'hover'),
                    style: style, 'data-tip': label,
                    onMouseEnter: this.hoverOn, onMouseLeave: this.hoverOff },
                _react2.default.createElement(
                    'span',
                    { className: 'itf-icon', onClick: this.toggle },
                    _react2.default.createElement('i', { className: 'fa fa-' + (faIcon || "check") })
                ),
                _react2.default.createElement(_reactTooltip2.default, { place: 'bottom', type: 'dark', effect: 'solid' }),
                _react2.default.createElement('input', { className: 'hidden checkbox',
                    name: name,
                    value: value || this.state.value,
                    onChange: onChange,
                    placeholder: label,
                    type: type })
            );
        }
    }]);
    return iconToggleField;
}(_react2.default.Component);

var priceField = function (_React$Component4) {
    (0, _inherits3.default)(priceField, _React$Component4);

    function priceField(props) {
        (0, _classCallCheck3.default)(this, priceField);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (priceField.__proto__ || Object.getPrototypeOf(priceField)).call(this, props));

        _this4.state = {
            amount: "0"
        };
        _this4.handleChange = _this4.handleChange.bind(_this4);
        return _this4;
    }

    (0, _createClass3.default)(priceField, [{
        key: 'handleChange',
        value: function handleChange(_ref, e) {
            var value = _ref.value;

            var price = this.props.isCents ? (0, _toCents.toCents)(value) : value;
            this.props.input.onChange(price);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props6 = this.props,
                options = _props6.options,
                isCents = _props6.isCents,
                _props6$input = _props6.input,
                name = _props6$input.name,
                value = _props6$input.value,
                onChange = _props6$input.onChange,
                label = _props6.label,
                type = _props6.type,
                _props6$meta = _props6.meta,
                touched = _props6$meta.touched,
                error = _props6$meta.error,
                warning = _props6$meta.warning;

            var prefix = options.currency ? (0, _currencySymbolMap2.default)(options.currency.value) : '';
            var price = isCents ? value / 100 : value;
            return _react2.default.createElement(
                'div',
                { className: 'form-group form-group-flex' },
                label && _react2.default.createElement(
                    'label',
                    { className: 'control-label form-label-flex-md' },
                    label
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-input-flex' },
                    _react2.default.createElement(_reactNumberFormat2.default, { className: 'form-control', name: name,
                        prefix: prefix, decimalSeparator: '.', thousandSeparator: ',', decimalScale: '2',
                        allowNegative: false,
                        fixedDecimalScale: false,
                        onValueChange: this.handleChange, value: price
                    }),
                    touched && (error && _react2.default.createElement(
                        'span',
                        { className: 'form-error' },
                        error
                    ) || warning && _react2.default.createElement(
                        'span',
                        { className: 'form-warning' },
                        warning
                    ))
                )
            );
        }
    }]);
    return priceField;
}(_react2.default.Component);

exports.priceField = priceField = (0, _reactRedux.connect)(function (state) {
    return {
        options: state.options
    };
})(priceField);

exports.inputField = inputField;
exports.widgetField = widgetField;
exports.selectField = selectField;
exports.OnOffToggleField = OnOffToggleField;
exports.iconToggleField = iconToggleField;
exports.priceField = priceField;