/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from './BbColor';
import {H_W} from './BbResponsive';
import {Badge} from 'react-native-elements';
import {connect} from 'react-redux';

//======PROPS========
// leftIcon
// rightIcon
// leftIconAction
// leftIconName
// Title
// rightIconAction
// rightIconName
// titleStyle
// leftIconColor
// rightIconColor
// leftIconStyle
// rightIconStyle

function MyHeader({
  leftIcon,
  rightIcon,
  leftIconName,
  leftIconAction,
  leftIconColor,
  totalItems,
  titleStyle,
  Title,
  rightIconAction,
  rightIconName,
  rightIconColor,
  badgeColor,
  leftIconStyle,
  rightIconStyle,
}) {
  const LeftIconLibrary = leftIcon;
  const RightIconLibrary = rightIcon;
  return (
    <View style={styles.HeaderBarWrapper}>
      <View style={styles.HeaderBarInnerWrapper}>
        {LeftIconLibrary ? (
          <TouchableOpacity onPress={leftIconAction} style={styles.IconWrap}>
            <LeftIconLibrary
              name={leftIconName}
              size={H_W.width * 0.075}
              color={leftIconColor ? leftIconColor : colors.primary}
              style={leftIconStyle ? leftIconStyle : {}}
            />
            {totalItems > 0 && leftIconName.includes('cart') && (
              <Badge
                value={totalItems}
                containerStyle={styles.badgeContainer}
                badgeStyle={{
                  backgroundColor: badgeColor ? badgeColor : 'red',
                }}
              />
            )}
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...styles.IconWrap,
              elevation: 0,
              backgroundColor: 'transparent',
            }}
          />
        )}
        <Text style={{...styles.HeaderText, ...titleStyle}}>{Title}</Text>
        {RightIconLibrary ? (
          <TouchableOpacity onPress={rightIconAction} style={styles.IconWrap}>
            <RightIconLibrary
              name={rightIconName}
              size={H_W.width * 0.075}
              color={rightIconColor ? rightIconColor : colors.primary}
              style={rightIconStyle ? rightIconStyle : {}}
            />
            {totalItems > 0 && rightIconName.includes('cart') && (
              <Badge
                value={totalItems}
                containerStyle={styles.badgeContainer}
                badgeStyle={{
                  backgroundColor: badgeColor ? badgeColor : 'red',
                }}
              />
            )}
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...styles.IconWrap,
              elevation: 0,
              backgroundColor: 'transparent',
            }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  IconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
  },
  HeaderText: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: H_W.width * 0.08,
  },
  HeaderBarInnerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: H_W.width * 0.93,
  },
  HeaderBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: H_W.height * 0.018,
  },
});

const mapStateToProps = (state) => ({
  totalItems: state.BbCartReducer.totalItems,
});

export default connect(mapStateToProps, {})(MyHeader);
