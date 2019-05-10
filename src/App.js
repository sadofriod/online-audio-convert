import React, { Component } from 'react';
import './App.css';
import SignIn from './component/signIn/index';
import Main from './component/progressBar/index';
import { CookiesProvider } from 'react-cookie';
class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Main></Main>
      </CookiesProvider>
    );
  }
}

export default App;
