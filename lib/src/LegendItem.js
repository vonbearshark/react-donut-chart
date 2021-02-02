/**
 * @fileOverview LegendItem component.
 * Rendered SVG box, label, and value for each item.
 * @name LegendItem.js
 * @author JJ Naughton
 * @license MIT
 */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DonutChartContext } from './DonutChart';

const LegendItem = ({ index, item }) => {
  const {
    className, graphWidth, itemProps, width
  } = useContext(DonutChartContext);
  const { label, value } = item;
  const classSuffix = 'legend-item';
  const { classNames, clickHandlers, ...restItemProps } = itemProps(item, index);
  const legendWidth = width - graphWidth;
  const sqUnit = legendWidth / 10;
  const yOffset = 1.5;
  const position = `translate(${width - legendWidth}, ${((index * yOffset) * sqUnit)})`;

  return (
    <g { ...clickHandlers } className={ `${className}-${classSuffix} ${classNames}` } transform={ position }>
      <rect {...restItemProps } height={ sqUnit } width={ sqUnit } />
      <text
        className={ `${className}-${classSuffix}-label ${classNames}` }
        dy=".35em"
        x={ sqUnit + (sqUnit / 2) }
        y= { sqUnit / 2 }>
        { `${label} - ${value}`}
      </text>
    </g>
  );
};

export default LegendItem;

LegendItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    isEmpty: PropTypes.boolean
  }).isRequired,
};

LegendItem.defaultProps = {
  index: 0,
  item: {
    label: '',
    value: 100,
    isEmpty: true
  },
};
