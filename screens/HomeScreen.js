import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header'
import { useTheme } from '@react-navigation/native'
import { ThemeContext } from '../components/Context';
import ShowCategory  from '../components/ShowCategory';
import ShowProducts  from '../components/ShowProducts';
import SingleProduct from '../components/SingleProducts';

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
        
        <View>
          <View><Text style={{fontSize:25, marginVertical:10, marginLeft:10, color:colors.text }}>Let's find{'\n'}quality food</Text></View>
          <ShowCategory />
        </View>

        <View>
          <View style={{marginVertical: 20,height:30,flexDirection:'row',paddingHorizontal:10}}>
            <Text style={{flex: 1,fontSize: 25,alignSelf:'flex-start'}}>Popular</Text>
            <View >
              <TouchableOpacity style={{flex:1,alignSelf:'flex-end',marginTop:8}} onPress={() => {}}>
                <Text style={{color: '#a0a0a0'}} >See All</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView contentContainerStyle={{flexDirection:'row', paddingHorizontal: 5,}}  horizontal={true} showsHorizontalScrollIndicator={false}>
            <SingleProduct name="Melting Cheese" description="Pizza ipsum dolor amet" img={require('../image/pizza-classic.png')} price="9" />
            <SingleProduct name="Oriental Pizza" description="Pizza ipsum dolor amet" img={require('../image/pizza-oriental.png')} price="10" />
            <SingleProduct name="Melting Cheese" description="Pizza ipsum dolor amet" img={require('../image/pizza-classic.png')} price="9" />
            <SingleProduct name="Oriental Pizza" description="Pizza ipsum dolor amet" img={require('../image/pizza-oriental.png')} price="10" />
          </ScrollView>
        </View>

      </View>
    )}
}
export default HomeScreen;

const styles = StyleSheet.create({
  
  
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