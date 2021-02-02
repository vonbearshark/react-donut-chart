'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DonutChart = require('./DonutChart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LegendItem = function LegendItem(_ref) {
  var index = _ref.index,
      item = _ref.item;

  var _useContext = (0, _react.useContext)(_DonutChart.DonutChartContext),
      className = _useContext.className,
      graphWidth = _useContext.graphWidth,
      itemProps = _useContext.itemProps,
      width = _useContext.width;

  var label = item.label,
      value = item.value;

  var classSuffix = 'legend-item';

  var _itemProps = itemProps(item, index),
      classNames = _itemProps.classNames,
      clickHandlers = _itemProps.clickHandlers,
      restItemProps = (0, _objectWithoutProperties3.default)(_itemProps, ['classNames', 'clickHandlers']);

  var legendWidth = width - graphWidth;
  var sqUnit = legendWidth / 10;
  var yOffset = 1.5;
  var position = 'translate(' + (width - legendWidth) + ', ' + index * yOffset * sqUnit + ')';

  return _react2.default.createElement(
    'g',
    (0, _extends3.default)({}, clickHandlers, { className: className + '-' + classSuffix + ' ' + classNames, transform: position }),
    _react2.default.createElement('rect', (0, _extends3.default)({}, restItemProps, { height: sqUnit, width: sqUnit })),
    _react2.default.createElement(
      'text',
      {
        className: className + '-' + classSuffix + '-label ' + classNames,
        dy: '.35em',
        x: sqUnit + sqUnit / 2,
        y: sqUnit / 2 },
      label + ' - ' + value
    )
  );
}; /**
    * @fileOverview LegendItem component.
    * Rendered SVG box, label, and value for each item.
    * @name LegendItem.js
    * @author JJ Naughton
    * @license MIT
    */
exports.default = LegendItem;


LegendItem.propTypes = {
  index: _propTypes2.default.number,
  item: _propTypes2.default.shape({
    value: _propTypes2.default.number.isRequired,
    label: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    isEmpty: _propTypes2.default.boolean
  }).isRequired
};

LegendItem.defaultProps = {
  index: 0,
  item: {
    label: '',
    value: 100,
    isEmpty: true
  }
};