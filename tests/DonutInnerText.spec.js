import React from 'react';
import { createRenderer } from 'react-dom/test-utils';
import createComponent from 'react-unit';
import test from 'tape';

import DonutInnerText from '../lib/dist/DonutInnerText.js';

import mockData from '../mock/graph.js';

test('Testing: DonutInnerText', (t) => {
    const className = 'donut';

    const component = createComponent.shallow(<DonutInnerText
                                              className={ className } />);
    t.equal(component.props.className, className, `className props of component should equal ${className}`);
    t.end();
});
