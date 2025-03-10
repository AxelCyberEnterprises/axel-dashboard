import { combineReducers } from 'redux';
import counterReducer from './slices/counter';
import authReducer from "./slices/authSlice";
const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;