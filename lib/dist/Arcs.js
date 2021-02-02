'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DonutChart = require('./DonutChart');

var _ArcPath = require('./ArcPath');

var _ArcPath2 = _interopRequireDefault(_ArcPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Arcs = function Arcs() {
  var _useContext = (0, _react.useContext)(_DonutChart.DonutChartContext),
      className = _useContext.className,
      data = _useContext.data,
      startAngle = _useContext.startAngle,
      total = _useContext.total;

  var angle = startAngle;

  return _react2.default.createElement(
    'g',
    { className: className + '-arcs' },
    data.map(function (item, index) {
      var arcPath = _react2.default.createElement(_ArcPath2.default, {
        item: item,
        index: index,
        key: 'arcpath' + index,
        angle: angle
      });

      angle += item.value / total * 360;

      return arcPath;
    })
  );
}; /**
    * @fileOverview Aggregation of ArcPath components.
    * Orchestrates the rendering of the chart sections,
    * based on each item's value.
    * @name Arcs.js
    * @author JJ Naughton
    * @license MIT
    */
exports.default = Arcs;