/**
 * @fileOverview Aggregation of ArcPath components.
 * Orchestrates the rendering of the chart sections,
 * based on each item's value.
 * @name Arcs.js
 * @author JJ Naughton
 * @license MIT
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ArcPath from './ArcPath';

/**
 * @extends {Component}
 */
export default class Arcs extends Component {
    /* React render function */
    render() {
        const {
            startAngle, className, data, selectedOffset, toggledOffset,
            emptyOffset, colors, emptyColor, strokeColor, colorFunction,
            onMouseEnter, onClick, total, width,
            selected, toggleSelect
        } = this.props;
        const arcPathClassName = `${className}-path`;
        let angle = startAngle;

        return <g
            className={ className }>
            { data.map((item, index) => {
                const classes = {};
                const { value, isEmpty, className } = item;

                let { innerRadius, outerRadius } = this.props;
                let stroke = strokeColor;
                let opacity = 1;

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

                const fill = isEmpty ? emptyColor : colorFunction(colors, index);

                const arcPath = <ArcPath
                    width={ width }
                    item={ item }
                    key={ `arcpath${index}` }
                    innerRadius={ innerRadius } outerRadius={ outerRadius }
                    className={ classnames(classes) }
                    opacity={ opacity }
                    fill={ fill }
                    stroke={ stroke }
                    angle={ angle }
                    total={ total }
                    onMouseEnter={ onMouseEnter }
                    onClick={ onClick }
                />;

                angle += (value / total) * 360;

                return arcPath;
            }) }
        </g>;
    }
}

Arcs.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        isEmpty: PropTypes.boolean
    })).isRequired,
    selected: PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        isEmpty: PropTypes.boolean
    }).isRequired,
    toggleSelect: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    selectedOffset: PropTypes.number.isRequired,
    emptyOffset: PropTypes.number.isRequired,
    toggledOffset: PropTypes.number.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    emptyColor: PropTypes.string,
    stokeColor: PropTypes.string,
    startAngle: PropTypes.number,
    colorFunction: PropTypes.func
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
    onMouseEnter: item => item,
    onClick: item => item
};
