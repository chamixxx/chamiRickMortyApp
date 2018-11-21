import { Reducer } from "redux";
import { CharactersActions, CharactersActionTypes } from "./CharactersAction";
import Character from "../Models/Character";

export interface CharactersInfoInterface {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface CharactersState {
  charactersArray: Character[];
  searchQuery: string;
  filteredCharacters: Character[];
  isLoading: boolean;
  info: CharactersInfoInterface;
}

export const initialCharactersState: CharactersState = {
  charactersArray: [],
  searchQuery: "",
  filteredCharacters: [],
  isLoading: false,
  info: {
    count: 0,
    pages: 0,
    next: "",
    prev: ""
  }
};

export const characters: Reducer<CharactersState, CharactersActions> = (
  state = initialCharactersState,
  action
) => {
  switch (action.type) {
    case CharactersActionTypes.FETCH_CHARACTERS:
      return {
        ...state,
        isLoading: true
      };

    case CharactersActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        charactersArray: state.charactersArray.concat(action.charactersToPush),
        info: action.info
      };

    case CharactersActionTypes.FETCH_ERROR:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
