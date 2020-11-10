import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

class SignUpScreen extends React.Component {
  state = {
    fullname : '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  render() {
    return (
      <View style={{paddingTop: 150, paddingHorizontal: 30}}>
        <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 20}}>Sign In</Text>
        <TextInput
          label="Full Name"
          value={this.state.fullname}
          onChangeText={(fullname) => this.setState({fullname:fullname}) }
          mode='outlined'
        />
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
        <TextInput
          secureTextEntry={true}
          label="Confirm Password"
          value={this.state.confirmPassword}
          onChangeText={(confirmPassword) => this.setState({confirmPassword:confirmPassword}) }
          mode='outlined'
        />
        <Button icon="cart" mode="contained" style={{backgroundColor: '#f4511e', marginTop:  20}} onPress={() => console.log('Pressed')}>
					SIGN IN
        </Button>

        <Text style={{marginTop: 30, textAlign: 'center', fontSize: 16 }}>Have an account? 
					<Text 
						onPress={() => this.props.navigation.navigate('SignInScreen')}
						style={{color:'#f4511e', fontWeight: 'bold'}}
						> Sign In</Text>
				</Text>
      </View>
    )}
  }
  
  export default SignUpScreen;