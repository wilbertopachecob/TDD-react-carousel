import React from 'react';
import Carousel from '../components/Carousel';
import { shallow } from 'enzyme';
import CarouselButton from '../components/CarouselButton';

describe('CarouselBurton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Carousel></Carousel>);
  });

  it('should display a button', () => {
    expect(wrapper.type()).toBe('div');
  });

  it('should set state prop slideIndex to 0', () => {
    expect(wrapper.state('slideIndex')).toBe(0);
  });

  it('should render buttons', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(0)
        .prop('children')
    ).toBe('Prev');
    expect(
      wrapper
        .find(CarouselButton)
        .at(1)
        .prop('children')
    ).toBe('Next');
  });

  it('should decrements `slideIndex` when Prev is clicked', () => {
    wrapper.setState({ slideIndex: 1 });
    wrapper.find("[data-action='prev']").simulate('click');
    expect(wrapper.state('slideIndex')).toBe(0);
  });
});
