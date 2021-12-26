import React from 'react';
import CarouselButton from './CarouselButton';
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
    return (
      <div>
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
      </div>
    );
  }
}
export default Carousel;
