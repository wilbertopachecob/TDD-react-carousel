import { mount, shallow } from 'enzyme';
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
    expect(wrapper.childAt(0).type()).toBe(CarouselSlide.defaultProps.Img);
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes `imgUrl` through to the <img>', () => {
    const Img = wrapper.find(CarouselSlide.defaultProps.Img);

    expect(Img.prop('src')).toBe(imgUrl);
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

  describe('Img', () => {
    let mounted;
    const Img = CarouselSlide.defaultProps.Img;
    const imgUrl = 'https://example.com/slide1.png';
    
    beforeEach(() => {
      mounted = mount(<Img src={imgUrl} imgHeight={500} />);
    });

    it('should display the img with the right src attr', () => {
      expect(mounted.containsMatchingElement(<img src={imgUrl} />)).toBe(true)
    });

    it('should display the img with the right properties', () => {
      expect(mounted).toHaveStyleRule('width', '100%');
    });

    it('uses imgHeight as the height style property', () => { 
      expect(mounted).toHaveStyleRule('height', '500px');
      mounted.setProps({imgHeight: 'calc(100vh - 100px)'});
      expect(mounted).toHaveStyleRule('height', 'calc(100vh - 100px)');
    });
  })
});
