import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import{ AuthContext } from '../components/context';

class SignUpScreen extends React.Component {
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

  signInHandle() {
    this.context.signIn(this.state.email, this.state.password)
  }
  
  render() {
    return (
      <View style={{paddingTop: 150, paddingHorizontal: 30}}>
        <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 20}}>Sign In</Text>
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
        <Button icon="cart" mode="contained" style={{backgroundColor: '#f4511e', marginTop:  20}} onPress={() => this.signInHandle()}>
					SIGN IN
        </Button>

        <Text style={{marginTop: 30, textAlign: 'center', fontSize: 16 }}>Have an account? 
					<Text 
						onPress={() => this.props.navigation.navigate('SignUpScreen')}
						style={{color:'#f4511e', fontWeight: 'bold'}}
						> Sign In</Text>
				</Text>

        <Text onPress={() => this.props.navigation.navigate('AdminLogin')} 
        style={{color:'#f4511e', fontWeight: 'bold', marginTop: 30, textAlign: 'center',fontSize: 16 }}
						>Admin Login</Text>
      </View>
    )}
  }
  
  export default SignUpScreen;