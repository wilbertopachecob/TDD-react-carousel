import React from 'react';
import Carousel from '../components/Carousel';
import { shallow } from 'enzyme';
import CarouselButton from '../components/CarouselButton';
import CarouselSlide from '../components/CarouselSlide';

describe('CarouselBurton', () => {
  let wrapper;
  const slides = [
    {
      imgUrl: 'https://example.com/slide1.png',
      description: 'Slide 1',
      attribution: 'Uno Pizzeria',
    },
    {
      imgUrl: 'https://example.com/slide2.png',
      description: 'Slide 2',
      attribution: 'Dos Equis',
    },
    {
      imgUrl: 'https://example.com/slide3.png',
      description: 'Slide 3',
      attribution: 'Three Amigos',
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides}></Carousel>);
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

  it('should set `slideIndex` to max value when Prev is clicked and `slideIndex` === 0', () => {
    wrapper.setState({ slideIndex: 0 });
    wrapper.find("[data-action='prev']").simulate('click');

    expect(wrapper.state('slideIndex')).toBe(slides.length - 1);
  });

  it('should set `slideIndex` to minor value when Next is clicked and `slideIndex` === slides.length', () => {
    wrapper.setState({ slideIndex: slides.length - 1 });
    wrapper.find("[data-action='next']").simulate('click');

    expect(wrapper.state('slideIndex')).toBe(0);
  });

  it('should show the fist image in the array after loaded', () => {
    const firstSlide = {
      ...slides[0],
      imgHeight: CarouselSlide.defaultProps.imgHeight,
      Img: CarouselSlide.defaultProps.Img,
    };
    const slideProps = wrapper.find(CarouselSlide).props();

    expect(slideProps).toEqual(firstSlide);
  });
});
