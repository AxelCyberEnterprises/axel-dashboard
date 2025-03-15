import { combineReducers } from "redux";
import counterReducer from "./slices/counter";
import PerformanceImprovementReducer from "../store/slices/performance_improvement_slice";

const rootReducer = combineReducers({
  counter: counterReducer,
  performance_improvment: PerformanceImprovementReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
