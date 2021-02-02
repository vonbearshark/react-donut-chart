'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DonutChart = require('./DonutChart');

var _LegendItem = require('./LegendItem');

var _LegendItem2 = _interopRequireDefault(_LegendItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: This component necessary?

var Legend = function Legend() {
  var _useContext = (0, _react.useContext)(_DonutChart.DonutChartContext),
      className = _useContext.className,
      data = _useContext.data;

  // TODO: Redo className mgmt, this was className


  var legendClassName = className + '-legend';

  return _react2.default.createElement(
    'g',
    { className: legendClassName },
    data.map(function (item, index) {
      return _react2.default.createElement(_LegendItem2.default, {
        key: 'legenditem' + index,
        index: index,
        item: item
      });
    })
  );
}; /**
    * @fileOverview Legend component.
    * Orchestrates all rendering each LegendItem component,
    * based on each item.
    * @name Legend.js
    * @author JJ Naughton
    * @license MIT
    */
exports.default = Legend;