import React, { PureComponent } from 'react';
import Step from './Step';
import styled from 'styled-components';
import { Howl } from 'howler';

const ScRow = styled.div`
  margin: 15px;
`;

class SequencerRow extends PureComponent {
  constructor(props) {
    super(props);

    this.sample = new Howl({
      src: [this.props.sample]
    });
  }

  renderSteps() {
    //react16 array render -- https://reactjs.org/blog/2017/09/26/react-v16.0.html
    let row = [];
    for (let i = 1; i <= this.props.trackLength; i++) {
      row.push(<Step sample={this.sample} key={i} stepIndex={i} />);
    }
    return row;
  }
  render() {
    return <ScRow>{this.renderSteps()}</ScRow>;
  }
}

export default SequencerRow;
