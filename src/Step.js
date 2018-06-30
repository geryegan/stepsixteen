import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { SequencerContext } from './SequencerContext';

//styled components -- adaptive styling based on props: 
//https://www.styled-components.com/docs/basics#adapting-based-on-props
//since styled components are react components, they can take props and change styling
//the functions below look extra crazy, but the only additional thing i'm doing is
//destructuring off specific props

const ScStep = styled.div`
  width: ${({ trackLength }) => (trackLength === 16 ? '30px' : '15px')};
  height: ${({ trackLength }) => (trackLength === 16 ? '30px' : '15px')};
  background-color: ${({ toggled }) => (toggled ? 'deepskyblue' : 'slategray')};
  margin-left: 15px;
  display: inline-block;
  border-radius: 5px;
  border-color: ${({ stepIndex, activeStep }) => (stepIndex === activeStep ? 'salmon' : 'silver')}
  border-width: 5px;
  border-style: solid;
`;

class Step extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidUpdate() {
    if (this.props.activeStep === this.props.stepIndex && this.state.toggled && this.props.playing) {
      this.props.sample.play();
    }
  }
  toggle() {
    this.setState((prevState) => {
      return { toggled: !prevState.toggled };
    });
    if (!this.props.playing && !this.state.toggled) {
      this.props.sample.play();
    }
  }

  render() {
    return (
      <ScStep {...this.props} trackLength={this.props.trackLength} onClick={this.toggle} toggled={this.state.toggled} />
    );
  }
}

//this is kinda like mapStateToProps
//react16 render props: https://reactjs.org/docs/render-props.html#using-props-other-than-render

//exporting the component wrapped by the Consumer which takes in context
// from the Provider and provides it to my component as props.
export default (props) => (
  // I didn't destructure the Consumer off of the Context when I created it, hence the <Context.Consumer> syntax
  <SequencerContext>
    {(context) => (
      <Step
        {...props}
        trackLength={context.state.trackLength}
        playing={context.state.playing}
        activeStep={context.state.activeStep}
      />
    )}
  </SequencerContext>
);
