import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as everyActions from '../redux/actions'

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  }

  componentDidMount() {
    const { Currencies } = this.props
    Currencies()
  }

  clearState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    })
  }

  infos = async () => {
    const url = 'https://economia.awesomeapi.com.br/json/all'
    const { expense, expenses } = this.props
    this.setState({ id: expenses.length })

    const exchangeRates = await fetch(url)
      .then((response) => response.json())
      .then((infos) => infos)

    await expense({ ...this.state, exchangeRates })

    await this.sumExpense()
  }

  sumExpense = async () => {
    const { expenses, sumExpenses } = this.props
    let total = 0

    expenses.forEach(({ value, currency, exchangeRates }) => {
      const result = Number(value) * Number(exchangeRates[currency].ask)
      total += result
    })
    await sumExpenses(total)
  }

  handleClick = async (event) => {
    event.preventDefault()
    await this.infos()
    this.clearState()
  }

  editingExpense = (event) => {
    event.preventDefault()
    const { value, description, currency, method, tag } = this.state
    const { expenses, idToEdit, newExpense } = this.props
    expenses[idToEdit] = {
      ...expenses[idToEdit],
      value,
      description,
      currency,
      method,
      tag,
    }
    newExpense([])
    newExpense(expenses)
    this.sumExpense()
    this.clearState()
  }

  render() {
    const { currencies, editor } = this.props
    const { value: inputValue, description, currency, method, tag } = this.state
    return (
      <div>
        <form>
          <label htmlFor="value">
            Value
            <input
              data-testid="value-input"
              type="number"
              value={inputValue}
              onChange={({ target: { value } }) => {
                this.setState({ value })
              }}
            />
          </label>
          <label htmlFor="description">
            Expense
            <input
              data-testid="description-input"
              type="text"
              value={description}
              onChange={({ target: { value } }) => {
                this.setState({ description: value })
              }}
            />
          </label>
          <label htmlFor="currency">
            Currency
            <select
              data-testid="currency-input"
              value={currency}
              onChange={({ target: { value } }) => {
                this.setState({ currency: value })
              }}
            >
              {currencies.map((currenc, index) => (
                <option key={index} value={currenc}>
                  {currenc}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Payment Method
            <select
              data-testid="method-input"
              value={method}
              onChange={({ target: { value } }) => {
                this.setState({ method: value })
              }}
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="type-tag">
            Type
            <select
              data-testid="tag-input"
              value={tag}
              onChange={({ target: { value } }) => {
                this.setState({ tag: value })
              }}
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {editor ? (
            <button type="button" onClick={this.editingExpense}>
              Editar Despesa
            </button>
          ) : (
            <button type="button" onClick={this.handleClick}>
              Adicionar despesa
            </button>
          )}
        </form>
      </div>
    )
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  Currencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  expense: PropTypes.func.isRequired,
  sumExpenses: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  newExpense: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  sum: state.wallet.sum,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(everyActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm)
