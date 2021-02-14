import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './containers/Home';
const BaseStack = createStackNavigator(
  {
    Home,
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
  },
);

export default createAppContainer(BaseStack);
