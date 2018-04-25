/**
 * @fileOverview The text component in the Donut Chart inner circle.
 * Shows the selected item's label and value
 * @name DonutInnerText.js
 * @author JJ Naughton
 * @license MIT
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @extends {Component}
 */
export default class DonutInnerText extends Component {
    /* React render function */
    render() {
        const {
            item, className, width, formatValues, total
        } = this.props;
        const { label } = item;
        const { value } = item;
        const half = width / 2;
        const labelClassName = `${className}-label`;
        const valueClassName = `${className}-value`;

        return <g className={ className }>
            <text
                className={ labelClassName }
                x={ half }
                y="45%"
                textAnchor="middle">
                { label }
            </text>
            <text
                className={ valueClassName }
                x={ half }
                y="60%"
                textAnchor="middle">
                { formatValues(value, total) }
            </text>
        </g>;
    }
}

DonutInnerText.propTypes = {
    item: PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        isEmpty: PropTypes.boolean
    }).isRequired,
    className: PropTypes.string,
    total: PropTypes.number,
    width: PropTypes.number,
    formatValues: PropTypes.func
};

DonutInnerText.defaultProps = {
    item: {
        label: '',
        value: 100,
        isEmpty: true
    },
    total: 100,
    className: 'donutchart-innertext',
    width: 500,
    formatValues: value => value
};
