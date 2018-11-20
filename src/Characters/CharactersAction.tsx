import { CharactersActionTypes } from "./CharacterReducer";

// Action Creators
export function updateCharactersActionCreator(): UpdateCharactersAction {
  return {
    type: CharactersActionTypes /*.actionType*/
  };
}

// Actions
interface UpdateCharactersAction {
  type: CharactersActionTypes./*.actionType*/
}

export type CharactersActions = UpdateCharactersAction;
