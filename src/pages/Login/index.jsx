import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userEmail } from '../../redux/actions'

import logoImg from '../../assets/logo_img.svg'
import logoText from '../../assets/logo_text.svg'

import styles from './styles.module.css'

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
      <div className={styles.loginPage}>
        <form className={styles.form}>
          <div className={styles.logo}>
            <img src={logoImg} alt="" className={styles.logoImg} />
            <img src={logoText} alt="" className={styles.logoText} />
          </div>
          <label htmlFor="email">
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              onChange={({ target: { value } }) => {
                this.setState({ email: value })
                this.validateForm()
              }}
            />
          </label>
          <label htmlFor="password">
            <input
              className={styles.input}
              type="password"
              placeholder="Senha"
              onChange={({ target: { value } }) => {
                this.setState({ password: value })
                this.validateForm()
              }}
            />
          </label>
          <button
            className={styles.button}
            type="submit"
            disabled={disabled}
            onClick={(event) => this.handleButtonSubmit(event)}
          >
            Entrar
          </button>
        </form>
      </div>
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
