import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import storage from '@react-native-firebase/storage';
import * as firebase from 'firebase';
import { Button, ActivityIndicator } from 'react-native-paper';
import { ThemeContext } from '../components/Context';
import { NavigationActions } from 'react-navigation';


class SingleProduct extends React.Component {
  static contextType = ThemeContext;
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
    };  
  }
  componentDidMount = () => {
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
  render() {
    const { colors } = this.context;
    //console.log(this.state.data)
    /*
    navigation.reset({
      index: 0,
      routes: [{ name: 'Profile' }],
    });
    */
   
    return (
      <View style={[styles.products, {backgroundColor:colors.header}, this.props.width!=null?{width:this.props.width}:null]}>
        {this.state.isLoading?<ActivityIndicator size='small' style={{paddingVertical: 100}} />:
        <View>
          <TouchableOpacity onPress={() => 
              this.props.navigation.navigate('DetailScreen', {id: this.state.id})
            } 
          >
            <Text style={{textAlign:'center',color: colors.text, fontSize:18, fontWeight: 'bold'}}>{this.state.name}</Text>
            <Text style={{color: '#a0a0a0',fontSize:12, textAlign: 'center', }}>{this.state.desc}</Text>
          </TouchableOpacity>
          
          <View style={{alignItems: 'center',paddingVertical: 15}}>
            <Image source={{uri :this.state.imguri}} style={{ width: 120, height: 120}} />
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{color: '#a0a0a0',alignSelf:'flex-start'}}>Rs <Text style={{fontSize: 22, color: colors.text, fontWeight: 'bold', }}>{this.state.salePrice}</Text></Text>
            <View style={{flex:1}}>
              <TouchableOpacity style={{alignSelf:'flex-end'}} 
                onPress={() => 
                  //this.props.navigation.reset({index: 0, routes: [{name:'DetailScreen', params: {id: this.state.id}}] })
                  this.props.navigation.navigate('DetailScreen', {id: this.state.id})
                } 
              >
                <Text style={styles.addBtn}>+</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
        }
      </View>
    );
  }
}
export default SingleProduct;

const styles = StyleSheet.create({
  products : {
    width:160,
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