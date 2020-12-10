import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext, ThemeContext } from '../components/Context';
import { NavigationContainer, DefaultTheme , DarkTheme } from '@react-navigation/native';
import {Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, ActivityIndicator } from 'react-native-paper'

import {DrawerNavigation} from './DrawerNavigation'
import {AdminDrawerNavigation} from '../admin/AdminDrawerNavigation'
import DetailScreen from '../screens/DetailScreen'
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AdminLogin from '../admin/screens/AdminLogin';
import { View } from 'react-native';


const Stack = createStackNavigator();
const Navigation = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    adminMode: null,
  };
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...DefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#f0f0fa',
      text: '#333333',
      header: '#ffff',
      primary: "#f4511e",
      statusbar: '#f4511e',
    }
  }
  
  const CustomDarkTheme = {
    ...DarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#323a67',
      text: '#ffffff',
      header: '#242750',
      card: "#12142f",
      primary: "#f4511e",
      statusbar: '#323a67',
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          adminMode: action.mode
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
          adminMode: null
        };
      case 'ADMIN_LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
          adminMode: action.mode
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
          adminMode: false
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
          adminMode: false
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  
  const authContext = React.useMemo(() => ({
    //const userT = loginState.userToken;
    signIn: async(user) => {
      //setUserToken(null);
      //setIsLoading(false);
      let userToken;
      userToken = null
      if(user!=null){
        userToken = user
        try {
          await AsyncStorage.setItem('userToken',userToken);
        } catch(e) {
          console.log(e)
        }
      }
      dispatch({ type: 'LOGIN', id: userToken, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('adminMode');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    },
    adminSignIn: async(user) => {
      //setUserToken(null);
      //setIsLoading(false);
      let userToken;
      userToken = null
      if(user!=null){
        userToken = user
        try {
          await AsyncStorage.setItem('userToken',userToken);
          await AsyncStorage.setItem('adminMode',"admin");
        } catch(e) {
          console.log(e)
        }
      }
      dispatch({ type: 'ADMIN_LOGIN', id: "amin", token: userToken, mode: true });
    }
  }), []);

  React.useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      let adminMode;
      userToken = null;
      adminMode = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        adminMode = await AsyncStorage.getItem('adminMode');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, mode: adminMode });
    }, 1000);
  }, []);
  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator color={"#f4511e"} size="large"/>
      </View>
    );
  }
  return(
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <AuthContext.Provider value={{auth:authContext, uid:loginState.userToken}}>
          <ThemeContext.Provider value={theme}>
            { loginState.userToken === null ? (
              <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="AdminLogin" component={AdminLogin} />
              </Stack.Navigator>
            ) : (
              loginState.adminMode === null ? (
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={DrawerNavigation} />
              </Stack.Navigator>
              ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                   <Stack.Screen name="Home" component={AdminDrawerNavigation} />
                </Stack.Navigator>
              )
            )}
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Navigation;