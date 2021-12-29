import React from 'react';

import { storiesOf } from '@storybook/react';
import Carousel from '../src/components/Carousel';

import slides from '../example/slides';

storiesOf('Carousel', module).add('default', () => <Carousel slides={slides} />);