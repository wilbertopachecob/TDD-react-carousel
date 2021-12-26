import { shallow } from 'enzyme';
import CarouselSlide from '../components/CarouselSlide';
import React from 'react';

describe('CarouselSlide', () => {
  let wrapper;
  const imgUrl = 'https://example.com/image.png';

  beforeEach(() => {
    wrapper = shallow(<CarouselSlide imgUrl={imgUrl} />);
  });

  it('should render proper element', () => {
    expect(wrapper.type()).toBe('figure');
  });

  it('should render an <img> and <figcaption> element', () => {
    expect(wrapper.childAt(0).type()).toBe('img');
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes `imgUrl` through to the <img>', () => {
    const img = wrapper.find('img');

    expect(img.prop('src')).toBe(imgUrl);
  });

  it('uses `description` and `attribution` as the <figcaption>', () => {
    const description = 'A jaw-droppingly spectacular image';
    const attribution = 'Trevor Burnham';

    wrapper.setProps({ description, attribution });

    const figcaption = wrapper.find('figcaption');
    expect(figcaption.text()).toBe(`${description} ${attribution}`);
  });

  it('passes other props through to the <figure>', () => {
    const style = {};
    const onClick = () => {};
    const className = 'my-carousel-slide';

    wrapper.setProps({ style, onClick, className });

    expect(wrapper.prop('style')).toBe(style);
    expect(wrapper.prop('onClick')).toBe(onClick);
    expect(wrapper.prop('className')).toBe(className);
  });
});
