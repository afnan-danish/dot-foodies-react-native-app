import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import { ActivityIndicator, Divider, Button, TextInput } from 'react-native-paper';
import Header from '../components/Header'
import CartSingleProduct from '../components/CartSingleProduct';
import{ AuthContext } from '../components/Context';

class CartScreen extends React.Component {
  static contextType = AuthContext;
  state = {
    data:[],
    isLoading:false,
    total: 0
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  componentDidMount = () => {
    //console.log(this.context.uid)
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      
    })
    

    
  }
  
  
  render() {
    
    return (
      
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} title={"Checkout"} goBack={true} />
        {this.state.isLoading?
          <ActivityIndicator size='small' style={{marginTop: 40,}} />
        :
          <View style={{flex:1}}>
            <ScrollView contentContainerStyle={{paddingTop:20, paddingBottom: 50}}>
              <View style={{padding:15, flexWrap: 'wrap', borderWidth:1, borderColor:'#ccc', margin: 15}}>
                <Text style={{fontSize: 16, marginBottom: 20}}>Address</Text>
                <TextInput
                  label="City *"
                  labelStyle={{fontSize:12}}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email:email}) }
                  mode='outlined'
                />
                <TextInput
                  label="Locality / Area or Street *"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email:email}) }
                  mode='outlined'
                />
                <TextInput
                  label="Flat no., Building name *"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email:email}) }
                  mode='outlined'
                />
                <TextInput
                  label="Pincode *"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email:email}) }
                  mode='outlined'
                />
                <TextInput
                  label="State *"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email:email}) }
                  mode='outlined'
                />
                <TextInput
                  label="Landmark"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email:email}) }
                  mode='outlined'
                />

              </View>
              
            </ScrollView>
            <View style={{padding:15}}>
              <Button icon="cart" mode="contained" style={{borderRadius: 8,}} labelStyle={{fontSize: 20, fontWeight: 'bold'}} onPress={() => this.updateCart()}>
                Continue 
              </Button>
            </View>
          </View>
          
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