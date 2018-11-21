import { Reducer } from "redux";
import { CharactersActions } from "./CharactersAction";
import Character from "../Models/Character";

export interface CharactersState {
  characters: Character[];
  searchQuery: string;
  filteredCharacters: Character[];
}

export const initialCharactersState: CharactersState = {
  characters: [],
  searchQuery: "",
  filteredCharacters: []
};

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
