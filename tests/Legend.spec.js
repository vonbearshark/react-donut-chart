import React from 'react';
import { createRenderer } from 'react-dom/test-utils';
import createComponent from 'react-unit';
import test from 'tape';

import Legend from '../lib/dist/Legend.js';

import mockData from '../mock/graph.js';

test('Testing: Legend', (t) => {
    const className = 'donut';

    const component = createComponent.shallow(<Legend
                                              className={ className } />);
    t.equal(component.props.className, className, `className props of component should equal ${className}`);
    t.end();
});
