import * as types from '../actions/actionTypes';

import {FeedRootState} from 'src/types';
import {manipulateArr, updateCurrentData} from '../utils/calulations';

const initialState: FeedRootState = {
  loading: false,
  success: {},
  error: undefined,
  data: {
    asks: [],
    bids: [],
  },
  isSubscribed: false,
};

const reducer = (state = initialState, action: any = {}) => {
  switch (action.type) {
    case types.ORDERBOOK.ORDER_BOOK_SUBSCRIBE:
      return {
        ...state,
        loading: true,
      };
    case types.ORDERBOOK.ORDER_BOOK_UNSUBSCRIBE:
      return {
        ...state,
        isSubscribed: false,
      };
    case types.ORDERBOOK.ORDER_BOOK_SUCCESS:
      return {
        ...state,
        isSubscribed: true,
        loading: false,
      };
    case types.ORDERBOOK.ORDER_BOOK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case types.ORDERBOOK.ORDER_BOOK_DATA:
      const dataJson = JSON.parse(action.payload);

      const bids = state.data.bids;
      const newDataBids = updateCurrentData(bids, dataJson.bids);

      const asks = state.data.asks;
      const newDataAsks = updateCurrentData(asks, dataJson.asks);

      return {
        ...state,
        data: {
          ...state.data,
          asks: manipulateArr(newDataAsks),
          bids: manipulateArr(newDataBids),
        },
      };

    default:
      return state;
  }
};

/**
 * SELECTORS
 */
function select(state: any) {
  return state.orderBook;
}

export function getSuccess(state: any) {
  return select(state).success;
}

export function getError(state: any) {
  return select(state).error;
}

export function getData(state: any) {
  return select(state).data;
}

export function isSubscribed(state: any) {
  return select(state).isSubscribed;
}

export default reducer;
