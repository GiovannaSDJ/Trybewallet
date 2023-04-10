const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  sum: 0,
  editor: false,
  idToEdit: 0,
}

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CURRENCIES':
      return {
        ...state,
        currencies: action.currencies,
      }
    case 'EXPENSES':
      return {
        ...state,
        expenses: [...state.expenses, action.expenses],
      }
    case 'SUM':
      return {
        ...state,
        sum: action.sum,
      }
    case 'DELETE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.id),
      }
    case 'EDIT':
      return {
        ...state,
        editor: true,
        idToEdit: action.id,
      }
    case 'NEW_EXPENSES':
      return {
        ...state,
        editor: false,
        expenses: action.newExpenses,
      }
    default:
      return state
  }
}

export default wallet
