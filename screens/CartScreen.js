import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import { ActivityIndicator, Divider, Button, useTheme } from 'react-native-paper';
import Header from '../components/Header'
import CartSingleProduct from '../components/CartSingleProduct';
import{ AuthContext, ThemeContext } from '../components/Context';

class CartScreen extends React.Component {
  static contextType = AuthContext;
  state = {
    data:[],
    isLoading:true,
    total: 0,
    isUpdateProduct: false,
    deliveryPrice : 45,
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  componentDidMount = () => {
    //console.log(this.context.uid)
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        isLoading:true
      });
      const items = firebase.database().ref('users/'+this.context.uid).child("carts").orderByChild("date");
      items.on("value", dataSnapshot => {
        //console.log(dataSnapshot.val())
        var tasks = [];
        dataSnapshot.forEach(child => {
          tasks.push({
            id: child.key,
            qty:child.val().quantity,
            price:child.val().price
          })
        });
        
        this.setState({
          data: tasks,
          isLoading:false
        });
        
      });
    })
    

    
  }
  setLoading = (condition) => {
    //console.log(condition)
    this.setState({isUpdateProduct: condition})
  }
  getTotal = () => {
    let total = 0
    this.state.data.map(item=>{
      total = (parseFloat(item.qty) * parseFloat(item.price)) + total
      //console.log(total)
    });
    return total;
  }
  checkoutBtn = () => {
    this.props.navigation.navigate("CheckOutScreen", {
      total: this.getTotal(),
      type:"cart",
      deliveryCharge:this.state.deliveryPrice,
    })
  }
  render() {
    //console.log(this.state.data)
    const mylist = this.state.data.map(item=> {
      //console.log(item.url)
      return (
        <CartSingleProduct id={item.id} key={item.id} width={"47%"} uid={this.context.uid} quantity={item.qty} navigation={this.props.navigation} 
        handleLoading={this.setLoading}  />
      )
    });
    return (
      
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} title={"My Cart"} goBack={true} />
        {this.state.isLoading?
          <ActivityIndicator size='small' style={{marginTop: 40,}} />
        :
        this.state.data && this.state.data.length?
          <View style={{flex:1}}>
            <ScrollView contentContainerStyle={{paddingTop:20, paddingBottom: 50}}>
              <View style={styles.listFood}>
                {mylist}
                
              </View>
              <TotalComponent total={this.getTotal()} delivery={this.state.deliveryPrice} {...this.props} />
            </ScrollView>
            <View style={{padding:15}}>
                <Button icon="cart" disabled={this.state.isUpdateProduct} mode="contained" style={{borderRadius: 8,}}
                labelStyle={{fontSize: 20, fontWeight: 'bold'}} onPress={() => this.checkoutBtn()}>
                  Proceed to Checkout 
                </Button>
              </View>
          </View>
          :
          <EmptyCart {...this.props} />
        }
      </View>
    )
  }
}
function TotalComponent(props) {
  const { colors } = useTheme();
  //const contextType = ThemeContext;
  return (
    <View style={{flex:1, flexDirection: 'row', padding:15, flexWrap: 'wrap'}}>
      <Text style={{width:'50%', fontSize:16, fontWeight: 'bold', color:colors.text}}>Item Total </Text>
      <Text style={{width:'50%', fontSize:16, fontWeight: 'bold', textAlign: 'right',color:colors.text}}>Rs {props.total}</Text>

      <Text style={{width:'50%', fontSize:16, fontWeight: 'bold',marginTop:10,color:colors.text}}>Delivery Charge </Text>
      <Text style={{width:'50%', fontSize:16, fontWeight: 'bold', textAlign: 'right',marginTop:10,color:colors.text}}>Rs {props.delivery}</Text>
      <Divider style={{width:'100%', marginTop: 15, marginBottom: 8, }} />
      <Text style={{width:'50%', fontSize:20, fontWeight: 'bold',color:colors.text}}>Total </Text>
      <Text style={{width:'50%', fontSize:20, fontWeight: 'bold', textAlign: 'right',color:colors.text}}>Rs {props.total + props.delivery}</Text>
    </View>
  )
}
function EmptyCart(props) {
  const { colors } = useTheme();
  return (
  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Image source={require('../image/empty-cart.png')} style={{ width: 180, height: 150}} />
    <Text style={{fontSize: 24,fontWeight:'bold',marginTop:10, color:colors.text}}>Your Cart is Empty</Text>
    <Text style={{fontSize: 16,marginTop:10,textAlign:'center',color:colors.text}}>Looks like you haven't added{'\n'}anything to your cart yet.</Text>
    <Button mode="contained" style={{borderRadius: 6,marginTop: 15}} onPress={() => props.navigation.navigate("HomeScreen")}>
        Continue Shopping 
    </Button>
  </View>)
}
export default CartScreen;

const styles = StyleSheet.create({
  listFood : {
    flexDirection: 'column',
    flexWrap: "wrap",
    paddingHorizontal:10,
    paddingRight:10,
    
  },
  
  
});