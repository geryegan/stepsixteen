import React, { Component } from 'react';
import { SequencerContext } from './SequencerContext';
//react16 context API -- Provider:
//this component returns a Provider component which is provided by the Context created by createContext()
class SequencerProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      activeStep: 0,
      trackLength: 16
    };
    this.play = this.play.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.playInterval = null;
  }

  play() {
    if (!document.hasFocus()) {
      this.setState({ playing: false });
      clearInterval(this.playInterval);
    }
    this.setState((state) => ({
      activeStep: state.activeStep < this.state.trackLength ? state.activeStep + 1 : 1
    }));
  }

  togglePlay() {
    const { playing } = this.state;
    if (!playing) {
      this.playInterval = setInterval(this.play, 125);
      this.setState((state) => ({
        playing: !state.playing,
        activeStep: 0
      }));
    } else {
      clearInterval(this.playInterval);
      this.setState((state) => ({
        playing: !state.playing
      }));
    }
  }

  handleDropdownChange(e) {
    console.log(e.target);
    this.setState({ trackLength: e.target.value });
  }

  render() {
    return (
      // I didn't destructure the provider off of the Context when I created it, hence the <Context.Provider> syntax
      <SequencerContext.Provider
        value={{
          state: this.state,
          togglePlay: () => this.togglePlay(),
          handleDropdownChange: this.handleDropdownChange
        }}
      >
        {this.props.children}
      </SequencerContext.Provider>
    );
  }
}

export default SequencerProvider;
