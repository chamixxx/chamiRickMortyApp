import Character from "../Models/Character";
import { CharactersInfoInterface } from "./CharacterReducer";
import { AjaxError } from "rxjs/ajax";

export enum CharactersActionTypes {
  FETCH_CHARACTERS = "[characters] FETCH_CHARACTERS",
  FETCH_SUCCESS = "[characters] FETCH_SUCCESS",
  FETCH_QUERY_SUCCESS = "[characters] FETCH_QUERY_SUCCESS",
  FETCH_ERROR = "[characters] FETCH_ERROR",
  FETCH_QUERY_NAME = "[characters] FETCH_QUERY_NAME"
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

export function fetchQuerySuccessActionCreator(
  charactersToReplace: Character[],
  info: CharactersInfoInterface
): FetchSuccessAction {
  console.log(CharactersActionTypes.FETCH_QUERY_SUCCESS);
  return {
    type: CharactersActionTypes.FETCH_QUERY_SUCCESS,
    charactersToPush: charactersToReplace,
    info: info
  };
}

export function fetchErrorActionCreator(error: AjaxError): FetchErrorAction {
  return {
    type: CharactersActionTypes.FETCH_ERROR,
    error: error
  };
}

export function fetchCharactersActionCreator(): FetchCharactersAction {
  return {
    type: CharactersActionTypes.FETCH_CHARACTERS
  };
}

export function fetchQueryNameActionCreator(
  query: string
): fetchQueryNameAction {
  return {
    type: CharactersActionTypes.FETCH_QUERY_NAME,
    query: query
  };
}

// Actions
interface FetchCharactersAction {
  type: CharactersActionTypes.FETCH_CHARACTERS;
}

export interface fetchQueryNameAction {
  type: CharactersActionTypes.FETCH_QUERY_NAME;
  query: string;
}

interface FetchSuccessAction {
  type:
    | CharactersActionTypes.FETCH_SUCCESS
    | CharactersActionTypes.FETCH_QUERY_SUCCESS;
  charactersToPush: Character[];
  info: CharactersInfoInterface;
}

interface FetchErrorAction {
  type: CharactersActionTypes.FETCH_ERROR;
  error: AjaxError;
}

export type CharactersActions =
  | FetchCharactersAction
  | FetchSuccessAction
  | FetchErrorAction
  | fetchQueryNameAction;
