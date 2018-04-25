'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

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
 * Calculate coordinates of given arc.
 * @param {number} half - Half the total width of the chart.
 * @param {number} radius - Radius of the arc.
 * @param {number} startAngle - Starting angle for the arc.
 * @param {number} endAngle - Ending angle for the arc.
 */
/**
 * @fileOverview ArcPath component.
 * Rendered chart section dictated by each item.
 * @name ArcPath.js
 * @author JJ Naughton
 * @license MIT
 */
function coordinates(half, radius, startAngle, endAngle) {
    var startAngleDegrees = Math.PI * startAngle / 180;
    var x1 = half + half * radius * Math.cos(startAngleDegrees);
    var y1 = half + half * radius * Math.sin(startAngleDegrees);
    var endAngleDegrees = Math.PI * endAngle / 180;
    var x2 = half + half * radius * Math.cos(endAngleDegrees);
    var y2 = half + half * radius * Math.sin(endAngleDegrees);

    return {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    };
}

/**
 * Creates an SVG arc object for an SVG path object.
 * @param {number} width - Total width of the chart.
 * @param {number} radius - Radius of the arc.
 * @param {string} largeArcFlag - Flag for angles over 180 degrees.
 * @param {number} x - X coordinate for arc.
 * @param {number} y - Y coordinate for arc.
 */
function arc(width, radius, largeArcFlag, x, y) {
    var z = width / 2 * radius;

    return 'A' + z + ', ' + z + ' 0 ' + largeArcFlag + ' ' + x + ', ' + y;
}

/**
 * Creates the SVG path object for an item.
 * @param {number} value - Value of incoming item.
 * @param {number} total - Culmulative value of all items
 * @param {number} startAngle - Degree at which the angle calculation should begin.
 * @param {number} width - Total width of the chart.
 * @param {number} innerRadius - Inner circle's radius.
 * @param {number} outerRadius - Outer circle's radius.
 */
function path(activeAngle, startAngle, width, innerRadius, outerRadius) {
    var endAngle = startAngle + activeAngle;

    var largeArcFlagOuter = activeAngle > 180 ? '1 1' : '0 1';
    var largeArcFlagInner = activeAngle > 180 ? '1 0' : '0 0';
    var half = width / 2;
    var outerCoords = coordinates(half, outerRadius, startAngle, endAngle);
    var innerCoords = coordinates(half, innerRadius, startAngle, endAngle);

    var outerArc = arc(width, outerRadius, largeArcFlagOuter, outerCoords.x2, outerCoords.y2);
    var innerArc = arc(width, innerRadius, largeArcFlagInner, innerCoords.x1, innerCoords.y1);

    return 'M' + outerCoords.x1 + ',' + outerCoords.y1 + '\n    ' + outerArc + '\n    L' + innerCoords.x2 + ',' + innerCoords.y2 + '\n    ' + innerArc + ' z';
}

/**
 * @extends {Component}
 */

var ArcPath = function (_Component) {
    (0, _inherits3.default)(ArcPath, _Component);

    function ArcPath() {
        (0, _classCallCheck3.default)(this, ArcPath);
        return (0, _possibleConstructorReturn3.default)(this, (ArcPath.__proto__ || (0, _getPrototypeOf2.default)(ArcPath)).apply(this, arguments));
    }

    (0, _createClass3.default)(ArcPath, [{
        key: 'render',

        /* React render function */
        value: function render() {
            var _props = this.props,
                width = _props.width,
                angle = _props.angle,
                total = _props.total,
                fill = _props.fill,
                stroke = _props.stroke,
                opacity = _props.opacity,
                item = _props.item,
                className = _props.className,
                innerRadius = _props.innerRadius,
                outerRadius = _props.outerRadius,
                _onClick = _props.onClick,
                _onMouseEnter = _props.onMouseEnter;
            var value = item.value;

            var activeAngle = (0, _isNan2.default)(value / total) || total / value === 1 ? 359.99 : value / total * 360;
            var d = path(activeAngle, angle, width, innerRadius, outerRadius);
            return _react2.default.createElement('path', {
                onClick: function onClick() {
                    return _onClick(item);
                },
                onMouseEnter: function onMouseEnter() {
                    return _onMouseEnter(item);
                },
                className: className,
                d: d,
                stroke: stroke,
                fill: fill,
                opacity: opacity });
        }
    }]);
    return ArcPath;
}(_react.Component);

exports.default = ArcPath;


ArcPath.propTypes = {
    item: _propTypes2.default.shape({
        value: _propTypes2.default.number.isRequired,
        label: _propTypes2.default.string.isRequired,
        className: _propTypes2.default.string,
        isEmpty: _propTypes2.default.boolean
    }).isRequired,
    total: _propTypes2.default.number.isRequired,
    angle: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number,
    innerRadius: _propTypes2.default.number.isRequired,
    outerRadius: _propTypes2.default.number.isRequired,
    onMouseEnter: _propTypes2.default.func.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    fill: _propTypes2.default.string,
    stroke: _propTypes2.default.string,
    opacity: _propTypes2.default.number,
    className: _propTypes2.default.string
};

ArcPath.defaultProps = {
    item: {
        label: '',
        value: 100,
        isEmpty: true
    },
    total: 100,
    angle: 0,
    width: 500,
    innerRadius: 0.70,
    outerRadius: 0.90,
    onMouseEnter: function onMouseEnter(item) {
        return item;
    },
    onClick: function onClick(item) {
        return item;
    },
    fill: '#e0e0e0',
    stroke: '#e0e0e0',
    opacity: 1,
    className: 'donutchart-arcs-path'
};