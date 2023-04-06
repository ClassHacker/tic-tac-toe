const restartReducer = (state = false, action) => {
  switch (action.type) {
    case 'restart':
      return !state
    default:
      return state
  }
}

export default restartReducer;
