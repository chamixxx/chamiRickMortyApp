import { Reducer } from "redux";
import { CharactersActions, CharactersActionTypes } from "./CharactersAction";
import Character from "../Models/Character";
import { baseUrl, charactersUri } from "../Utils/Constants";

export interface CharactersInfoInterface {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface CharactersState {
  charactersArray: Character[];
  isLoading: boolean;
  info: CharactersInfoInterface;
}

export const initialCharactersState: CharactersState = {
  charactersArray: [],
  isLoading: false,
  info: {
    count: 0,
    pages: 0,
    next: baseUrl + charactersUri,
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

    case CharactersActionTypes.FETCH_QUERY_NAME:
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
      const charactersArray =
        action.error.status == 404 ? [] : { ...state.charactersArray };
      return {
        ...state,
        isLoading: false,
        charactersArray: charactersArray,
        info: {
          count: 0,
          pages: 0,
          next: "",
          prev: ""
        }
      };

    case CharactersActionTypes.FETCH_QUERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        charactersArray: action.charactersToPush,
        info: action.info
      };
    default:
      return state;
  }
};
