import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {strings} from '../constants/strings';

export const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{strings['LABEL.PRICE']}</Text>
      <Text style={styles.labelStyle}>{strings['LABEL.SIZE']}</Text>
      <Text style={styles.labelStyle}>{strings['LABEL.TOTAL']}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  labelStyle: {flex: 1, textAlign: 'right', color: 'gray'},
});
