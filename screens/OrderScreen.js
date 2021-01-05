import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import { ActivityIndicator, Divider, Button, useTheme, Portal, Dialog } from 'react-native-paper';
import Header from '../components/Header'
import CartSingleProduct from '../components/CartSingleProduct';
import{ AuthContext, ThemeContext } from '../components/Context';

class CartScreen extends React.Component {
  static contextType = AuthContext;
  state = {
    data:[],
    isLoading:true,

    dialogVisible:false
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
      const items = firebase.database().ref('users/'+this.context.uid).child("order").orderByChild("date");
      items.on("value", dataSnapshot => {
        console.log(dataSnapshot.val())
        var tasks = [];
        dataSnapshot.forEach(child => {
          console.log(child.val())
          tasks.push({
            id: child.key,
            orderId:child.val().orderId,
            date:child.val().currentdate,
            shipTo:child.val().shipTo,
            shipToAdd:child.val().shipToAdd,
            total:child.val().total,
            status:child.val().status,
            deliveryCharge:child.val().deliveryCharge,
            products:child.val().products,

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
  hideDialog = () => {
    this.setState({dialogVisible:false})
  }
  render() {
    //console.log(this.state.data)
    const mylist = this.state.data.map(item=> {
      console.log(item.products)
      return (
        <View key={item.id} style={styles.products}>
          <Text style={{fontSize:20,padding:15,fontWeight:'bold', color:'#f4511e'}}>{item.orderId}</Text>
            <View style={{paddingHorizontal:15,paddingVertical:5, borderTopWidth:1,borderTopColor:'#ccc',flex:1,flexDirection:'row',flexWrap:'wrap'}}>
              <Text style={{width:'50%',marginBottom:5}}>Order Date</Text>
              <Text style={{width:'50%',marginBottom:5}}>{item.date}</Text>

              <Text style={{width:'50%',marginBottom:5}}>Order Total</Text>
              <Text style={{width:'50%',marginBottom:5}}>Rs {item.total}</Text>

              <Text style={{width:'50%',marginBottom:5}}>Ship To</Text>
              <Text style={{width:'50%',marginBottom:5}}>{item.shipTo}</Text>

              <Text style={{width:'50%',marginBottom:5}}>Shipping Address</Text>
              <Text style={{width:'50%',marginBottom:5}}>{item.shipToAdd}</Text>

              <Text style={{width:'50%',marginBottom:5}}>Status</Text>
              <Text style={{width:'50%',marginBottom:5}}>{item.status}</Text>

            </View>
        </View>
        
      )
    });
    return (
      
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} title={"My Orders"} goBack={true} />
        {this.state.isLoading?
          <ActivityIndicator size='small' style={{marginTop: 40,}} />
        :
        this.state.data && this.state.data.length?
          <View style={{flex:1}}>
            <ScrollView contentContainerStyle={{paddingTop:20, paddingBottom: 50}}>
              <View style={styles.listFood}>
                {mylist}
                
              </View>
            </ScrollView>
            
          </View>
          :
          <EmptyCart {...this.props} />
        }
        <Portal>
          <Dialog visible={this.state.dialogVisible} onDismiss={this.hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text>This is simple dialog</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  }
}

function EmptyCart(props) {
  const { colors } = useTheme();
  return (
  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Image source={require('../image/empty-cart.png')} style={{ width: 180, height: 150}} />
    <Text style={{fontSize: 24,fontWeight:'bold',marginTop:10, color:colors.text}}>Your Order is Empty</Text>
    <Text style={{fontSize: 16,marginTop:10,textAlign:'center',color:colors.text}}>Looks like you haven't Shopping yet.</Text>
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
  products : {
    flex:1,
    alignItems: 'stretch',
    backgroundColor: '#fff',
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
  
});