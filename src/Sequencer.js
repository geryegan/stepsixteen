import React, { PureComponent, Fragment } from 'react';
import SequencerRow from './SequencerRow';
import { SequencerContext } from './SequencerContext';
import * as sounds from './sounds';
import styled from 'styled-components';

const ScPlayButton = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-radius: 4px;
  max-width: 80px;
  height: 30px;
  margin: 0 auto;
`;

class Sequencer extends PureComponent {
  render() {
    return (
      <Fragment>
        <ScPlayButton onClick={this.props.togglePlay}>{this.props.playing ? 'Playing!' : 'Play'}</ScPlayButton>
        <select defaultValue={this.props.trackLength} onChange={this.props.handleDropdownChange}>
          <option value={16}>16</option>
          <option value={32}>32</option>
          <option value={64}>64</option>
        </select>
        <SequencerRow trackLength={this.props.trackLength} sample={sounds.bigkik} />
        <SequencerRow trackLength={this.props.trackLength} sample={sounds.clap} />
        <SequencerRow trackLength={this.props.trackLength} sample={sounds.hat} />
        <SequencerRow trackLength={this.props.trackLength} sample={sounds.chord} />
        <SequencerRow trackLength={this.props.trackLength} sample={sounds.stab} />
        <SequencerRow trackLength={this.props.trackLength} sample={sounds.bass} />
      </Fragment>
    );
  }
}

//this is kinda like mapStateToProps
//using react16 render props: https://reactjs.org/docs/render-props.html#using-props-other-than-render

//exporting the component wrapped by the Consumer which takes in context
// from the Provider and provides it to my component as props.
export default (props) => (
  // I didn't destructure the Consumer off of the Context when I created it, hence the <Context.Consumer> syntax
  <SequencerContext.Consumer>
    {(context) => (
      <Sequencer
        trackLength={context.state.trackLength}
        handleDropdownChange={context.handleDropdownChange}
        playing={context.state.playing}
        togglePlay={context.togglePlay}
      />
    )}
  </SequencerContext.Consumer>
);
