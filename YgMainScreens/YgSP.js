/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {H_W} from '../YgFrequentUsage/YgResponsive';
import WrapperScreen from '../YgFrequentUsage/YgWrapperScreen';
import {connect} from 'react-redux';
import {colors, textFont} from '../YgFrequentUsage/YgColor';
import NavigationRef from '../YgFrequentUsage/YgRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  YgremoveFavAction,
  YgsetFavAction,
  YgaddCartAction,
  YgremoveCartAction,
} from '../YgStateManagement/YgActions';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Badge} from 'react-native-elements';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const YgProduct = props.YgProduct;
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const checkIfFav = () => {
    for (let Yg = 0; Yg < props.YgFavs.length; Yg++) {
      if (props.YgFavs[Yg].id === YgProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.YgremoveFavAction(YgProduct.id)
      : props.YgsetFavAction(YgProduct);
    setFav(!fav);
  };

  const YgAddToCart = () => {
    props.YgaddCartAction({...YgProduct});
  };

  const YgRemoveFromCart = () => {
    props.YgCart[YgProduct.id] !== undefined &&
      props.YgremoveCartAction(YgProduct);
  };

  const YgGotoCart = () => NavigationRef.Navigate('YgCart');
  const YgGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      statusColor={`rgba(${colors.rgb_Primary},0.1)`}
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary},0.1)`,
      }}>
      <View
        style={{
          backgroundColor: `rgba(${colors.rgb_Primary},0.9)`,
          width: H_W.width * 0.78,
          height: HEIGHT * 0.53,
          position: 'absolute',
          right: 0,
          marginTop: -HEIGHT * 0.062,
          borderBottomLeftRadius: 45,
        }}
      />
      <KeyboardAwareScrollView bounces={false}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: H_W.width * 0.04,
              marginTop: HEIGHT * 0.03,
            }}>
            <TouchableOpacity onPress={YgGoBack}>
              <Fontisto name="arrow-left-l" size={23} />
            </TouchableOpacity>
            <TouchableOpacity onPress={YgGotoCart}>
              <Feather name="shopping-cart" color="white" size={23} />
              {props.totalItems > 0 && (
                <Badge
                  value={props.totalItems}
                  containerStyle={{position: 'absolute', bottom: 0, right: 0}}
                  badgeStyle={{
                    backgroundColor: 'red',
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <ImageBackground
            source={YgProduct.images}
            style={{
              width: H_W.width * 0.78,
              height: HEIGHT * 0.5,
              alignSelf: 'flex-end',
              marginTop: HEIGHT * 0.015,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.45,
              shadowRadius: 15.78,
            }}
            resizeMode="contain">
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderColor: colors.lightGrey3,
                borderWidth: 1,
                borderRadius: H_W.width * 0.05,
                backgroundColor: 'white',
                width: H_W.width * 0.12,
                height: HEIGHT * 0.15,
                position: 'absolute',
                top: HEIGHT * 0.12,
                left: -H_W.width * 0.06,
              }}>
              <TouchableOpacity
                style={{
                  padding: 3,
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={YgRemoveFromCart}>
                <Entypo name="minus" size={20} />
              </TouchableOpacity>
              <Text style={{fontSize: 17}}>
                {props.YgCart[YgProduct.id] !== undefined
                  ? props.YgCart[YgProduct.id].added
                  : 0}
              </Text>
              <TouchableOpacity
                style={{
                  padding: 3,
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={YgAddToCart}>
                <Entypo name="plus" size={20} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={toggleFav}
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                right: H_W.width * 0.12,
                top: HEIGHT * 0.36,
                padding: 10,
                borderRadius: 50,
                elevation: 4,
              }}>
              <Ionicons name={fav ? 'ios-heart' : 'heart-outline'} size={20} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: H_W.width * 0.04,
            marginTop: HEIGHT * 0.015,
          }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: textFont.TimesNewRoman,
              width: H_W.width * 0.65,
            }}>
            {YgProduct.productname}
          </Text>
          <View
            style={{
              padding: H_W.width * 0.02,
              backgroundColor: `rgba(${colors.rgb_Primary},0.9)`,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginLeft: H_W.width * 0.01,
              }}>
              {YgProduct.weight}
            </Text>
          </View>
        </View>
        <Text
          style={{
            paddingHorizontal: H_W.width * 0.04,
            marginTop: HEIGHT * 0.015,
            fontSize: 18,
            fontFamily: textFont.TimesNewRoman,
            color: colors.darkGray,
          }}>
          {YgProduct.types}
        </Text>
        <Text
          style={{
            paddingHorizontal: H_W.width * 0.04,
            marginTop: HEIGHT * 0.015,
            fontSize: 17,
            fontFamily: textFont.TimesNewRoman,
            color: colors.darkGray,
            lineHeight: HEIGHT * 0.03,
          }}>
          {YgProduct.discription}
        </Text>
        <View style={{alignItems: 'center', marginVertical: HEIGHT * 0.02}}>
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 50,
              width: '87%',
              flexDirection: 'row',
              alignItems: 'center',
              height: HEIGHT * 0.075,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 8.65,
            }}>
            <Text
              style={{
                width: '30%',
                paddingLeft: H_W.width * 0.04,
                fontSize: 22,
                color: 'white',
                fontWeight: 'bold',
                fontFamily: textFont.TimesNewRoman,
              }}>
              ${YgProduct.price}
            </Text>
            <TouchableOpacity
              onPress={YgAddToCart}
              style={{
                width: '70%',
                backgroundColor: 'white',
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'stretch',
                padding: 4,
              }}>
              <Text
                style={{
                  paddingLeft: H_W.width * 0.04,
                  fontSize: 20,
                  color: colors.primary,
                  fontWeight: 'bold',
                  fontFamily: textFont.TimesNewRoman,
                }}>
                Add to Cart
              </Text>
              <View
                style={{
                  padding: 6,
                  backgroundColor: colors.primary,
                  borderRadius: 50,
                  alignSelf: 'stretch',
                  width: '28%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="shopping-cart" color="white" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    YgProduct: state.YgCrntPrdtReducer,
    YgFavs: state.YgToggleFav,
    totalItems: state.YgCartReducer.totalItems,
    YgCart: state.YgCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  YgsetFavAction,
  YgremoveFavAction,
  YgremoveCartAction,
  YgaddCartAction,
})(React.memo(SingleProduct));
