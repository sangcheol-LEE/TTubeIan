import { USER_LOGIN, USER_REGISTER,USER_AUTH } from "../action/user_type"

const initialState = {
  email : "",
  password: ""
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOGIN :
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password
      }

    case USER_REGISTER :
      return {
        ...state,
        name : action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        password_confirm : action.payload.password_confirm

      }
    case USER_AUTH :
      return {
        ...state,
        userData : action.payload
      }

    default :
      return state
  }
}

export default userReducer