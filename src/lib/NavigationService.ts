import {Alert, Keyboard} from 'react-native';
import {
  NavigationActions,
  NavigationBackActionPayload,
  NavigationContainerComponent,
  StackActions,
} from 'react-navigation';

interface ScreenInfo {
  current: {
    screen: string | null;
    stack: string[];
  };
  previous: {
    screen: string | null;
    stack: string[];
  };
}
type NavigationStateChangeListener = (screenInfo: ScreenInfo) => void;

let navigator: NavigationContainerComponent | null;
const screenInfo: ScreenInfo = {
  current: {
    screen: null,
    stack: [],
  },
  previous: {
    screen: null,
    stack: [],
  },
};
const navigationStateChangeListeners: NavigationStateChangeListener[] = [];
export const NEXT_ROUTE_NAME = 'Navigation/NEXT_ROUTE';

const addNavigationStateChangeListener = (listener: NavigationStateChangeListener) => {
  navigationStateChangeListeners.push(listener);
};

const removeNavigationStateChangeListener = (listener: NavigationStateChangeListener) => {
  navigationStateChangeListeners.splice(navigationStateChangeListeners.indexOf(listener), 1);
};

const setTopLevelNavigator = (navigatorRef: NavigationContainerComponent | null) => {
  navigator = navigatorRef;
};

const getScreenInfo = () => {
  return {...screenInfo};
};

const navigate = (routeName: string, params: object = {}) => {
  if (!navigator) {
    Alert.alert('error');
    return;
  }
  Keyboard.dismiss();
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

const back = (options?: NavigationBackActionPayload) => {
  if (!navigator) {
    return;
  }
  Keyboard.dismiss();
  navigator.dispatch(NavigationActions.back(options));
};

const popAndBack = () => {
  popToTop();
  back();
};

const backWithoutKeyboard = () => {
  Keyboard.dismiss();
  back();
};

const popToTop = () => {
  if (!navigator) {
    return;
  }
  navigator.dispatch(StackActions.popToTop({key: ''}));
};

const navigateNext = (params: object = {}) => navigate(NEXT_ROUTE_NAME, params);

export default {
  navigate,
  next: navigateNext,
  setTopLevelNavigator,
  back,
  popAndBack,
  backWithoutKeyboard,
  popToTop,
  getScreenInfo,
  addNavigationStateChangeListener,
  removeNavigationStateChangeListener,
};
