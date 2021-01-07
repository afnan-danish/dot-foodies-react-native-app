import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import { ActivityIndicator } from 'react-native-paper';
import Header from '../components/Header'
import SingleProduct from '../components/SingleProducts';

class ExploreCategory extends React.Component {
  state = {
    data:[],
    isLoading:true
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  componentDidMount = () => {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        isLoading:true
      });
      const items = firebase.database().ref('products/');
      items.on("value", dataSnapshot => {
        var tasks = [];
        dataSnapshot.forEach(child => {
          tasks.push({
            key: child.key,
            id:child.val().id,
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
      return (
        <SingleProduct id={item.id} key={item.id} width={"47%"} navigation={this.props.navigation} />
      )
    });
    return (
      
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} title={"Menu"} goBack={true} />
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