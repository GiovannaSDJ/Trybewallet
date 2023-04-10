import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    const { email, sum } = this.props
    return (
      <header>
        <h3 data-testid="email-field">{email}</h3>
        <p data-testid="total-field">{sum.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    )
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  sum: state.wallet.sum,
})

export default connect(mapStateToProps)(Header)
