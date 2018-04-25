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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Arcs = require('./Arcs');

var _Arcs2 = _interopRequireDefault(_Arcs);

var _DonutInnerText = require('./DonutInnerText');

var _DonutInnerText2 = _interopRequireDefault(_DonutInnerText);

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculates the total of all the items' value,
 * using a reduce function over the items.
 * @param {} items - An array of items, each with values, at least.
 */
function calculateTotal(items) {
    return items.reduce(function (sum, currItem) {
        return sum + currItem.value;
    }, 0);
}

/**
 * @extends {Component}
 */
/**
 * @fileOverview Main Donut Chart entry point.
 * Orchestrates all rendering for the chart, passing props to
 * Arcs, DonutInnerText, and Legend children components.
 * @name DonutChart.js
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

        var _this = (0, _possibleConstructorReturn3.default)(this, (DonutChart.__proto__ || (0, _getPrototypeOf2.default)(DonutChart)).call(this, props));

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
                var toggle = this.props.clickToggle ? !this.state.toggleSelect : false;
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

        /* React render function */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                startAngle = _props.startAngle,
                width = _props.width,
                height = _props.height,
                formatValues = _props.formatValues,
                className = _props.className,
                data = _props.data,
                legend = _props.legend,
                emptyColor = _props.emptyColor,
                strokeColor = _props.strokeColor,
                colors = _props.colors,
                colorFunction = _props.colorFunction,
                innerRadius = _props.innerRadius,
                outerRadius = _props.outerRadius,
                emptyOffset = _props.emptyOffset,
                selectedOffset = _props.selectedOffset,
                toggledOffset = _props.toggledOffset;


            var arcsClassName = className + '-arcs';
            var innerTextClassName = className + '-innertext';
            var legendClassName = className + '-legend';

            var checkData = data.length ? data : [{
                label: '',
                value: 100,
                isEmpty: true
            }];

            var total = calculateTotal(checkData);
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
                    colors: colors,
                    data: checkData,
                    width: graphWidth,
                    emptyColor: emptyColor,
                    strokeColor: strokeColor,
                    colorFunction: colorFunction,
                    onMouseEnter: this.handleMouseEnter.bind(this),
                    onClick: this.handleClick.bind(this),
                    selected: this.state.selected,
                    startAngle: startAngle,
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