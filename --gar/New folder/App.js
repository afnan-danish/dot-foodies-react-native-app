import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import {Provider as PaperProvider, DarkTheme as PaperDarkTheme} from 'react-native-paper'

import Navigation from './components/Navigation'

class App extends React.Component {
  render(){
    return (
      <PaperProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
export default App;