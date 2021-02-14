import React from 'react';
import {connect} from 'react-redux';
import {
  AppState,
  View,
  StyleSheet,
  Text,
  FlatList,
  ListRenderItem,
  AppStateStatus,
} from 'react-native';

import {subscribeOrderBook} from '../../actions/orderBookActions';
import * as orderBookSelectors from '../../reducers/orderBookReducer';
import {Data} from 'src/types';
import * as service from '../../services/socket';
import {Header} from '../headerComponent';
import {strings} from 'src/constants/strings';
import {numberWithCommas} from '../../utils/calulations';

interface Props {
  success: object;
  error: object;
  data: Data;
  subscribeOrderBook: Function;
}

interface State {
  appState: AppStateStatus;
}

export class OrderBook extends React.PureComponent<Props, State> {
  public state: State = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    const {
      props: {subscribeOrderBook},
    } = this;

    subscribeOrderBook();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    service.ws.close();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState: AppStateStatus) => {
    this.setState({appState: nextAppState});

    if (nextAppState === 'background') {
      service.ws.close();
    }

    if (nextAppState === 'active') {
      const {subscribeOrderBook} = this.props;
      subscribeOrderBook();
    }
  };
  render() {
    const {data, error} = this.props;

    if (error) {
      return (
        <View>
          <Text>
            {strings['ERROR.TITLE']} {JSON.stringify(error)}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.parentContainer}>
        <Text style={styles.listHeader}>{strings['LABEL.BIDS']}</Text>
        <FlatList
          data={data.bids}
          renderItem={this.renderItemBids}
          keyExtractor={(item) => item[0].toString()}
          style={styles.listStyle}
          ListHeaderComponent={() => <Header />}
        />

        <Text style={styles.listHeader}>{strings['LABEL.ASKS']}</Text>

        <FlatList
          data={data.asks}
          renderItem={this.renderItemAsks}
          keyExtractor={(item) => item[0].toString()}
          style={styles.listStyle}
          ListHeaderComponent={() => <Header />}
        />
      </View>
    );
  }

  private renderItemBids: ListRenderItem<number[]> = ({item}) => (
    <View style={styles.listParent}>
      <Text style={styles.listItemBids}>{numberWithCommas(item[0].toFixed(2))} </Text>
      <Text style={styles.listItemBids}>{numberWithCommas(item[1])} </Text>
      <Text style={styles.listItemBids}>{numberWithCommas(item[2])} </Text>
    </View>
  );

  private renderItemAsks: ListRenderItem<number[]> = ({item}) => (
    <View style={styles.listParent}>
      <Text style={styles.listItemAsks}>{numberWithCommas(item[0].toFixed(2))} </Text>
      <Text style={styles.listItemAsks}>{numberWithCommas(item[1])} </Text>
      <Text style={styles.listItemAsks}>{numberWithCommas(item[2])} </Text>
    </View>
  );
}

function mapStateToProps(state: any) {
  return {
    success: orderBookSelectors.getSuccess(state),
    error: orderBookSelectors.getError(state),
    data: orderBookSelectors.getData(state),
  };
}

const actionCreators = {
  subscribeOrderBook,
};

export default connect(mapStateToProps, actionCreators)(OrderBook);

const styles = StyleSheet.create({
  listStyle: {width: '100%', flex: 1, marginTop: 20},
  listHeader: {textAlign: 'center', marginTop: 30, color: 'white', fontSize: 18},
  listItemBids: {flex: 1, textAlign: 'right', color: 'red'},
  listItemAsks: {flex: 1, textAlign: 'right', color: 'green'},
  parentContainer: {flex: 1, paddingHorizontal: 40, marginVertical: 20},
  listParent: {flex: 1, flexDirection: 'row'},
});
