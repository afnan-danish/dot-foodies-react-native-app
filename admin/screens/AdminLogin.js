import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import{ AuthContext } from '../../components/Context';

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    //const { signOut, signIn, signInCheck, toggleTheme } = React.useContext(AuthContext);
  }
  state = {
    email: '',
    password: '',
  }
  static contextType = AuthContext
  //const news = ""
  
  componentDidMount() {
    //const user = this.context
    //console.log(user.signInCheck()) // { name: 'Tania', loggedIn: true }
  }

  signInFunction() {
    if(this.state.email=="admin" && this.state.password=="admin"){
      this.context.adminSignIn(this.state.email+"123456")
    } else {
      alert("Invalid Credential!!!")
    }
    
  }
  
  render() {
    return (
      <View style={{paddingTop: 150, paddingHorizontal: 30}}>
        <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 20}}>Admin Sign In</Text>
        <TextInput
          label="Username / Email"
          value={this.state.email}
          onChangeText={(email) => this.setState({email:email}) }
          mode='outlined'
        />
        <TextInput
          secureTextEntry={true}
          label="Password"
          value={this.state.password}
          onChangeText={(password) => this.setState({password:password}) }
          mode='outlined'
        />
        <Button icon="cart" mode="contained" style={{backgroundColor: '#f4511e', marginTop:  20}} onPress={() => this.signInFunction()}>
					SIGN IN
        </Button>

      </View>
    )}
  }
  
  export default AdminLogin;