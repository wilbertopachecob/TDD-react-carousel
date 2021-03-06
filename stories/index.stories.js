import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';

import Carousel from '../src/components/Carousel';
import slides from '../example/slides';

const stories = storiesOf('Carousel', module);

stories.addDecorator(withKnobs);

stories.add('default', () => (
  <Carousel
    slides={slides}
    autoAdvanceDelay={number('autoAdvanceDelay', 10e3)}
    onIndexChange={action('onIndexChange')}
  />
));
