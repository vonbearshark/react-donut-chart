# react-donut-chart

---

An extendable SVG-based donut chart React component.

![Example](https://github.com/vonbearshark/react-donut-chart/raw/master/example.gif)

---

## Installation

`npm install react-donut-chart --save`

---

## Usage

```js
import DonutChart from 'react-donut-chart';
//things I would never do:
<DonutChart
    data={[{
        label: 'Give you up',
        value: 25
    },
    {
        label: '',
        value: 75,
        isEmpty: true
    }]} />
```

View the demo [online](http://vonbearshark.github.io/react-donut-chart), or run it locally:

`npm run build`
`npm run start`

then visit [localhost:3000](http://localhost:3000).

---

## Props

Name | Type | isRequired | Default | Description
--- | --- | --- | --- | ---
data | <code>arrayOf(shape({<br>&nbsp;&nbsp;value: number.isRequired,<br>&nbsp;&nbsp;label: string,<br>&nbsp;&nbsp;className: string,<br>&nbsp;&nbsp;isEmpty: boolean<br>}))</code> | true | <code>[{<br>&nbsp;&nbsp;value: 100,<br>&nbsp;&nbsp;label: '',<br>&nbsp;&nbsp;isEmpty:true<br>}]</code> | The chart data
className | `string` | false | `donutchart` | This is the `className` given to the top-level `svg` element. All subclasses are prefixed from this name: <ul><li><code>${className}-arcs</code> accesses the entire graph area</li><ul><li><code>${className}-arcs-paths</code> accesses the individual arc paths</li></ul><li><code>${className}-innertext</code> accesses all of the text within the inner donut area</li><ul><li><code>${className}-innertext-label</code> accesses the label within this area</li><li><code>${className}-innertext-value</code> accesses the value within this area</li></ul><li><code>${className}-legend</code> accesses the legend component</li><ul><li><code>${className}-legend-rect</code> accesses the legend rectangle items</li><li><code>${className}-legend-label</code> accesses the labels of the legend items</li></ul></ul> In addition the `selected` class is given to selected items, the `toggled` class to all toggled items, and the `isEmpty` class to all `isEmpty` items. All style (and animations) can be manipulated from the CSS
height | `number` | false | `500` | Height of the entire component
width | `number` | false | `750` | Width of the entire component. If no legend is specified, then the chart takes up the entire width. If a legend is toggled, then the chart takes up 2/3 of the width, and the legend takes up 1/3
colors | `arrayOf(string)` | false | `['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b' ]` | An array of colors (could be hex strings or named colors) for the data items. Defaults to an array of Google colors
emptyColor | `string` | false | `'#e0e0e0'` | A color for empty data items, defaults to gray
strokeColor | `string` | false | `'#212121'` | A color for the stroke around the items in the graph and legend, defaults to black
colorFunction | `func` | false | `(colors, index) => colors[(index % colors.length)]` | The default cycles through the array of colors and loops for excess
innerRadius | `number` | false | `0.70` | The inner donut radius
outerRadius | `number` | false | `0.90` | The outer donut radius
selectedOffset | `number` | false | `0.03` | The `outerRadius` offset when an item is selected
emptyOffset | `number` | false | `0.08` | The `innerRadius` and `outerRadius` offset on `isEmpty` items
toggledOffset | `number` | false | `0.04` | The `innerRadius` and `outerRadius` offset on toggle-clicked items
startAngle | `number` | false | `0` | The drawing start angle
formatValues | `func` | false | ```(values, total) => `${(values / total * 100).toFixed(2)}%` ``` | Custom format for values displayed in the donut chart's inner text area. By default formats as percentages rounded to two decimal places.
onMouseEnter | `func` | false | `(item) => item` | Callback that fires when an item is hovered
onClick | `func` | false | `onClick: (item, toggled) => (toggled ? item : null)` | Callback that fires when an item is toggle-clicked
legend | `bool` | false | `true` | Determines whether or not to create a legend
clickToggle | `bool` | false | `true` | Determines whether or not to toggle-freeze the graph on the arc that has been clicked

---

## License

MIT
