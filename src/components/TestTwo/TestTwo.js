import React, { Component } from 'react'
import { withFirebase } from '../Firebase/index';

class TestTwo extends Component {
  render() {
    return (
      <>
        <h1>Database TestTwo</h1>
        <SendData/>
      </>
    )
  }
}

class SendDataBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
        random: ""
    };
  }
 
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addUser = e => {
    e.preventDefault();

    this.props.firebase.random(this.state.random)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    this.setState({
      random: ""
    });
  }
 
 
  render() {
    return (
        <form onSubmit={this.addUser}>
          <input
            type="text"
            name="random"
            placeholder=""
            onChange={this.updateInput}
            value={this.state.fullname}
          />
          <button type="submit">Submit</button>
        </form>
        );
    }
}


const SendData = withFirebase(SendDataBase)

export { SendData }

export default TestTwo

