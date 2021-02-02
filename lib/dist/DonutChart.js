'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonutChartContext = undefined;

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Arcs = require('./Arcs');

var _Arcs2 = _interopRequireDefault(_Arcs);

var _LegendItem = require('./LegendItem');

var _LegendItem2 = _interopRequireDefault(_LegendItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileOverview Main Donut Chart entry point.
 * Orchestrates all rendering for the chart, passing props to
 * Arcs, DonutInnerText, and Legend children components.
 * @name DonutChart.js
 * @author JJ Naughton
 * @license MIT
 */
var DonutChartContext = exports.DonutChartContext = (0, _react.createContext)();

var DonutChart = function DonutChart(_ref) {
  var className = _ref.className,
      clickToggle = _ref.clickToggle,
      colors = _ref.colors,
      colorFunction = _ref.colorFunction,
      data = _ref.data,
      formatValues = _ref.formatValues,
      height = _ref.height,
      legend = _ref.legend,
      _onClick = _ref.onClick,
      _onMouseEnter = _ref.onMouseEnter,
      width = _ref.width,
      emptyColor = _ref.emptyColor,
      strokeColor = _ref.strokeColor,
      restProps = (0, _objectWithoutProperties3.default)(_ref, ['className', 'clickToggle', 'colors', 'colorFunction', 'data', 'formatValues', 'height', 'legend', 'onClick', 'onMouseEnter', 'width', 'emptyColor', 'strokeColor']);

  var _useState = (0, _react.useState)(data[0]),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      toggleSelect = _useState4[0],
      setToggleSelect = _useState4[1];

  (0, _react.useEffect)(function () {
    setSelected(data[0]);
    setToggleSelect(false);
  }, [data]);

  var total = data.reduce(function (sum, currItem) {
    return sum + currItem.value;
  }, 0);
  var graphWidth = legend ? width * (2 / 3) : width;

  var itemProps = function itemProps(item, index) {
    var isEmpty = item.isEmpty,
        label = item.label;

    var isSelected = selected.label === label;
    var isToggled = isSelected && toggleSelect;

    return {
      classNames: ((item.className ? item.className : '') + ' ' + (isEmpty ? 'empty' : '') + ' ' + (isSelected ? 'selected' : '') + ' ' + (isToggled ? 'toggled' : '')).trim(),
      fill: isEmpty ? emptyColor : colorFunction(colors, index),
      opacity: isSelected && !toggleSelect ? 0.5 : 1,
      stroke: isEmpty ? emptyColor : strokeColor,
      clickHandlers: {
        onClick: function onClick() {
          if (selected.label === label) {
            var toggle = clickToggle ? !toggleSelect : false;
            setSelected(item);
            setToggleSelect(toggle);
            _onClick(item, toggle);
          }
        },
        onMouseEnter: function onMouseEnter() {
          if (!toggleSelect) {
            setSelected(item);
            _onMouseEnter(item);
          }
        }
      }
    };
  };

  return _react2.default.createElement(
    DonutChartContext.Provider,
    { value: (0, _extends3.default)({}, restProps, {
        className: className,
        data: data,
        graphWidth: graphWidth,
        itemProps: itemProps,
        selected: selected,
        toggleSelect: toggleSelect,
        total: total,
        width: width
      }) },
    _react2.default.createElement(
      'svg',
      { className: className, style: { height: height, width: width }, viewBox: '0 0 ' + width + ' ' + height },
      _react2.default.createElement(_Arcs2.default, null),
      _react2.default.createElement(
        'g',
        { className: className + '-innertext' },
        _react2.default.createElement(
          'text',
          {
            className: className + '-innertext-label',
            x: graphWidth / 2,
            y: '45%',
            textAnchor: 'middle' },
          selected.label
        ),
        _react2.default.createElement(
          'text',
          {
            className: className + '-innertext-value',
            x: graphWidth / 2,
            y: '60%',
            textAnchor: 'middle' },
          formatValues(selected.value, total)
        )
      ),
      legend && _react2.default.createElement(
        'g',
        { className: className + '-legend' },
        data.map(function (item, index) {
          return _react2.default.createElement(_LegendItem2.default, { key: 'legenditem' + index, index: index, item: item });
        })
      )
    )
  );
};

exports.default = DonutChart;


DonutChart.propTypes = {
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.number.isRequired,
    label: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    isEmpty: _propTypes2.default.boolean
  })).isRequired,
  className: _propTypes2.default.string,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  emptyColor: _propTypes2.default.string,
  stokeColor: _propTypes2.default.string,
  startAngle: _propTypes2.default.number,
  colorFunction: _propTypes2.default.func,
  innerRadius: _propTypes2.default.number,
  outerRadius: _propTypes2.default.number,
  selectedOffset: _propTypes2.default.number,
  emptyOffset: _propTypes2.default.number,
  toggledOffset: _propTypes2.default.number,
  formatValues: _propTypes2.default.func,
  onMouseEnter: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  legend: _propTypes2.default.bool,
  clickToggle: _propTypes2.default.bool
};

DonutChart.defaultProps = {
  data: [{
    label: '',
    value: 100,
    isEmpty: true
  }],
  className: 'donutchart',
  height: 500,
  width: 750,
  colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'],
  emptyColor: '#e0e0e0',
  strokeColor: '#212121',
  startAngle: 0,
  colorFunction: function colorFunction(colors, index) {
    return colors[index % colors.length];
  },
  innerRadius: 0.70,
  outerRadius: 0.90,
  selectedOffset: 0.03,
  emptyOffset: 0.08,
  toggledOffset: 0.04,
  formatValues: function formatValues(value, total) {
    return (0, _isNan2.default)(value / total) ? '--' : (value / total * 100).toFixed(2) + '%';
  },
  onMouseEnter: function onMouseEnter(item) {
    return item;
  },
  onClick: function onClick(item, toggled) {
    return toggled ? item : null;
  },
  legend: true,
  clickToggle: true
};