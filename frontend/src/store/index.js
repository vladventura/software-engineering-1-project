import { combineReducers } from 'redux';
import { mainReducer } from "./reducers/mainReducer";


export const rootReducer = combineReducers({
    mainReducer: mainReducer
});
