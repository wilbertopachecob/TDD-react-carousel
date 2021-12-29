import React from 'react';
import AutoAdvances from '../components/AutoAdvances';
import { shallow } from 'enzyme';

describe('AutoAdvances', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';
  const MockComponentWithAutoAdvance = AutoAdvances(
    MockComponent,
    'index',
    'upperBound'
  );

  it('has the expected displayName', () => {
    expect(MockComponentWithAutoAdvance.displayName).toBe('AutoAdvancesMockComponent');
  });

  const autoAdvanceDelay = 10000;
  const upperBound = 5;
  let indexIncrement;
  let wrapper;

  beforeEach(() => {
    jest.useFakeTimers();
    indexIncrement = jest.fn();
    wrapper = shallow(
      <MockComponentWithAutoAdvance
        autoAdvanceDelay={autoAdvanceDelay}
        upperBound={upperBound}
        indexIncrement={indexIncrement}
        index={0}
      />
    );
  });

  it('calls the increment function after `autoAdvanceDelay`', () => {
    jest.advanceTimersByTime(autoAdvanceDelay);
    
    expect(indexIncrement).toHaveBeenCalled();
  });

  it('uses `upperBound.length` if upperBound is an array', () => {
    wrapper.setProps({ upperBound: [1, 2, 3] });
    jest.advanceTimersByTime(autoAdvanceDelay);
    
    expect(indexIncrement).toHaveBeenCalledWith(3);
  });

  it('does not set a timer if `autoAdvanceDelay` is 0', () => {
    wrapper.setProps({ index: 1, autoAdvanceDelay: 0 });
    jest.advanceTimersByTime(999999);

    expect(indexIncrement).not.toHaveBeenCalled();
  });

  it('resets the timer when the target prop changes', () => {
    jest.advanceTimersByTime(autoAdvanceDelay - 1);
    wrapper.setProps({ index: 1 });
    jest.advanceTimersByTime(1);
    
    expect(indexIncrement).not.toHaveBeenCalled();

    jest.advanceTimersByTime(autoAdvanceDelay);

    expect(indexIncrement).toHaveBeenCalled();
  });

  it('clears the timer on unmount', () => {
    wrapper.unmount();
    jest.advanceTimersByTime(autoAdvanceDelay);

    expect(indexIncrement).not.toHaveBeenCalled();
  });

});
