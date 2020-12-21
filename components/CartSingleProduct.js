import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import storage from '@react-native-firebase/storage';
import * as firebase from 'firebase';
import { Button, ActivityIndicator, Avatar } from 'react-native-paper';
import { ThemeContext } from '../components/Context';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';


class CartSingleProduct extends React.Component {
  static contextType = ThemeContext;
  constructor(props) {  
    super(props);  
    this.state = {
      quantity: 1,
      id: '',
      name: '',
      desc: '',
      imguri : '',
      salePrice: '',
      regularPrice: '',
      isLoading:true,
    };  
  }
  componentDidMount = () => {
    

    this.setState({quantity: this.props.quantity})
    const items = firebase.database().ref('products/').orderByChild("id").equalTo(this.props.id);
    //const items = firebase.database().ref('products/-MMpIds11dC43fghQdOI');
    items.on("value", dataSnapshot => {
      //console.log(dataSnapshot.val())
      dataSnapshot.forEach(child => {
        //console.log(child.key)
        this.setState({
          id : child.val().id,
          name : child.val().name,
          desc : child.val().shortDesc,
          imguri : child.val().url,
          salePrice : child.val().salePrice,
          regularPrice : child.val().regularPrice,
        })
      });
     
      this.setState({
        isLoading:false
      });
      
    });
  }
  addItem = () => {
    this.setState({isLoading:true})
    this.props.handleLoading(true)
    this.setState({quantity: this.state.quantity+1}, () => {
      this.updateQty(this.state.quantity)
    })
  }
  subItem = () => {
    if(this.state.quantity>1){
      this.setState({isLoading:true})
      this.props.handleLoading(true)
      this.setState({quantity: this.state.quantity-1}, () => {
        this.updateQty(this.state.quantity)
      })
    }
    
  }
  updateQty = (qty) => {
    firebase.database().ref('users/'+this.props.uid).child("carts/" + this.state.id).update({
      quantity: qty,
    }).then(() => {
      this.setState({isLoading:false})
      this.props.handleLoading(false)
    }).catch((error) => {
      this.setState({isLoading:false})
      this.props.handleLoading(false)
    });
  }
  deleteCart = () => {
    firebase.database().ref('users/'+this.props.uid).child("carts/" + this.state.id).remove().then(() => {
      console.log(" Remove successfull.")
    })
    .catch((error) => {
      console.log("Remove failed : " + error.message)
    });
  }
  render() {
    const { colors } = this.context;
    //console.log(this.state.data)
    //console.log(this.props.quantity)
    /*
    navigation.reset({
      index: 0,
      routes: [{ name: 'Profile' }],
    });
    */
   
    return (
      <View style={[styles.products, {backgroundColor:colors.header} ]}>
        {this.state.isLoading?<ActivityIndicator size='small' style={{paddingVertical: 18}} />:(
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch',flexWrap: 'wrap'}}>
          <View style={{width: '100%',alignItems: 'flex-end', marginBottom: -70}}>
            <TouchableOpacity onPress={() => this.deleteCart()}>
              <Avatar.Icon size={25} color={'#fff'} icon={"delete"} />
            </TouchableOpacity>

            <View style={{marginTop: 10, height: 25, width: 75,borderRadius: 8, overflow: 'hidden', 
            flexDirection: 'row', shadowColor: "#000", shadowOffset: { width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
              <TouchableOpacity style={{height: 25, width: 25,alignItems:'center', backgroundColor: '#f4511e'}}> 
                <Text onPress={() => this.subItem()} style={{fontWeight: 'bold',fontSize: 18, color: '#fff', }}>-</Text>
              </TouchableOpacity >
              <Text style={{fontWeight: 'bold',fontSize: 14, width: 25, color: colors.text,backgroundColor:colors.background,textAlign: 'center',paddingTop: 3,}}>{this.props.quantity}</Text>
              <TouchableOpacity style={{height: 25, width: 25,alignItems:'center',  backgroundColor: '#f4511e'}}> 
                <Text onPress={() => this.addItem()} style={{fontWeight: 'bold',fontSize: 18, color: '#fff',}}>+</Text>
              </TouchableOpacity >
            </View>

          </View>
          <View style={{}}>
            <Image source={{uri :this.state.imguri}} style={{ width: 60, height: 60}} />
          </View>
          <View style={{paddingLeft: 15}}>
            <Text style={{color: colors.text, fontSize:18, fontWeight: 'bold'}}>{this.state.name}</Text>
            <Text style={{color: '#a0a0a0',alignSelf:'flex-start',marginTop:5}}>
              Rs <Text style={{fontSize: 18, color: colors.primary, fontWeight: 'bold', }}>{this.state.salePrice}</Text>
            </Text>
          </View>
        </View>
        )}
      </View>
    );
  }
}
export default CartSingleProduct;

const styles = StyleSheet.create({
  products : {
    flex:1,
    alignItems: 'stretch',
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
    marginBottom: 10,
    
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