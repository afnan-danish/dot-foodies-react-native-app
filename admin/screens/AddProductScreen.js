import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import{ AuthContext } from '../../components/Context';
import * as firebase from 'firebase/app';

class AddProductScreen extends React.Component {
  

  static contextType = AuthContext
  //const news = ""
  render() {
    return (
      <View style={{paddingTop: 150, paddingHorizontal: 30}}>
        <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 20}}>Add Product Screen</Text>
        
      </View>
    )}
  }
  
  export default AddProductScreen;