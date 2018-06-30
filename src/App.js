import React, { Component } from 'react';
import logo from './logo.svg';
import SequencerProvider from './SequencerProvider';
import './App.css';
import Sequencer from './Sequencer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">stepsixteen</h1>
        </header>
        <SequencerProvider>
          <Sequencer />
        </SequencerProvider>
      </div>
    );
  }
}

export default App;
