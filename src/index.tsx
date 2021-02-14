import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import App from './App';
import {persistor, store} from './store';
import RNBootSplash from 'react-native-bootsplash';

export default class Root extends React.Component {
  componentDidMount() {
    RNBootSplash.hide({fade: true}); // fade animation
  }
  public render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<View />} persistor={persistor}>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
