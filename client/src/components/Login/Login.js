import React, { Component } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If the user is logged in and they navigate to the registration page, they will be redirected to the dashboard.
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    };

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(userData);
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
        <div id="background">
        <center id="center">
      <div className="container">
        <div className="z-depth-1 white row">

          <form noValidate onSubmit={this.onSubmit} className="col s12" id="login" method="post">
            <div className="row">
              <div className="col s12">
              <span className="loginWelcomeText">Hello, again! Please log in.</span>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
              <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
              <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
            </div>

            <br />
              <div className="row">
                <button type="submit" name="btn_login" className="col s12 btn-large waves-effect waves-light btn hoverable red darken-4" id="loginButton">Login</button>
              </div>
          </form>
        </div>
      </div>
      <p className="loginText">Don't have an account? <Link to="/register">Register here.</Link></p>
      </center>
</div>
    )         
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);