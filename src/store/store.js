import { applyMiddleware, compose, createStore } from "redux";
import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";

const midddlewares = [logger];
const composedEnhancers = compose(applyMiddleware(...midddlewares));
export const store = createStore(rootReducer, undefined, composedEnhancers);
