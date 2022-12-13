const exitReducer = (state = false, action) => {
  switch (action.type) {
    case 'exit':
        return !state
    default:
        return state
  }
}

export default exitReducer;