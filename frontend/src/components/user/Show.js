import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class ShowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
     };
  }

  componentDidMount() {
    // TODO uncomment once api is built
    // axios.get('/api/user/' + this.props.match.params.id)
    //     .then(res => {
    //         this.setState({ user: res.data});
    //     });
    this.setState({
      user: {
        name: "John Doe",
        phone: "+61 400 000 000",
        email: "test@example.com"
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              User Details
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Home</Link></h4>
            <dl>
              <dt>Name:</dt>
              <dd>{this.state.user.name}</dd>
              <dt>Phone Number:</dt>
              <dd>{this.state.user.phone}</dd>
              <dt>Email Address:</dt>
              <dd>{this.state.user.email}</dd>
            </dl>
            <Link to={`/user/edit/${this.state.user.id}`} class="btn btn-success">Edit</Link>&nbsp;
            {/*<button onClick={this.delete.bind(this, this.state.user.id)}*/}
                    {/*className="btn btn-danger">Delete*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
    );
  }

}

export default ShowUser;