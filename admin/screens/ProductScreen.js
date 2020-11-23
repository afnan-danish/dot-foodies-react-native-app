import { CommonActions } from '@react-navigation/native'
import React from 'react'
import { View, Text, Alert,SafeAreaView } from 'react-native'
import Header from '../../components/Header'
import {TextInput, Button, List, Avatar, Paragraph, Dialog, Portal, Modal, ActivityIndicator} from 'react-native-paper'
import{ ThemeContext } from '../../components/Context'
import * as firebase from 'firebase/app';

class ProductScreen extends React.Component {
  static contextType = ThemeContext;
  //const news = ""
  render() {
    const { colors } = this.context;
    return (
      <SafeAreaView>
        <Header navigation={this.props.navigation} title={this.props.route.name} />
        <Button mode="contained" onPress={() => this.props.navigation.navigate("AddProduct")}>
          Add New Category
        </Button>
        <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 20}}>Product Screen</Text>
        

        
      
      </SafeAreaView>
    )}
  }
  
  export default ProductScreen;