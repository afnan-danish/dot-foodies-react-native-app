import { CommonActions } from '@react-navigation/native'
import React from 'react'
import { View, Text, Alert,SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import Header from '../../components/Header'
import {TextInput, Button, List, Avatar, Paragraph, Dialog, Portal, Modal, ActivityIndicator} from 'react-native-paper'
import{ ThemeContext } from '../../components/Context'
import * as firebase from 'firebase/app';

class ProductScreen extends React.Component {
  static contextType = ThemeContext;
  constructor(props) {  
    super(props);  
    this.state = {  
      data:[],
      isLoading:true,
    };  
  }
  componentDidMount = () => {
    const items = firebase.database().ref('products/')
    items.on("value", dataSnapshot => {
      var tasks = [];
      dataSnapshot.forEach(child => {
        tasks.push({
          name: child.val().name,
          shortDesc: child.val().shortDesc,
          url: child.val().url,
          key: child.key,
          salePrice:child.val().salePrice,
          imageName: child.val().imageName,
        })
      });
      this.setState({
        data: tasks,
        isLoading:false
      });
      
    });
  }
  deleteRow = (key, imgName) => {
    console.log(key)
    firebase.database().ref('products').child('' + key).remove().then(() => {
      firebase.storage().ref('products').child('' + imgName).delete().then(() => {
        Alert.alert("Successfully Deleted.")
      })
      .catch((error) => {
        console.log("Remove failed : " + error.message)
      });
    }).catch((error) => {console.log("Remove failed : " + error.message)});
}

  render() {
    const { colors } = this.context;
    const productList = this.state.data.map(item=>{
      //console.log(item.url)
      return (
        <List.Item key={item.key}
          title={<Text style={{color:colors.text}}>{item.name} <Text style={{fontSize:12,color:colors.primary,fontWeight:'bold'}}>Rs. {item.salePrice}</Text></Text>}
          description={item.shortDesc}
          left={props => <Image {...props} style={{height: 50, width:50}} source={{ uri: item.url }} />}
          right={props => 
            <View>
              <TouchableOpacity onPress={() => console.log(item.key)}><Avatar.Icon size={25} color={'#fff'} icon={"lead-pencil"} /></TouchableOpacity>
              <TouchableOpacity style={{marginTop:5}} onPress={() => this.deleteRow(item.key, item.imageName)}><Avatar.Icon size={25} color={'#fff'} icon={"delete"} /></TouchableOpacity>
            </View>
          }
          style={{borderBottomWidth: 1,borderBottomColor: '#cfcfcf'}}
        />
      )
    });

    return (
      <SafeAreaView>
        <Header navigation={this.props.navigation} title={this.props.route.name} />
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
          <Button mode="contained" style={{margin:10}} onPress={() => this.props.navigation.navigate("AddProduct")}>
            Add New Category
          </Button>
          <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 1}}>Product List</Text>
          {this.state.isLoading?<ActivityIndicator size='large' />:
            productList
          }
        </ScrollView>
        
      
      </SafeAreaView>
    )}
  }
  
  export default ProductScreen;