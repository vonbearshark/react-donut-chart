'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DonutChart = require('./DonutChart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculate coordinates of given arc.
 * @param {number} half - Half the total width of the chart.
 * @param {number} radius - Radius of the arc.
 * @param {number} startAngle - Starting angle for the arc.
 * @param {number} endAngle - Ending angle for the arc.
 */
function coordinates(half, radius, startAngle, endAngle) {
  var startAngleDegrees = Math.PI * startAngle / 180;
  var endAngleDegrees = Math.PI * endAngle / 180;

  return {
    x1: half + half * radius * Math.cos(startAngleDegrees),
    y1: half + half * radius * Math.sin(startAngleDegrees),
    x2: half + half * radius * Math.cos(endAngleDegrees),
    y2: half + half * radius * Math.sin(endAngleDegrees)
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
/**
 * @fileOverview ArcPath component.
 * Rendered chart section dictated by each item.
 * @name ArcPath.js
 * @author JJ Naughton
 * @license MIT
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

  return 'M' + outerCoords.x1 + ',' + outerCoords.y1 + '\n  ' + outerArc + '\n  L' + innerCoords.x2 + ',' + innerCoords.y2 + '\n  ' + innerArc + ' z';
}

var ArcPath = function ArcPath(_ref) {
  var index = _ref.index,
      item = _ref.item,
      angle = _ref.angle;

  var _useContext = (0, _react.useContext)(_DonutChart.DonutChartContext),
      className = _useContext.className,
      emptyOffset = _useContext.emptyOffset,
      graphWidth = _useContext.graphWidth,
      itemProps = _useContext.itemProps,
      innerRadius = _useContext.innerRadius,
      outerRadius = _useContext.outerRadius,
      selected = _useContext.selected,
      selectedOffset = _useContext.selectedOffset,
      toggledOffset = _useContext.toggledOffset,
      toggleSelect = _useContext.toggleSelect,
      total = _useContext.total;

  var isEmpty = item.isEmpty,
      label = item.label,
      value = item.value;

  var _itemProps = itemProps(item, index),
      classNames = _itemProps.classNames,
      clickHandlers = _itemProps.clickHandlers,
      restItemProps = (0, _objectWithoutProperties3.default)(_itemProps, ['classNames', 'clickHandlers']);

  var activeAngle = (0, _isNan2.default)(value / total) || total / value === 1 ? 359.99 : value / total * 360;
  var inner = innerRadius,
      outer = outerRadius;


  if (isEmpty) {
    inner += emptyOffset;
    outer -= emptyOffset;
  } else if (selected.label === label) {
    if (toggleSelect) {
      inner -= toggledOffset;
      outer += toggledOffset;
    } else {
      outer += selectedOffset;
    }
  }

  return _react2.default.createElement('path', (0, _extends3.default)({}, (0, _extends3.default)({}, clickHandlers, restItemProps), {
    className: className + '-arcs-path ' + classNames,
    d: path(activeAngle, angle, graphWidth, inner, outer) }));
};

exports.default = ArcPath;


ArcPath.propTypes = {
  angle: _propTypes2.default.number.isRequired,
  index: _propTypes2.default.number,
  item: _propTypes2.default.shape({
    value: _propTypes2.default.number.isRequired,
    label: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    isEmpty: _propTypes2.default.boolean
  }).isRequired
};

ArcPath.defaultProps = {
  angle: 0,
  index: 0,
  item: {
    label: '',
    value: 100,
    isEmpty: true
  }
};