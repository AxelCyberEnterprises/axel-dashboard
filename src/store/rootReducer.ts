import { combineReducers } from 'redux';
import counterReducer from './slices/counter';
import chatSliceReducer  from './slices/ChatbotSlice';
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    chat: chatSliceReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
