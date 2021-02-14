import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {render} from 'react-native-testing-library';

import {OrderBook} from '../../src/components/OrderBook/OrderBook';
Enzyme.configure({adapter: new Adapter()});

const createTestProps = (props?: object) => ({
  ...props,
});

jest.mock('react-redux', () => {
  return {
    connect: jest.fn().mockReturnValue(() => jest.fn()),
  };
});

jest.mock('../../src/services/socket', () => {
  return {
    ws: {
      close: jest.fn().mockReturnValue(() => jest.fn()),
    },
    close: jest.fn().mockReturnValue(() => jest.fn()),
  };
});

const dataMock = {
  bids: [
    [49272.0, 25000.0, 25000.0],
    [49275.0, 0.0, 25000.0],
  ],
  asks: [
    [49272.0, 25000.0, 25000.0],
    [49275.0, 0.0, 25000.0],
  ],
};

describe('order book', () => {
  const props: any = createTestProps({
    subscribeOrderBook: jest.fn(),
    data: dataMock,
    success: {},
    error: undefined,
  });
  const {toJSON} = render(<OrderBook {...props} />);

  it('should match snapshot', () => {
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('ConnectedHome', () => {
  const mockConnect = require('react-redux').connect;
  const mapStateToProps = mockConnect.mock.calls[0][0];
  it('should map listing from state to props', () => {
    const mockState = {orderBook: {data: dataMock}};
    const props = mapStateToProps(mockState);
    expect(props.data).toEqual(dataMock);
  });
});
