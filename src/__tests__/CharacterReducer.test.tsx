import {
  characters,
  initialCharactersState,
  CharactersInfoInterface
} from "../Characters/CharacterReducer";
import {
  CharactersActions,
  CharactersActionTypes
} from "../Characters/CharactersAction";
import Character from "../Models/Character";
import { charactersUri, baseUrl } from "../Utils/Constants";
import { AjaxError } from "rxjs/ajax";

describe("characters reducer", () => {
  it("should return the initial state", () => {
    expect(characters(undefined, {} as CharactersActions)).toEqual(
      initialCharactersState
    );
  });
  it("should handle FETCH_CHARACTERS", () => {
    expect(
      characters(initialCharactersState, {
        type: CharactersActionTypes.FETCH_CHARACTERS
      })
    ).toEqual({ ...initialCharactersState, isLoading: true });
  });
  it("should handle FETCH_QUERY_NAME", () => {
    expect(
      characters(initialCharactersState, {
        type: CharactersActionTypes.FETCH_QUERY_NAME,
        query: "test"
      })
    ).toEqual({ ...initialCharactersState, isLoading: true });
  });
  it("should handle FETCH_SUCCESS", () => {
    const charactersToPush: Character[] = [new Character()];
    const info: CharactersInfoInterface = {
      count: 0,
      pages: 0,
      next: baseUrl + charactersUri,
      prev: ""
    };
    expect(
      characters(initialCharactersState, {
        type: CharactersActionTypes.FETCH_SUCCESS,
        charactersToPush: charactersToPush,
        info: info
      })
    ).toEqual({
      ...initialCharactersState,
      isLoading: false,
      charactersArray: initialCharactersState.charactersArray.concat(
        charactersToPush
      ),
      info: info
    });
  });
  it("should handle FETCH_ERROR", () => {
    const charactersToPush: Character[] = [new Character()];
    const info: CharactersInfoInterface = {
      count: 0,
      pages: 0,
      next: "",
      prev: ""
    };
    expect(
      characters(initialCharactersState, {
        type: CharactersActionTypes.FETCH_ERROR,
        error: new AjaxError("", {} as XMLHttpRequest, {})
      })
    ).toEqual({
      ...initialCharactersState,
      isLoading: false,
      charactersArray: {},
      info: info
    });
  });
  it("should handle FETCH_QUERY_SUCCESS", () => {
    const charactersToPush: Character[] = [new Character()];
    const info: CharactersInfoInterface = {
      count: 0,
      pages: 0,
      next: baseUrl + charactersUri,
      prev: ""
    };
    expect(
      characters(initialCharactersState, {
        type: CharactersActionTypes.FETCH_SUCCESS,
        charactersToPush: charactersToPush,
        info: info
      })
    ).toEqual({
      ...initialCharactersState,
      isLoading: false,
      charactersArray: charactersToPush,
      info: info
    });
  });
});
