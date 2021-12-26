import React from 'react';
import PropTypes from 'prop-types';

const CarouselButton = ({ children }) => <button>{children}</button>;

CarouselButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CarouselButton;
