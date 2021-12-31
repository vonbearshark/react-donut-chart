import React, { createContext, useEffect, useState } from 'react';
import ArcPath from './ArcPath';
import LegendItem from './LegendItem';

export type Item = {
  className?: string;
  isEmpty?: boolean;
  label: string;
  value: number;
};
export type ItemWithRenderProps = Item & {
  angle: number;
  classNames: string;
  clickHandlers: {
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  fill: string;
  index: number;
  opacity: number;
  stroke: string;
};
export type Colors = string[];
export type Props = {
  className?: string;
  clickToggle?: boolean;
  colorFunction?: (colors: Colors, index: number) => string;
  colors?: Colors;
  data: Item[];
  emptyColor?: string;
  emptyOffset?: number;
  formatValues?: (value: number, total: number) => string;
  height?: number;
  innerRadius?: number;
  legend?: boolean;
  onClick?: (item: Item, toggled: boolean) => void;
  onMouseEnter?: (item: Item) => void;
  onMouseLeave?: (item: Item) => void;
  outerRadius?: number;
  selectedOffset?: number;
  strokeColor?: string;
  toggledOffset?: number;
  width?: number;
};
export type Context = Pick<
  Required<Props>,
  | 'className'
  | 'emptyOffset'
  | 'innerRadius'
  | 'outerRadius'
  | 'selectedOffset'
  | 'toggledOffset'
  | 'width'
> & {
  graphWidth: number;
  selected: Item;
  toggleSelect: boolean;
  total: number;
};

export const DonutChartContext = createContext<Context>(undefined!);

const DonutChart: React.FC<Props> = ({
  className = 'donutchart',
  clickToggle = true,
  colorFunction = (colors, index) => colors[index % colors.length],
  colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ],
  data = [
    {
      className: '',
      label: '',
      value: 100,
      isEmpty: true,
    },
  ],
  emptyColor = '#e0e0e0',
  emptyOffset = 0.08,
  formatValues = (value, total) =>
    Number.isNaN(value / total)
      ? '--'
      : `${((value / total) * 100).toFixed(2)}%`,
  height = 500,
  innerRadius = 0.7,
  legend = true,
  onMouseEnter = (item) => item,
  onMouseLeave = (item) => item,
  onClick = (item, toggled) => (toggled ? item : null),
  outerRadius = 0.9,
  selectedOffset = 0.03,
  strokeColor = '#212121',
  toggledOffset = 0.04,
  width = 750,
}) => {
  const [selected, setSelected] = useState(data[0]);
  const [toggleSelect, setToggleSelect] = useState(false);

  useEffect(() => {
    setSelected(data[0]);
    setToggleSelect(false);
  }, [data]);

  const graphWidth = legend ? width * (2 / 3) : width;
  const total = data.reduce((sum, { value }) => sum + value, 0);
  const { dataWithRenderProps } = data.reduce(
    ({ angle, dataWithRenderProps }, item, index) => {
      const { className, isEmpty, label, value } = item;
      const isSelected = selected.label === label;
      const isToggled = isSelected && toggleSelect;

      return {
        angle: angle + (value / total) * 360,
        dataWithRenderProps: [
          ...dataWithRenderProps,
          {
            angle,
            index,
            ...item,
            classNames: `${className ?? ''} ${isEmpty ? 'empty' : ''} ${
              isSelected ? 'selected' : ''
            } ${isToggled ? 'toggled' : ''}`.trim(),
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
              },

              onMouseLeave: () => {
                if (!toggleSelect) {
                  onMouseLeave(item);
                }
              },
            },
          },
        ],
        total: total + value,
      };
    },
    { angle: 0, dataWithRenderProps: [] as ItemWithRenderProps[] }
  );

  return (
    <DonutChartContext.Provider
      value={{
        className,
        emptyOffset,
        graphWidth,
        innerRadius,
        outerRadius,
        selected,
        selectedOffset,
        toggledOffset,
        toggleSelect,
        total,
        width,
      }}
    >
      <svg
        className={className}
        style={{ height, width }}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g className={`${className}-arcs`}>
          {dataWithRenderProps.map((item) => (
            <ArcPath item={item} key={`arcpath${item.index}`} />
          ))}
        </g>
        <g className={`${className}-innertext`}>
          <text
            className={`${className}-innertext-label`}
            x={graphWidth / 2}
            y="45%"
            textAnchor="middle"
          >
            {selected.label}
          </text>
          <text
            className={`${className}-innertext-value`}
            x={graphWidth / 2}
            y="60%"
            textAnchor="middle"
          >
            {formatValues(selected.value, total)}
          </text>
        </g>
        {legend && (
          <g className={`${className}-legend`}>
            {dataWithRenderProps.map((item) => (
              <LegendItem key={`legenditem${item.index}`} item={item} />
            ))}
          </g>
        )}
      </svg>
    </DonutChartContext.Provider>
  );
};

export default DonutChart;
