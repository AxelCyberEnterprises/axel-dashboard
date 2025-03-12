import { combineReducers } from 'redux';
import counterReducer from './slices/counter';
import chatSliceReducer  from './slices/ChatbotSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    chat: chatSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;