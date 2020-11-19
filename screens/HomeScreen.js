import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header'
import { useTheme } from '@react-navigation/native'
import { ThemeContext } from '../components/Context';
import ShowCategory  from '../components/ShowCategory';
import ShowProducts  from '../components/ShowProducts';

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
          <ShowProducts />
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