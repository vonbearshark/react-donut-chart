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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
var LegendItem = function (_Component) {
    (0, _inherits3.default)(LegendItem, _Component);

    function LegendItem() {
        (0, _classCallCheck3.default)(this, LegendItem);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LegendItem).apply(this, arguments));
    }

    (0, _createClass3.default)(LegendItem, [{
        key: 'render',

        /* React render function */
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var item = _props.item;
            var index = _props.index;
            var _onClick = _props.onClick;
            var _onMouseEnter = _props.onMouseEnter;
            var fill = _props.fill;
            var opacity = _props.opacity;
            var width = _props.width;
            var totalWidth = _props.totalWidth;
            var key = _props.key;
            var stroke = _props.stroke;
            var label = item.label;
            var value = item.value;


            var legendRectClassName = className + '-rect';
            var legendLabelClassName = className + '-label';
            var sqUnit = width / 10;
            var yOffset = 1.5;

            var position = 'translate(' + (totalWidth - width) + ',\n' + index * yOffset * sqUnit + ')';
            return _react2.default.createElement(
                'g',
                {
                    transform: position,
                    key: key,
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
}(_react.Component); /**
                      * @fileOverview LegendItem component.
                      * Rendered SVG box, label, and value for each item.
                      * @name LegendItem.jsx
                      * @author JJ Naughton
                      * @license MIT
                      */


exports.default = LegendItem;


LegendItem.propTypes = {
    item: _react.PropTypes.shape({
        value: _react.PropTypes.number.isRequired,
        label: _react.PropTypes.string.isRequired,
        className: _react.PropTypes.string,
        isEmpty: _react.PropTypes.boolean
    }).isRequired,
    width: _react.PropTypes.number.isRequired,
    totalWidth: _react.PropTypes.number.isRequired,
    onMouseEnter: _react.PropTypes.func.isRequired,
    onClick: _react.PropTypes.func.isRequired,
    key: _react.PropTypes.string,
    index: _react.PropTypes.number,
    opacity: _react.PropTypes.number,
    stroke: _react.PropTypes.string,
    fill: _react.PropTypes.string,
    className: _react.PropTypes.string
};

LegendItem.defaultProps = {
    item: {
        label: '',
        value: 100,
        isEmpty: true
    },
    key: 'legenditem0',
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