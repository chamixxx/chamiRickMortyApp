import { combineEpics, createEpicMiddleware } from "redux-observable";
import rootReducer, { RootState } from "./RootReducer";
import { createStore, applyMiddleware } from "redux";
import { CharactersActions } from "../Characters/CharactersAction";

export type RootAction = CharactersActions;
const rootEpic = combineEpics<RootAction, RootAction, RootState, {}>();
const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  {}
>();
let store: any;
store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

export default store;
