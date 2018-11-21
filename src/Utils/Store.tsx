import { combineEpics, createEpicMiddleware } from "redux-observable";
import rootReducer, { RootState } from "./RootReducer";
import { createStore, applyMiddleware } from "redux";
import { CharactersActions } from "../Characters/CharactersAction";
import {
  fetchCharacterEpic,
  fetchSearchQueryEpic
} from "../Characters/CharactersEpic";

export type RootActions = CharactersActions;
const rootEpic = combineEpics<RootActions, RootActions, RootState, {}>(
  fetchCharacterEpic,
  fetchSearchQueryEpic
);
const epicMiddleware = createEpicMiddleware<
  RootActions,
  RootActions,
  RootState,
  {}
>();
let store: any;
store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

export default store;
