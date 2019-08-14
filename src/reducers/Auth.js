const initialState = {
  uid: null,
  displayName: null,
  image: null,
  game: null,
  streak: null,
  win: null,
  lose: null
}

const auth = (state=initialState, action) => {
  switch (action.type) {
    case "DATA": {
      return Object.assign({}, state, {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        image: action.payload.photoURL,
        game: action.payload.game,
        streak: action.payload.streak,
        win: action.payload.win,
        lose: action.payload.lose
      })
    }

    case "LOGIN_OK": {
      return Object.assign({}, state, {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        image: action.payload.photoURL,
        game: action.payload.game,
        streak: action.payload.streak,
        win: action.payload.win,
        lose: action.payload.lose
      })
    }

    case 'LOGOUT': {
      return Object.assign({}, state, {
        uid: null,
        displayName: null,
        image: null
      })
    }

    default: {
      return state
    }
  }
}

export default auth
