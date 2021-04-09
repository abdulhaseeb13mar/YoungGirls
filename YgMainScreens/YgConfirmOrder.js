/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import WrapperScreen from '../YgFrequentUsage/YgWrapperScreen';
import {View, Text} from 'react-native';
import {H_W} from '../YgFrequentUsage/YgResponsive';
import {colors} from '../YgFrequentUsage/YgColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Button} from 'react-native-elements';
import NavigationRef from '../YgFrequentUsage/YgRefNavigation';
import {connect} from 'react-redux';
import {YgresetCart} from '../YgStateManagement/YgActions';

function YgConfirmOrder(props) {
  const ResetAndGoHome = () => {
    props.YgresetCart();
    NavigationRef.NavigateAndReset('YgHome');
  };
  return (
    <WrapperScreen
      barStyle="light-content"
      statusBar={colors.primary}
      style={{
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialCommunityIcons
          name="lipstick"
          size={H_W.width * 0.4}
          color="white"
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30,
            textAlign: 'center',
            width: H_W.width * 0.9,
            marginTop: 15,
          }}>
          WE HAVE RECEIVED YOUR ORDER
        </Text>
        <Button
          onPress={ResetAndGoHome}
          title="Shop more"
          buttonStyle={{
            backgroundColor: 'white',
            width: H_W.width * 0.6,
            borderRadius: 10,
          }}
          icon={
            <Fontisto
              name="arrow-right-l"
              color={colors.primary}
              size={19}
              style={{marginLeft: H_W.width * 0.02}}
            />
          }
          iconRight
          raised
          titleStyle={{
            fontSize: 20,
            fontWeight: 'bold',
            borderRadius: 10,
            color: colors.primary,
          }}
          containerStyle={{marginTop: 15, borderRadius: 10}}
        />
      </View>
    </WrapperScreen>
  );
}

export default connect(null, {YgresetCart})(React.memo(YgConfirmOrder));
