/**
 * @fileOverview LegendItem component.
 * Rendered SVG box, label, and value for each item.
 * @name LegendItem.jsx
 * @author JJ Naughton
 * @license MIT
 */
import React, { PropTypes, Component } from 'react';

/**
 * @extends {Component}
 */
export default class LegendItem extends Component {
    /* React render function */
    render() {
        const { className, item, index,
              onClick, onMouseEnter, fill,
              opacity, width, totalWidth,
              key, stroke } = this.props;
        const { label, value } = item;

        const legendRectClassName = `${className}-rect`;
        const legendLabelClassName = `${className}-label`;
        const sqUnit = width / 10;
        const yOffset = 1.5;

        const position = `translate(${totalWidth - width},
${((index * yOffset) * sqUnit)})`;
        return <g
            transform={ position }
            key= { key }
            className= { className }
            onClick={ () => { onClick(item); } }
            onMouseEnter={ () => { onMouseEnter(item); } }>
            <rect
                className={ legendRectClassName }
                width={ sqUnit }
                height={ sqUnit }
                fill={ fill }
                opacity={ opacity }
                stroke={ stroke }>
            </rect>
            <text
                className={ legendLabelClassName }
                x={ sqUnit + (sqUnit / 2) }
                y= { sqUnit / 2 }
                dy=".35em">
                { `${label} - ${value}`}
            </text>
        </g>;
    }
}

LegendItem.propTypes = {
    item: PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        isEmpty: PropTypes.boolean
    }).isRequired,
    width: PropTypes.number.isRequired,
    totalWidth: PropTypes.number.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    key: PropTypes.string,
    index: PropTypes.number,
    opacity: PropTypes.number,
    stroke: PropTypes.string,
    fill: PropTypes.string,
    className: PropTypes.string
};

LegendItem.defaultProps = {
    item: {
        label: '',
        value: 100,
        isEmpty: true
    },
    key: 'legenditem0',
    index: 0,
    opacity: 1,
    fill: '#e0e0e0',
    stroke: '#e0e0e0',
    className: 'donutchart-legend-item',
    width: 250,
    totalWidth: 750,
    onMouseEnter: (item) => item,
    onClick: (item) => item
};
