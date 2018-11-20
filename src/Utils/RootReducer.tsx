import { combineReducers } from "redux";
import { CharactersState, characters } from "../Characters/CharacterReducer";

export interface RootState {
  characters: CharactersState;
}

const rootReducer = combineReducers({
  characters
});

export default rootReducer;
