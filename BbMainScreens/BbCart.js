/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  BbremoveCartAction,
  BbaddCartAction,
  BbsetCurrentProductAction,
  BbsetFavAction,
  BbremoveFavAction,
  BbresetCart,
} from '../BbStateManagement/BbActions';
import WrapperScreen from '../BbFrequentUsage/BbWrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../BbFrequentUsage/BbColor';
import {H_W} from '../BbFrequentUsage/BbResponsive';
import RefNavigation from '../BbFrequentUsage/BbRefNavigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import Loop from '../BbFrequentUsage//BbFlatList';
import BbHeader from '../BbFrequentUsage/BbHeader';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, []);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.BbCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.BbCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const BbGoBack = () => RefNavigation.GoBack();

  const BbAddToCart = (item) => {
    props.BbaddCartAction({...item});
  };

  const BbRemoveFromCart = (item) => {
    props.BbCart[item.id] !== undefined && props.BbremoveCartAction(item);
  };

  const BbGoToSingleProduct = (item) => {
    props.BbsetCurrentProductAction(item);
    RefNavigation.Navigate('BbSP');
  };
  const BbinfoScreen = () => RefNavigation.Navigate('BbContact');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'rgba(188,188,188,0.15)',
          transform: [{scaleX: H_W.width * 0.016}, {scaleY: H_W.width * 0.017}],
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
      <BbHeader
        leftIcon={AntDesign}
        leftIconName="arrowleft"
        leftIconColor={colors.primary}
        leftIconAction={BbGoBack}
        rightIcon={MaterialIcons}
        rightIconName="delete-outline"
        rightIconAction={() => props.BbresetCart()}
        Title=""
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: H_W.width * 0.06,
          marginBottom: HEIGHT * 0.02,
          marginTop: HEIGHT * 0.02,
        }}>
        <View>
          <Text style={{fontSize: 24}}>Shopping</Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
            }}>
            Cart
          </Text>
        </View>
      </View>
      <Loop
        horizontal={false}
        data={HorizontalCartArray}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => BbGoToSingleProduct(item)}
            style={{
              width: H_W.width,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              marginBottom: HEIGHT * 0.02,
            }}>
            <ImageBackground
              source={item.image}
              style={{
                width: H_W.width * 0.38,
                height: HEIGHT * 0.18,
              }}
              imageStyle={{marginLeft: H_W.width * 0.045}}
              resizeMode="contain">
              <View
                style={{
                  height: HEIGHT * 0.125,
                  position: 'absolute',
                  bottom: 0,
                  zIndex: -1,
                  width: '100%',
                  backgroundColor: item.bgcolor,
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.2,
                }}
              />
            </ImageBackground>
            <View
              style={{
                marginLeft: H_W.width * 0.045,
                height: HEIGHT * 0.125,
                width: H_W.width * 0.42,
              }}>
              <Text numberOfLines={2} style={{fontSize: 16.5}}>
                {item.product}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                ${item.price}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                height: HEIGHT * 0.125,
                marginLeft: H_W.width * 0.03,
              }}>
              <TouchableOpacity
                onPress={() => BbRemoveFromCart(item)}
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
                  shadowRadius: 2.2,
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
                  shadowRadius: 2.2,
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
                onPress={() => BbAddToCart(item)}
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
                  shadowRadius: 2.2,
                }}>
                <FontAwesome name="plus" color={colors.darkGray} />
              </TouchableOpacity>
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
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: colors.lightGrey3,
            }}>
            {props.BbTotalItems} items
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            ${props.BbTotal}
          </Text>
        </View>
        <Button
          onPress={BbinfoScreen}
          disabled={props.BbTotalItems === 0}
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
          }}
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  BbCart: state.BbCartReducer.items,
  BbTotal: state.BbCartReducer.totalAmount,
  BbFavs: state.BbToggleFav,
  BbTotalItems: state.BbCartReducer.totalItems,
});

export default connect(mapStateToProps, {
  BbremoveCartAction,
  BbaddCartAction,
  BbsetCurrentProductAction,
  BbsetFavAction,
  BbremoveFavAction,
  BbresetCart,
})(Cart);
