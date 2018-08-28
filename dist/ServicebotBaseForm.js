'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Fetcher = require('./Fetcher');

var _Fetcher2 = _interopRequireDefault(_Fetcher);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _reactSAlert = require('react-s-alert');

var _reactSAlert2 = _interopRequireDefault(_reactSAlert);

require('react-s-alert/dist/s-alert-default.css');

require('react-s-alert/dist/s-alert-css-effects/slide.css');

require('../loader.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
To use ServiceBot Base Form:
Inputs->
*form - A redux-form
*initialValues - an object with the initial values of the form. will be overrode by values from initialRequests
*initialRequests - an Array of request object. All entries without a name value will be added to the redux-form initialValues highest level.
 All other requests should have a name formatted with a leading _ to avoid collisions. Ex:
    const initialRequests = [
        {'method': 'GET', 'url': `/api/v1/service-templates/1`},
        {'method': 'GET', 'url': `/api/v1/service-categories`, 'name': '_categories'},
    ];
*submissionPrep - A method that either returns values, or a promise that resolves values. Thrown errors will be created
   as submission error
*submissionRequest - A request object with just the method and url for the form to be submitted to. Ex:
    const submissionRequest = {
        'method': 'PUT',
        'url': `/api/v1/service-categories/1`
    };
*validations - an array of validations for the form
Ex:
    validations = {
      username: [required(), length({ max: 15 })],
      email:    [required(), email()],
      age:      [
        required(),
        numericality({ int: true }),
        numericality({ '>=': 18, msg: "You must be at least 18 years old" })
      ]
    }
*handleResponse - A method to be called after a form is submitted. Takes in the result of the submission Response
*successMessage - The message to be displayed after submission succeeds
* successRoute - The route to redirect the page to upon successful completion
*failureRoute - The route for the browser to redirect to if there’s a failure
*helpers - any properties needed to pass to the form for functionality
Note:
Form name is 'servicebotForm' if selector is needed
 */

function Loading(props) {
    return _react2.default.createElement(
        'div',
        { className: 'loader' },
        _react2.default.createElement(
            'div',
            { 'class': 'lds-ellipsis' },
            _react2.default.createElement('div', null),
            _react2.default.createElement('div', null),
            _react2.default.createElement('div', null),
            _react2.default.createElement('div', null)
        )
    );
}
// import Load from '../utilities/load.jsx';

var ServiceBotBaseForm = function (_React$Component) {
    (0, _inherits3.default)(ServiceBotBaseForm, _React$Component);

    function ServiceBotBaseForm(props) {
        (0, _classCallCheck3.default)(this, ServiceBotBaseForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ServiceBotBaseForm.__proto__ || Object.getPrototypeOf(ServiceBotBaseForm)).call(this, props));

        _this.state = {
            submissionResponse: {},
            loading: false,
            initializing: true,
            success: false,
            initialRequests: _this.props.initialRequests,
            submissionRequest: _this.props.submissionRequest,
            successMessage: _this.props.successMessage,
            failureRoute: _this.props.failureRoute || "/",
            successRoute: _this.props.successRoute || null,
            initialValues: _this.props.initialValues || {},
            helpers: _this.props.helpers || {}
        };
        _this.submitForm = _this.submitForm.bind(_this);
        _this.validate = _this.validate.bind(_this);

        return _this;
    }

    (0, _createClass3.default)(ServiceBotBaseForm, [{
        key: 'submitForm',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(values) {
                var self, prepResults;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                self = this;
                                _context.prev = 1;

                                setTimeout(self.setState({ loading: true }), 300);

                                if (!self.props.submissionPrep) {
                                    _context.next = 11;
                                    break;
                                }

                                _context.next = 6;
                                return self.props.submissionPrep(values);

                            case 6:
                                prepResults = _context.sent;
                                _context.next = 9;
                                return self.makeCall(prepResults);

                            case 9:
                                _context.next = 13;
                                break;

                            case 11:
                                _context.next = 13;
                                return self.makeCall(values);

                            case 13:
                                _context.next = 20;
                                break;

                            case 15:
                                _context.prev = 15;
                                _context.t0 = _context['catch'](1);

                                console.error("Something happened submitting", _context.t0);
                                self.setState({ loading: false });
                                throw new _reduxForm.SubmissionError({ _error: _context.t0 });

                            case 20:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 15]]);
            }));

            function submitForm(_x) {
                return _ref.apply(this, arguments);
            }

            return submitForm;
        }()
    }, {
        key: 'getRequest',
        value: function getRequest() {
            var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "GET";
            var body = arguments[1];

            var headers = {
                "Content-Type": "application/json"
            };
            if (this.props.token) {
                headers["Authorization"] = "JWT " + this.props.token;
            }

            var request = { method: method,
                headers: new Headers(headers)

            };
            if (!this.props.external) {
                request.credentials = "include";
            }

            if (method === "POST" || method === "PUT") {
                request.body = JSON.stringify(body);
            }
            return request;
        }
    }, {
        key: 'makeCall',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(values) {
                var self, result, request;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                self = this;
                                result = null;
                                request = null;
                                _context2.prev = 3;

                                request = this.getRequest(self.state.submissionRequest.method, values);
                                _context2.next = 7;
                                return (0, _Fetcher2.default)(self.state.submissionRequest.url, self.state.submissionRequest.method, values, request);

                            case 7:
                                result = _context2.sent;
                                _context2.next = 17;
                                break;

                            case 10:
                                _context2.prev = 10;
                                _context2.t0 = _context2['catch'](3);

                                console.error("Fetch error", _context2.t0);
                                self.setState({ loading: false });
                                _reactSAlert2.default.error(_context2.t0);
                                if (this.props.handleFailure) {
                                    self.props.handleFailure(_context2.t0);
                                }
                                throw "Error submitting";

                            case 17:
                                if (result.error) {
                                    _context2.next = 24;
                                    break;
                                }

                                if (self.props.handleResponse) {
                                    self.props.handleResponse(result);
                                }
                                self.setState({ loading: false, success: true, submissionResponse: result });
                                this.state.successMessage && _reactSAlert2.default.success(this.state.successMessage);
                                if (this.props.successRoute) {
                                    this.props.history.push(this.props.successRoute);
                                }
                                _context2.next = 32;
                                break;

                            case 24:
                                console.error("submission error", result.error);
                                self.setState({ loading: false });

                                if (!this.props.handleFailure) {
                                    _context2.next = 29;
                                    break;
                                }

                                _context2.next = 29;
                                return self.props.handleFailure(result);

                            case 29:
                                _reactSAlert2.default.error(result.error);

                                // self.props.endSubmit({_error: result.error})
                                throw result.error;

                            case 32:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[3, 10]]);
            }));

            function makeCall(_x3) {
                return _ref2.apply(this, arguments);
            }

            return makeCall;
        }()
    }, {
        key: 'validate',
        value: function validate(values) {
            if (this.props.validations) return this.props.validations(values);else return;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var self = this;
            var initialRequests = self.state.initialRequests;
            if (initialRequests && initialRequests.length > 0) {
                var allRequests = initialRequests.map(function () {
                    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(requestInfo) {
                        var response;
                        return _regenerator2.default.wrap(function _callee3$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        _context3.next = 2;
                                        return (0, _Fetcher2.default)(requestInfo.url, requestInfo.method);

                                    case 2:
                                        response = _context3.sent;

                                        if (requestInfo.name) {
                                            response._name = requestInfo.name;
                                        }
                                        return _context3.abrupt('return', response);

                                    case 5:
                                    case 'end':
                                        return _context3.stop();
                                }
                            }
                        }, _callee3, _this2);
                    }));

                    return function (_x4) {
                        return _ref3.apply(this, arguments);
                    };
                }());
                Promise.all(allRequests).then(function () {
                    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(values) {
                        var error, requestValues, initialForm;
                        return _regenerator2.default.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        //Check for errors and unauthenticated!
                                        error = values.find(function (value) {
                                            return value.error;
                                        });

                                        if (error) {
                                            _context4.next = 11;
                                            break;
                                        }

                                        requestValues = values.reduce(function (acc, value, currentIndex) {
                                            return value._name ? (0, _extends4.default)({}, acc, (0, _defineProperty3.default)({}, value._name, value)) : (0, _extends4.default)({}, acc, value);
                                        }, self.state.initialValues);

                                        if (!self.props.initializer) {
                                            _context4.next = 7;
                                            break;
                                        }

                                        _context4.next = 6;
                                        return self.props.initializer(requestValues);

                                    case 6:
                                        requestValues = _context4.sent;

                                    case 7:
                                        initialForm = (0, _reduxForm.reduxForm)({
                                            form: self.props.formName || "servicebotForm",
                                            initialValues: requestValues,
                                            validate: self.validate
                                        })(self.props.form);

                                        self.setState({ initializing: false, reduxForm: initialForm });
                                        _context4.next = 14;
                                        break;

                                    case 11:
                                        console.error("fetch error", error);
                                        self.setState({ initializing: false });
                                        self.state.failureRoute && self.props.history.push(self.state.failureRoute);

                                    case 14:
                                    case 'end':
                                        return _context4.stop();
                                }
                            }
                        }, _callee4, _this2);
                    }));

                    return function (_x5) {
                        return _ref4.apply(this, arguments);
                    };
                }());
            } else {
                //todo: clean this whole function to not duplicate this code.
                var initialForm = (0, _reduxForm.reduxForm)({
                    form: self.props.formName || "servicebotForm",
                    initialValues: self.state.initialValues,
                    validate: self.validate
                })(this.props.form);

                self.setState({ initializing: false, reduxForm: initialForm });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.initializing) {
                return _react2.default.createElement(Loading, null);
            }
            if (this.state.success && !this.props.reShowForm) {
                return _react2.default.createElement(
                    'div',
                    { className: 'p-20' },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-check', 'aria-hidden': 'true' }),
                        _react2.default.createElement(
                            'strong',
                            null,
                            this.state.successMessage
                        )
                    )
                );
            } else {
                var ReduxFormWrapper = this.state.reduxForm;

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_reactSAlert2.default, { stack: { limit: 3 } }),
                    this.state.loading && _react2.default.createElement(Loading, null),
                    _react2.default.createElement(ReduxFormWrapper, (0, _extends4.default)({}, this.props.formProps, { helpers: this.props.helpers, onSubmit: this.submitForm }))
                );
            }
        }
    }]);
    return ServiceBotBaseForm;
}(_react2.default.Component);

ServiceBotBaseForm = (0, _reactRedux.connect)(function (state) {
    return {
        history: state.history
    };
})(ServiceBotBaseForm);
exports.default = ServiceBotBaseForm;