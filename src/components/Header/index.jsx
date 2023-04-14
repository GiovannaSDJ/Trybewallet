import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import logoImg from '../../assets/logo_img.svg'
import logoText from '../../assets/logo_text.svg'
import user from '../../assets/user.svg'
import receipt from '../../assets/receipt.svg'

import styles from './styles.module.css'

class Header extends Component {
  render() {
    const { email, sum } = this.props
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImg} alt="" />
          <img src={logoText} alt="" />
        </div>
        <div className={styles.total}>
          <img src={receipt} alt="" className={styles.receiptIcon} />
          <p>
            <span>Total de despesas:</span> {sum.toFixed(2)} BRL
          </p>
        </div>
        <div className={styles.user}>
          <img src={user} alt="" className={styles.userIcon} />
          <p>{email}</p>
        </div>
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
