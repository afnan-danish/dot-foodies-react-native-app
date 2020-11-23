import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import storage from '@react-native-firebase/storage';
import * as firebase from 'firebase';
import { Button } from 'react-native-paper';

class SingleProduct extends React.Component {
  
  render() {
    /*
    navigation.reset({
      index: 0,
      routes: [{ name: 'Profile' }],
    });
    */
   
   //console.log(this.props.img)
   //const uur = this.props.img==null?'../image/pizza-classic.png':'../image/pizza-classic.png'
   //const imageURI = Asset.fromModule(require(uur)).uri;

   

    return (
      <View style={styles.products}>
        <Text style={{textAlign:'center', fontSize:18, fontWeight: 'bold'}}>{this.props.name}</Text>
        <Text style={{color: '#a0a0a0',fontSize:12, textAlign: 'center', }}>{this.props.description}</Text>
        <View style={{alignItems: 'center',paddingVertical: 15}}>
          <Image source={this.props.img} style={{ width: 120, height: 120}} />
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{color: '#a0a0a0',alignSelf:'flex-start'}}>$ <Text style={{fontSize: 22, color: '#000', fontWeight: 'bold', }}>{this.props.price}</Text></Text>
          <View style={{flex:1}}>
            <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={() => {}} >
                <Text style={styles.addBtn}>+</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    );
  }
}
export default SingleProduct;

const styles = StyleSheet.create({
  products : {
    width:150,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal:5,
    marginBottom: 10
  },
  addBtn : {
    backgroundColor: '#f4511e', 
    width: 30, 
    height: 30, 
    borderRadius: 7, 
    fontWeight: 'bold', 
    fontSize: 20, 
    color: '#fff', 
    alignItems: 'center', 
    textAlign:'center', 
    justifyContent: 'center' 
  }
});