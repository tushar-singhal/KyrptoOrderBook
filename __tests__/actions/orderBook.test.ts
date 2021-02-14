import * as types from '../../src/actions/actionTypes';
// import {fetchListings, fetchListingsSuccess} from '../../src/actions/listingActions';
import {unsubscribeOrderBook} from '../../src/actions/orderBookActions';
import {store} from '../../src/store';

test('should unscubscribe', () => {
  expect(unsubscribeOrderBook()).toMatchObject({
    type: types.ORDERBOOK.ORDER_BOOK_UNSUBSCRIBE,
  });
});

test('ORDER_BOOK_DATA', () => {
  const mock =
    '{"feed": "book_ui_1","product_id": "PI_XBTUSD","bids": [ [49272.0, 25000.0], [49275.0, 0.0]],"asks": []}';
  store.dispatch({type: types.ORDERBOOK.ORDER_BOOK_DATA, payload: mock});

  expect(store.getState().orderBook.data).toEqual({asks: [], bids: [[49272, 25000, 25000]]});
});
