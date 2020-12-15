import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import { ActivityIndicator } from 'react-native-paper';
import Header from '../components/Header'
import CartSingleProduct from '../components/CartSingleProduct';
import{ AuthContext } from '../components/Context';

class CartScreen extends React.Component {
  static contextType = AuthContext;
  state = {
    data:[],
    isLoading:true
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  componentDidMount = () => {
      console.log(this.context.uid)
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        isLoading:true
      });
      const items = firebase.database().ref('users/'+this.context.uid).child("carts");
      items.on("value", dataSnapshot => {
        console.log(dataSnapshot.val())
        var tasks = [];
        dataSnapshot.forEach(child => {
          tasks.push({
            id: child.key,
            qty:child.val().quantity,
          })
        });
        
        this.setState({
          data: tasks,
          isLoading:false
        });
        
      });
    })
    

    
  }
  componentWillUnmount = () => {

  }
  render() {
    
    const mylist = this.state.data.map(item=>{
      //console.log(item.url)
      return (
        <CartSingleProduct id={item.id} key={item.id} width={"47%"} navigation={this.props.navigation} />
      )
    });
    return (
      
      <View>
        <Header navigation={this.props.navigation} title={"My Cart"} goBack={true} />
        {this.state.isLoading?
          <ActivityIndicator size='small' style={{marginTop: 40,}} />
        :
          <ScrollView contentContainerStyle={{paddingTop:30}}>
            <View style={styles.qualityFood}>
              {mylist}
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}
export default CartScreen;

const styles = StyleSheet.create({
  qualityFood : {
    flexDirection: 'column',
    flexWrap: "wrap",
    paddingHorizontal:10,
    paddingRight:10,
    
  },
  qFoodBox : {
    width: 120,
    height: 55,
	  backgroundColor: '#f4511e',
	  //clipPath: 'polygon(0 0, 95% 20%, 98% 24%, 100% 31%, 100% 100%, 0 100%)',
    borderRadius: 10,
    margin: 0,
    position: 'relative',
    marginRight:10,
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    padding:5,
  },
  
  qFoodBoxImg : {
    width: 45,
    height: 45,
    alignSelf: "flex-start",
  },
  qFoodBoxText : {
    fontSize: 15,
    color: '#fff',
    textAlign:"right",
    flex: 1,
  }
});