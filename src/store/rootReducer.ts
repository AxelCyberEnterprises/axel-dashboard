import { combineReducers } from "redux";
import counterReducer from "./slices/counter";
import PerformanceImprovementReducer from "../store/slices/performance_improvement_slice";
import chatSliceReducer  from './slices/ChatbotSlice';
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
    chat: chatSliceReducer,
    auth: authReducer
  performance_improvment: PerformanceImprovementReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
