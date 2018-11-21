import { CharactersActionTypes } from "./CharacterReducer";
import Character from "../Models/Character";

// Action Creators
export function updateCharactersActionCreator(
  charactersToPush: Character[]
): UpdateCharactersAction {
  return {
    type: CharactersActionTypes.UPDATE_CHARACTERS,
    charactersToPush: charactersToPush
  };
}

// Actions
interface UpdateCharactersAction {
  type: CharactersActionTypes.UPDATE_CHARACTERS;
  charactersToPush: Character[];
}

export type CharactersActions = UpdateCharactersAction;
