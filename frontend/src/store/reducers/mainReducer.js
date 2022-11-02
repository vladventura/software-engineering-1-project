import { GET_ALL } from "../actions/actionTypes";

const initState = {
    message: "",
    body: {},
    loaded: false
};

export const mainReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_ALL: return {
            ...state,
            loaded: action.payload.loaded,
            message: action.payload.message,
            body: action.payload.body
        }
        default: return state;
    }
};