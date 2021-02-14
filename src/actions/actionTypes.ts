/*
 *--------------------------------------------------*
 * Example:
 * APP = {
 * 	SET_STORE_STATE: 'APP/SET_STORE_STATE'
 * }
 *--------------------------------------------------*
 */
function createActionTypes(base: string, types: string[]) {
  const res: {[s: string]: string} = {};
  types.forEach((type) => (res[type] = `${base}/${type}`));
  return res;
}

export const APP = createActionTypes('APP', ['SET_STORE_STATE']);

export const ORDERBOOK = createActionTypes('ORDERBOOK', [
  'ORDER_BOOK_SUBSCRIBE',
  'ORDER_BOOK_SUCCESS',
  'ORDER_BOOK_ERROR',
  'ORDER_BOOK_DATA',
  'ORDER_BOOK_UNSUBSCRIBE',
]);

export default {
  app: APP,
  orderBook: ORDERBOOK,
};
