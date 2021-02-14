import * as React from 'react';
import BaseStack from './Stack';
import NavigationService from './lib/NavigationService';

const App = () => {
  return (
    <BaseStack
      ref={(navigatorRef: any) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

export default App;
