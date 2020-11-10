import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header'


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
  render() {
    //const nav = useNavigation();
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Header navigation={this.props.navigation} title="Home" />
        
        {/*<Text onPress={() => this.props.navigation.openDrawer() }>Hello {'\n\n'} Root1</Text>*/}

        <View style={{padding:10}}>
          <View><Text style={{fontSize: 25, fontWeight: 600, marginBottom: 15 }}>Let's find{'\n'}quality food</Text></View>
          <ScrollView style={styles.qualityFood} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.qFoodBox}>
              <Image source={ require('../image/fast_food.png') } style={styles.qFoodBoxImg} />
              <Text style={styles.qFoodBoxText}>Baverage</Text>
            </View>
            <View style={styles.qFoodBox2}>
              <Image source={ require('../image/bakery.png') } style={styles.qFoodBoxImg} />
              <Text style={styles.qFoodBoxText}>Dessert</Text>
            </View>
            <View style={styles.qFoodBox}>
              <Image source={ require('../image/baverage.png') } style={styles.qFoodBoxImg} />
              <Text style={styles.qFoodBoxText}>Pasta</Text>
            </View>
            <View style={styles.qFoodBox2}>
              <Image source={ require('../image/bakery.png') } style={styles.qFoodBoxImg} />
              <Text style={styles.qFoodBoxText}>Pizza</Text>
            </View>
            <View style={styles.qFoodBox}>
              <Image source={ require('../image/baverage.png') } style={styles.qFoodBoxImg} />
              <Text style={styles.qFoodBoxText}>Salad</Text>
            </View>
            <View style={styles.qFoodBox2}>
              <Image source={ require('../image/bakery.png') } style={styles.qFoodBoxImg} />
              <Text style={styles.qFoodBoxText}>Sides</Text>
            </View>
            <View style={styles.qFoodBox}>
              <Image source={ require('../image/baverage.png') } style={styles.qFoodBoxImg} />
              <Text style={styles.qFoodBoxText}>Subs</Text>
            </View>
          </ScrollView>
        </View>




      </View>
    )}
}

export default HomeScreen;


const styles = StyleSheet.create({
  qualityFood : {
    width: '100%',
    flexDirection: 'row'
  },
  qFoodBox : {
    width: 120,
    height: 60,
	  backgroundColor: '#f4511e',
	  clipPath: 'polygon(0 0, 95% 20%, 98% 24%, 100% 31%, 100% 100%, 0 100%)',
    borderRadius: 10,
    margin: 0,
    position: 'relative'
  },
  qFoodBox2 : {
    width: 120,
    height: 60,
	  backgroundColor: '#f4511e',
	  clipPath: 'polygon(0 31%, 2% 24%, 5% 20%, 100% 0%, 100% 100%, 0 100%)',
    borderRadius: 10,
    marginHorizontal: 10,
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
    fontWeight: 'bold',
    position: 'absolute',
    top: 24,
    right: 7 
  }
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