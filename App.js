/**
 * Sample React Native App
 * https://github.com/faDzbook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import store from './BbStateManagement/BbStore';
import Routes from './BbRouting';
//import RNBootSplash from 'react-native-bootsplash';

const App: () => React$Node = () => {
  //RNBootSplash.hide();
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <Routes />
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
