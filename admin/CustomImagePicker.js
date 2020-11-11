import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, useTheme } from 'react-native-paper';

const ImagePickerExample = ({ onImagePicked }) => {
  const [image, setImage] = useState(null);
  const { colors } = useTheme();
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    //Alert.alert("a"+result.url);
    console.log(result.uri);
    console.log(result.base64);

    if (!result.cancelled) {
      setImage(result.uri);
      result.base64?onImagePicked(result.base64):onImagePicked(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <View style={{width: 250, height: 250, borderWidth: 1, borderColor: '#cfcfcf', marginVertical: 10}}>
        {image && <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />}
      </View>
      <Button mode="contained" style={{backgroundColor: colors.primary}} onPress={pickImage}>
        Add Category Image
      </Button>
    </View>
  );
}

export default ImagePickerExample;