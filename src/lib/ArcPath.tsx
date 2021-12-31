import React, { useContext } from 'react';
import { DonutChartContext, ItemWithRenderProps } from './DonutChart';

export type Props = { item: ItemWithRenderProps };

function coordinates(
  half: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const startAngleDegrees = (Math.PI * startAngle) / 180;
  const endAngleDegrees = (Math.PI * endAngle) / 180;

  return {
    x1: half + half * radius * Math.cos(startAngleDegrees),
    y1: half + half * radius * Math.sin(startAngleDegrees),
    x2: half + half * radius * Math.cos(endAngleDegrees),
    y2: half + half * radius * Math.sin(endAngleDegrees),
  };
}

function arc(
  width: number,
  radius: number,
  largeArcFlag: string,
  x: number,
  y: number
) {
  const z = (width / 2) * radius;

  return `A${z}, ${z} 0 ${largeArcFlag} ${x}, ${y}`;
}

function path(
  activeAngle: number,
  startAngle: number,
  width: number,
  innerRadius: number,
  outerRadius: number
) {
  const endAngle = startAngle + activeAngle;

  const largeArcFlagOuter = activeAngle > 180 ? '1 1' : '0 1';
  const largeArcFlagInner = activeAngle > 180 ? '1 0' : '0 0';
  const half = width / 2;
  const outerCoords = coordinates(half, outerRadius, startAngle, endAngle);
  const innerCoords = coordinates(half, innerRadius, startAngle, endAngle);

  const outerArc = arc(
    width,
    outerRadius,
    largeArcFlagOuter,
    outerCoords.x2,
    outerCoords.y2
  );
  const innerArc = arc(
    width,
    innerRadius,
    largeArcFlagInner,
    innerCoords.x1,
    innerCoords.y1
  );

  return `M${outerCoords.x1},${outerCoords.y1}
  ${outerArc}
  L${innerCoords.x2},${innerCoords.y2}
  ${innerArc} z`;
}

const ArcPath: React.FC<Props> = ({ item }) => {
  const {
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
  } = useContext(DonutChartContext);
  const {
    angle,
    classNames,
    clickHandlers,
    index,
    isEmpty,
    label,
    value,
    ...restItemRenderrops
  } = item;
  const activeAngle =
    Number.isNaN(value / total) || total / value === 1
      ? 359.99
      : (value / total) * 360;
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
        ...restItemRenderrops,
      }}
      className={`${className}-arcs-path ${classNames}`}
      d={path(activeAngle, angle, graphWidth, inner, outer)}
    ></path>
  );
};

export default ArcPath;
