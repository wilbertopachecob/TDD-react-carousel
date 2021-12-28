import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import { PropTypes } from 'prop-types';
import HasIndex from './HasIndex';

export class Carousel extends React.PureComponent {
  static propTypes = {
    defaultImageHeigth: CarouselSlide.propTypes.imgHeight,
    defaultImg: CarouselSlide.propTypes.Img,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    slideIndex: PropTypes.number,
    slideIndexDecrement: PropTypes.func,
    slideIndexIncrement: PropTypes.func,
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

export default HasIndex(Carousel, 'slideIndex');
