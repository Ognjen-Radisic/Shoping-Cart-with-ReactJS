const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVE') {
    const newItems = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: newItems }
  }
  if (action.type === 'INCREASE') {
    let newCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 }
      }
      return item
    })
    return { ...state, cart: newCart }
  }
  if (action.type === 'DECREASE') {
    let newCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 }
        }
        return item
      })
      .filter((item) => item.amount > 0)
    return { ...state, cart: newCart }
  }

  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, curItem) => {
        const newAmount = cartTotal.amount + curItem.amount
        const newTotal = cartTotal.total + curItem.price * curItem.amount
        return { total: newTotal, amount: newAmount }
      },
      { total: 0, amount: 0 }
    )

    total = parseFloat(total.toFixed(2))
    return { ...state, total, amount }
  }

  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }

  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, loading: false, cart: action.payload }
  }

  return state
}

export default reducer
