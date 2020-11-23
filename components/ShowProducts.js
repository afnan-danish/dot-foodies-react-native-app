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
        <TouchableOpacity style={styles.qFoodBox} key={item.key}>
          <Image source={{ uri: item.url }} style={styles.qFoodBoxImg} />
          <Text style={styles.qFoodBoxText}>{item.name}</Text>
        </TouchableOpacity>
      )
    });
    return (
      <View>
        <View style={{flex:1, flexDirection: 'row', gap: 10}}>
          <ProductCard name="Melting Cheese" description="Pizza ipsum dolor amet" img="pizza-classic.png" price="9" />
          <ProductCard name="Oriental Pizza" description="Pizza ipsum dolor amet" img="pizza-oriental.png" price="10" />
        </View>
      </View>
    )
  }
}
export default ShowCategory;

const styles = StyleSheet.create({
  products : {
    flex: 1,
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
  },
});