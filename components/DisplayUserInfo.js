import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { Avatar, Title } from 'react-native-paper';
import { AuthContext } from '../components/Context';


class DisplayUserInfo extends React.Component {
  static contextType = AuthContext;
  constructor(props) {  
    super(props);  
    this.state = {
      fullname:'',
      label:'',
      isLoading:true,
    };  
  }
  componentDidMount = () => {
    const items = firebase.database().ref('users/').child(this.context.uid);
    items.once("value", dataSnapshot => {
      //console.log(dataSnapshot.val().firstName)
      const name = dataSnapshot.val().firstName
      this.setState({fullname:name})
      this.setState({label:name.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')})
      this.setState({
        isLoading:false
      });
      
    });
  }
  render() {
    return (
      <View style={{flex:1,flexDirection:'row',marginTop: 15}}>
        <Avatar.Text 
          label={this.state.label}
          size={50}
          labelStyle={{textTransform:"uppercase"}}
        />
        <View style={{marginLeft:15, flexDirection:'column'}}>
          <Title style={styles.title}>{this.state.fullname}</Title>
        </View>
      </View>
    )
  }
}
export default DisplayUserInfo;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
});