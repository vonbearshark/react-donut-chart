import React from 'react';
import { ILegendItemProps } from './Interfaces';

const LegendItem: React.FC<ILegendItemProps> = ({ 
  item,
  className,
  labelRenderer
}) => {
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

  return (
    <div
      {...clickHandlers}
      className={`${className}-${classSuffix} ${classNames}`}
    >      
      <div className={`${className}-${classSuffix}-label ${classNames}`}>
        <svg
          width="0.89em"
          height="0.89em"
          viewBox="0 0 100 100" 
          style={{ marginRight: "0.5em" }}
        ><rect {...restItemRenderProps} width={100} height={100} />
        </svg>
        {labelRenderer ? labelRenderer(label, item) : `${label} - ${value}`}
      </div>
    </div>
  );
};

export default LegendItem;
