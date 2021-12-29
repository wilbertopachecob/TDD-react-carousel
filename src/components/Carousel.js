import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import { PropTypes } from 'prop-types';
import HasIndex from './HasIndex';
import AutoAdvances from './AutoAdvances';

export class Carousel extends React.PureComponent {
  static propTypes = {
    defaultImageHeigth: CarouselSlide.propTypes.imgHeight,
    defaultImg: CarouselSlide.propTypes.Img,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    slideIndex: PropTypes.number.isRequired,
    slideIndexDecrement: PropTypes.func.isRequired,
    slideIndexIncrement: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultImageHeigth: CarouselSlide.defaultProps.imgHeight,
    defaultImg: CarouselSlide.defaultProps.Img,
  };

  handleNextClick() {
    this.props.slideIndexIncrement(this.props.slides.length);
  }

  handlePrevClick() {
    this.props.slideIndexDecrement(this.props.slides.length);
  }

  render() {
    const {
      slides,
      defaultImageHeigth,
      defaultImg,
      slideIndex,
      slideIndexDecrement: _slideIndexDecrement,
      slideIndexIncrement: _slideIndexIncrement,
      ...rest
    } = this.props;
    const currentSlide = slides[slideIndex];
    return (
      <div {...rest}>
        <CarouselButton
          data-action="prev"
          onClick={() => this.handlePrevClick()}
        >
          Prev
        </CarouselButton>
        <CarouselButton
          data-action="next"
          onClick={() => this.handleNextClick()}
        >
          Next
        </CarouselButton>
        <CarouselSlide
          imgHeight={defaultImageHeigth}
          Img={defaultImg}
          {...currentSlide}
        />
      </div>
    );
  }
}

export default HasIndex(
  AutoAdvances(Carousel, 'slideIndex', 'slides'),
  'slideIndex');
