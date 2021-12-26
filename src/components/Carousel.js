import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import { PropTypes } from 'prop-types';
class Carousel extends React.PureComponent {
  state = {
    slideIndex: 0,
  };

  handleNextClick() {
    this.setState(({ slideIndex }) => ({ slideIndex: slideIndex + 1 }));
  }

  handlePrevClick() {
    this.setState(({ slideIndex }) => ({ slideIndex: slideIndex - 1 }));
  }

  render() {
    const {slides, ...rest} = this.props;
    const currentSlide = slides[this.state.slideIndex];
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
        <CarouselSlide {...currentSlide} />
      </div>
    );
  }
}

Carousel.propTypes = {
  slides: PropTypes.array,
};
export default Carousel;
