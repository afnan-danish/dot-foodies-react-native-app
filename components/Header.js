import React from 'react';
import { StyleSheet, View } from 'react-native';
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
      <View>
        <Appbar.Header style={{backgroundColor: colors.header}}>
          <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer() } />
          <Appbar.Content titleStyle={{fontWeight: 'bold'}} title={this.props.title} />
          
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
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',

  },
  
});