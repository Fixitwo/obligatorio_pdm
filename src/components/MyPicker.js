import React from "react";
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, TextInput, View } from "react-native";

const MyPicker = ({
    maxLength = 40,
    minLength = 0,
    placeholder = "placeholder",
    keyboardType = "default",
    secureTextEntry = false,
    returnKeyType = "done",
    onValueChange = "",
    numberOfLines = 1,
    mutiline = false,
    onSubmitEditing = () => console.log("submit editing"),
    blurOnSubmit = false,
    value = "",
    defaultValue = ""
}) => {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.input}
        maxLength={maxLength}
        minLength={minLength}
        onValueChange={onValueChange}
        placeholder={placeholder}
        placeholderTextColor="gray"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        numberOfLines={numberOfLines}
        mutiline={mutiline}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        value={value}
        defaultValue={defaultValue}
      />
    </View>
  );
};

export default MyPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    padding: 10
  },
  input: {
    color: 'black',
  },
});
