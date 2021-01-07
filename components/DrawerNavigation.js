import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { AuthContext } from '../components/Context';
import DisplayUserInfo from '../components/DisplayUserInfo';

import HomeScreen from '../screens/HomeScreen'
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen'
import ExploreCategory from '../screens/ExploreCategory'
import CartScreen from '../screens/CartScreen'
import CheckOutScreen from '../screens/CheckOutScreen'
import PaymentScreen from '../screens/PaymentScreen'
import OrderScreen from '../screens/OrderScreen'
import MenuScreen from '../screens/MenuScreen'

const CreateDrawer = createDrawerNavigator();
export const DrawerNavigation = ({navigation}) => {
  return (
    <CreateDrawer.Navigator drawerContent={() => <DrawerContent navigation={navigation}/>}>
      <CreateDrawer.Screen name="HomeScreen" component={HomeScreen} />
      <CreateDrawer.Screen name="DetailScreen" component={DetailScreen} />
      <CreateDrawer.Screen name="SearchScreen" component={SearchScreen} />
      <CreateDrawer.Screen name="ExploreCategory" component={ExploreCategory} />
      <CreateDrawer.Screen name="CartScreen" component={CartScreen} />
      <CreateDrawer.Screen name="CheckOutScreen" component={CheckOutScreen} />
      <CreateDrawer.Screen name="PaymentScreen" component={PaymentScreen} />
      <CreateDrawer.Screen name="OrderScreen" component={OrderScreen} />
      <CreateDrawer.Screen name="MenuScreen" component={MenuScreen} />
    </CreateDrawer.Navigator>
  );
}


const DrawerContent = (props) => {
  
  //const onToggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const navigation = useNavigation();
  const contextType = AuthContext;
  const paperTheme = useTheme();
  
  const { signOut, loginCheck, toggleTheme } = React.useContext(AuthContext).auth;
  return (
    <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <DisplayUserInfo />
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => navigation.navigate("HomeScreen")}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="silverware-spoon" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Orders"
                            onPress={() => navigation.navigate("OrderScreen")}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="book-open-page-variant" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Menu"
                            onPress={() => navigation.navigate("MenuScreen")}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="calendar-today" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Todays Deals & Offer"
                            onPress={() => navigation.navigate("MenuScreen")}
                        />
                        {/*}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="heart-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Favourite"
                            onPress={() => {}}
                            />*/}
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme(paperTheme.dark)}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
              <DrawerItem 
                icon={({ color, size }) => (
                  <MaterialCommunityIcons name="logout" color={color} size={size} />
                )}
                label={"Sign Out"}
                onPress={() => signOut()}
              />
            </Drawer.Section>
        </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 1,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});