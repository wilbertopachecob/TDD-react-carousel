import React from 'react';
import PropTypes from 'prop-types';

const CarouselSlide = ({ imgUrl, attribution, description, ...rest }) => (
  <figure {...rest}>
    <img src={imgUrl} />
    <figcaption>
      <strong>{description}</strong>
      {attribution}
    </figcaption>
  </figure>
);

CarouselSlide.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  attribution: PropTypes.string,
  description: PropTypes.string,
};

export default CarouselSlide;
