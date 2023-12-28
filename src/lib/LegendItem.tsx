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
        <span
          style={{
            paddingLeft: "1em",
            height: "1em",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: restItemRenderProps.stroke,
            backgroundColor: restItemRenderProps.fill,
            marginRight: "0.8em",
            opacity: restItemRenderProps.opacity
          }}
        />
        {labelRenderer ? labelRenderer(label, item) : `${label} - ${value}`}
      </div>
    </div>
  );
};

export default LegendItem;
