'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
/**
 * @fileOverview LegendItem component.
 * Rendered SVG box, label, and value for each item.
 * @name LegendItem.js
 * @author JJ Naughton
 * @license MIT
 */
var LegendItem = function (_Component) {
    (0, _inherits3.default)(LegendItem, _Component);

    function LegendItem() {
        (0, _classCallCheck3.default)(this, LegendItem);
        return (0, _possibleConstructorReturn3.default)(this, (LegendItem.__proto__ || (0, _getPrototypeOf2.default)(LegendItem)).apply(this, arguments));
    }

    (0, _createClass3.default)(LegendItem, [{
        key: 'render',

        /* React render function */
        value: function render() {
            var _props = this.props,
                className = _props.className,
                item = _props.item,
                index = _props.index,
                _onClick = _props.onClick,
                _onMouseEnter = _props.onMouseEnter,
                fill = _props.fill,
                opacity = _props.opacity,
                width = _props.width,
                totalWidth = _props.totalWidth,
                stroke = _props.stroke;
            var label = item.label,
                value = item.value;


            var legendRectClassName = className + '-rect';
            var legendLabelClassName = className + '-label';
            var sqUnit = width / 10;
            var yOffset = 1.5;

            var position = 'translate(' + (totalWidth - width) + ',\n' + index * yOffset * sqUnit + ')';
            return _react2.default.createElement(
                'g',
                {
                    transform: position,
                    className: className,
                    onClick: function onClick() {
                        _onClick(item);
                    },
                    onMouseEnter: function onMouseEnter() {
                        _onMouseEnter(item);
                    } },
                _react2.default.createElement('rect', {
                    className: legendRectClassName,
                    width: sqUnit,
                    height: sqUnit,
                    fill: fill,
                    opacity: opacity,
                    stroke: stroke }),
                _react2.default.createElement(
                    'text',
                    {
                        className: legendLabelClassName,
                        x: sqUnit + sqUnit / 2,
                        y: sqUnit / 2,
                        dy: '.35em' },
                    label + ' - ' + value
                )
            );
        }
    }]);
    return LegendItem;
}(_react.Component);

exports.default = LegendItem;


LegendItem.propTypes = {
    item: _propTypes2.default.shape({
        value: _propTypes2.default.number.isRequired,
        label: _propTypes2.default.string.isRequired,
        className: _propTypes2.default.string,
        isEmpty: _propTypes2.default.boolean
    }).isRequired,
    width: _propTypes2.default.number.isRequired,
    totalWidth: _propTypes2.default.number.isRequired,
    onMouseEnter: _propTypes2.default.func.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    index: _propTypes2.default.number,
    opacity: _propTypes2.default.number,
    stroke: _propTypes2.default.string,
    fill: _propTypes2.default.string,
    className: _propTypes2.default.string
};

LegendItem.defaultProps = {
    item: {
        label: '',
        value: 100,
        isEmpty: true
    },
    index: 0,
    opacity: 1,
    fill: '#e0e0e0',
    stroke: '#e0e0e0',
    className: 'donutchart-legend-item',
    width: 250,
    totalWidth: 750,
    onMouseEnter: function onMouseEnter(item) {
        return item;
    },
    onClick: function onClick(item) {
        return item;
    }
};