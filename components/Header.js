import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import{ ThemeContext } from '../components/Context';


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
          <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer() } />
          <Appbar.Content title={this.props.title} />
          
          <View style={{position:"relative"}}>
            <Appbar.Action style={{color:"#000"}} color={colors.text} icon="cart" 
              onPress={()=> {}} />
            <View style={{position:"absolute",top:8,right:1,backgroundColor:colors.primary,height:18,width:18,borderRadius:10,alignItems:'center'}}>
              <Text style={{color:'#fff'}}>6</Text>
            </View>
          </View>         
          
          <Appbar.Action icon={this.state.isSearchOpen? "close" : "magnify" }
            onPress={()=> this.state.isSearchOpen? this.setState({isSearchOpen: false}) : this.setState({isSearchOpen: true}) }
          />
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