
export type Item = {
    className?: string;
    isEmpty?: boolean;
    label: string;
    value: number;
};
export type ItemWithRenderProps = Item & {
    angle: number;
    classNames: string;
    clickHandlers?: {
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
export type LabelRenderer = (label: string, item: ItemWithRenderProps) => React.ReactElement | string;

export interface IChartProps {
    data: Item[];
    colors?: Colors;
    emptyColor?: string;
    className?: string;
    colorFunction?: (colors: Colors, index: number) => string;
    formatValues?: (value: number, total: number) => string;
    
    interactive?: boolean;
    clickToggle?: boolean;
    onClick?: (item: Item, toggled: boolean) => void;
    onMouseEnter?: (item: Item) => void;
    onMouseLeave?: (item: Item) => void;
    
    chartSize?: number;
    innerRadius?: number;
    outerRadius?: number;
    emptyOffset?: number;
    toggledOffset?: number;
    selectedOffset?: number;
    strokeColor?: 'item-color' | string;
    
    legend?: boolean;
    legendSide?: 'top' | 'bottom' | 'left' | 'right';
    labelRenderer?: LabelRenderer;
    verticalAlign?: 'top' | 'middle' | 'bottom';
    horizontalAlign?: 'left' | 'center' | 'right';
    wrapToTop?: boolean;
};

export interface IArcPathProps extends Pick<
    Required<IChartProps>,
    | 'className'
    | 'emptyOffset'
    | 'innerRadius'
    | 'outerRadius'
    | 'selectedOffset'
    | 'toggledOffset'
    | 'chartSize'
  > {
    item: ItemWithRenderProps;
    selected: Item | null;
    toggleSelect: boolean;
    total: number;
};



export interface ILegendItemProps {
    item: ItemWithRenderProps;
    className: string;
    labelRenderer?: LabelRenderer;
};