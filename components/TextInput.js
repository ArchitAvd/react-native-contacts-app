import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  AsyncStorage,
} from 'react-native';
import colors from '../config/colors';

const CustomTextInput = forwardRef((props, ref) => {
  return (
    <View style={styles.container}>
      <Text style={{ marginHorizontal: 10 }}> {props.label}</Text>
      <TextInput
        ref={ref} // Forward the ref to the native TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        {...props} // Spread the remaining props
      />
    </View>
  );
});

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    borderBottomColor: colors.border,
    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
    marginTop: 15,
  },
  input: {
    marginHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: colors.subtleText,
    borderRadius: 5,
  },
});
