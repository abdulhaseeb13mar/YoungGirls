import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {H_W} from '../BbFrequentUsage/BbResponsive';
import {colors, textFont} from '../BbFrequentUsage/BbColor';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function SearchBar({editable, changeSearchText}) {
  const [isFocused, setisFocused] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const ChangeFocus = (bool) => {
    setisFocused(bool);
  };

  const onChangeText = (t) => changeSearchText(t);

  return (
    <View style={{...styles.SB_Wrapper, height: HEIGHT * 0.065}}>
      <TextInput
        style={styles.SB_input}
        placeholderTextColor={colors.lightGrey3}
        editable={editable}
        placeholder="Search Here..."
        onBlur={() => ChangeFocus(false)}
        onFocus={() => ChangeFocus(true)}
        onChangeText={onChangeText}
      />
      <View style={styles.SB_icon}>
        <FontAwesome
          name="search"
          size={18}
          color={isFocused ? colors.primary : colors.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SB_icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  SB_Wrapper: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  SB_input: {
    width: '90%',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
});
