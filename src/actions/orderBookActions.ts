import * as types from './actionTypes';
import * as service from '../services/socket';

export const RESPONSE_SUCCESS = 'Success';
export const RESPONSE_ERROR = 'Error';
export const RESPONSE_DATA = 'Data';
export const UNSUBSCRIBE = 'Unsubscribe';

/**
 * @description OrderBook WS subscription function.
 *
 *
 */

export function subscribeOrderBook() {
  return (dispatch: (arg0: {type: string; payload?: any}) => void) => {
    dispatch({type: types.ORDERBOOK.ORDER_BOOK_SUBSCRIBE});
    service.subscribeOrderBook((type: string, data: any) => {
      switch (type) {
        case RESPONSE_SUCCESS:
          return dispatch({
            type: types.ORDERBOOK.ORDER_BOOK_SUCCESS,
            payload: data,
          });
        case RESPONSE_ERROR:
          return dispatch({
            type: types.ORDERBOOK.ORDER_BOOK_ERROR,
            payload: data || 'Something went wrong',
          });
        case RESPONSE_DATA:
          return dispatch({
            type: types.ORDERBOOK.ORDER_BOOK_DATA,
            payload: data,
          });
        case UNSUBSCRIBE:
          return dispatch({
            type: types.ORDERBOOK.ORDER_BOOK_UNSUBSCRIBE,
          });
      }
    });
  };
}

export function unsubscribeOrderBook() {
  return {
    type: types.ORDERBOOK.ORDER_BOOK_UNSUBSCRIBE,
  };
}
