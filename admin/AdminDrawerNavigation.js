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
import{ AuthContext } from '../components/Context';


import AdminDashboard from './screens/AdminDashboard'
import CategoryScreen from './screens/CategoryScreen'
import ProductScreen from './screens/ProductScreen'
import AddProductScreen from './screens/AddProductScreen'

const CreateDrawer = createDrawerNavigator();
export const AdminDrawerNavigation = ({navigation}) => {
  return (
    <CreateDrawer.Navigator drawerContent={() => <DrawerContent navigation={navigation}/>}>
      <CreateDrawer.Screen name="Dashboard" component={AdminDashboard} />
      <CreateDrawer.Screen name="Category" component={CategoryScreen} />
      <CreateDrawer.Screen name="Product" component={ProductScreen} />
      <CreateDrawer.Screen name="AddProduct" component={AddProductScreen} />
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
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            {/*
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                              /> */}
                            <Avatar.Text 
                                label="AD"
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Afnan Danish</Title>
                                {/*<Caption style={styles.caption}>@j_doe</Caption>*/}
                            </View>
                        </View>
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
                            label="Dashboard"
                            onPress={() => navigation.navigate("Dashboard")}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="book-open-page-variant" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Orders"
                            onPress={() => {}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Category"
                            onPress={() => navigation.navigate("Category")}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="silverware-spoon" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Products"
                            onPress={() => navigation.navigate("Product")}
                        />
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="calendar-today" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Orders"
                            onPress={() => {}}
                        />
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
                        />
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
      marginBottom: 15,
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