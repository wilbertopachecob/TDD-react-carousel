import React from 'react';
import CarouselButton from '../components/CarouselButton';
import { shallow } from 'enzyme';

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

  it('passes other props to button', () => {
    const onClick = () => {};
    const className = 'btn btn-primary';
    const dataAction = 'prev';
    wrapper.setProps({ onClick, className, 'data-action': dataAction });
    expect(wrapper.prop('onClick')).toBe(onClick);
    expect(wrapper.prop('className')).toBe(className);
    expect(wrapper.prop('data-action')).toBe(dataAction);
  });
});
