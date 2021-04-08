/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList} from 'react-native';
// import {H_W} from './DzDim';

function Looping(props) {
  const {
    data,
    renderItem,
    style,
    containerStyle,
    horizontal = true,
    ...rest
  } = props;
  return (
    <View style={{flex: 1}}>
      <FlatList
        ListFooterComponent={
          props.ListFooterComponent && props.ListFooterComponent
        }
        ListHeaderComponent={
          props.ListHeaderComponent && props.ListHeaderComponent
        }
        bounces={false}
        data={data}
        horizontal={horizontal}
        style={[{flex: 1}, containerStyle]}
        contentContainerStyle={{
          // paddingRight: H_W.width * 0.05,
          paddingVertical: horizontal ? '2%' : 0,
          // paddingLeft: horizontal ? 0 : H_W.width * 0.05,
          ...style,
        }}
        keyExtractor={() => Math.random().toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        {...rest}
      />
    </View>
  );
}

export default Looping;
