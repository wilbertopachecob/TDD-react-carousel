import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import { PropTypes } from 'prop-types';
class Carousel extends React.PureComponent {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
  };

  state = {
    slideIndex: 0,
  };

  handleNextClick() {
    if (this.state.slideIndex + 1 >= this.props.slides.length) {
      this.setState(() => ({
        slideIndex: 0,
      }));
      return;
    }
    this.setState(({ slideIndex }) => ({ slideIndex: slideIndex + 1 }));
  }

  handlePrevClick() {
    if (this.state.slideIndex - 1 < 0) {
      this.setState(() => ({
        slideIndex: this.props.slides.length - 1,
      }));
      return;
    }
    this.setState(({ slideIndex }) => ({ slideIndex: slideIndex - 1 }));
  }

  render() {
    const { slides, ...rest } = this.props;
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
