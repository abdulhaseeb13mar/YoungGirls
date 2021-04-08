/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {H_W} from '../BbFrequentUsage/BbResponsive';
import WrapperScreen from '../BbFrequentUsage/BbWrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../BbFrequentUsage/BbColor';
import NavigationRef from '../BbFrequentUsage/BbRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BbremoveFavAction,
  BbsetFavAction,
  BbaddCartAction,
  BbremoveCartAction,
} from '../BbStateManagement/BbActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import StarRating from '../starRating';
import {Badge} from 'react-native-elements';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const BbProduct = props.BbProduct;
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const checkIfFav = () => {
    for (let Bb = 0; Bb < props.BbFavs.length; Bb++) {
      if (props.BbFavs[Bb].id === BbProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.BbremoveFavAction(BbProduct.id)
      : props.BbsetFavAction(BbProduct);
    setFav(!fav);
  };

  const BbAddToCart = () => {
    props.BbaddCartAction({...BbProduct});
  };

  const BbRemoveFromCart = () => {
    props.BbCart[BbProduct.id] !== undefined &&
      props.BbremoveCartAction(BbProduct);
  };

  const BbGotoCart = () => NavigationRef.Navigate('BbCart');
  const BbGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      style={{backgroundColor: BbProduct.bgcolor}}
      statusBar={BbProduct.bgcolor}>
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
            <TouchableOpacity onPress={BbGoBack}>
              <AntDesign name="arrowleft" size={23} />
            </TouchableOpacity>
            <TouchableOpacity onPress={BbGotoCart}>
              <MaterialCommunityIcons name="cart-outline" size={23} />
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
          <FastImage
            source={BbProduct.image}
            style={{
              width: H_W.width * 0.8,
              height: HEIGHT * 0.6,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.45,
              shadowRadius: 15.78,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: H_W.width * 0.1,
          }}>
          <TouchableOpacity
            onPress={toggleFav}
            style={{
              backgroundColor: 'white',
              alignSelf: 'flex-end',
              padding: 10,
              borderRadius: 50,
              elevation: 4,
              marginTop: -HEIGHT * 0.028,
            }}>
            <Ionicons name={fav ? 'ios-heart' : 'heart-outline'} size={20} />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'flex-start',
              width: H_W.width * 0.65,
              fontWeight: 'bold',
              fontSize: 23,
            }}>
            {BbProduct.product}
          </Text>
          <View
            style={{
              alignSelf: 'flex-start',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <StarRating rating={2.5} size={H_W.width * 0.18} />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.lightBackground2,
                  marginLeft: H_W.width * 0.04,
                }}>
                {BbProduct.rating}
              </Text>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 19}}>
              ${BbProduct.price}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              lineHeight: HEIGHT * 0.03,
              marginTop: HEIGHT * 0.02,
            }}>
            {BbProduct.dis}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: HEIGHT * 0.01,
            }}>
            <Text
              style={{
                color: colors.lightGrey3,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Quantity
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '35%',
              }}>
              <TouchableOpacity
                onPress={BbRemoveFromCart}
                style={{
                  padding: 6,
                  backgroundColor: colors.lightBackground,
                  borderRadius: 5,
                }}>
                <FontAwesome name="minus" color={colors.darkGray} />
              </TouchableOpacity>
              <View
                style={{
                  padding: 5,
                  backgroundColor: colors.lightBackground,
                  borderRadius: 5,
                }}>
                <Text style={{fontWeight: 'bold', color: colors.darkGray}}>
                  {props.BbCart[BbProduct.id] === undefined
                    ? 0
                    : props.BbCart[BbProduct.id].added}
                </Text>
              </View>
              <TouchableOpacity
                onPress={BbAddToCart}
                style={{
                  padding: 6,
                  backgroundColor: colors.lightBackground,
                  borderRadius: 5,
                }}>
                <FontAwesome name="plus" color={colors.darkGray} />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            onPress={BbAddToCart}
            title="Add To My Cart"
            buttonStyle={{
              backgroundColor: colors.primary,
              borderRadius: 50,
              paddingVertical: HEIGHT * 0.02,
            }}
            icon={
              <MaterialCommunityIcons
                name="cart-outline"
                size={20}
                color="white"
                style={{marginRight: H_W.width * 0.01}}
              />
            }
            containerStyle={{
              width: H_W.width,
              borderRadius: 50,
              marginTop: HEIGHT * 0.02,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    BbProduct: state.BbCrntPrdtReducer,
    BbFavs: state.BbToggleFav,
    totalItems: state.BbCartReducer.totalItems,
    BbCart: state.BbCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  BbsetFavAction,
  BbremoveFavAction,
  BbremoveCartAction,
  BbaddCartAction,
})(React.memo(SingleProduct));
