import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header'

class AdminDashboard extends React.Component {
      
    render() {
      //const state = this.props.route.params
      //console.log(this.props);
      return (
        <View>
          <Header navigation={this.props.navigation} title={this.props.route.name} />
          <Text>Admin Home</Text>
          
        </View>
      )}
  }
  
  export default AdminDashboard;