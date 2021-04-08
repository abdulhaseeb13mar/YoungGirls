/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WrapperScreen from '../YgFrequentUsage/YgWrapperScreen';
import {H_W} from '../YgFrequentUsage/YgResponsive';
import NavigationRef from '../YgFrequentUsage/YgRefNavigation';
import {colors} from '../YgFrequentUsage/YgColor';
import Data from '../YgData';
import Loop from '../YgFrequentUsage/YgFlatList';
import {connect} from 'react-redux';
import {
  YgsetCurrentProductAction,
  YgsetFavAction,
  YgremoveFavAction,
} from '../YgStateManagement/YgActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import YgSearchBar from '../YgFrequentUsage/YgSearchBar';
import YgHeader from '../YgFrequentUsage/YgHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {YgVerticalTile} from './YgHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.Product.filter((item) =>
      item.product.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const YgGoToSingleProduct = (item) => {
    props.YgsetCurrentProductAction(item);
    NavigationRef.Navigate('YgSP');
  };

  const CardRender = (Arr) => {
    return (
      <Loop
        horizontal={false}
        data={Arr}
        renderItem={({item}) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <YgVerticalTile
              item={item}
              YgGoToSingleProduct={YgGoToSingleProduct}
              YgFavs={props.YgFavs}
              YgsetFav={(fd) => props.YgsetFavAction(fd)}
              YgremoveFav={(fd) => props.YgremoveFavAction(fd)}
            />
          </View>
        )}
      />
    );
  };
  const YgGoBack = () => NavigationRef.GoBack();

  const YgchangeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: colors.lightBackground}}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'rgba(188,188,188,0.15)',
          transform: [{scaleX: H_W.width * 0.016}, {scaleY: H_W.width * 0.017}],
          position: 'absolute',
          bottom: 0,
        }}
      />
      <View style={styles.YgSearch1}>
        <YgHeader
          leftIcon={AntDesign}
          leftIconName="arrowleft"
          leftIconColor={colors.primary}
          leftIconAction={YgGoBack}
          Title={<Text style={styles.YgSearch2}>Search</Text>}
        />
        <View style={styles.YgSearch3}>
          <View
            style={{
              marginTop: HEIGHT * 0.01,
              marginBottom: -HEIGHT * 0.02,
              ...styles.YgSearch4,
            }}>
            <YgSearchBar changeSearchText={YgchangeSearchText} />
          </View>
        </View>
      </View>
      <View style={{marginTop: HEIGHT * 0.06, flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.Product)}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  YgFavs: state.YgToggleFav,
});

export default connect(mapStateToProps, {
  YgsetCurrentProductAction,
  YgsetFavAction,
  YgremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  YgSearch1: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  YgSearch2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primary,
  },
  YgSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  YgSearch4: {
    width: '85%',
  },
  YgSearch5: {},
  YgSearch6: {},
});
