import React, { Component } from 'react'
import { withFirebase } from '../Firebase/index';

class Test extends Component {
  render() {
    return (
      <>
        <h1>Database test</h1>
        <SendData/>
      </>
    )
  }
}

class SendDataBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullname: ""
    };
  }
 
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addUser = e => {
    e.preventDefault();
    this.props.firebase.users(this.state.fullname, this.state.email)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    this.setState({
      fullname: "",
      email: ""
    });
  }
 
 
  render() {
    return (
        <form onSubmit={this.addUser}>
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            onChange={this.updateInput}
            value={this.state.fullname}
          />
          <input
            type="email"
            name="email"
            placeholder="yes@no.com"
            onChange={this.updateInput}
            value={this.state.email}
          />
          <button type="submit">Submit</button>
        </form>
        );
    }
}


const SendData = withFirebase(SendDataBase)

export { SendData }

export default Test

