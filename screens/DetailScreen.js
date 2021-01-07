import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header'
import { ThemeContext } from '../components/Context';
import * as firebase from 'firebase';
import { Button, ActivityIndicator } from 'react-native-paper';

class DetailScreen extends React.Component {
  static contextType = ThemeContext
  constructor(props) {  
    super(props);  
    this.state = {
      id: '',
      name: '',
      desc: '',
      imguri : '',
      salePrice: '',
      regularPrice: '',
      isLoading:true,
      userId:'',
      quantity: 1,
      size : "M",
      price : {
        S : 8,
        M : 9,
        L : 10
      }
    };  
  }
  componentDidMount = () => {
    //console.log()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({userId: user.uid});
      }
    });
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({quantity:1})
      const items = firebase.database().ref('products/').orderByChild("id").equalTo(this.props.route.params.id)       // .equalTo(this.props.route.params.id);
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
    });
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  
  updateCart = () => {
    const user = firebase.auth().currentUser
    firebase.database().ref('users/' + user.uid).child('carts/'+this.state.id).update({
      quantity: this.state.quantity,
      size: this.state.size,
      date: new Date(),
      price: this.state.salePrice,
    })

  }
  render() {
    //console.log(this.props.route.params.id)
    const { colors } = this.context;
    //console.log(this.props.route.params)
    return (
      <View>
        <Header navigation={this.props.navigation} title={this.state.name} goBack={true} />
        <ScrollView contentContainerStyle={{paddingBottom:60}}>
          <View style={{alignItems: 'center' }}>
            <View style={{alignItems: 'center' }}> 
              <Text style={{fontSize: 25, fontWeight: 'bold', color: colors.text, marginTop: 20}}>{this.state.name}</Text>
              <Text style={{color: '#a0a0a0', fontSize: 15, marginTop: 8}}>{this.state.desc}</Text>
              <Image source={{uri : this.state.imguri}} style={{ width: 250, height: 250, marginVertical: 30 }} />
              <Text style={{color: '#f4511e', fontSize: 22}}>Rs <Text style={{fontSize: 35,  color: colors.text, fontWeight: 'bold', }}>{this.state.salePrice}</Text></Text>
            </View>
            
            <View>
              <View style={{flexDirection: 'row', marginTop: 30,}}>
                <TouchableOpacity onPress={() => this.setState({size: 'S'})} > 
                  <Text style={this.state.size=='S'? styles.sizeButtonActive : styles.sizeButton }>S</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({size: 'M'})}> 
                  <Text style={this.state.size=='M'? styles.sizeButtonActive : styles.sizeButton }>M</Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={() => this.setState({size: 'L'})}> 
                  <Text style={this.state.size=='L'? styles.sizeButtonActive : styles.sizeButton }>L</Text>
                </TouchableOpacity >
              </View>
            </View>
            
            <View style={{backgroundColor: '#ccc',marginHorizontal: 'auto', marginTop: 30, height: 45, width: 150,borderRadius: 8, overflow: 'hidden', 
            flexDirection: 'row', shadowColor: "#000", shadowOffset: { width: 0, height: 2,}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
              <TouchableOpacity style={{height: 48, width: 40,alignItems:'center', backgroundColor: '#f4511e'}}> 
                <Text onPress={() => this.setState({quantity: this.state.quantity-1})} style={{fontWeight: 'bold',fontSize: 30, color: '#fff', }}>-</Text>
              </TouchableOpacity >
              <Text style={{fontWeight: 'bold',fontSize: 18, width: 70, backgroundColor: '#fff', textAlign: 'center',paddingTop: 10,}}>{this.state.quantity}</Text>
              <TouchableOpacity style={{height: 48, width: 40,alignItems:'center',  backgroundColor: '#f4511e'}}> 
                <Text onPress={() => this.setState({quantity: this.state.quantity+1})} style={{fontWeight: 'bold',fontSize: 30, color: '#fff',}}>+</Text>
              </TouchableOpacity >
            </View>
          </View>
          <View style={{marginTop: 15, padding: 15,flex:1}}>
            <Button icon="cart" mode="contained" style={{borderRadius: 8,}} labelStyle={{fontSize: 20, fontWeight: 'bold'}} onPress={() => this.updateCart()}>
              ADD TO CART
            </Button>
          </View>
          
        </ScrollView>
      </View>
    )}
}
export default DetailScreen;

const styles = StyleSheet.create({
  sizeButton : {
    height: 45,
    width: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 8,
    margin:3,
    color:'#000'
  },
  sizeButtonActive : {
    height: 45,
    width: 45,
    backgroundColor: '#f4511e',
    color: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 8,
    margin:3
  },
  
});

