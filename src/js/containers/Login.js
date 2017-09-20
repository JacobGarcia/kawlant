import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { setCredentials } from '../actions'

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      password: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()

    // Dumb login
    const user = {
      name: 'John',
      surname: 'Appleseed',
      token: 'e293je823',
      permissions: 0,
      isValidEmail: false
    }

    const token = 'kasjndjaksndin39'

    this.props.setCredentials(user, token)

    // Get response
    localStorage.setItem('token', token)

    this.props.history.push('/')
  }

  onChange(event) {
    const { name, value } = event.target

    if (name === 'user') {
      console.log('Setting user')
      this.setState({
        isValidEmail: validateEmail(value)
      })
    }

    this.setState({
      [name]: value
    })
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('auth', nextProps.auth.authenticated)
  //   console.log(nextProps.match)
  // }

  render() {
    return (
      <div className="login">
        <img src="/static/img/iso.svg" alt="" className="iso"/>
        <img src="/static/img/logo.svg" alt="" className="logo"/>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.user}
            name="user"
            placeholder="Correo electrónico"
          />
          <input
            type="password"
            onChange={this.onChange}
            value={this.state.password}
            name="password"
            placeholder="Contraseña"
          />
          <input
            type="submit"
            value="Iniciar sesión"
            className={
              this.state.user && this.state.password && this.state.isValidEmail
              ? 'active'
              : ''
            }
          />
          <Link to="/restore-password">Recuperar contraseña</Link>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCredentials: user => {
      dispatch(setCredentials(user))
    }
  }
}

Login.propTypes = {
  setCredentials: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
