import React from 'react';
import { View, Text } from 'react-native';

class DetailScreen extends React.Component {
      
    render() {
      const state = this.props.route.params
      //console.log();
      return (
        <View>
          <Text onPress={() => this.props.navigation.navigate('Home', {screen : 'Home'}) }>Details Screen {state.Hello}</Text>
          
        </View>
      )}
  }
  
  export default DetailScreen;