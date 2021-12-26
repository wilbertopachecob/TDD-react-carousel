import React from 'react';
import PropTypes from 'prop-types';

const CarouselButton = ({ children }) => <button>{children}</button>;

CarouselButton.propTypes = {
    children: PropTypes.string,
};

export default CarouselButton;
