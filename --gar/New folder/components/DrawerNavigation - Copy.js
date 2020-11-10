import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import HomeScreen from '../screens/HomeScreen'


export const DrawerNavigation = ({navigation}) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Root2" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
