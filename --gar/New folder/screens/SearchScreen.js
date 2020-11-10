import React from 'react';
import { View, Text } from 'react-native';

class SearchScreen extends React.Component {
      
    render() {
      const state = this.props.route.params
      //console.log();
      return (
        <View>
          <Text>Details Screen {state.key}</Text>
          
        </View>
      )}
  }
  
  export default SearchScreen;