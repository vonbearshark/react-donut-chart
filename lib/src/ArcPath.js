/**
 * @fileOverview ArcPath component.
 * Rendered chart section dictated by each item.
 * @name ArcPath.js
 * @author JJ Naughton
 * @license MIT
 */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DonutChartContext } from './DonutChart';

/**
 * Calculate coordinates of given arc.
 * @param {number} half - Half the total width of the chart.
 * @param {number} radius - Radius of the arc.
 * @param {number} startAngle - Starting angle for the arc.
 * @param {number} endAngle - Ending angle for the arc.
 */
function coordinates(half, radius, startAngle, endAngle) {
  const startAngleDegrees = (Math.PI * startAngle) / 180;
  const endAngleDegrees = (Math.PI * endAngle) / 180;

  return {
    x1: half + ((half * radius) * Math.cos(startAngleDegrees)),
    y1: half + ((half * radius) * Math.sin(startAngleDegrees)),
    x2: half + ((half * radius) * Math.cos(endAngleDegrees)),
    y2: half + ((half * radius) * Math.sin(endAngleDegrees))
  };
}

/**
 * Creates an SVG arc object for an SVG path object.
 * @param {number} width - Total width of the chart.
 * @param {number} radius - Radius of the arc.
 * @param {string} largeArcFlag - Flag for angles over 180 degrees.
 * @param {number} x - X coordinate for arc.
 * @param {number} y - Y coordinate for arc.
 */
function arc(width, radius, largeArcFlag, x, y) {
  const z = (width / 2) * radius;

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
function path(activeAngle, startAngle, width, innerRadius, outerRadius) {
  const endAngle = startAngle + activeAngle;

  const largeArcFlagOuter = activeAngle > 180 ? '1 1' : '0 1';
  const largeArcFlagInner = activeAngle > 180 ? '1 0' : '0 0';
  const half = width / 2;
  const outerCoords = coordinates(half, outerRadius, startAngle, endAngle);
  const innerCoords = coordinates(half, innerRadius, startAngle, endAngle);

  const outerArc = arc(
    width, outerRadius, largeArcFlagOuter,
    outerCoords.x2, outerCoords.y2
  );
  const innerArc = arc(
    width, innerRadius, largeArcFlagInner,
    innerCoords.x1, innerCoords.y1
  );

  return `M${outerCoords.x1},${outerCoords.y1}
  ${outerArc}
  L${innerCoords.x2},${innerCoords.y2}
  ${innerArc} z`;
}

const ArcPath = ({ index, item, angle }) => {
  const {
    className, emptyOffset, graphWidth, itemProps, innerRadius,
    outerRadius, selected, selectedOffset, toggledOffset, toggleSelect, total
  } = useContext(DonutChartContext);
  const { isEmpty, label, value } = item;
  const { classNames, clickHandlers, ...restItemProps } = itemProps(item, index);
  const activeAngle = (Number.isNaN(value / total) || ((total / value) === 1)) ?
    359.99 : (value / total) * 360;
  let [inner, outer] = [innerRadius, outerRadius];

  if (isEmpty) {
    inner += emptyOffset;
    outer -= emptyOffset;
  } else if (selected.label === label) {
    if (toggleSelect) {
      inner -= toggledOffset;
      outer += toggledOffset;
    } else {
      outer += selectedOffset;
    }
  }

  return (
    <path
      {...{
        ...clickHandlers,
        ...restItemProps
      }}
      className={ `${className}-arcs-path ${classNames}` }
      d={ path(activeAngle, angle, graphWidth, inner, outer) }>
    </path>
  );
};

export default ArcPath;

ArcPath.propTypes = {
  angle: PropTypes.number.isRequired,
  index: PropTypes.number,
  item: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    isEmpty: PropTypes.boolean
  }).isRequired
};

ArcPath.defaultProps = {
  angle: 0,
  index: 0,
  item: {
    label: '',
    value: 100,
    isEmpty: true
  }
};
