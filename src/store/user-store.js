import {createStore} from "redux";

const initialState = {
    email: "",
    firstname: "",
    id: "",
    lastname: "",
    contact: "",
    isLogin: false,
}

const SET_USER = "SET_USER";
const UNSET_USER = "UNSET_USER";

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER:
            return { ...state, ...action.payload };
        case UNSET_USER:
            return { ...initialState };
        default:
            return state;
    }
}

const userStore = createStore(userReducer);

export { SET_USER, UNSET_USER, userStore };