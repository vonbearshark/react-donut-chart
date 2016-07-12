import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import createComponent from 'react-unit';
import test from 'tape';

import DonutInnerText from '../lib/DonutInnerText.jsx';

import mockData from '../mock/graph.js';

test('Testing: DonutInnerText', (t) => {
    const className = 'donut';

    const component = createComponent.shallow(<DonutInnerText
                                              className={ className } />);
    t.equal(component.props.className, className, `className props of component should equal ${className}`);
    t.end();
});
