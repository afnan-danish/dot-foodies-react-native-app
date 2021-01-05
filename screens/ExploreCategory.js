import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import storage from '@react-native-firebase/storage';

import * as firebase from 'firebase';
import { ActivityIndicator } from 'react-native-paper';
import Header from '../components/Header'
import SingleProduct from '../components/SingleProducts';

class ExploreCategory extends React.Component {
  state = {
    data:[],
    isLoading:true
  }
  /*
  getRestaurants = async (abcd) => {
    try {
      const list = [];
      var searchKey = abcd
      var snapshot = await firebase.firestore().collection("products").where('category', '<=', searchKey).where('category', '>=', searchKey).orderBy("category").get();
      console.log("Here");
      snapshot.forEach((doc) => {
        list.push(doc.data());
      });
      //setRestaurantsList(list);
      console.log(list)
      this.setState({
        data: list,
        isLoading:false
      });
    } catch (e) {
      console.log(e+
        "There's nae bleeding restaurants, I told you to upload them!"
      );
    }
  }
  */
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  componentDidMount = () => {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        isLoading:true
      });
      //this.getRestaurants(this.props.route.params.name)
      const items = firebase.database().ref('products/').orderByChild("category").equalTo(this.props.route.params.name);
      //const items = firebase.database().ref('products/-MMpIds11dC43fghQdOI');
      items.on("value", dataSnapshot => {
        //console.log(dataSnapshot.val())
        var tasks = [];
        dataSnapshot.forEach(child => {
          tasks.push({
            //name: child.val().name,
            //desc: child.val().desc,
            //url: child.val().url,
            key: child.key,
            id:child.val().id,
            //imageName: child.val().imageName,
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
        <SingleProduct id={item.id} key={item.id} width={"47%"} navigation={this.props.navigation} />
      )
    });
    return (
      
      <View>
        <Header navigation={this.props.navigation} title={this.props.route.params.name} goBack={true} />
        {this.state.isLoading?
          <ActivityIndicator size='small' style={{marginTop: 40,}} />
        :
          <ScrollView contentContainerStyle={{paddingTop:20, paddingBottom: 50}}>
            <View style={styles.qualityFood}>
              {mylist}
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}
export default ExploreCategory;

const styles = StyleSheet.create({
  qualityFood : {
    width: '100%',
    flexDirection: 'row',
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