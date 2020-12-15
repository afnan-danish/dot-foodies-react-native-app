import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import{ AuthContext } from './Context';
import * as firebase from 'firebase';
//import auth from 'firebase/auth';


class CartCount extends React.Component {
  static contextType = AuthContext;
  state = {
    count:0
    //searchBox: {Disp}
  }
  componentDidMount = () => {
    const items = firebase.database().ref('/users/'+this.context.uid).child("carts");
    items.on("value", dataSnapshot => {
      var count = 0
      dataSnapshot.forEach(child => {
        count = count + 1
      });
      this.setState({
        count:count
      });
      
    });
  }
  componentWillUnmount() {
    this.setState({
      count:0
    });
  }
  render() {
    return(
      <View style={{position:"relative"}}>
        <Appbar.Action color={this.props.colors.text} icon="cart" 
          onPress={()=> {}}  onPress={() =>  this.props.navigation.navigate('CartScreen') } />
        <View style={{position:"absolute",top:8,right:1,backgroundColor:this.props.colors.primary,height:18,width:18,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'#fff'}}>{this.state.count}</Text>
        </View>
      </View>         
    );
  }
}

export default CartCount;

