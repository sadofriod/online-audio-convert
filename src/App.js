import React, { Component } from 'react';
import './App.css';
import ProgressBar from './component/progressBar/index';
import { CookiesProvider } from 'react-cookie'
class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <div >
          <ProgressBar />
        </div>
      </CookiesProvider>
    );
  }
}

export default App;
