import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoryReducer } from "./categories/categories.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
});
