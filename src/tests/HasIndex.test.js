import React from 'react';
import { shallow } from 'enzyme';
import HasIndex from '../components/HasIndex';

describe('HasIndex', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';
  const indexPropName = 'index';
  const MockComponentWithIndex = HasIndex(MockComponent, indexPropName);

  it('should be defined', () => {
    expect(MockComponentWithIndex).toBeDefined();
  });

  it('should assign the correct displayName to the HOC component', () => {
    expect(MockComponentWithIndex.displayName).toBe('HasIndex(MockComponent)');
  });

  let wrapper;
  beforeEach(() => {
      wrapper = shallow(<MockComponentWithIndex />);
  });

  it('has initial `index` state equal to the `defaultIndex` prop', () => {
    const wrapper2 = shallow(<MockComponentWithIndex defaultIndex={1} />);
    expect(wrapper2.state('index')).toBe(1);
  });

  it('always has `index` state equal to the `index` prop', () => { 
    const wrapper2 = shallow(<MockComponentWithIndex index={1} />);
    
    expect(wrapper2.state('index')).toBe(1);

    wrapper2.setProps({index: 2});

    expect(wrapper2.state('index')).toBe(2);
  });

  it('allows `index` state to change if the `index` prop is unset', () => {
    const wrapper2 = shallow(<MockComponentWithIndex index={1} />);
    
    expect(wrapper2.state('index')).toBe(1);

    wrapper2.setProps({index: undefined});
    wrapper2.setState({index: 3});

    expect(wrapper2.state('index')).toBe(3);
  });

  it('calls `onIndexChange` on decrement/increment', () => { 
    const onIndexChange = jest.fn();
    
    wrapper.setProps({ index: 0, onIndexChange });
    wrapper.prop(`${indexPropName}Decrement`)(3);

    expect(onIndexChange).toHaveBeenCalledWith({target: {value: 2}});

    wrapper.prop(`${indexPropName}Increment`)(3);
    expect(onIndexChange).toHaveBeenCalledWith({target: {value: 1}});
  })

  it('passes the `index` state down as the `index` prop', () => {
    expect(wrapper.prop(indexPropName)).toBe(0);
    
    wrapper.setState({ index: 1 });
    
    expect(wrapper.prop(indexPropName)).toBe(1);
  });

  it('has an `index` state of 2 on decrement from 3', () => {
    wrapper.setState({ index: 3 });
    wrapper.prop(`${indexPropName}Decrement`)();

    expect(wrapper.state('index')).toBe(2);
  });

  it('has an `index` state of 1 on increment', () => {
    wrapper.prop(`${indexPropName}Increment`)();

    expect(wrapper.state('index')).toBe(1);
  });

  it('has the max `index` state on decrement from 0', () => { 
    wrapper.prop(`${indexPropName}Decrement`)(3);

    expect(wrapper.state('index')).toBe(2);
  });

  it('has the min `index` state on increment from the max', () => {
    wrapper.setState({ index: 2 });
    wrapper.prop(`${indexPropName}Increment`)(3);

    expect(wrapper.state('index')).toBe(0);
  });
});
