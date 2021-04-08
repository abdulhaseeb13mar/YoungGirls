/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function WrapperScreen(props) {
  const {
    top,
    bottom,
    statusBar = 'white',
    barStyle = 'dark-content',
    statusColor,
  } = props;
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, backgroundColor: statusBar}}>
      <View
        style={{
          height: insets.top,
          backgroundColor: statusColor,
        }}>
        <StatusBar translucent barStyle={barStyle} />
      </View>
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View
            style={{
              flex: 1,
              // marginTop: top === 0 ? top : insets.top,
              paddingBottom: bottom === 0 ? bottom : insets.bottom,
              backgroundColor: 'white',
              ...props.style,
            }}>
            {props.children}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </View>
  );
}

export default WrapperScreen;
