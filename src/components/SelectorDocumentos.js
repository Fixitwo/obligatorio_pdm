import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

const FilePicker = ({ callback }) => {
  const [orden, setOrden] = useState(null);
  const [name, setName] = useState("")
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled) {
      setOrden(result.uri);
      setName(result.name)
      callback(result.uri);
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity>
          <Button title="Seleccionar orden de trabajo" onPress={pickDocument} />
          {orden !== null && <Text>{name}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  file: {
    color: "black",
    marginHorizontal: 145,
  },
  button: {
    marginHorizontal: 60,
  },
});

export default FilePicker;
