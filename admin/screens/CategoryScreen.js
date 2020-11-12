import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Header from '../../components/Header'
import {TextInput, Button, List, Avatar, Paragraph, Dialog, Portal} from 'react-native-paper'
import ImagePickerExample from '../CustomImagePicker'
import{ ThemeContext } from '../../components/Context';
import storage from '@react-native-firebase/storage';
import * as firebase from 'firebase';
import auth from 'firebase/auth';


class CategoryScreen extends React.Component {
  static contextType = ThemeContext;
  state = {
    addNew: false,
    catName: "",
    catDesc: "",
    catImgUrl: null,
    data:[],
    listLoader:true,
    addCatLoader:false,
    isUpdate:false,
  }
  
  setFoodImage = (uri) => {
    this.setState({catImgUrl: uri});
  }
  getCurrentUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return user.uid
      }
    });
  }
  isValidate = () => {
    if(this.state.catName=="") {
      Alert.alert("Please enter category name")
      console.log("Please enter category name")
      return false
    } else if(this.state.catImgUrl==null){
      Alert.alert("Please select category picture")
      console.log("Please select category picture")
      return false
    }  
    return true
  }
  uploadImage = async() => {
    if(this.isValidate()){
      this.setState({addCatLoader:true})
      const image = this.state.catImgUrl
      //const user = this.getCurrentUser();
      const refImage = firebase.storage().ref('category/'+Date.now().toString());
      refImage.putString(image, 'data_url', {contentType:'image/jpg'}).then((status) => {
        refImage.getDownloadURL().then((url) =>{
          console.log('Image uploaded');
          //console.log(status.metadata.name)
          firebase.database().ref('category/').push().set({
            name: this.state.catName,
            desc: this.state.catDesc,
            url: url,
            imageName:status.metadata.name
          })
          this.resetData()
          this.setState({addCatLoader:false})
        })
      });
    }
  }
  updateImage = () => {
    const image = this.state.catImgUrl
    console.log(image)
  }
  componentDidMount = () => {
    const items = firebase.database().ref('category/')
    items.on("value", dataSnapshot => {
      var tasks = [];
      dataSnapshot.forEach(child => {
        tasks.push({
          name: child.val().name,
          desc: child.val().desc,
          url: child.val().url,
          key: child.key,
          imageName: child.val().imageName,
        })
      });
      this.setState({
        data: tasks
      });
      this.setState({
        listLoader: false
      });
    });
  }
  resetData = () => {
    this.setState({addNew: false})
    this.setState({catName: ""})
    this.setState({catDesc: ""})
    this.setState({catImgUrl: null})
    this.setState({isUpdate: false})
  }
  /*
  Update 
  handleUpdate() {
    var updates = {};
    updates['/id'] = 1;
    updates['/title'] = 'Apple';

    return firebase.database().ref('items').child('ITEM_KEY').update(updates);
  }
  */
  updateData = (key, name, desc, url) => {
    this.setState({isUpdate: true})
    this.setState({addNew: true})
    this.setState({catName: name})
    this.setState({catDesc: desc})
    this.setState({catImgUrl: url})
  }
  deleteRow = (key, imgName) => {
    console.log(key)
    firebase.database().ref('category').child('' + key).remove().then(() => {
      firebase.storage().ref('category').child('' + imgName).delete().then(() => {
        console.log(" Remove successfull.")
      })
      .catch((error) => {
        console.log("Remove failed : " + error.message)
      });
    })
    .catch((error) => {
      console.log("Remove failed : " + error.message)
    });

  }
  
  render() {
    const { colors } = this.context;
    const mylist = this.state.data.map(item=>{
      //console.log(item.url)
      return (
        <List.Item key={item.key}
          title={item.name}
          description={item.desc}
          left={props => <Image {...props} style={{height: 50, width:50}} source={{ uri: item.url }} />}
          right={props => 
            <View>
              <TouchableOpacity onPress={() => this.updateData(item.key, item.name, item.desc, item.url )}><Avatar.Icon size={25} color={'#fff'} icon={"lead-pencil"} /></TouchableOpacity>
              <TouchableOpacity style={{marginTop:5}} onPress={() => this.deleteRow(item.key, item.imageName)}><Avatar.Icon size={25} color={'#fff'} icon={"delete"} /></TouchableOpacity>
            </View>
            }
          style={{borderBottomWidth: 1,borderBottomColor: '#cfcfcf'}}
        />
      )
    });

    return (
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} title={this.props.route.name} />
        <ScrollView showsVerticalScrollIndicator={true}>
          <Button mode="contained" style={this.state.addNew?{display:'none'}:{backgroundColor: colors.primary, marginVertical: 15, marginHorizontal: 10}} onPress={() => this.setState({addNew: true})}>
            Add New Category
          </Button>
          <View style={this.state.addNew?{padding:15}:{display:'none'}}> 
            <View style={{flex:1, flexDirection:'row-reverse'}}>
              <Text style={{backgroundColor: colors.primary, color:'#fff', padding:5, borderRadius: 5}} onPress={() => this.resetData()}>Close</Text>
            </View>
            <TextInput
              label="Category Name"
              value={this.state.catName}
              onChangeText={(catName) => this.setState({catName:catName})}
              mode='outlined'
            />
            <TextInput
              label="Desciption"
              value={this.state.catDesc}
              onChangeText={(catDesc) => this.setState({catDesc:catDesc})}
              mode='outlined'
            />
              
            <ImagePickerExample img={this.state.catImgUrl} onImagePicked={this.setFoodImage} />
            
            <Button mode="contained" 
              style={{backgroundColor: colors.primary, marginVertical: 15,}} 
              disabled={this.state.addCatLoader} 
              onPress={() => this.state.isUpdate?this.updateImage():this.uploadImage()}>
              {this.state.addCatLoader?"Please wait...": this.state.isUpdate?"Update Category":"Add Category"}
            </Button>
            
          </View>
          <View>
            {this.state.listLoader?
            <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:30}}><ActivityIndicator size="large"/></View>
                : null}
            {mylist}
          </View>
        </ScrollView>
        {/*
        const showDialog = () => this.setState({visible:true});
        const hideDialog = () => this.setState({visible:false});
    
        <Button onPress={showDialog}>Show Dialog</Button>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure you want to delete this category?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={hideDialog}>Deleter</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal> */}
      </View>
    )}
  }
  
export default CategoryScreen;