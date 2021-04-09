/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  YgremoveCartAction,
  YgaddCartAction,
  YgsetCurrentProductAction,
  YgsetFavAction,
  YgremoveFavAction,
  YgresetCart,
} from '../YgStateManagement/YgActions';
import WrapperScreen from '../YgFrequentUsage/YgWrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../YgFrequentUsage/YgColor';
import {H_W} from '../YgFrequentUsage/YgResponsive';
import RefNavigation from '../YgFrequentUsage/YgRefNavigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Loop from '../YgFrequentUsage/YgFlatList';
import YgHeader from '../YgFrequentUsage/YgHeader';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.YgCart]);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.YgCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.YgCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const YgGoBack = () => RefNavigation.GoBack();

  const YgAddToCart = (item) => {
    props.YgaddCartAction({...item});
  };

  const YgRemoveFromCart = (item) => {
    props.YgCart[item.id] !== undefined && props.YgremoveCartAction(item);
  };

  const YgGoToSingleProduct = (item) => {
    props.YgsetCurrentProductAction(item);
    RefNavigation.Navigate('YgSP');
  };
  const YginfoScreen = () => RefNavigation.Navigate('YgContact');

  return (
    <WrapperScreen
      style={{backgroundColor: 'white'}}
      statusColor={`rgba(${colors.rgb_Primary},0.2)`}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 30,
          backgroundColor: `rgba(${colors.rgb_Primary},0.02)`,
          transform: [{scaleX: H_W.width * 0.016}, {scaleY: H_W.width * 0.017}],
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      />
      <View style={{backgroundColor: `rgba(${colors.rgb_Primary},0.2)`}}>
        <YgHeader
          leftIcon={Fontisto}
          leftIconName="arrow-left-l"
          leftIconColor={colors.primary}
          leftIconAction={YgGoBack}
          Title={<Text style={{fontSize: 19}}>Shopping Bag</Text>}
        />
      </View>
      <Loop
        horizontal={false}
        data={HorizontalCartArray}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => YgGoToSingleProduct(item)}
            style={{
              width: H_W.width,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: HEIGHT * 0.02,
            }}>
            <ImageBackground
              source={item.images}
              style={{
                width: H_W.width * 0.38,
                height: HEIGHT * 0.18,
                backgroundColor: colors.lightBackground2,
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
              }}
              resizeMode="contain"
            />
            <View
              style={{
                width: H_W.width * 0.5,
                justifyContent: 'space-between',
              }}>
              <Text
                numberOfLines={2}
                style={{fontSize: 18.5, fontFamily: 'Avenir-Roman'}}>
                {item.productname}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.darkGray,
                  marginTop: HEIGHT * 0.005,
                }}>
                {item.weight}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: HEIGHT * 0.005,
                  fontFamily: 'Avenir-Roman',
                }}>
                ${item.price}
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: H_W.width * 0.25,
                }}>
                <TouchableOpacity
                  onPress={() => YgRemoveFromCart(item)}
                  style={{
                    padding: 4,
                    backgroundColor: colors.lightBackground,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 4.2,
                  }}>
                  <FontAwesome name="minus" color={colors.darkGray} />
                </TouchableOpacity>
                <View
                  style={{
                    padding: 4,
                    backgroundColor: colors.lightBackground,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 4.2,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.darkGray,
                      fontSize: 13,
                    }}>
                    {item.added}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => YgAddToCart(item)}
                  style={{
                    padding: 4,
                    backgroundColor: colors.lightBackground,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 4.2,
                  }}>
                  <FontAwesome name="plus" color={colors.darkGray} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: H_W.width * 0.05,
            paddingVertical: HEIGHT * 0.007,
            marginBottom: HEIGHT * 0.015,
            borderTopWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            Total Price
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            ${props.YgTotal}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={YginfoScreen}
            disabled={props.YgTotalItems === 0}
            title="Checkout"
            buttonStyle={{
              backgroundColor: colors.primary,
              paddingVertical: HEIGHT * 0.015,
            }}
            containerStyle={{width: '92%'}}
          />
        </View>
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  YgCart: state.YgCartReducer.items,
  YgTotal: state.YgCartReducer.totalAmount,
  YgFavs: state.YgToggleFav,
  YgTotalItems: state.YgCartReducer.totalItems,
});

export default connect(mapStateToProps, {
  YgremoveCartAction,
  YgaddCartAction,
  YgsetCurrentProductAction,
  YgsetFavAction,
  YgremoveFavAction,
  YgresetCart,
})(Cart);
