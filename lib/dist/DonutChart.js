'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _Arcs = require('./Arcs.js');

var _Arcs2 = _interopRequireDefault(_Arcs);

var _DonutInnerText = require('./DonutInnerText.js');

var _DonutInnerText2 = _interopRequireDefault(_DonutInnerText);

var _Legend = require('./Legend.js');

var _Legend2 = _interopRequireDefault(_Legend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
/**
 * @fileOverview Main Donut Chart entry point.
 * Orchestrates all rendering for the chart, passing props to
 * Arcs, DonutInnerText, and Legend children components.
 * @name DonutChart.jsx
 * @author JJ Naughton
 * @license MIT
 */
var DonutChart = function (_Component) {
    (0, _inherits3.default)(DonutChart, _Component);

    /**
    * Represents a DonutChart.
    * @constructor
    * @param {} props - Object of propTypes with defaultProps as fallback.
    */
    function DonutChart(props) {
        (0, _classCallCheck3.default)(this, DonutChart);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DonutChart).call(this, props));

        var data = props.data;


        _this.state = {
            selected: data[0],
            toggleSelect: false
        };
        return _this;
    }

    (0, _createClass3.default)(DonutChart, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var data = newProps.data;

            // if new data, reset

            if (data && (0, _stringify2.default)(data) !== (0, _stringify2.default)(this.props.data)) {
                this.setState({
                    selected: data[0],
                    toggleSelect: false
                });
            }
        }

        /**
         * Handles the clicking of an ArcPath region.
         * Toggles the selected state,
         * effectively freezing all handlers on other, unselected items.
         * Calls the onClick handler,
         * passed by the user as a prop,
         * providing the item clicked,
         * as well as whether it's becoming selected or unselected.
         * @param {} item - The item object selected, with a label and a value, at least.
         */

    }, {
        key: 'handleClick',
        value: function handleClick(item) {
            if (this.state.selected.label === item.label) {
                var toggle = !this.state.toggleSelect;
                this.setState({
                    toggleSelect: toggle,
                    selected: item
                });
                this.props.onClick(item, toggle);
            }
        }

        /**
         * Handles the mouseenter event over an ArcPath region.
         * Sets the clicked item as selected in the state object.
         * @param {} item - The item object selected, with a label and a value, at least.
         */

    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter(item) {
            if (!this.state.toggleSelect) {
                this.setState({
                    selected: item
                });
                this.props.onMouseEnter(item);
            }
        }

        /**
         * Calculates the total of all the items' value,
         * using a reduce function over the items.
         * @param {} items - An array of items, each with values, at least.
         */

    }, {
        key: 'calculateTotal',
        value: function calculateTotal(items) {
            return items.reduce(function (sum, currItem) {
                return sum + currItem.value;
            }, 0);
        }

        /* React render function */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var width = _props.width;
            var height = _props.height;
            var formatValues = _props.formatValues;
            var className = _props.className;
            var data = _props.data;
            var legend = _props.legend;
            var emptyColor = _props.emptyColor;
            var strokeColor = _props.strokeColor;
            var colors = _props.colors;
            var colorFunction = _props.colorFunction;
            var innerRadius = _props.innerRadius;
            var outerRadius = _props.outerRadius;
            var emptyOffset = _props.emptyOffset;
            var selectedOffset = _props.selectedOffset;
            var toggledOffset = _props.toggledOffset;


            var arcsClassName = className + '-arcs';
            var innerTextClassName = className + '-innertext';
            var legendClassName = className + '-legend';

            var checkData = data.length ? data : [{
                label: '',
                value: 100,
                isEmpty: true
            }];

            var total = this.calculateTotal(checkData);
            var twoThirds = 2 / 3;
            var graphWidth = legend ? width * twoThirds : width;
            var legendWidth = width - graphWidth;

            return _react2.default.createElement(
                'svg',
                { className: className,
                    width: width,
                    height: height,
                    viewBox: '0 0 ' + width + ' ' + height },
                _react2.default.createElement(_Arcs2.default, {
                    className: arcsClassName,
                    data: checkData,
                    width: graphWidth,
                    emptyColor: emptyColor,
                    strokeColor: strokeColor,
                    colorFunction: colorFunction,
                    onMouseEnter: this.handleMouseEnter.bind(this),
                    onClick: this.handleClick.bind(this),
                    selected: this.state.selected,
                    toggleSelect: this.state.toggleSelect,
                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    selectedOffset: selectedOffset,
                    toggledOffset: toggledOffset,
                    emptyOffset: emptyOffset,
                    total: total }),
                _react2.default.createElement(_DonutInnerText2.default, {
                    item: this.state.selected,
                    width: graphWidth,
                    formatValues: formatValues,
                    total: total,
                    className: innerTextClassName }),
                legend ? _react2.default.createElement(_Legend2.default, {
                    data: checkData,
                    totalWidth: width,
                    width: legendWidth,
                    colors: colors,
                    emptyColor: emptyColor,
                    strokeColor: strokeColor,
                    colorFunction: colorFunction,
                    onMouseEnter: this.handleMouseEnter.bind(this),
                    onClick: this.handleClick.bind(this),
                    selected: this.state.selected,
                    toggleSelect: this.state.toggleSelect,
                    className: legendClassName }) : null
            );
        }
    }]);
    return DonutChart;
}(_react.Component);

exports.default = DonutChart;


DonutChart.propTypes = {
    data: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        value: _react.PropTypes.number.isRequired,
        label: _react.PropTypes.string.isRequired,
        className: _react.PropTypes.string,
        isEmpty: _react.PropTypes.boolean
    })).isRequired,
    className: _react.PropTypes.string,
    height: _react.PropTypes.number,
    width: _react.PropTypes.number,
    colors: _react.PropTypes.arrayOf(_react.PropTypes.string),
    emptyColor: _react.PropTypes.string,
    stokeColor: _react.PropTypes.string,
    colorFunction: _react.PropTypes.func,
    innerRadius: _react.PropTypes.number,
    outerRadius: _react.PropTypes.number,
    selectedOffset: _react.PropTypes.number,
    emptyOffset: _react.PropTypes.number,
    toggledOffset: _react.PropTypes.number,
    formatValues: _react.PropTypes.func,
    onMouseEnter: _react.PropTypes.func,
    onClick: _react.PropTypes.func,
    legend: _react.PropTypes.bool
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
    onClick: function onClick(item, selected) {
        return selected ? item : null;
    },
    legend: true
};