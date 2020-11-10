import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';



class Header extends React.Component {
  state = {
    searckKey : "",
    isSearchOpen : false,
    //searchBox: {Disp}
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      //console.log('enter press here! ')
      this.props.navigation.navigate('SearchScreen', {key: this.state.searckKey})
    }
  }
  
  
  render() {
    return(
      <View>
      <Appbar.Header style={{backgroundColor: '#ffeff2'}}>
        <Appbar.Action icon="menu" onPress={() => this.props.navigation.openDrawer() } />
        <Appbar.Content titleStyle={{fontWeight: 'bold'}} title={this.props.title} />
        
        <Appbar.Action icon={this.state.isSearchOpen? "close" : "magnify" }
          onPress={()=> this.state.isSearchOpen? this.setState({isSearchOpen: false}) : this.setState({isSearchOpen: true}) }
        />
      </Appbar.Header>
      <Searchbar style={this.state.isSearchOpen? styles.searchBar : {display:'none'} }
          placeholder="Search"
          //autoFocus={true}
          value={this.state.searckKey}
          onKeyPress={this.handleKeyPress}
          onChangeText={(searckKey) => this.setState({searckKey:searckKey})}
          onIconPress={() => this.props.navigation.navigate('SearchScreen', {key: this.state.searckKey})}
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