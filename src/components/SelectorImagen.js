import React, { useState, useEffect } from 'react';
import { Button, Image, View, Touchableo } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagenPicker({callback}) {

    const [imagen, setImagen] = useState(null);
  
    const pickImage = async () => {
      // No es necesario solicitar permisos para iniciar la biblioteca de imágenes.
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImagen(result.assets[0].uri);
        callback(result.assets[0].uri)
      }
    };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button buttonStyle={{backgroundColor:"yellow"}}  title="Seleccione una imagen" onPress={pickImage} />
      </View>
    );
  }