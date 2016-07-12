/**
 * @fileOverview ArcPath component.
 * Rendered chart section dictated by each item.
 * @name ArcPath.jsx
 * @author JJ Naughton
 * @license MIT
 */
import React, { PropTypes, Component } from 'react';

/**
 * @extends {Component}
 */
export default class ArcPath extends Component {

    /**
     * Calculate coordinates of given arc.
     * @param {number} half - Half the total width of the chart.
     * @param {number} radius - Radius of the arc.
     * @param {number} startAngle - Starting angle for the arc.
     * @param {number} endAngle - Ending angle for the arc.
     */
    coordinates(half, radius, startAngle, endAngle) {
        const startAngleDegrees = Math.PI * startAngle / 180;
        const x1 = half + ((half * radius) * Math.cos(startAngleDegrees));
        const y1 = half + ((half * radius) * Math.sin(startAngleDegrees));
        const endAngleDegrees = Math.PI * endAngle / 180;
        const x2 = half + ((half * radius) * Math.cos(endAngleDegrees));
        const y2 = half + ((half * radius) * Math.sin(endAngleDegrees));

        return { x1, y1, x2, y2 };
    }

    /**
     * Creates an SVG arc object for an SVG path object.
     * @param {number} width - Total width of the chart.
     * @param {number} radius - Radius of the arc.
     * @param {string} largeArcFlag - Flag for angles over 180 degrees.
     * @param {number} x - X coordinate for arc.
     * @param {number} y - Y coordinate for arc.
     */
    arc(width, radius, largeArcFlag, x, y) {
        const z = width / 2 * radius;

        return `A${z}, ${z} 0 ${largeArcFlag} ${x}, ${y}`;
    }

    /**
     * Creates the SVG path object for an item.
     * @param {number} value - Value of incoming item.
     * @param {number} total - Culmulative value of all items
     * @param {number} startAngle - Degree at which the angle calculation should begin.
     * @param {number} width - Total width of the chart.
     * @param {number} innerRadius - Inner circle's radius.
     * @param {number} outerRadius - Outer circle's radius.
     */
    path(value, total, startAngle, width, innerRadius, outerRadius) {
        const activeAngle = value / total * 360;
        const endAngle = startAngle + activeAngle;

        const largeArcFlagOuter = activeAngle > 180 ? '1 1' : '0 1';
        const largeArcFlagInner = activeAngle > 180 ? '1 0' : '0 0';
        const half = width / 2;
        const outerCoords = this.coordinates(half, outerRadius, startAngle, endAngle);
        const innerCoords = this.coordinates(half, innerRadius, startAngle, endAngle);

        const outerArc = this.arc(width, outerRadius, largeArcFlagOuter,
                                  outerCoords.x2, outerCoords.y2);
        const innerArc = this.arc(width, innerRadius, largeArcFlagInner,
                                  innerCoords.x1, innerCoords.y1);

        return `M${outerCoords.x1},${outerCoords.y1}
        ${outerArc}
        L${innerCoords.x2},${innerCoords.y2}
        ${innerArc} z`;
    }

    /* React render function */
    render() {
        const { width, angle, total,
              fill, stroke, opacity, key,
              item, className, innerRadius,
              outerRadius, onClick,
              onMouseEnter } = this.props;
        const { value } = item;
        const d = this.path(value, total, angle, width, innerRadius, outerRadius);
        return <path
            key={ key }
            onClick={ () => { onClick(item); } }
            onMouseEnter={ () => { onMouseEnter(item); } }
            className={ className }
            d={ d }
            stroke={ stroke }
            fill={ fill }
            opacity={ opacity }>
        </path>;
    }
}

ArcPath.propTypes = {
    item: PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        isEmpty: PropTypes.boolean
    }).isRequired,
    total: PropTypes.number.isRequired,
    angle: PropTypes.number.isRequired,
    width: PropTypes.number,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    key: PropTypes.string,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    opacity: PropTypes.number,
    className: PropTypes.string
};

ArcPath.defaultProps = {
    item: {
        label: '',
        value: 100,
        isEmpty: true
    },
    total: 100,
    angle: 0,
    width: 500,
    innerRadius: 0.70,
    outerRadius: 0.90,
    onMouseEnter: (item) => item,
    onClick: (item) => item,
    key: 'arcpath0',
    fill: '#e0e0e0',
    stroke: '#e0e0e0',
    opacity: 1,
    className: 'donutchart-arcs-path'
};
