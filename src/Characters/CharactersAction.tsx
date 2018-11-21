import Character from "../Models/Character";
import { CharactersInfoInterface } from "./CharacterReducer";

export enum CharactersActionTypes {
  FETCH_CHARACTERS = "[characters] FETCH_CHARACTERS",
  FETCH_SUCCESS = "[characters] FETCH_SUCCESS",
  FETCH_ERROR = "[characters] FETCH_ERROR"
}

// Action Creators
export function fetchSuccessActionCreator(
  charactersToPush: Character[],
  info: CharactersInfoInterface
): FetchSuccessAction {
  return {
    type: CharactersActionTypes.FETCH_SUCCESS,
    charactersToPush: charactersToPush,
    info: info
  };
}

export function fetchErrorActionCreator(message: string): FetchErrorAction {
  return {
    type: CharactersActionTypes.FETCH_ERROR,
    message: message
  };
}

export function fetchCharactersActionCreator(): FetchCharactersAction {
  return {
    type: CharactersActionTypes.FETCH_CHARACTERS
  };
}

// Actions
interface FetchCharactersAction {
  type: CharactersActionTypes.FETCH_CHARACTERS;
}

interface FetchSuccessAction {
  type: CharactersActionTypes.FETCH_SUCCESS;
  charactersToPush: Character[];
  info: CharactersInfoInterface;
}

interface FetchErrorAction {
  type: CharactersActionTypes.FETCH_ERROR;
  message: string;
}

export type CharactersActions =
  | FetchCharactersAction
  | FetchSuccessAction
  | FetchErrorAction;
