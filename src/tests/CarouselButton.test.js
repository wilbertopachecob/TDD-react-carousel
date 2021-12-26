import React from 'react';
import CarouselButton from '../components/CarouselButton';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('CarouselBurton', () => {
  let wrapper;
  const text = 'Button test';
  beforeEach(() => {
    wrapper = shallow(<CarouselButton>{text}</CarouselButton>);
  });

  it('should display a button', () => {
    expect(wrapper.type()).toBe('button');
  });

  it('passes children to button', () => {
    expect(wrapper.prop('children')).toBe(text);
  });
});
