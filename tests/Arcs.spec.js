import React from 'react';
import { createRenderer } from 'react-dom/test-utils';
import createComponent from 'react-unit';
import test from 'tape';

import Arcs from '../lib/dist/Arcs.js';

import mockData from '../mock/graph.js';

test('Testing: Arcs', (t) => {
    const className = 'donut';

    const component = createComponent.shallow(<Arcs
                                              className={ className } />);
    t.equal(component.props.className, className, `className props of component should equal ${className}`);
    t.end();
});
