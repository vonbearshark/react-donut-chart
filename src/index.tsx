import React from 'react';
import ReactDOM from 'react-dom';
import DonutChart from './lib';
import './index.css';

const graph = [
  {
    label: 'Give you up',
    value: 1208.84,
  },
  {
    label: 'Let you down',
    value: 198.51,
  },
  {
    label: 'Run around',
    value: 754,
    className: 'classNameTest',
  },
  {
    label: '',
    value: 500,
    isEmpty: true,
  },
  {
    label: 'Desert you',
    value: 760,
  },
  {
    label: 'Make you cry',
    value: 1108,
  },
  {
    label: 'Say goodbye',
    value: 358,
  },
  {
    label: 'Tell a lie',
    value: 879,
  },
  {
    label: 'Hurt you',
    value: 1250,
  },
];

ReactDOM.render(
  <React.StrictMode>
    <>
      <h1>React Donut Chart</h1>
      <h2>Things I would never do:</h2>
      <DonutChart
        data={graph}
        onMouseEnter={(item) => console.log(`mousing entering: ${item.label}`)}
        onMouseLeave={(item) => console.log(`mouse leaving: ${item.label}`)}
        onClick={(item, toggled) =>
          toggled
            ? console.log(`selecting: ${item.label}`)
            : console.log(`unselecting: ${item.label}`)
        }
      />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
