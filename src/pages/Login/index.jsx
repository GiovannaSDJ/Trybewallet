import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userEmail } from '../../redux/actions'

// import styles from './styles.module.css'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  }

  validateForm = () => {
    // email
    const { email } = this.state
    const regex = /\S+@\S+\.\S+/i
    const validEmail = regex.test(email)

    // password
    const { password } = this.state
    const min = 5
    const validPassword = password.length >= min
    const validForm = validEmail && validPassword
    if (validForm) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
  }

  handleButtonSubmit = (event) => {
    event.preventDefault()
    const { email } = this.state
    const { history, dispatch } = this.props
    dispatch(userEmail(email))
    history.push('/carteira')
  }

  render() {
    const { disabled } = this.state
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            type="email"
            onChange={({ target: { value } }) => {
              this.setState({ email: value })
              this.validateForm()
            }}
          />
        </label>
        Password
        <label htmlFor="password">
          <input
            data-testid="password-input"
            type="password"
            onChange={({ target: { value } }) => {
              this.setState({ password: value })
              this.validateForm()
            }}
          />
        </label>
        <button
          type="submit"
          disabled={disabled}
          onClick={(event) => this.handleButtonSubmit(event)}
        >
          Entrar
        </button>
      </form>
    )
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Login)
