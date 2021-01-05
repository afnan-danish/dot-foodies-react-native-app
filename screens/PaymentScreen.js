import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import { ActivityIndicator, Divider, Button, useTheme, Checkbox, TextInput } from 'react-native-paper';
import Header from '../components/Header'
import CartSingleProduct from '../components/CartSingleProduct';
import{ AuthContext, ThemeContext } from '../components/Context';

class CartScreen extends React.Component {
  static contextType = AuthContext;
  state = {
    isLoading:true,
    total: 0,
    type:'',
    isOrder: false,
    paymentMethod:'',
    processStatus:'',
    isProcessing:false,
    shipTo:'',
    shipToAdd:'',
    deliveryCharge:0,
  }
  componentWillUnmount = () => {
    this.unsubscribe()
    
  }
  componentDidMount = () => {
    //console.log(this.context.uid)
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      //console.log(this.props.route.params.total)
      console.log(this.props.route.params.deliveryCharge)
      this.setState({total:this.props.route.params.total})
      this.setState({type:this.props.route.params.type})
      this.setState({shipTo:this.props.route.params.shipTo})
      this.setState({shipToAdd:this.props.route.params.shipToAdd})
      this.setState({deliveryCharge:this.props.route.params.deliveryCharge})
      this.setState({isLoading:false})
    })
    

    
  }
  
  
  orderPlace() {
    const today = new Date();
    const todays = (new Date()).toString();
    const cdate = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear()

    if(this.state.paymentMethod=='cod') {
      //console.log("Submit")
      this.setState({
        isOrder:true,
        isProcessing:true,
      });
      const ref = firebase.database().ref('users/'+this.context.uid);
      ref.child("carts").orderByChild("date").once("value", dataSnapshot => {
        //console.log(dataSnapshot.val())
        var tasks = [];
        dataSnapshot.forEach(child => {
          tasks.push({
            id: child.key,
            qty:child.val().quantity,
            price:child.val().price,
          })
          /*
          
          */
          
        });
        ref.child('order/').push({
          orderId: this.orderIdGenerate(),
          date:todays,
          currentdate : cdate,
          status:'Order Placed',
          total:this.state.total+this.state.deliveryCharge,
          shipTo:this.state.shipTo,
          shipToAdd:this.state.shipToAdd,
          products:tasks,
          deliveryCharge:this.state.deliveryCharge,
        }).then(()=>{
          //console.log("Done")
          ref.child("carts").remove().then(() => {
            this.setState({
              isProcessing:false,
            });
          })
        })

        //console.log(tasks);
        this.setState({
          paymentMethod:'',
          isOrder:false,
          processStatus:'done',
        });
        
        
      });

      
    }
  }
  orderIdGenerate = () => {
    return '#'+Math.floor(100000 + Math.random() * 900000);
  }
  render() {
    
    return (
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} title={"Payment"} goBack={true} />
        {this.state.isLoading?
          <ActivityIndicator size='small' style={{marginTop: 40,}} />
        :
        this.state.processStatus!='done'?
        <View style={{flex:1}}>
            
            <ScrollView contentContainerStyle={{paddingTop:5, paddingBottom: 50}}>
              <View style={{padding:15}} >
                <View>
                  <TouchableOpacity style={styles.paymentMethod} onPress={() => {this.setState({paymentMethod:'debit'});}} >
                    <Checkbox status={this.state.paymentMethod=='debit' ? 'checked' : 'unchecked'}
                    />
                    <Text style={styles.paymentMethodLabel}>Debit Card</Text>
                  </TouchableOpacity>
                  <View style={this.state.paymentMethod=='debit'?{paddingLeft: 40,flex:1}:{display:'none'}}>
                    <TextInput
                      label="Cart Number"
                      value={this.state.city}
                      onChangeText={(city) => this.setState({city:city}) }
                      mode='outlined'
                      style={{marginTop:5}}
                      error={this.state.cityError}
                      onFocus={() => this.setState({cityError:false})}
                    />
                    <TextInput
                      label="Carthonder's Name"
                      value={this.state.city}
                      onChangeText={(city) => this.setState({city:city}) }
                      mode='outlined'
                      style={{marginTop:5}}
                      error={this.state.cityError}
                      onFocus={() => this.setState({cityError:false})}
                    />
                    <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', marginTop:5}}>
                      <TextInput
                        label="Expiry Date"
                        value={this.state.city}
                        onChangeText={(city) => this.setState({city:city}) }
                        mode='outlined'
                        style={{width: '67%', marginRight: '3%'}}
                        error={this.state.cityError}
                        onFocus={() => this.setState({cityError:false})}
                      />
                      <TextInput
                        label="CCV"
                        value={this.state.city}
                        onChangeText={(city) => this.setState({city:city}) }
                        mode='outlined'
                        style={{width: '30%'}}
                        error={this.state.cityError}
                        onFocus={() => this.setState({cityError:false})}
                      />
                    </View>
                    
                  </View>
                </View>
                <Divider style={{width:'100%', marginTop: 10, marginBottom: 8, }} />
                <View>
                  <TouchableOpacity style={styles.paymentMethod} onPress={() => {this.setState({paymentMethod:'credit'});}} >
                    <Checkbox status={this.state.paymentMethod=='credit' ? 'checked' : 'unchecked'}
                    />
                    <Text style={styles.paymentMethodLabel}>Credit Card</Text>
                  </TouchableOpacity>
                  <View style={this.state.paymentMethod=='credit'?{paddingLeft: 40}:{display:'none'}}>
                    <Text>Sorry Credit card not accepted at that moment</Text>
                    
                  </View>
                </View>
                <Divider style={{width:'100%', marginTop: 10, marginBottom: 8, }} />
                <View>
                  <TouchableOpacity style={styles.paymentMethod} onPress={() => {this.setState({paymentMethod:'netbanking'});}} >
                    <Checkbox status={this.state.paymentMethod=='netbanking' ? 'checked' : 'unchecked'}
                    />
                    <Text style={styles.paymentMethodLabel}>Net Banking</Text>
                  </TouchableOpacity>
                  <View style={this.state.paymentMethod=='netbanking'?{paddingLeft: 40}:{display:'none'}}>
                    <Text>Sorry Net Banking not available at that moment</Text>
                  </View>
                </View>
                <Divider style={{width:'100%', marginTop: 10, marginBottom: 8, }} />
                <View>
                  <TouchableOpacity style={styles.paymentMethod} onPress={() => {this.setState({paymentMethod:'cod'});}} >
                    <Checkbox status={this.state.paymentMethod=='cod' ? 'checked' : 'unchecked'}
                    />
                    <Text style={styles.paymentMethodLabel}>Cash on Delivery</Text>
                  </TouchableOpacity>
                </View>
                <TotalComponent total={this.state.total} delivery={this.state.deliveryCharge} {...this.props} />

              </View>
            </ScrollView>
            <View style={{padding:15,heigh:60,flex:1,flexDirection: 'column',justifyContent: 'center',alignItems: 'stretch',}}>
                
                <Button icon="cart" loading={this.state.isOrder} disabled={this.state.isOrder} mode="contained" style={{borderRadius: 8,}}
                labelStyle={{fontSize: 20, fontWeight: 'bold'}} onPress={() => this.orderPlace()}>
                  Order
                </Button>
              </View>
          </View>
          :
          <ThankYouMessage loading={this.state.isLoading} {...this.props}  />
        }
      </View>
    )
  }
}
function TotalComponent(props) {
  const { colors } = useTheme();
  return (
    <View style={{flex:1, flexDirection: 'row', paddingTop:20, flexWrap: 'wrap'}}>
      <Text style={{width:'50%', fontSize:16, fontWeight: 'bold', color:colors.text}}>Item Total </Text>
      <Text style={{width:'50%', fontSize:16, fontWeight: 'bold', textAlign: 'right',color:colors.text}}>Rs {props.total}</Text>

      <Text style={{width:'50%', fontSize:16, fontWeight: 'bold',marginTop:10,color:colors.text}}>Delivery Charge </Text>
      <Text style={{width:'50%', fontSize:16, fontWeight: 'bold', textAlign: 'right',marginTop:10,color:colors.text}}>Rs {props.delivery}</Text>
      <Divider style={{width:'100%', marginTop: 15, marginBottom: 8, }} />
      <Text style={{width:'50%', fontSize:20, fontWeight: 'bold',color:colors.text}}>Total </Text>
      <Text style={{width:'50%', fontSize:20, fontWeight: 'bold', textAlign: 'right',color:colors.text}}>Rs {props.total+props.delivery}</Text>
    </View>
  )
}
function ThankYouMessage(props) {
  const { colors } = useTheme();
  //const contextType = ThemeContext;
  return (
    props.loading?
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='large' />
      </View>
    :
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Image source={require('../image/success-tick.png')} style={{ width: 150, height: 150}} />
      <Text style={{fontSize: 24,fontWeight:'bold',marginTop:10, color:colors.text,textAlign:'center'}}>Thank you!</Text>
      <Text style={{fontSize: 16,marginTop:10,textAlign:'center',color:colors.text}}>Your order has{'\n'}been confirmed</Text>
      <Button mode="contained" style={{borderRadius: 6,marginTop: 15}} 
      onPress={() => props.navigation.reset({index: 0, routes: [{name:'HomeScreen'}] })}
      >
          Back to Home
      </Button>
    </View>
  )
}

export default CartScreen;

const styles = StyleSheet.create({
  paymentMethod : {
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  paymentMethodLabel : {
    fontSize: 16,
    marginTop:6,
    marginLeft:5,
  }
});