import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../components/context';


const SignInScreen = () => {
  	const navigation = useNavigation();
	//const authContext = React.useMemo(() => ({		});
	const [email, setEmail] = React.useState();
	const [password, setPassword] = React.useState();

	const [isLoading, setIsLoading] = React.useState(true);
	const [userToken, setUserToken] = React.useState('null'); 

	
	
	const authContext = React.useMemo(() => ({
		signIn: () => {
      setUserToken('fgkj');
      setIsLoading(false);
      },
	}), []);

	//const { signIn } = React.useContext(AuthContext)
	function signedinFunc() {
		navigation.navigate('Home')
	}
	return (
		<AuthContext.Provider value={authContext}>
			{ userToken == null ? (
      <View style={{paddingTop: 150, paddingHorizontal: 30}}>
        <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 20}}>Sign In</Text>
        <TextInput
          label="Username / Email"
          value={email}
          onChangeText={(email) => setEmail(email) }
          mode='outlined'
        />
        <TextInput
					secureTextEntry={true}
          label="Password"
          value={password}
          onChangeText={(password) => setPassword(password) }
          mode='outlined'
        />
        <Button icon="cart" mode="contained" style={{backgroundColor: '#f4511e', marginTop:  20}}>
					SIGN IN
        </Button>

				<Text style={{marginTop: 30, textAlign: 'center', fontSize: 16 }}>Don't have an account? 
					<Text 
						onPress={() => this.props.navigation.navigate('SignUpScreen')}
						style={{color:'#f4511e', fontWeight: 'bold'}}
						> Sign Up</Text>
				</Text>
      </View> )  : 
				//navigation.navigate('HomeScreen')
				signedinFunc()
				
			}
		</AuthContext.Provider>
  )
}
  
  export default SignInScreen;