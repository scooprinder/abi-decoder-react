import './App.css';
import abiDecoder from 'abi-decoder';
import React from 'react';

const PrettyPrintJson = ({data}) => {
  return (<div><pre id="result">{ JSON.stringify(data, null, 2)}</pre></div>)
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      abi : "",
      input: "",
      result: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  handleAbiChange = (event) => {
    this.setState({abi: event.target.value})
  }

  handleSubmit(e) {
    const abi = JSON.parse(this.state.abi);
    abiDecoder.addABI(abi);
    const v1Decoded = abiDecoder.decodeMethod(this.state.input);
    this.setState({result: v1Decoded})
    e.preventDefault();
  }

  render () {
    return (
  
    <div className="App">
        <form onSubmit={this.handleSubmit}>
        <label>
          Raw data:
          <input type="text" value={this.state.input} onChange={this.handleInputChange} />
        </label>
        <label>
          ABI:
          <textarea value={this.state.abi} onChange={this.handleAbiChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <PrettyPrintJson data={this.state.result}/>
    </div>
)};
}

export default App;
