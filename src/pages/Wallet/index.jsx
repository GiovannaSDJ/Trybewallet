import React from 'react'
import Header from '../../components/Header'
import WalletForm from '../../components/WalletForm'
import Table from '../../components/Table'

import styles from './styles.module.css'

class Wallet extends React.Component {
  render() {
    return (
      <div className={styles.walletPage}>
        <div className={styles.upper}>
          <Header />
          <WalletForm />
        </div>
        <main className={styles.lower}>
          <Table />
        </main>
      </div>
    )
  }
}

export default Wallet
