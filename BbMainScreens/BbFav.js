/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  BbremoveFavAction,
  BbsetFavAction,
  BbsetCurrentProductAction,
} from '../BbStateManagement/BbActions';
import {H_W} from '../BbFrequentUsage/BbResponsive';
import BbHeader from '../BbFrequentUsage/BbHeader';
import {colors} from '../BbFrequentUsage/BbColor';
import WrapperScreen from '../BbFrequentUsage/BbWrapperScreen';
import Loop from '../BbFrequentUsage//BbFlatList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationRef from '../BbFrequentUsage/BbRefNavigation';
import {BbVerticalTile} from './BbHome';

const BbFavourites = (props) => {
  const BbGoToSingleProduct = (item) => {
    props.BbsetCurrentProductAction(item);
    NavigationRef.Navigate('BbSP');
  };

  const BbGoBack = () => NavigationRef.Navigate('BbHome');

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
          data={props.BbFavs}
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
          ListHeaderComponent={
            <BbHeader
              leftIcon={AntDesign}
              leftIconName="arrowleft"
              leftIconAction={BbGoBack}
              Title={
                <Text style={styles.BbFav2}>
                  {props.BbFavs.length} Favourites
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
    BbFavs: state.BbToggleFav,
  };
};

export default connect(mapStateToProps, {
  BbsetFavAction,
  BbsetCurrentProductAction,
  BbremoveFavAction,
})(BbFavourites);

const styles = StyleSheet.create({
  BbFav1: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  BbFav2: {
    color: colors.primary,
    fontSize: 22,
  },
  BbFav3: {},
  BbFav4: {},
});
