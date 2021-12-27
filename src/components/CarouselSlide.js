import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const defaultImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: ${(props) =>
    typeof props.imgHeight === 'number'
      ? props.imgHeight + 'px'
      : props.imgHeight};
`;

const CarouselSlide = ({ Img, imgUrl, imgHeight, attribution, description, ...rest }) => (
  <figure {...rest}>
    <Img src={imgUrl} imgHeight={imgHeight}/>
    <figcaption>
      <strong>{description} </strong>
      {attribution}
    </figcaption>
  </figure>
);

CarouselSlide.propTypes = {
  Img: PropTypes.elementType,
  imgUrl: PropTypes.string.isRequired,
  imgHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  attribution: PropTypes.string,
  description: PropTypes.string,
};

CarouselSlide.defaultProps = {
  Img: defaultImg,
  imgHeight: 500,
};

export default CarouselSlide;
