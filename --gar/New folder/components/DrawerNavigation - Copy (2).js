import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
const CreateDrawer = createDrawerNavigator();
import HomeScreen from '../screens/HomeScreen'
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
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const DrawerNavigation = ({navigation}) => {
  return (
    <CreateDrawer.Navigator drawerContent={() => <DrawerContent />}>
      <CreateDrawer.Screen name="Home" component={HomeScreen} />
    </CreateDrawer.Navigator>
  );
}


function DrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const onToggleTheme = () => setIsDarkTheme(!isDarkTheme);
  return (
    <View>
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent
        }
      >
        <View style={styles.userInfoSection}>
          
          <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={70}
            style={{marginHorizontal: 'auto', marginTop: 20}}
          />
          <Title style={styles.title}>John Doe</Title>
          {/*<Caption style={styles.caption}>@trensik</Caption>*/}
          
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="account-outline" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Orders"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />
            )}
            label="Menu"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />
            )}
            label="Todays Deals & Offer"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="heart-outline" color={color} size={size} />
            )}
            label="My Favourite"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />
            )}
            label="Terms and Conditions"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View>
                <Switch value={isDarkTheme} onValueChange={onToggleTheme} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Login/Logout</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Admin Login</Text>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
    <Drawer.Section style={styles.bottomDrawerSection}>
      <DrawerItem 
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
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
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center'
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
    marginTop: 5,
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