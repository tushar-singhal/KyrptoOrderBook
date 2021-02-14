import {
  RESPONSE_SUCCESS,
  RESPONSE_ERROR,
  RESPONSE_DATA,
  UNSUBSCRIBE,
} from '../actions/orderBookActions';
import {config} from '../constants/config';

export let ws: WebSocket;

export function subscribeOrderBook(listener: Function) {
  ws = new WebSocket(config.SOCKET_HOST);

  ws.onopen = () => {
    // connection opened
    listener(RESPONSE_SUCCESS);

    ws.send(config.GET_FEED_MESSAGE); // send a message
  };

  ws.onmessage = (e) => {
    // a message was received
    listener(RESPONSE_DATA, e.data);
  };

  ws.onerror = (e) => {
    // an error occurred
    listener(RESPONSE_ERROR, e.message);
  };

  ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
    listener(UNSUBSCRIBE);
  };
}
