import React from 'react';
import './App.css';

import * as Comlink from 'comlink';
/* eslint-disable import/no-webpack-loader-syntax */
import Worker from 'worker-loader!./generator';


function compareAddresses(left, right) {
  let score = 0;
  for(let i = 0; i < left.length; i++) {
    if(left[i] === right[i]) score++;
    else break;
  }
  return score;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      target: '48d21Dc6BBF18288520E9384aA505015c26ea43C'
    }

    this.handleTargetChanged = this.handleTargetChanged.bind(this);
  }

  async init() {
    const worker = new Worker();
    const generate = Comlink.wrap(worker);
    await generate(Comlink.proxy(this.callback.bind(this)));
  };

  callback (value) {
    const { target, address } = this.state;
    if (target && (compareAddresses(target, value) > compareAddresses(target, address) || !address))
      this.setState({ address: value });
  }

  async componentDidMount() {
    await this.init();
  }

  handleTargetChanged(event) {
    this.setState({target: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.target} onChange={this.handleTargetChanged} style={{ fontSize: 48 }}></input>
        <br/>
        <span style={{ fontSize: 48 }}>{this.state.address}</span>
      </div>
    );
  }

}

export default App;