export function userEmail(email) {
  return {
    type: 'USER_EMAIL',
    email,
  }
}

export function currency(currencies) {
  return {
    type: 'CURRENCIES',
    currencies,
  }
}

export function Currencies() {
  const url = 'https://economia.awesomeapi.com.br/json/all'
  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((infos) =>
        dispatch(currency(Object.keys(infos).filter((key) => key !== 'USDT'))),
      )
  }
}

export function expense(expenses) {
  return {
    type: 'EXPENSES',
    expenses,
  }
}

export function sumExpenses(sum) {
  return {
    type: 'SUM',
    sum,
  }
}

export function delExpenses(id) {
  return {
    type: 'DELETE',
    id,
  }
}

export function editExpenses(id) {
  return {
    type: 'EDIT',
    id,
  }
}

export function newExpense(newExpenses) {
  return {
    type: 'NEW_EXPENSES',
    newExpenses,
  }
}
