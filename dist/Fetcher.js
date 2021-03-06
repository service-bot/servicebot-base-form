'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('whatwg-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fetcher = function Fetcher(path) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
    var body = arguments[2];
    var init = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (!init) {
        var headers = new Headers({
            "Content-Type": "application/json"
        });

        init = { method: method,
            headers: headers,
            credentials: "include"

        };

        if (method == "POST" || method == "PUT") {
            init.body = JSON.stringify(body);
        }
    }

    return fetch(path, init).then(function (response) {
        if (response.status == 404) {
            throw response;
        }
        return response.json();
    }).then(function (response) {
        if (response != null) {
            if (response.error) {
                // Alert.error(response.error);
            }
            if (response.message) {
                // Alert.info(response.message);

            }
        }
        return response;
    });
};
exports.default = Fetcher;