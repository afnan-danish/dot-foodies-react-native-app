import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../components/Context';

import {DrawerNavigation} from './DrawerNavigation'
import DetailScreen from '../screens/DetailScreen'
import SearchScreen from '../screens/SearchScreen'
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AdminLogin from '../screens/AdminLogin';



const Stack = createStackNavigator();
const Navigation = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: "null",
  };
  
  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,

        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(() => ({
    signIn: async(userName, password) => {
      //setUserToken(null);
      //setIsLoading(false);
      let userToken;
      userToken = null
      if(userName=='user' && password=='pass'){
        userToken = 'random'
        try {
          await AsyncStorage.setItem('userToken',userToken);
          //navigation.navigate('home');
        } catch(e) {
          console.log(e)
        }
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    loginCheck: () => {
      //alert("1"+loginState.userToken);
      //const abcd = loginState.userToken;
      return loginState.userToken;
    },
  }), []);

  React.useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);
  return(
    <AuthContext.Provider value={authContext}>
      { loginState.userToken !== null ? (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={DrawerNavigation} />
          <Stack.Screen name="Details" component={DetailScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
        </Stack.Navigator>
      ) 
      }
      
    </AuthContext.Provider>
  );
}

export default Navigation;