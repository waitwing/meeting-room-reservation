import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGE, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER
} from './types'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

export const emailChange = (text) => {
    return{
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChange = (text) => {
    return{
        type: PASSWORD_CHANGE,
        payload: text
    }
}

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({type: LOGIN_USER})
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((user) => loginSuccess(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => loginSuccess(dispatch, user))
            .catch((error) => { 
                console.log('error', error)
                loginFailed(dispatch)})
        })
    }
}

const loginSuccess = (dispatch, user) => {
    dispatch({type: LOGIN_USER_SUCCESS, payload: user})
    Actions.main();
}

const loginFailed = (dispatch) => {
    dispatch({type: LOGIN_USER_FAILED})
}