import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import counterReducer from "./slices/counter";
import presentationPracticeReducer from "./slices/dashboard/user/presentationPracticeSlice";
import dynamicDialogReducer from "./slices/dynamicDialogSlice.ts";

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    dynamicDialogSlice: dynamicDialogReducer,
    presentationPractice: presentationPracticeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
