declare module 'redux-persist/lib/*';

export interface BaseAction {
  type: string;
  payload: any;
}

export interface Feed {
  value: number;
}

export interface FeedRootState {
  loading: boolean;
  success: object;
  error?: object;
  data: Data;
  isSubscribed: boolean;
}
export interface Data {
  asks: number[][];
  bids: number[][];
}
