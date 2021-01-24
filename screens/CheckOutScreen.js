import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import { ActivityIndicator, Divider, Button, TextInput, useTheme } from 'react-native-paper';
import Header from '../components/Header'
import CartSingleProduct from '../components/CartSingleProduct';
import{ AuthContext } from '../components/Context';

class CartScreen extends React.Component {
  static contextType = AuthContext;
  state = {
    isLoading:false,
    total: 0,
    type:'',

    city:'',
    locality:'',
    flat:'',
    pincode:'',
    stateName:'',
    landmark:'',
    name:'',
    mobile:'',
    alternateMob:'',

    cityError:false,
    localityError:false,
    flatError:false,
    pincodeError:false,
    stateNameError:false,
    nameError:false,
    mobileError:false,

    deliveryCharge:0,

  }
  
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  componentDidMount = () => {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log(this.props.route.params.deliveryCharge)
      this.setState({total:this.props.route.params.total})
      this.setState({type:this.props.route.params.type})
      this.setState({deliveryCharge:this.props.route.params.deliveryCharge})
    })
    

    
  }
  validate = () => {
    let cond= true

    if(this.state.city=='')
    { 
      this.setState({cityError:true})
      cond = false
    }
    if(this.state.locality=='')
    { 
      this.setState({localityError:true})
      cond = false
    }
    if(this.state.flat=='')
    { 
      this.setState({flatError:true})
      cond = false
    }
    if(this.state.pincode.length<6)
    { 
      this.setState({pincodeError:true})
      cond = false
    }
    if(this.state.stateName=='')
    { 
      this.setState({stateNameError:true})
      cond = false
    }
    if(this.state.name.length<3)
    { 
      this.setState({nameError:true})
      cond = false
    }
    if(this.state.mobile.length<=9)
    { 
      this.setState({mobileError:true})
      cond = false
    }

    return cond
    
    
  }
  continue = () => {
    if(this.validate()) {
      //console.log("Submit")
      firebase.database().ref('users/' + this.context.uid).child('details/').set({
        city: this.state.city,
        locality: this.state.locality,
        flat: this.state.flat,
        pincode: this.state.pincode,
        state: this.state.stateName,
        landmark: this.state.landmark,
        name: this.state.name,
        mobile: this.state.mobile,
        alternate: this.state.alternateMob,
        
      }).then(()=>{
        //console.log("Done")
        this.props.navigation.navigate("PaymentScreen", {
          total: this.state.total,
          type:this.state.type,
          shipTo:this.state.name,
          shipToAdd: this.state.city+' '+this.state.locality+' '+this.state.flat+' '+this.state.landmark+' '+this.state.stateName+' - '+this.state.pincode,
          deliveryCharge: this.state.deliveryCharge

        });
      })
    }
  }
  
  render() {
    const { colors } = this.context;
    console.log(this.state.deliveryCharge)
    return (
      
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} title={"Checkout"} goBack={true} />
        {this.state.isLoading?
          <ActivityIndicator size='small' style={{marginTop: 40,}} />
        :
          <View style={{flex:1}}>
            <ScrollView contentContainerStyle={{paddingTop:20, paddingBottom: 50}}>
              <View style={{padding:15,flexDirection:'row', flexWrap: 'wrap', borderWidth:1, borderColor:'#ccc', margin: 15, borderRadius:5}}>
                <MyText label={"Address"} />
                <TextInput
                  label="City *"
                  value={this.state.city}
                  onChangeText={(city) => this.setState({city:city}) }
                  mode='outlined'
                  style={styles.input}
                  error={this.state.cityError}
                  onFocus={() => this.setState({cityError:false})}
                />
                <TextInput
                  label="Locality / Area or Street *"
                  value={this.state.locality}
                  onChangeText={(locality) => this.setState({locality:locality}) }
                  mode='outlined'
                  style={styles.input}
                  error={this.state.localityError}
                  onFocus={() => this.setState({localityError:false})}
                />
                <TextInput
                  label="Flat no., Building name *"
                  value={this.state.flat}
                  onChangeText={(flat) => this.setState({flat:flat}) }
                  mode='outlined'
                  style={styles.input}
                  error={this.state.flatError}
                  onFocus={() => this.setState({flatError:false})}
                />
                <TextInput
                  label="Pincode *"
                  value={this.state.pincode}
                  onChangeText={(pincode) => this.setState({pincode:pincode}) }
                  mode='outlined'
                  style={[styles.input,{width:'48%', marginRight:'2%'}]}
                  error={this.state.pincodeError}
                  onFocus={() => this.setState({pincodeError:false})}
                />
                <TextInput
                  label="State *"
                  value={this.state.stateName}
                  onChangeText={(stateName) => this.setState({stateName:stateName}) }
                  mode='outlined'
                  style={[styles.input,{width:'48%', marginLeft:'2%'}]}
                  error={this.state.stateNameError}
                  onFocus={() => this.setState({stateNameError:false})}
                />
                <TextInput
                  label="Landmark"
                  value={this.state.landmark}
                  onChangeText={(landmark) => this.setState({landmark:landmark}) }
                  mode='outlined'
                  style={styles.input}
                  
                />

              </View>
              <View style={{padding:15,flexDirection:'row', flexWrap: 'wrap', borderWidth:1, borderColor:'#ccc', margin: 15,borderRadius:5}}>
                <MyText label={"Personal Details"} />
                <TextInput
                  label="Name *"
                  value={this.state.name}
                  onChangeText={(name) => this.setState({name:name}) }
                  mode='outlined'
                  style={styles.input}
                  error={this.state.nameError}
                  onFocus={() => this.setState({nameError:false})}
                />
                <TextInput
                  label="Mobile Number *"
                  value={this.state.mobile}
                  onChangeText={(mobile) => this.setState({mobile:mobile}) }
                  mode='outlined'
                  style={styles.input}
                  error={this.state.mobileError}
                  onFocus={() => this.setState({mobileError:false})}
                />
                <TextInput
                  label="Alternate Number"
                  value={this.state.alternateMob}
                  onChangeText={(alternateMob) => this.setState({alternateMob:alternateMob}) }
                  mode='outlined'
                  style={styles.input}
                />
              </View>
            </ScrollView>
            <View style={{padding:15}}>
              <Button icon="cart" mode="contained" style={{borderRadius: 8,}} labelStyle={{fontSize: 20, fontWeight: 'bold'}} onPress={() => this.continue()}>
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

function MyText(props) {
  const { colors } = useTheme();
  //const contextType = ThemeContext;
  return (
    <Text style={{fontSize: 16,fontWeight:'bold', marginBottom: 5,marginTop: -25, backgroundColor: colors.background, color:colors.text, paddingHorizontal: 10 }}>{props.label}</Text>
  )
}

                
const styles = StyleSheet.create({
  input:{
    width: '100%',
    marginTop: 10
  },
});