// import rootReducer from "./rootReducer";
// import rootEpic from "./rootEpic";
import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./rootEpic";
import { rootReducer } from "./rootReducer";
// import thunk from 'redux-thunk';

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

export default store;
