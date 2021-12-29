import React from 'react';
import Carousel, { Carousel as CarouselCore } from '../components/Carousel';
import { shallow, mount } from 'enzyme';
import CarouselButton from '../components/CarouselButton';
import CarouselSlide from '../components/CarouselSlide';

describe('Carousel', () => {
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

  describe('component with HOC', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel slides={slides} />);
    });

    it('should be defined', () => {
      expect(wrapper).toBeDefined();
    });

    it('sets slideIndex={0} on the core component', () => {
      expect(wrapper.find(CarouselCore).prop('slideIndex')).toBe(0);
    });

    it('passes `slides` down to the core component', () => {
      expect(wrapper.find(CarouselCore).prop('slides')).toEqual(slides);
    });

    it('allows `slideIndex` to be controlled', () => {
      wrapper = mount(<Carousel slides={slides} slideIndex={1} />);
      
      expect(wrapper.find(CarouselCore).prop('slideIndex')).toBe(1);
      
      wrapper.setProps({slideIndex: 2})

      expect(wrapper.find(CarouselCore).prop('slideIndex')).toBe(2);
    });

    it('advances the slide after `autoAdvanceDelay` elapses', () => { 
      jest.useFakeTimers();
      const autoAdvanceDelay = 10e3;
      const mounted = mount(<Carousel slides={slides} autoAdvanceDelay={autoAdvanceDelay}/>) 

      expect(mounted.find(CarouselCore).prop('slideIndex')).toBe(0);

      jest.advanceTimersByTime(autoAdvanceDelay);
      mounted.update();

      expect(mounted.find(CarouselCore).prop('slideIndex')).toBe(1);
    });
  });

  describe('core component', () => {
    const slideIndexIncrement = jest.fn();
    const slideIndexDecrement = jest.fn();

    beforeEach(() => {
      wrapper = shallow(
        <CarouselCore
          slides={slides}
          slideIndex={0}
          slideIndexDecrement={slideIndexDecrement}
          slideIndexIncrement={slideIndexIncrement}
        ></CarouselCore>
      );
    });

    it('should display a button', () => {
      expect(wrapper.type()).toBe('div');
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

    it('should call proper decrement function from prop', () => {
      wrapper.find("[data-action='prev']").simulate('click');

      expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });

    it('should call proper increment function from prop', () => {
      wrapper.find("[data-action='next']").simulate('click');

      expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
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

    it('passes defaultImg and defaultImgHeight to the CarouselSlide', () => {
      const defaultImg = () => 'test';
      const defaultImgHeight = 500;

      wrapper.setProps({ defaultImg, defaultImgHeight });

      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
        defaultImgHeight
      );
    });

    it('allows individual slides to override Img and imgHeight', () => {
      const Img = () => 'test';
      const imgHeight = 500;

      wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }] });

      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(Img);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
    });
  });
});
