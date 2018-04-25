/**
 * @fileOverview Main Donut Chart entry point.
 * Orchestrates all rendering for the chart, passing props to
 * Arcs, DonutInnerText, and Legend children components.
 * @name DonutChart.js
 * @author JJ Naughton
 * @license MIT
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Arcs from './Arcs';
import DonutInnerText from './DonutInnerText';
import Legend from './Legend';


/**
 * Calculates the total of all the items' value,
 * using a reduce function over the items.
 * @param {} items - An array of items, each with values, at least.
 */
function calculateTotal(items) {
    return items.reduce((sum, currItem) => sum + currItem.value, 0);
}

/**
 * @extends {Component}
 */
export default class DonutChart extends Component {
    /**
    * Represents a DonutChart.
    * @constructor
    * @param {} props - Object of propTypes with defaultProps as fallback.
    */
    constructor(props) {
        super(props);

        const { data } = props;

        this.state = {
            selected: data[0],
            toggleSelect: false
        };
    }

    componentWillReceiveProps(newProps) {
        const { data } = newProps;

        // if new data, reset
        if (data && (JSON.stringify(data)
                    !== JSON.stringify(this.props.data))) {
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
    handleClick(item) {
        if (this.state.selected.label === item.label) {
            const toggle = this.props.clickToggle ? !this.state.toggleSelect : false;
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
    handleMouseEnter(item) {
        if (!this.state.toggleSelect) {
            this.setState({
                selected: item
            });
            this.props.onMouseEnter(item);
        }
    }

    /* React render function */
    render() {
        const {
            startAngle, width, height, formatValues, className, data, legend,
            emptyColor, strokeColor, colors, colorFunction, innerRadius,
            outerRadius, emptyOffset, selectedOffset, toggledOffset
        } = this.props;

        const arcsClassName = `${className}-arcs`;
        const innerTextClassName = `${className}-innertext`;
        const legendClassName = `${className}-legend`;

        const checkData = data.length ? data : [{
            label: '',
            value: 100,
            isEmpty: true
        }];

        const total = calculateTotal(checkData);
        const twoThirds = 2 / 3;
        const graphWidth = legend ? (width * twoThirds) : width;
        const legendWidth = width - graphWidth;

        return <svg className={ className }
            width={ width }
            height={ height }
            viewBox={`0 0 ${width} ${height}`}>
            <Arcs
                className={ arcsClassName }
                colors={ colors }
                data={ checkData }
                width={ graphWidth }
                emptyColor={ emptyColor }
                strokeColor={ strokeColor }
                colorFunction={ colorFunction }
                onMouseEnter={ this.handleMouseEnter.bind(this) }
                onClick={ this.handleClick.bind(this) }
                selected={ this.state.selected }
                startAngle = { startAngle }
                toggleSelect={ this.state.toggleSelect }
                innerRadius={ innerRadius }
                outerRadius={ outerRadius }
                selectedOffset={ selectedOffset }
                toggledOffset={ toggledOffset }
                emptyOffset={ emptyOffset }
                total={ total } />
            <DonutInnerText
                item={ this.state.selected }
                width={ graphWidth }
                formatValues={ formatValues }
                total={ total }
                className= { innerTextClassName } />
            { legend ?
                <Legend
                    data={ checkData }
                    totalWidth={ width }
                    width={ legendWidth }
                    colors={ colors }
                    emptyColor={ emptyColor }
                    strokeColor={ strokeColor }
                    colorFunction={ colorFunction }
                    onMouseEnter={ this.handleMouseEnter.bind(this) }
                    onClick={ this.handleClick.bind(this) }
                    selected={ this.state.selected }
                    toggleSelect={ this.state.toggleSelect}
                    className={ legendClassName } />
                : null }
        </svg>;
    }
}

DonutChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        isEmpty: PropTypes.boolean
    })).isRequired,
    className: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    emptyColor: PropTypes.string,
    stokeColor: PropTypes.string,
    startAngle: PropTypes.number,
    colorFunction: PropTypes.func,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    selectedOffset: PropTypes.number,
    emptyOffset: PropTypes.number,
    toggledOffset: PropTypes.number,
    formatValues: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onClick: PropTypes.func,
    legend: PropTypes.bool,
    clickToggle: PropTypes.bool
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
    colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7',
        '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
        '#009688', '#4caf50', '#8bc34a', '#cddc39',
        '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
        '#795548', '#607d8b'],
    emptyColor: '#e0e0e0',
    strokeColor: '#212121',
    startAngle: 0,
    colorFunction: (colors, index) => colors[(index % colors.length)],
    innerRadius: 0.70,
    outerRadius: 0.90,
    selectedOffset: 0.03,
    emptyOffset: 0.08,
    toggledOffset: 0.04,
    formatValues: (value, total) => (
        Number.isNaN(value / total) ? '--'
            : `${((value / total) * 100).toFixed(2)}%`
    ),
    onMouseEnter: item => item,
    onClick: (item, toggled) => (toggled ? item : null),
    legend: true,
    clickToggle: true
};
