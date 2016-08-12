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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _LegendItem = require('./LegendItem.js');

var _LegendItem2 = _interopRequireDefault(_LegendItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
var Legend = function (_Component) {
    (0, _inherits3.default)(Legend, _Component);

    function Legend() {
        (0, _classCallCheck3.default)(this, Legend);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Legend).apply(this, arguments));
    }

    (0, _createClass3.default)(Legend, [{
        key: 'render',

        /* React render function */
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var data = _props.data;
            var strokeColor = _props.strokeColor;
            var emptyColor = _props.emptyColor;
            var colorFunction = _props.colorFunction;
            var colors = _props.colors;
            var width = _props.width;
            var totalWidth = _props.totalWidth;
            var onClick = _props.onClick;
            var onMouseEnter = _props.onMouseEnter;
            var toggleSelect = _props.toggleSelect;
            var selected = _props.selected;


            var legendItemClassName = className + '-item';
            return _react2.default.createElement(
                'g',
                {
                    className: className },
                data.map(function (item, index) {
                    var classes = {};
                    var isEmpty = item.isEmpty;
                    var className = item.className;

                    var stroke = strokeColor;
                    var opacity = 1;

                    if (isEmpty) {
                        classes.empty = true;
                        stroke = emptyColor;
                    } else if (selected.label === item.label) {
                        if (toggleSelect) {
                            classes.toggled = true;
                            opacity = 1;
                        } else {
                            classes.selected = true;
                            opacity = 0.5;
                        }
                    }

                    if (className) {
                        classes[className] = true;
                    }

                    classes[legendItemClassName] = true;

                    var fill = isEmpty ? emptyColor : colorFunction(colors, index);

                    return _react2.default.createElement(_LegendItem2.default, {
                        key: 'legenditem' + index,
                        index: index,
                        item: item,
                        className: (0, _classnames2.default)(classes),
                        width: width,
                        totalWidth: totalWidth,
                        opacity: opacity,
                        fill: fill,
                        stroke: stroke,
                        onClick: onClick,
                        onMouseEnter: onMouseEnter
                    });
                })
            );
        }
    }]);
    return Legend;
}(_react.Component); /**
                      * @fileOverview Legend component.
                      * Orchestrates all rendering each LegendItem component,
                      * based on each item.
                      * @name Legend.jsx
                      * @author JJ Naughton
                      * @license MIT
                      */


exports.default = Legend;


Legend.propTypes = {
    data: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        value: _react.PropTypes.number.isrequired,
        label: _react.PropTypes.string.isrequired,
        className: _react.PropTypes.string,
        isEmpty: _react.PropTypes.boolean
    })).isRequired,
    selected: _react.PropTypes.shape({
        value: _react.PropTypes.number.isRequired,
        label: _react.PropTypes.string.isRequired,
        className: _react.PropTypes.string,
        isEmpty: _react.PropTypes.boolean
    }).isRequired,
    toggleSelect: _react.PropTypes.bool.isRequired,
    colorFunction: _react.PropTypes.func.isRequired,
    onMouseEnter: _react.PropTypes.func.isRequired,
    onClick: _react.PropTypes.func.isRequired,
    width: _react.PropTypes.number.isRequired,
    totalWidth: _react.PropTypes.number.isRequired,
    className: _react.PropTypes.string,
    colors: _react.PropTypes.arrayOf(_react.PropTypes.string),
    emptyColor: _react.PropTypes.string,
    strokeColor: _react.PropTypes.string
};

Legend.defaultProps = {
    data: [{
        label: '',
        value: 100,
        isEmpty: true
    }],
    selected: {
        value: 100,
        label: '',
        isEmpty: true
    },
    toggleSelect: false,
    className: 'donutchart-legend',
    width: 250,
    totalWidth: 750,
    colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'],
    emptyColor: '#e0e0e0',
    strokeColor: '#212121',
    colorFunction: function colorFunction(colors, index) {
        return colors[index % colors.length];
    },
    onMouseEnter: function onMouseEnter(item) {
        return item;
    },
    onClick: function onClick(item) {
        return item;
    }
};