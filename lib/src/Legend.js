/**
 * @fileOverview Legend component.
 * Orchestrates all rendering each LegendItem component,
 * based on each item.
 * @name Legend.js
 * @author JJ Naughton
 * @license MIT
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import LegendItem from './LegendItem';

/**
 * @extends {Component}
 */
export default class Legend extends Component {
    /* React render function */
    render() {
        const {
            className, data, strokeColor, emptyColor, colorFunction, colors,
            width, totalWidth, onClick, onMouseEnter, toggleSelect, selected
        } = this.props;

        const legendItemClassName = `${className}-item`;
        return <g
            className={ className }>
            { data.map((item, index) => {
                const classes = {};
                const { isEmpty, className } = item;
                let stroke = strokeColor;
                let opacity = 1;

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

                const fill = isEmpty ? emptyColor : colorFunction(colors, index);

                return <LegendItem
                    key={ `legenditem${index}` }
                    index={ index }
                    item={ item }
                    className={ classnames(classes) }
                    width={ width }
                    totalWidth={ totalWidth }
                    opacity={ opacity }
                    fill= { fill }
                    stroke={ stroke }
                    onClick={ onClick }
                    onMouseEnter={ onMouseEnter }
                />;
            }) }
        </g>;
    }
}

Legend.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isrequired,
        label: PropTypes.string.isrequired,
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
    colorFunction: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    totalWidth: PropTypes.number.isRequired,
    className: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    emptyColor: PropTypes.string,
    strokeColor: PropTypes.string
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
    colors: ['#f44336', '#e91e63', '#9c27b0',
        '#673ab7', '#3f51b5', '#2196f3',
        '#03a9f4', '#00bcd4', '#009688',
        '#4caf50', '#8bc34a', '#cddc39',
        '#ffeb3b', '#ffc107', '#ff9800',
        '#ff5722', '#795548', '#607d8b'],
    emptyColor: '#e0e0e0',
    strokeColor: '#212121',
    colorFunction: (colors, index) => colors[(index % colors.length)],
    onMouseEnter: item => item,
    onClick: item => item
};
