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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ArcPath = require('./ArcPath');

var _ArcPath2 = _interopRequireDefault(_ArcPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @extends {Component}
 */
/**
 * @fileOverview Aggregation of ArcPath components.
 * Orchestrates the rendering of the chart sections,
 * based on each item's value.
 * @name Arcs.js
 * @author JJ Naughton
 * @license MIT
 */
var Arcs = function (_Component) {
    (0, _inherits3.default)(Arcs, _Component);

    function Arcs() {
        (0, _classCallCheck3.default)(this, Arcs);
        return (0, _possibleConstructorReturn3.default)(this, (Arcs.__proto__ || (0, _getPrototypeOf2.default)(Arcs)).apply(this, arguments));
    }

    (0, _createClass3.default)(Arcs, [{
        key: 'render',

        /* React render function */
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                startAngle = _props.startAngle,
                className = _props.className,
                data = _props.data,
                selectedOffset = _props.selectedOffset,
                toggledOffset = _props.toggledOffset,
                emptyOffset = _props.emptyOffset,
                colors = _props.colors,
                emptyColor = _props.emptyColor,
                strokeColor = _props.strokeColor,
                colorFunction = _props.colorFunction,
                onMouseEnter = _props.onMouseEnter,
                onClick = _props.onClick,
                total = _props.total,
                width = _props.width,
                selected = _props.selected,
                toggleSelect = _props.toggleSelect;

            var arcPathClassName = className + '-path';
            var angle = startAngle;

            return _react2.default.createElement(
                'g',
                {
                    className: className },
                data.map(function (item, index) {
                    var classes = {};
                    var value = item.value,
                        isEmpty = item.isEmpty,
                        className = item.className;
                    var _props2 = _this2.props,
                        innerRadius = _props2.innerRadius,
                        outerRadius = _props2.outerRadius;

                    var stroke = strokeColor;
                    var opacity = 1;

                    if (isEmpty) {
                        classes.empty = true;
                        innerRadius += emptyOffset;
                        outerRadius -= emptyOffset;
                        stroke = emptyColor;
                    } else if (selected.label === item.label) {
                        if (toggleSelect) {
                            classes.toggled = true;
                            innerRadius -= toggledOffset;
                            outerRadius += toggledOffset;
                            opacity = 1;
                        } else {
                            classes.selected = true;
                            outerRadius += selectedOffset;
                            opacity = 0.5;
                        }
                    }

                    if (className) {
                        classes[className] = true;
                    }
                    classes[arcPathClassName] = true;

                    var fill = isEmpty ? emptyColor : colorFunction(colors, index);

                    var arcPath = _react2.default.createElement(_ArcPath2.default, {
                        width: width,
                        item: item,
                        key: 'arcpath' + index,
                        innerRadius: innerRadius, outerRadius: outerRadius,
                        className: (0, _classnames2.default)(classes),
                        opacity: opacity,
                        fill: fill,
                        stroke: stroke,
                        angle: angle,
                        total: total,
                        onMouseEnter: onMouseEnter,
                        onClick: onClick
                    });

                    angle += value / total * 360;

                    return arcPath;
                })
            );
        }
    }]);
    return Arcs;
}(_react.Component);

exports.default = Arcs;


Arcs.propTypes = {
    data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        value: _propTypes2.default.number.isRequired,
        label: _propTypes2.default.string.isRequired,
        className: _propTypes2.default.string,
        isEmpty: _propTypes2.default.boolean
    })).isRequired,
    selected: _propTypes2.default.shape({
        value: _propTypes2.default.number.isRequired,
        label: _propTypes2.default.string.isRequired,
        className: _propTypes2.default.string,
        isEmpty: _propTypes2.default.boolean
    }).isRequired,
    toggleSelect: _propTypes2.default.bool.isRequired,
    total: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    innerRadius: _propTypes2.default.number.isRequired,
    outerRadius: _propTypes2.default.number.isRequired,
    selectedOffset: _propTypes2.default.number.isRequired,
    emptyOffset: _propTypes2.default.number.isRequired,
    toggledOffset: _propTypes2.default.number.isRequired,
    onMouseEnter: _propTypes2.default.func.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    className: _propTypes2.default.string,
    colors: _propTypes2.default.arrayOf(_propTypes2.default.string),
    emptyColor: _propTypes2.default.string,
    stokeColor: _propTypes2.default.string,
    startAngle: _propTypes2.default.number,
    colorFunction: _propTypes2.default.func
};

Arcs.defaultProps = {
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
    total: 100,
    className: 'donutchart-arcs',
    width: 500,
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
    onMouseEnter: function onMouseEnter(item) {
        return item;
    },
    onClick: function onClick(item) {
        return item;
    }
};