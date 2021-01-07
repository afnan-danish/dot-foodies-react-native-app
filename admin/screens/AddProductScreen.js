import { CommonActions } from '@react-navigation/native'
import React from 'react'
import { View, Text, Alert } from 'react-native'
import {TextInput, Button, List, ActivityIndicator, Modal} from 'react-native-paper'
import{ ThemeContext } from '../../components/Context'
import * as firebase from 'firebase/app'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-navigation'
import { colors } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ImagePickerExample from '../CustomImagePicker'

class AddProductScreen extends React.Component {
  static contextType = ThemeContext;
  constructor(props) {  
    super(props);  
    this.state = {  
        name: '',  
        shortDesc: '',  
        desc: '',
        regularPrice:'',
        salePrice:'', 
        imgUrl:null,
        category:'',
        isAdding:false,
    };  
  }
  keyGenerator = () => {
    return (((1+Math.random())*0x1000000)|0).toString(16).substring(1);
  }
  validate = () => {
    return true
  }
  addProduct = () => {
    if(this.validate()) {
      this.setState({isAdding:true})
      const image = this.state.imgUrl
      //const user = this.getCurrentUser();
      const refImage = firebase.storage().ref('products/'+Date.now().toString());
      refImage.putString(image, 'data_url', {contentType:'image/jpg'}).then((status) => {
        refImage.getDownloadURL().then((url) =>{
          console.log('Image uploaded');
          //console.log(status.metadata.name)
          
          firebase.database().ref('products/').push().set({
            id: this.keyGenerator(),
            name: this.state.name,
            desc: this.state.desc,
            shortDesc: this.state.shortDesc,
            regularPrice: this.state.regularPrice,
            salePrice: this.state.salePrice,
            url: url,
            category:this.state.category,
            imageName:status.metadata.name
          })
          /*
         firebase.firestore()
            .collection('products')
            .add({
              id: this.keyGenerator(),
              name: this.state.name,
              desc: this.state.desc,
              shortDesc: this.state.shortDesc,
              regularPrice: this.state.regularPrice,
              salePrice: this.state.salePrice,
              url: url,
              category:this.state.category,
              imageName:status.metadata.name
            })
            .then(() => {
              console.log('User added!');
          });
          */


          this.resetData()
          this.setState({isAdding:false})
          this.props.navigation.navigate("Product")
        })
      });
    }
  }
  resetData = () => {
    this.setState({
      name: '',  
      shortDesc: '',  
      desc: '',
      regularPrice:'',
      salePrice:'', 
      imgUrl:null,
      category:'',
      isAdding:false,
    })
  }
  setFoodImage = (uri) => {
    this.setState({imgUrl: uri});
  }
  //const news = ""
  render() {
    const { colors } = this.context;
    //console.log(this.state.imgUrl)
    //alert(this.keyGenerator())
    return (
      <View>
        <Header navigation={this.props.navigation} title={this.props.route.name} />
        
        <ScrollView style={{padding: 10, marginBottom: 56}} contentContainerStyle={{paddingBottom:30}}>
          <Text style={{fontSize: 20}}>Add New Product </Text>
          <TextInput
            label="Name"
            value={this.state.name}
            onChangeText={(name) => this.setState({name:name})}
            mode='outlined'
            style={{marginTop:10}}
          />
          <TextInput
            label="Short Description"
            value={this.state.shortDesc}
            onChangeText={(shortDesc) => this.setState({shortDesc:shortDesc})}
            mode='outlined'
            style={{marginTop:10}}
          />
          <View style={{flexDirection:'row'}}>
            <TextInput
              label="Regular Price(Rs)"
              value={this.state.regularPrice}
              onChangeText={(regularPrice) => this.setState({regularPrice:regularPrice.replace(/[^0-9,-,.]/g, '')})}
              mode='outlined'
              style={{marginTop:10,flex:1,marginRight:5}}
            />
            <TextInput
              label="Sale Price(Rs)"
              value={this.state.salePrice}
              onChangeText={(salePrice) => this.setState({salePrice:salePrice.replace(/[^0-9,-,.]/g, '')})}
              mode='outlined'
              style={{marginTop:10,flex:1,marginLeft:5}}
            />
          </View>
          <ImagePickerExample img={this.state.imgUrl} onImagePicked={this.setFoodImage} />
          {/*
          <Picker
              selectedValue={this.state.selectedValue}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => this.setState({selectedValue:itemValue})}
            >
              <Picker.Item label="Category 1" value="cat1" />
              <Picker.Item label="Category 2" value="cat2" />
            </Picker>
          */}
          <TextInput
            label="Category"
            value={this.state.category}
            onChangeText={(category) => this.setState({category:category})}
            mode='outlined'
            style={{marginTop:10,flex:1,marginLeft:5}}
          />
          <TextInput
            label="Full Description"
            value={this.state.desc}
            onChangeText={(desc) => this.setState({desc:desc})}
            mode='outlined'
            style={{marginTop:10,flex:1,marginLeft:5}}
            multiline={true}
            numberOfLines={10}
          />

          <Button mode="contained" 
            loading={this.state.isAdding}
            style={{backgroundColor: colors.primary, marginVertical: 20,}} 
            onPress={() => this.addProduct()}>
            {this.state.isAdding?"Please wait...":"Add Product"}
            
          </Button>
        </ScrollView>
        {/*this.state.isAdding?
        <View style={{position: 'absolute',left: 0,right: 0,top: 0,bottom: 0,alignItems: 'center',justifyContent: 'center',backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <ActivityIndicator size='large' />
        </View>:null*/}
      </View>
    )}
  }
  
  export default AddProductScreen;