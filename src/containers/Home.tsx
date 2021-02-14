import React, {Component} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import OrderBook from '../components/OrderBook/OrderBook';
import {strings} from '../constants/strings';

export default class Home extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerTintColor: 'white',
    title: strings['LABEL.ORDER_BOOK'],
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>
          <OrderBook />
        </SafeAreaView>
      </>
    );
  }
}
