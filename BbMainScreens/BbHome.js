/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import WrapperScreen from '../BbFrequentUsage/BbWrapperScreen';
import {colors} from '../BbFrequentUsage/BbColor';
import {H_W} from '../BbFrequentUsage/BbResponsive';
import Data from '../BbData';
import Loop from '../BbFrequentUsage//BbFlatList';
import RefNavigation from '../BbFrequentUsage/BbRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  BbsetCurrentProductAction,
  BbremoveFavAction,
  BbsetFavAction,
} from '../BbStateManagement/BbActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BbHeader from '../BbFrequentUsage/BbHeader';

function BbHome(props) {
  useEffect(() => {
    BbchangeTab(Data.Category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Bbcategories, setBbcategories] = useState(Data.Category);
  const [BbcurrentCat, setBbCurrentCat] = useState(Data.Category[0]);
  const [BbtabProducts, setBbTabProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState(Data.Popular);

  const BbchangeTab = (tab) => {
    setBbCurrentCat(tab);
    const filteredProducts = Data.Product.filter(
      (item) => item.categoryid === tab.id,
    );
    setBbTabProducts(filteredProducts);
  };

  const BbGotoFav = () => RefNavigation.Navigate('BbFav');
  const BbGotoCart = () => RefNavigation.Navigate('BbCart');
  const BbGotoSearch = () => RefNavigation.Navigate('BbSearch');
  const BbGoToSingleProduct = (item) => {
    props.BbsetCurrentProductAction(item);
    RefNavigation.Navigate('BbSP');
  };

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
        }}
      />
      <ScrollView style={{marginTop: 10}} bounces={false}>
        <BbHeader
          leftIcon={Ionicons}
          leftIconName="ios-heart-circle"
          leftIconColor={colors.primary}
          leftIconAction={BbGotoFav}
          rightIconColor="black"
          rightIcon={MaterialCommunityIcons}
          rightIconName="cart-outline"
          rightIconAction={BbGotoCart}
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
            <Text style={{fontSize: 24}}>Our</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 24,
              }}>
              Products
            </Text>
          </View>
          <TouchableOpacity
            onPress={BbGotoSearch}
            style={{
              padding: 8,
              backgroundColor: 'white',
              borderRadius: 50,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
            }}>
            <Ionicons
              name="md-search"
              size={20}
              color={colors.darkGray}
              style={{}}
            />
          </TouchableOpacity>
        </View>
        <Loop
          style={{marginBottom: HEIGHT * 0.02}}
          data={Bbcategories}
          renderItem={({item}) => (
            <TabList
              item={item}
              BbcurrentCat={BbcurrentCat}
              BbchangeTab={BbchangeTab}
            />
          )}
        />
        <Loop
          style={{marginVertical: HEIGHT * 0.03}}
          data={BbtabProducts}
          renderItem={({item}) => (
            <BbVerticalTile
              item={item}
              BbGoToSingleProduct={BbGoToSingleProduct}
              BbFavs={props.BbFavs}
              BbremoveFav={(Bb) => props.BbremoveFavAction(Bb)}
              BbsetFav={(Bb) => props.BbsetFavAction(Bb)}
            />
          )}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            marginLeft: H_W.width * 0.06,
            marginTop: HEIGHT * 0.01,
          }}>
          Popular Bags
        </Text>
        <Loop
          style={{marginTop: HEIGHT * 0.03}}
          data={popularProducts}
          renderItem={({item}) => (
            <BbVerticalTile
              item={item}
              BbGoToSingleProduct={BbGoToSingleProduct}
              BbFavs={props.BbFavs}
              BbremoveFav={(Bb) => props.BbremoveFavAction(Bb)}
              BbsetFav={(Bb) => props.BbsetFavAction(Bb)}
            />
          )}
        />
      </ScrollView>
    </WrapperScreen>
  );
}

export const BbVerticalTile = ({
  item,
  BbGoToSingleProduct,
  BbFavs,
  BbremoveFav,
  BbsetFav,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const checkIfFav = () => {
    for (let Bb = 0; Bb < BbFavs.length; Bb++) {
      if (BbFavs[Bb].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? BbremoveFav(item.id) : BbsetFav(item);
    setFav(!fav);
  };
  return (
    <TouchableOpacity
      onPress={() => BbGoToSingleProduct(item)}
      style={{
        width: H_W.width * 0.55,
        paddingHorizontal: H_W.width * 0.03,
        paddingTop: H_W.width * 0.03,
        paddingBottom: H_W.width * 0.06,
        borderRadius: 19,
        backgroundColor: item.bgcolor,
        marginHorizontal: H_W.width * 0.05,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 18.65,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          <Text style={{color: 'black', fontSize: 18}}>
            {item.product.split(' ')[0]}
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {item.product.split(' ')[1]}
          </Text>
        </View>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
          ${item.price}
        </Text>
      </View>
      <FastImage
        source={item.image}
        style={{
          width: '100%',
          height: HEIGHT * 0.3,
          marginLeft: H_W.width * 0.15,
          marginBottom: HEIGHT * 0.015,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          width: '100%',
          bottom: 0,
          right: 0,
        }}>
        <TouchableOpacity onPress={toggleFav}>
          <AntDesign name={fav ? 'heart' : 'hearto'} color="white" size={20} />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            borderBottomRightRadius: 19,
            borderTopLeftRadius: 19,
            paddingVertical: HEIGHT * 0.007,
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Entypo name="plus" size={23} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TabList = ({item, BbchangeTab, BbcurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => BbchangeTab(item)}
      style={{
        paddingHorizontal: H_W.width * 0.06,
        paddingVertical: HEIGHT * 0.009,
        borderRadius: 50,
        backgroundColor:
          BbcurrentCat.id === item.id ? colors.primary : colors.lightBackground,
        marginHorizontal: H_W.width * 0.02,
        shadowColor:
          BbcurrentCat.id === item.id
            ? `rgba(${colors.rgb_Primary},1)`
            : '#000',
        shadowOffset: {
          width: 0,
          height: BbcurrentCat.id === item.id ? 10 : 3,
        },
        shadowOpacity: BbcurrentCat.id === item.id ? 0.47 : 0.27,
        shadowRadius: BbcurrentCat.id === item.id ? 10.65 : 4.65,
      }}>
      <Text
        style={{
          fontSize: 15.5,
          color: BbcurrentCat.id === item.id ? 'white' : colors.lightGrey3,
          fontWeight: 'bold',
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    BbtotalItems: state.BbCartReducer.totalItems,
    BbFavs: state.BbToggleFav,
  };
};

export default connect(mapStateToProps, {
  BbsetCurrentProductAction,
  BbremoveFavAction,
  BbsetFavAction,
})(BbHome);
