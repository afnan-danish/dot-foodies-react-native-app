import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import storage from '@react-native-firebase/storage';
import * as firebase from 'firebase';


class ShowCategory extends React.Component {
  state = {
    data:[],
    isLoading:true
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
        <TouchableOpacity style={styles.qFoodBox}>
          <Image source={{ uri: item.url }} style={styles.qFoodBoxImg} />
          <Text style={styles.qFoodBoxText}>{item.name}</Text>
        </TouchableOpacity>
      )
    });
    return (
      <View>
        <Text>Aaaa</Text>
        <ScrollView style={styles.qualityFood} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
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
    paddingEnd:10,
  },
  qFoodBox : {
    width: 120,
    height: 60,
	  backgroundColor: '#f4511e',
	  //clipPath: 'polygon(0 0, 95% 20%, 98% 24%, 100% 31%, 100% 100%, 0 100%)',
    borderRadius: 10,
    margin: 0,
    position: 'relative',
    marginRight:10,
  },
  
  qFoodBoxImg : {
    width: 38,
    height: 38,
    position: 'absolute',
    left : 5,
    bottom: 6,
  },
  qFoodBoxText : {
    fontSize: 15,
    color: '#fff',
    //fontWeight: 'bold',
    position: 'absolute',
    top: 24,
    right: 7 
  }
});