import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import FillStar from './filled_star.png';
import BlankStar from './unfilled_star.png';
import HalfStar from './HalfFilled_star.png';
import belowFourTwo from './4_2_below.png';
import AboveFourEight from './4_8_above.png';
import belowFourFive from './4_5_below.png';
import aboveFourFive from './4_5_above.png';

// ------RECIEVE PROPS-------
// rating [any integer or float value]
// size [any number]

export default function StarRating(props) {
  let {size} = props;
  let rating = parseFloat(props.rating);
  // 0 for blank
  // 1 for half filled
  // 2 for fullfilled
  // 3 for belowFourTwo
  // 4 for AboveFourEight
  // 5 for belowFourFive
  // 6 for aboveFourFive

  const RenderStars = () => {
    rating > 5 ? (rating = 0) : null;
    const isInteger = Number.isInteger(rating);
    const starsArr = isInteger ? IntegerLogic() : DecimalLogic();
    return starsArr.map((el, index) => {
      return (
        <Image
          key={index}
          source={
            el === 2
              ? FillStar
              : el === 0
              ? BlankStar
              : el === 1
              ? HalfStar
              : el === 3
              ? belowFourTwo
              : el === 4
              ? AboveFourEight
              : el === 5
              ? belowFourFive
              : aboveFourFive
          }
          style={styles.ST_star}
        />
      );
    });
  };

  const IntegerLogic = () => {
    const Arr = [];
    for (let i = 0; i < rating; i++) Arr.push(2);
    for (let n = 0; n < 5 - rating; n++) Arr.push(0);
    return Arr;
  };

  const DecimalLogic = () => {
    const Arr = [],
      Whole_number = parseInt(rating),
      fraction_value = parseInt(rating.toString().split('.')[1]);
    for (let i = 0; i < Whole_number; i++) Arr.push(2);
    fraction_value > 5 && fraction_value < 8
      ? Arr.push(6)
      : fraction_value <= 2
      ? Arr.push(3)
      : fraction_value > 2 && fraction_value < 5
      ? Arr.push(5)
      : fraction_value >= 8
      ? Arr.push(4)
      : fraction_value == 5
      ? Arr.push(1)
      : null;
    for (let n = 0; n < 5 - (Whole_number + 1); n++) Arr.push(0);
    return Arr;
  };

  return (
    <View style={{...styles.ST_wrapper, width: size ? size : 200}}>
      <View style={{...styles.ST_InnerWrapper, height: (30 * size) / 100}}>
        {RenderStars()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ST_wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ST_InnerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ST_star: {
    width: '20%',
    height: '60%',
    margin: '1%',
    resizeMode: 'contain',
  },
});
