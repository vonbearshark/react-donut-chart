import React, { useContext } from 'react';
import { DonutChartContext, ItemWithRenderProps } from './DonutChart';

export type Props = { item: ItemWithRenderProps };

const LegendItem: React.FC<Props> = ({ item }) => {
  const { className, graphWidth, width } = useContext(DonutChartContext);
  const {
    classNames,
    clickHandlers,
    index,
    isEmpty,
    label,
    value,
    ...restItemRenderProps
  } = item;
  const classSuffix = 'legend-item';
  const legendWidth = width - graphWidth;
  const sqUnit = legendWidth / 10;
  const yOffset = 1.5;

  return (
    <g
      {...clickHandlers}
      className={`${className}-${classSuffix} ${classNames}`}
      transform={`translate(${width - legendWidth}, ${
        index * yOffset * sqUnit
      })`}
    >
      <rect {...restItemRenderProps} height={sqUnit} width={sqUnit} />
      <text
        className={`${className}-${classSuffix}-label ${classNames}`}
        dy=".35em"
        x={sqUnit + sqUnit / 2}
        y={sqUnit / 2}
      >
        {`${label} - ${value}`}
      </text>
    </g>
  );
};

export default LegendItem;
