import React from 'react';
import PropTypes from 'prop-types';

const AutoAdvances = (Component, propName, upperBoundPropName) => {
  return class ComponentAutoAdvances extends React.PureComponent {
    static displayName = `AutoAdvances${Component.displayName ||
      Component.name}`;

    static proptypes = {
      [propName]: PropTypes.number.isRequired,
      [`${propName}Increment`]: PropTypes.func,
      autoAdvanceDelay: PropTypes.number.isRequired,
      [upperBoundPropName]: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
      ]).isRequired,
    };

    static defaultProps = {
      autoAdvanceDelay: 10000,
    };

    componentDidMount() {
      this.startTimer();
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps[propName] !== this.props[propName] ||
        prevProps[upperBoundPropName] !== this.props[upperBoundPropName]
      ) {
        this.startTimer();
      }
    }

    componentWillUnmount() {
      clearInterval(this._timer);
    }

    startTimer() {
      clearInterval(this._timer);

      const { indexIncrement, autoAdvanceDelay } = this.props;
      if (autoAdvanceDelay) {
        this._timer = setInterval(
          () => indexIncrement(this._upperBound),
          autoAdvanceDelay
        );
      }
      return;
    }

    get _upperBound() {
      const { upperBound } = this.props;
      return Array.isArray(upperBound) ? upperBound.length : upperBound;
    }

    render() {
      const { autoAdvanceDelay: _autoAdvanceDelay, ...rest } = this.props;
      return <Component {...rest} />;
    }
  };
};

AutoAdvances.proptypes = {
  Component: PropTypes.elementType.isRequired,
  propName: PropTypes.string.isRequired,
  upperBoundPropName: PropTypes.string.isRequired,
};

export default AutoAdvances;
