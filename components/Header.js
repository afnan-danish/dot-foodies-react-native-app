import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import{ ThemeContext } from '../components/Context';
import CartCount  from './CartCount';


class Header extends React.Component {
  static contextType = ThemeContext;
  state = {
    searchKey : "",
    isSearchOpen : false,
    //searchBox: {Disp}
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      //console.log('enter press here! ')
      this.props.navigation.navigate('SearchScreen', {key: this.state.searchKey})
    }
  }
  
  
  render() {
    const { colors } = this.context;
    //console.log(colors)
    
    return(
      <SafeAreaView>
        <StatusBar backgroundColor={colors.statusbar} barStyle="light-content" />
        <Appbar.Header style={{backgroundColor: colors.header}} statusBarHeight={0} >
          {this.props.goBack?
            <Appbar.Action icon="chevron-left" onPress={() => this.props.navigation.goBack() } /> 
          : 
            <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer() } /> 
          }
          <Appbar.Content style={{paddingLeft:0}} title={this.props.title}  />
          
          <CartCount colors={colors} {...this.props} />        
          
          {this.props.hideSearch?<View style={{marginRight:15}}></View>:
            <Appbar.Action icon={this.state.isSearchOpen? "close" : "magnify" }
              onPress={()=> this.state.isSearchOpen? this.setState({isSearchOpen: false}) : this.setState({isSearchOpen: true}) }
            />
          }
        </Appbar.Header>
        
        <Searchbar style={this.state.isSearchOpen? styles.searchBar : {display:'none'} }
          placeholder="Search"
          //autoFocus={true}
          value={this.state.searchKey}
          onKeyPress={this.handleKeyPress}
          onChangeText={(searchKey) => this.setState({searchKey:searchKey})}
          onIconPress={() => this.props.navigation.navigate('SearchScreen', {key: this.state.searchKey})}
          onSubmitEditing={()=>  this.props.navigation.navigate('SearchScreen', {key: this.state.searchKey})}
          //onBlur={()=> this.setState({isSearchOpen: false})}
        />
        
      </SafeAreaView>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',

  },
  
});