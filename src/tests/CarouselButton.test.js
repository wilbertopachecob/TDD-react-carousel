import React from 'react';
import CarouselButton from '../components/CarouselButton';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('CarouselBurton', () => {
  it('should display a button', () => {
      const wrapper = shallow(<CarouselButton />);
      expect(wrapper.type()).toBe('button');
  });
});
