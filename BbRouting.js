import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './BbFrequentUsage/BbRefNavigation';
import BbHome from './BbMainScreens/BbHome';
import BbSP from './BbMainScreens/BbSP';
import BbCart from './BbMainScreens/BbCart';
import BbFav from './BbMainScreens/BbFav';
import BbContact from './BbMainScreens/BbContact';
// import BbConfirmOrder from './BbSrc/BbConfirmOrder';
import BbSearch from './BbMainScreens/BbSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="BbHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="BbHome" component={BbHome} />
        <Stack.Screen name="BbSP" component={BbSP} />
        <Stack.Screen name="BbFav" component={BbFav} />
        <Stack.Screen name="BbCart" component={BbCart} />
        <Stack.Screen name="BbContact" component={BbContact} />
        {/* <Stack.Screen name="BbConfirmOrder" component={BbConfirmOrder} /> */}
        <Stack.Screen name="BbSearch" component={BbSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
