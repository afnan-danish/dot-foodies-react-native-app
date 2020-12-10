import React, { useState, useEffect } from 'react';
import { Image, View, Text, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, useTheme } from 'react-native-paper';
//import ImagePicker from 'react-native-image-picker';

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
  /*
  const pickImage = () => {
    ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
      response => {
        if (response.error) {
          console.log("image error");
        } else {
          console.log("Image: " + response.uri)
          setImage({ uri: response.uri });
          onImagePicked({ uri: response.uri });
        }
      }
    )
  }
  */
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
      <TouchableOpacity  onPress={pickImage}>
        <View style={{width: 250, height: 250, borderWidth: 1, borderColor: '#cfcfcf', marginVertical: 10}}>
          {image && <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />}
        </View>
      </TouchableOpacity>
      <Button mode="contained" style={{backgroundColor: colors.primary}} onPress={pickImage}>
        Select Image
      </Button>
    </View>
  );
}

export default ImagePickerExample;