import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase/app';

class SignUpScreen extends React.Component {
  state = {
    fullname : '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  signUpHandle(fname, email, pass, cpass) {
    if(pass==cpass){
      firebase.auth().createUserWithEmailAndPassword(email,pass)
        .then((res) => {
          firebase.database().ref('users/' + res.user.uid).set({
            firstName: fname,
            email: email
          })
          this.props.navigation.navigate("SignInScreen")
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
          console.log(errorCode)
        });
    } else {
      alert("Confirm password should be same!!!")
    }
  }
  render() {
    return (
      <View style={{paddingTop: 50, paddingHorizontal: 30}}>
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
          style={{marginTop: 15}}
        />
        <TextInput
          secureTextEntry={true}
          label="Password"
          value={this.state.password}
          onChangeText={(password) => this.setState({password:password}) }
          mode='outlined'
          style={{marginTop: 15}}
        />
        <TextInput
          secureTextEntry={true}
          label="Confirm Password"
          value={this.state.confirmPassword}
          onChangeText={(confirmPassword) => this.setState({confirmPassword:confirmPassword}) }
          mode='outlined'
          style={{marginTop: 15}}
        />
        <Button mode="contained" style={{backgroundColor: '#f4511e', marginTop:  20}} onPress={() => this.signUpHandle(this.state.fullname, this.state.email, this.state.password, this.state.confirmPassword)}>
					SIGN UP
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