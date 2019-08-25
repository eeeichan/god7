export const DATA = 'DATA';
export const LOGIN_OK = 'LOGIN_OK';
export const LOGOUT = 'LOGOUT';


export const data = (user) => {
  return {
    type: DATA,
    payload: {
      uid: user.uid,
      displayName: user.displayName,
      image: user.photoURL,
      game: user.game,
      streak: user.streak,
      win: user.win,
      lose: user.lose
    }
  }
}

export const loginOk = (user) => {
  return {
    type: LOGIN_OK,
    payload: {
      uid: user.uid,
      displayName: user.displayName,
      image: user.photoURL,
      game: 0,
      streak: 0,
      win: 0,
      lose: 0
    }
  }
}

export const logOut = () => {
  return {
    type: LOGOUT
  }
}

