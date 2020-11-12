import React, { useState, useEffect } from 'react';
import { Image, View, Text, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, useTheme } from 'react-native-paper';

const ImagePickerExample = ({img, onImagePicked }) => {
  const [image, setImage] = useState(null);
  const { colors } = useTheme();
  
  useEffect(() => {
    setImage( img );
    
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [img]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    //Alert.alert("a"+result.base64);
    //console.log(result.base64);
    //console.log(result.exif);

    if (!result.cancelled) {
      setImage(result.uri);
      let base64Img = 'data:image/jpg;base64,'+result.base64
      //Alert.alert(base64Img);
      onImagePicked(result.uri)
      //result.base64?onImagePicked(base64Img):onImagePicked(result.uri);
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
      <Text>{img}</Text>
    </View>
  );
}

export default ImagePickerExample;