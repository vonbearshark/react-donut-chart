/**
 * @fileOverview Aggregation of ArcPath components.
 * Orchestrates the rendering of the chart sections,
 * based on each item's value.
 * @name Arcs.js
 * @author JJ Naughton
 * @license MIT
 */
import React, { useContext } from 'react';

import { DonutChartContext } from './DonutChart';
import ArcPath from './ArcPath';

const Arcs = () => {
  const {
    className, data, startAngle, total
  } = useContext(DonutChartContext);

  let angle = startAngle;

  return (
    <g className={ `${className}-arcs` }>
      {data.map((item, index) => {
        const arcPath = <ArcPath
          item={ item }
          index={ index }
          key={ `arcpath${index}` }
          angle={ angle }
        />;

        angle += (item.value / total) * 360;

        return arcPath;
      })}
    </g>
  );
};

export default Arcs;
