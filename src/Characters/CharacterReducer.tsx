import { Reducer } from "redux";
import { CharactersActions } from "./CharactersAction";

export interface CharactersState {}

export const initialCharactersState: CharactersState = {};

export enum CharactersActionTypes {}

export const characters: Reducer<CharactersState, CharactersActions> = (
  state = initialCharactersState,
  action
) => {
  switch (action.type) {
    case CharactersActionTypes /*.actionType*/:
      return {
        ...state
      };
    default:
      return state;
  }
};
