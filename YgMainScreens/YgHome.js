/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import WrapperScreen from '../YgFrequentUsage/YgWrapperScreen';
import {colors, textFont} from '../YgFrequentUsage/YgColor';
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
import dp from '../YgAllAssets/Images/guerlain4.png';

function YgHome(props) {
  useEffect(() => {
    // YgchangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Ygcategories, setYgcategories] = useState(Data.category);
  const [YgcurrentCat, setYgCurrentCat] = useState(Data.category[0]);
  const [YgtabProducts, setYgTabProducts] = useState([]);
  // const [popularProducts, setPopularProducts] = useState(Data.Popular);

  const YgchangeTab = (tab) => {
    setYgCurrentCat(tab);
    const filteredProducts = Data.product.filter(
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
    <WrapperScreen
      statusColor={`rgba(${colors.rgb_Primary},0.1)`}
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary},0.1)`,
      }}>
      <ScrollView>
        <Text
          style={{
            fontFamily: 'TimesNewRomanPS-BoldMT',
            fontSize: 45,
            marginLeft: H_W.width * 0.05,
            color: colors.darkBlue,
          }}>
          Beauty
        </Text>
        <Text
          style={{
            fontFamily: 'TimesNewRomanPS-BoldMT',
            fontSize: 45,
            marginLeft: H_W.width * 0.05,
            color: colors.darkBlue,
          }}>
          Cosmetics
        </Text>
        <Loop
          data={Ygcategories}
          renderItem={({item}) => (
            <TabList
              item={item}
              YgchangeTab={YgchangeTab}
              YgcurrentCat={YgcurrentCat}
            />
          )}
        />
        <Text
          style={{
            marginLeft: H_W.width * 0.05,
            fontFamily: textFont.TimesNewRoman,
            fontSize: 22,
            marginTop: HEIGHT * 0.01,
          }}>
          Popular {YgcurrentCat.Categoryname}
        </Text>
        <Loop
          data={YgtabProducts}
          renderItem={({item}) => (
            <YgVerticalTile
              item={item}
              YgFavs={props.YgFavs}
              YgsetFav={(Yg) => props.YgsetFavAction(Yg)}
              YgremoveFav={(Yg) => props.YgremoveFavAction(Yg)}
              YgGoToSingleProduct={YgGoToSingleProduct}
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
    <View
      style={{
        width: H_W.width * 0.45,
        ...border,
        margin: 15,
        overflow: 'visible',
      }}>
      <TouchableOpacity onPress={toggleFav}>
        <Entypo
          style={{alignSelf: 'flex-end', marginBottom: HEIGHT * 0.04}}
          size={24}
          color={colors.primary}
          name={fav ? 'heart' : 'heart-outlined'}
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: `rgba(${colors.rgb_Primary},0.6)`,
          // paddingHorizontal: H_W.width * 0.01,
          paddingBottom: HEIGHT * 0.015,
          borderRadius: H_W.width * 0.09,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
        }}>
        <FastImage
          source={item.images}
          style={{
            width: '100%',
            height: HEIGHT * 0.25,
            ...border,
            marginTop: -H_W.width * 0.09,
          }}
          resizeMode="contain"
        />
      </View>
      <Text
        numberOfLines={1}
        style={{
          ...border,
          textAlign: 'center',
          marginTop: HEIGHT * 0.02,
          fontFamily: textFont.TimesNewRoman,
          fontSize: 20,
        }}>
        {item.productname}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          ...border,
          textAlign: 'center',
          fontFamily: textFont.TimesNewRoman,
          color: colors.darkGray,
          fontSize: 16.5,
          marginTop: HEIGHT * 0.005,
        }}>
        {item.types}
      </Text>
    </View>
  );
};

export const TabList = ({item, YgchangeTab, YgcurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: H_W.width * 0.03,
        paddingHorizontal: H_W.width * 0.02,
        paddingTop: H_W.width * 0.02,
      }}
      onPress={() => YgchangeTab(item)}>
      <View
        style={{
          padding: H_W.width * 0.03,
          borderRadius: H_W.width * 0.08,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          backgroundColor:
            item.Categoryname === YgcurrentCat.Categoryname
              ? colors.primary
              : 'white',
        }}>
        <FastImage
          source={
            item.Categoryname === YgcurrentCat.Categoryname
              ? item.iconwhite
              : item.iconBrown
          }
          resizeMode="contain"
          style={{
            width: H_W.width * 0.13,
            height: H_W.width * 0.13,
          }}
        />
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          color:
            item.Categoryname === YgcurrentCat.Categoryname
              ? colors.darkGray
              : colors.darkGray,
          opacity: item.Categoryname === YgcurrentCat.Categoryname ? 1 : 0.6,
          fontSize:
            item.Categoryname === YgcurrentCat.Categoryname
              ? H_W.width * 0.045
              : H_W.width * 0.04,
          marginTop: HEIGHT * 0.01,
        }}>
        {item.Categoryname}
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

const border = {
  borderColor: 'red',
  // borderWidth: 1,
};

export default connect(mapStateToProps, {
  YgsetCurrentProductAction,
  YgremoveFavAction,
  YgsetFavAction,
})(YgHome);
