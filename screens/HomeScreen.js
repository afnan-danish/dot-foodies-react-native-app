import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header'
import { useTheme } from '@react-navigation/native'
import { ThemeContext } from '../components/Context';
import ShowCategory  from '../components/ShowCategory';
import SingleProduct from '../components/SingleProducts';
import Icon from 'react-native-vector-icons/FontAwesome';
//import styled from 'styled-components'


/*
export class Root2 extends React.Component {
  render(){
    return (
      <View>
        <Text onPress={() => this.props.navigation.navigate('Details', {Hello: 'Afnan'}) }>Hello Root2</Text>
        <Text onPress={() => this.props.navigation.navigate('Details', {Hello: 'Danish'}) }>Hello Root22</Text>
        <Text onPress={() => this.props.navigation.openDrawer() }>Open Drawer</Text>
      </View>
    );
  }
}
*/

class HomeScreen extends React.Component {
  static contextType = ThemeContext;
  render() {
    //const nav = useNavigation();
    const { colors } = this.context;
    //console.log(colors)
    
    return (
      <View>
        <Header navigation={this.props.navigation} title="Home" />
        <ScrollView contentContainerStyle={{paddingBottom:60}}>
          <View>
            <View><Text style={{fontSize:25, marginVertical:10, marginLeft:10, color:colors.text }}>Let's find{'\n'}quality food</Text></View>
            <ShowCategory {...this.props} />
          </View>

          <View>
            <View style={{marginVertical: 20,height:30,flexDirection:'row',paddingHorizontal:10}}>
              <Text style={{flex: 1,fontSize: 25,alignSelf:'flex-start',color:colors.text}}>Popular</Text>
              <View >
                <TouchableOpacity style={{flex:1,alignSelf:'flex-end',marginTop:8}} onPress={() => {}}>
                  <Text style={{color: '#a0a0a0'}} >See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView contentContainerStyle={{flexDirection:'row', paddingHorizontal: 5,}}  horizontal={true} showsHorizontalScrollIndicator={false}>
              <SingleProduct id="be7c9f" navigation={this.props.navigation} />
              <SingleProduct id="be7c9f" navigation={this.props.navigation} />
              <SingleProduct id="9fe385" navigation={this.props.navigation} />
              <SingleProduct id="5ad529" navigation={this.props.navigation} />
              <SingleProduct id="9ad129" navigation={this.props.navigation} />
              <SingleProduct id="be7c9f" navigation={this.props.navigation} />
            </ScrollView>
          </View>

          <View style={{padding:10}}>
            <View style={{marginTop: 5,paddingBottom:20}}>
              <Text style={{fontSize: 25, color:colors.text}}>Recommended</Text>
            </View>
            <View style={styles.recomBox}>
              <View style={{flex: 1}}>
                <Image source={ require('../image/shrimp-noodles.png') } style={{ width: 125, height: 125 }} />
              </View>
              <View style={{flex: 1, paddingTop: 8}}>
                <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>Shrimp Noodles</Text>
                <Text style={{color: '#fff'}}>Lorem Ipsum simply text.</Text>
                <Text style={{color: '#fff', paddingTop: 5}}><Icon name="clock-o" size={14} backgroundColor={'#fff'}/> 25-40 min</Text>
                <Text style={{color: '#fff'}}>Rs <Text style={{fontSize: 22, fontWeight: 'bold', }}>14.65</Text></Text>
              </View>
            </View>
          </View>

          
    
        </ScrollView>
      </View>
    )}
}
export default HomeScreen;

const styles = StyleSheet.create({
  recomBox : {
    backgroundColor: '#f4511e',
	  //clipPath: 'polygon(0 32%, 1% 26%, 3% 22%, 100% 0%, 100% 100%, 0 100%)',
    borderRadius: 13,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    flex: 1,
  },
  
  
});












/*
////////////////Categaries/////////
Pizza
Chinese
Fast Food
Comfort Food
Dessert
American
BBQ
Burgers
Bakery
Wings
Baverage
Sandwich
Indian
Italian
Asian
Ice Creame and Frozen Yogurt
Pasta
Vegan
Salads
Healthy
*/