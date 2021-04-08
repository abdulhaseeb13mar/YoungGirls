/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WrapperScreen from '../BbFrequentUsage/BbWrapperScreen';
import {H_W} from '../BbFrequentUsage/BbResponsive';
import NavigationRef from '../BbFrequentUsage/BbRefNavigation';
import {colors} from '../BbFrequentUsage/BbColor';
import Data from '../BbData';
import Loop from '../BbFrequentUsage//BbFlatList';
import {connect} from 'react-redux';
import {
  BbsetCurrentProductAction,
  BbsetFavAction,
  BbremoveFavAction,
} from '../BbStateManagement/BbActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BbSearchBar from '../BbFrequentUsage/BbSearchBar';
import BbHeader from '../BbFrequentUsage/BbHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BbVerticalTile} from './BbHome';

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

  const BbGoToSingleProduct = (item) => {
    props.BbsetCurrentProductAction(item);
    NavigationRef.Navigate('BbSP');
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
            <BbVerticalTile
              item={item}
              BbGoToSingleProduct={BbGoToSingleProduct}
              BbFavs={props.BbFavs}
              BbsetFav={(fd) => props.BbsetFavAction(fd)}
              BbremoveFav={(fd) => props.BbremoveFavAction(fd)}
            />
          </View>
        )}
      />
    );
  };
  const BbGoBack = () => NavigationRef.GoBack();

  const BbchangeSearchText = (t) => setSearchText(t);
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
      <View style={styles.BbSearch1}>
        <BbHeader
          leftIcon={AntDesign}
          leftIconName="arrowleft"
          leftIconColor={colors.primary}
          leftIconAction={BbGoBack}
          Title={<Text style={styles.BbSearch2}>Search</Text>}
        />
        <View style={styles.BbSearch3}>
          <View
            style={{
              marginTop: HEIGHT * 0.01,
              marginBottom: -HEIGHT * 0.02,
              ...styles.BbSearch4,
            }}>
            <BbSearchBar changeSearchText={BbchangeSearchText} />
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
  BbFavs: state.BbToggleFav,
});

export default connect(mapStateToProps, {
  BbsetCurrentProductAction,
  BbsetFavAction,
  BbremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  BbSearch1: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  BbSearch2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primary,
  },
  BbSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  BbSearch4: {
    width: '85%',
  },
  BbSearch5: {},
  BbSearch6: {},
});
