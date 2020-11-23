import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import storage from '@react-native-firebase/storage';
import * as firebase from 'firebase';


class ShowCategory extends React.Component {
  state = {
    data:[],
    isLoading:true
  }

  componentDidMount = async() => {
    const items = firebase.database().ref('category/')
    await items.on("value", dataSnapshot => {
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
        data: tasks,
        
      });
      this.setState({
        isLoading: false
      });
    });
  }
  render() {
    const mylist = this.state.data.map(item=>{
      //console.log(item.url)
      return (
        <TouchableOpacity style={styles.qFoodBox} key={item.key} onPress={() => {}}>
          <Image source={{ uri: item.url }} style={styles.qFoodBoxImg} />
          <Text style={styles.qFoodBoxText}>{item.name}</Text>
        </TouchableOpacity>
      )
    });
    return (
      <View>
        <ScrollView style={styles.qualityFood} contentContainerStyle={{paddingRight:10}} horizontal={true} showsHorizontalScrollIndicator={false}>
          {mylist}
        </ScrollView>
        
      </View>
    )
  }
}
export default ShowCategory;

const styles = StyleSheet.create({
  qualityFood : {
    width: '100%',
    flexDirection: 'row',
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