/**
 * @fileOverview Main Donut Chart entry point.
 * Orchestrates all rendering for the chart, passing props to
 * Arcs, DonutInnerText, and Legend children components.
 * @name DonutChart.js
 * @author JJ Naughton
 * @license MIT
 */
import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Arcs from './Arcs';
import LegendItem from './LegendItem';

export const DonutChartContext = createContext();

const DonutChart = ({
  className, clickToggle, colors, colorFunction, data, formatValues, height, legend,
  onClick, onMouseEnter, width, emptyColor, strokeColor, ...restProps
}) => {
  const [selected, setSelected] = useState(data[0]);
  const [toggleSelect, setToggleSelect] = useState(false);

  useEffect(() => {
    setSelected(data[0]);
    setToggleSelect(false);
  }, [data]);

  const total = data.reduce((sum, currItem) => sum + currItem.value, 0);
  const graphWidth = legend ? (width * (2 / 3)) : width;

  const itemProps = (item, index) => {
    const { isEmpty, label } = item;
    const isSelected = selected.label === label;
    const isToggled = isSelected && toggleSelect;

    return {
      classNames: `${item.className ? item.className : ''} ${isEmpty ? 'empty' : ''} ${isSelected ? 'selected' : ''} ${isToggled ? 'toggled' : ''}`.trim(),
      fill: isEmpty ? emptyColor : colorFunction(colors, index),
      opacity: isSelected && !toggleSelect ? 0.5 : 1,
      stroke: isEmpty ? emptyColor : strokeColor,
      clickHandlers: {
        onClick: () => {
          if (selected.label === label) {
            const toggle = clickToggle ? !toggleSelect : false;
            setSelected(item);
            setToggleSelect(toggle);
            onClick(item, toggle);
          }
        },
        onMouseEnter: () => {
          if (!toggleSelect) {
            setSelected(item);
            onMouseEnter(item);
          }
        }
      }
    };
  };

  return (
    <DonutChartContext.Provider value={{
      ...restProps,
      className,
      data,
      graphWidth,
      itemProps,
      selected,
      toggleSelect,
      total,
      width
    }}>
      <svg className={ className } style={{ height, width }} viewBox={`0 0 ${width} ${height}`}>
        <Arcs />
        <g className={ `${className}-innertext` }>
          <text
            className={ `${className}-innertext-label` }
            x={ graphWidth / 2 }
            y="45%"
            textAnchor="middle">
            { selected.label }
          </text>
          <text
            className={ `${className}-innertext-value` }
            x={ graphWidth / 2 }
            y="60%"
            textAnchor="middle">
            { formatValues(selected.value, total) }
          </text>
        </g>
        {legend && (
          <g className={ `${className}-legend` }>
            {data.map((item, index) => (
              <LegendItem key={`legenditem${index}`} index={index} item={item} />
            ))}
          </g>
        )}
      </svg>
    </DonutChartContext.Provider>
  );
};

export default DonutChart;

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
  colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
    '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b',
    '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'],
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
