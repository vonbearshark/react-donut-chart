"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
var DonutInnerText = function (_Component) {
    (0, _inherits3.default)(DonutInnerText, _Component);

    function DonutInnerText() {
        (0, _classCallCheck3.default)(this, DonutInnerText);
        return (0, _possibleConstructorReturn3.default)(this, (DonutInnerText.__proto__ || (0, _getPrototypeOf2.default)(DonutInnerText)).apply(this, arguments));
    }

    (0, _createClass3.default)(DonutInnerText, [{
        key: "render",

        /* React render function */
        value: function render() {
            var _props = this.props,
                item = _props.item,
                className = _props.className,
                width = _props.width,
                formatValues = _props.formatValues,
                total = _props.total;
            var label = item.label;
            var value = item.value;

            var half = width / 2;
            var labelClassName = className + "-label";
            var valueClassName = className + "-value";

            return _react2.default.createElement(
                "g",
                { className: className },
                _react2.default.createElement(
                    "text",
                    {
                        className: labelClassName,
                        x: half,
                        y: "45%",
                        textAnchor: "middle" },
                    label
                ),
                _react2.default.createElement(
                    "text",
                    {
                        className: valueClassName,
                        x: half,
                        y: "60%",
                        textAnchor: "middle" },
                    formatValues(value, total)
                )
            );
        }
    }]);
    return DonutInnerText;
}(_react.Component); /**
                      * @fileOverview The text component in the Donut Chart inner circle.
                      * Shows the selected item's label and value
                      * @name DonutInnerText.jsx
                      * @author JJ Naughton
                      * @license MIT
                      */


exports.default = DonutInnerText;


DonutInnerText.propTypes = {
    item: _react.PropTypes.shape({
        value: _react.PropTypes.number.isRequired,
        label: _react.PropTypes.string.isRequired,
        className: _react.PropTypes.string,
        isEmpty: _react.PropTypes.boolean
    }).isRequired,
    className: _react.PropTypes.string,
    total: _react.PropTypes.number,
    width: _react.PropTypes.number,
    formatValues: _react.PropTypes.func
};

DonutInnerText.defaultProps = {
    item: {
        label: '',
        value: 100,
        isEmpty: true
    },
    total: 100,
    className: 'donutchart-innertext',
    width: 500,
    formatValues: function formatValues(value) {
        return value;
    }
};