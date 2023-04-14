import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as everyAction from '../../redux/actions'

import bin from '../../assets/bin.svg'
import edit from '../../assets/edit.svg'

import styles from './styles.module.css'

class Table extends Component {
  sumExpense = async () => {
    const { expenses, sumExpenses } = this.props
    let total = 0

    expenses.forEach(({ value, currency, exchangeRates }) => {
      const result = Number(value) * Number(exchangeRates[currency].ask)
      total += result
    })
    await sumExpenses(total)
  }

  deleteButton = async (id) => {
    const { delExpenses } = this.props
    await delExpenses(id)
  }

  editButton = (id) => {
    const { editExpenses } = this.props
    editExpenses(id)
  }

  render() {
    const { expenses } = this.props
    return (
      <table className={styles.table}>
        <thead>
          <tr className={styles.head}>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {expenses.map((expense) => (
            <tr key={expense.id} className={styles.tr}>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                {Number(
                  expense.value * expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}
              </td>
              <td>Real</td>
              <td className={styles.icons}>
                <button
                  className={styles.button}
                  onClick={() => this.editButton(expense.id)}
                >
                  <img className={styles.img} src={edit} alt="" />
                </button>
                <button
                  className={styles.button}
                  onClick={async () => {
                    await this.deleteButton(expense.id)
                    await this.sumExpense()
                  }}
                >
                  <img className={styles.img} src={bin} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  delExpenses: PropTypes.func.isRequired,
  sumExpenses: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(everyAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Table)
