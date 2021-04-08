/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  YgremoveFavAction,
  YgsetFavAction,
  YgsetCurrentProductAction,
} from '../YgStateManagement/YgActions';
import {H_W} from '../YgFrequentUsage/YgResponsive';
import YgHeader from '../YgFrequentUsage/YgHeader';
import {colors} from '../YgFrequentUsage/YgColor';
import WrapperScreen from '../YgFrequentUsage/YgWrapperScreen';
import Loop from '../YgFrequentUsage/YgFlatList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationRef from '../YgFrequentUsage/YgRefNavigation';
import {YgVerticalTile} from './YgHome';

const YgFavourites = (props) => {
  const YgGoToSingleProduct = (item) => {
    props.YgsetCurrentProductAction(item);
    NavigationRef.Navigate('YgSP');
  };

  const YgGoBack = () => NavigationRef.Navigate('YgHome');

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
          bottom: 0,
          right: 0,
        }}
      />
      <View style={{flex: 1}}>
        <Loop
          horizontal={false}
          data={props.YgFavs}
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
          ListHeaderComponent={
            <YgHeader
              leftIcon={AntDesign}
              leftIconName="arrowleft"
              leftIconAction={YgGoBack}
              Title={
                <Text style={styles.YgFav2}>
                  {props.YgFavs.length} Favourites
                </Text>
              }
            />
          }
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    YgFavs: state.YgToggleFav,
  };
};

export default connect(mapStateToProps, {
  YgsetFavAction,
  YgsetCurrentProductAction,
  YgremoveFavAction,
})(YgFavourites);

const styles = StyleSheet.create({
  YgFav1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  YgFav2: {
    color: colors.primary,
    fontSize: 22,
  },
  YgFav3: {},
  YgFav4: {},
});
