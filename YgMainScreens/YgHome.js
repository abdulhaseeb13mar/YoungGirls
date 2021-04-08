/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import WrapperScreen from '../YgFrequentUsage/YgWrapperScreen';
import {colors} from '../YgFrequentUsage/YgColor';
import {H_W} from '../YgFrequentUsage/YgResponsive';
import Data from '../YgData';
import Loop from '../YgFrequentUsage/YgFlatList';
import RefNavigation from '../YgFrequentUsage/YgRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  YgsetCurrentProductAction,
  YgremoveFavAction,
  YgsetFavAction,
} from '../YgStateManagement/YgActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import YgHeader from '../YgFrequentUsage/YgHeader';

function YgHome(props) {
  useEffect(() => {
    YgchangeTab(Data.Category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Ygcategories, setYgcategories] = useState(Data.Category);
  const [YgcurrentCat, setYgCurrentCat] = useState(Data.Category[0]);
  const [YgtabProducts, setYgTabProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState(Data.Popular);

  const YgchangeTab = (tab) => {
    setYgCurrentCat(tab);
    const filteredProducts = Data.Product.filter(
      (item) => item.categoryid === tab.id,
    );
    setYgTabProducts(filteredProducts);
  };

  const YgGotoFav = () => RefNavigation.Navigate('YgFav');
  const YgGotoCart = () => RefNavigation.Navigate('YgCart');
  const YgGotoSearch = () => RefNavigation.Navigate('YgSearch');
  const YgGoToSingleProduct = (item) => {
    props.YgsetCurrentProductAction(item);
    RefNavigation.Navigate('YgSP');
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
        <YgHeader
          leftIcon={Ionicons}
          leftIconName="ios-heart-circle"
          leftIconColor={colors.primary}
          leftIconAction={YgGotoFav}
          rightIconColor="black"
          rightIcon={MaterialCommunityIcons}
          rightIconName="cart-outline"
          rightIconAction={YgGotoCart}
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
            onPress={YgGotoSearch}
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
          data={Ygcategories}
          renderItem={({item}) => (
            <TabList
              item={item}
              YgcurrentCat={YgcurrentCat}
              YgchangeTab={YgchangeTab}
            />
          )}
        />
        <Loop
          style={{marginVertical: HEIGHT * 0.03}}
          data={YgtabProducts}
          renderItem={({item}) => (
            <YgVerticalTile
              item={item}
              YgGoToSingleProduct={YgGoToSingleProduct}
              YgFavs={props.YgFavs}
              YgremoveFav={(Yg) => props.YgremoveFavAction(Yg)}
              YgsetFav={(Yg) => props.YgsetFavAction(Yg)}
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
            <YgVerticalTile
              item={item}
              YgGoToSingleProduct={YgGoToSingleProduct}
              YgFavs={props.YgFavs}
              YgremoveFav={(Yg) => props.YgremoveFavAction(Yg)}
              YgsetFav={(Yg) => props.YgsetFavAction(Yg)}
            />
          )}
        />
      </ScrollView>
    </WrapperScreen>
  );
}

export const YgVerticalTile = ({
  item,
  YgGoToSingleProduct,
  YgFavs,
  YgremoveFav,
  YgsetFav,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const checkIfFav = () => {
    for (let Yg = 0; Yg < YgFavs.length; Yg++) {
      if (YgFavs[Yg].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? YgremoveFav(item.id) : YgsetFav(item);
    setFav(!fav);
  };
  return (
    <TouchableOpacity
      onPress={() => YgGoToSingleProduct(item)}
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

export const TabList = ({item, YgchangeTab, YgcurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => YgchangeTab(item)}
      style={{
        paddingHorizontal: H_W.width * 0.06,
        paddingVertical: HEIGHT * 0.009,
        borderRadius: 50,
        backgroundColor:
          YgcurrentCat.id === item.id ? colors.primary : colors.lightBackground,
        marginHorizontal: H_W.width * 0.02,
        shadowColor:
          YgcurrentCat.id === item.id
            ? `rgba(${colors.rgb_Primary},1)`
            : '#000',
        shadowOffset: {
          width: 0,
          height: YgcurrentCat.id === item.id ? 10 : 3,
        },
        shadowOpacity: YgcurrentCat.id === item.id ? 0.47 : 0.27,
        shadowRadius: YgcurrentCat.id === item.id ? 10.65 : 4.65,
      }}>
      <Text
        style={{
          fontSize: 15.5,
          color: YgcurrentCat.id === item.id ? 'white' : colors.lightGrey3,
          fontWeight: 'bold',
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    YgtotalItems: state.YgCartReducer.totalItems,
    YgFavs: state.YgToggleFav,
  };
};

export default connect(mapStateToProps, {
  YgsetCurrentProductAction,
  YgremoveFavAction,
  YgsetFavAction,
})(YgHome);
