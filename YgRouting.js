import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './YgFrequentUsage/YgRefNavigation';
import YgHome from './YgMainScreens/YgHome';
import YgSP from './YgMainScreens/YgSP';
import YgCart from './YgMainScreens/YgCart';
// import YgFav from './YgMainScreens/YgFav';
import YgContact from './YgMainScreens/YgContact';
import YgConfirmOrder from './YgMainScreens/YgConfirmOrder';
import YgSearch from './YgMainScreens/YgSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="YgHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="YgHome" component={YgHome} />
        <Stack.Screen name="YgSP" component={YgSP} />
        {/* <Stack.Screen name="YgFav" component={YgFav} /> */}
        <Stack.Screen name="YgCart" component={YgCart} />
        <Stack.Screen name="YgContact" component={YgContact} />
        <Stack.Screen name="YgConfirmOrder" component={YgConfirmOrder} />
        <Stack.Screen name="YgSearch" component={YgSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
