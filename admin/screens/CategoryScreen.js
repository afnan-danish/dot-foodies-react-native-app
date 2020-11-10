import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../components/Header'
import {TextInput, Button, List, Avatar} from 'react-native-paper'
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
  uploadImage = async() => {
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
      })
    });

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
    });
  }
  resetData = () => {
    this.setState({addNew: false})
    this.setState({catName: ""})
    this.setState({catDesc: ""})
    this.setState({catImgUrl: null})
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
  deleteRow = (key, imgName) => {
    console.log(key)
    firebase.database().ref('category').child('' + key).remove().then(() => {
      firebase.storage().ref('category').child('' + imgName).delete().then(() => {
        console.log(" Remove successfull.")
      })
      .catch((error) => {
        console.log("Remove failed: " + error.message)
      });
    })
    .catch((error) => {
      console.log("Remove failed: " + error.message)
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
            <View style={{gap:5}}>
              <TouchableOpacity><Avatar.Icon size={25} color={'#fff'} icon={"lead-pencil"} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.deleteRow(item.key, item.imageName)}><Avatar.Icon size={25} color={'#fff'} icon={"delete"} /></TouchableOpacity>
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
              
            <ImagePickerExample onImagePicked={this.setFoodImage} />
            <Button mode="contained" style={{backgroundColor: colors.primary, marginVertical: 15,}} onPress={() => this.uploadImage()}>
              Add Category
            </Button>
            
          </View>
          <View>
            {mylist}
          </View>
        </ScrollView>
      </View>
    )}
  }
  
export default CategoryScreen;