import { Reducer } from "redux";
import { CharactersActions } from "./CharactersAction";
import Character from "../Models/Character";

export interface CharactersState {
  charactersArray: Character[];
  searchQuery: string;
  filteredCharacters: Character[];
}

export const initialCharactersState: CharactersState = {
  charactersArray: [],
  searchQuery: "",
  filteredCharacters: []
};

export enum CharactersActionTypes {
  UPDATE_CHARACTERS = "[characters] UPDATE_CHARACTERS"
}

export const characters: Reducer<CharactersState, CharactersActions> = (
  state = initialCharactersState,
  action
) => {
  switch (action.type) {
    case CharactersActionTypes.UPDATE_CHARACTERS:
      return {
        ...state,
        charactersArray: state.charactersArray.concat(action.charactersToPush)
      };
    default:
      return state;
  }
};
