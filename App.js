import React from 'react';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './config';
//Firebase initialization
firebase.initializeApp(firebaseConfig)

import Navigation from './components/Navigation'

class App extends React.Component {
  render(){
    return (
      <Navigation />
    );
  }
}
export default App;