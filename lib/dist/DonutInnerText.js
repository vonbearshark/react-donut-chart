'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DonutChart = require('./DonutChart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Is this separate component even necessary?

/**
 * @fileOverview The text component in the Donut Chart inner circle.
 * Shows the selected item's label and value
 * @name DonutInnerText.js
 * @author JJ Naughton
 * @license MIT
 */
var DonutInnerText = function DonutInnerText() {
  var _useContext = (0, _react.useContext)(_DonutChart.DonutChartContext),
      selected = _useContext.selected,
      className = _useContext.className,
      graphWidth = _useContext.graphWidth,
      formatValues = _useContext.formatValues,
      total = _useContext.total;

  // TODO: Redo className mgmt, this was className


  var innerTextClassName = className + '-innertext';
  var label = selected.label;
  var value = selected.value;

  var half = graphWidth / 2;
  var labelClassName = innerTextClassName + '-label';
  var valueClassName = innerTextClassName + '-value';

  return _react2.default.createElement(
    'g',
    { className: innerTextClassName },
    _react2.default.createElement(
      'text',
      {
        className: labelClassName,
        x: half,
        y: '45%',
        textAnchor: 'middle' },
      label
    ),
    _react2.default.createElement(
      'text',
      {
        className: valueClassName,
        x: half,
        y: '60%',
        textAnchor: 'middle' },
      formatValues(value, total)
    )
  );
};

exports.default = DonutInnerText;