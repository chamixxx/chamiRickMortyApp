import Character from "../Models/Character";
import { CharactersInfoInterface } from "../Characters/CharacterReducer";
import { baseUrl, charactersUri } from "../Utils/Constants";
import {
  CharactersActionTypes,
  fetchSuccessActionCreator,
  fetchQuerySuccessActionCreator,
  fetchErrorActionCreator,
  fetchCharactersActionCreator,
  fetchQueryNameActionCreator
} from "../Characters/CharactersAction";
import { AjaxError } from "rxjs/ajax";

describe("charactersActionCreators", () => {
  it("should create an action to add characters to the list an update infos", () => {
    const charactersToPush: Character[] = [new Character()];
    const info: CharactersInfoInterface = {
      count: 0,
      pages: 0,
      next: baseUrl + charactersUri,
      prev: ""
    };
    const expectedAction = {
      type: CharactersActionTypes.FETCH_SUCCESS,
      charactersToPush: charactersToPush,
      info: info
    };
    expect(fetchSuccessActionCreator(charactersToPush, info)).toEqual(
      expectedAction
    );
  });

  it("should create an action to replace characters list", () => {
    const charactersToPush: Character[] = [new Character()];
    const info: CharactersInfoInterface = {
      count: 0,
      pages: 0,
      next: baseUrl + charactersUri,
      prev: ""
    };
    const expectedAction = {
      type: CharactersActionTypes.FETCH_QUERY_SUCCESS,
      charactersToPush: charactersToPush,
      info: info
    };
    expect(fetchQuerySuccessActionCreator(charactersToPush, info)).toEqual(
      expectedAction
    );
  });

  it("should notify the state that a network error happened and add error message", () => {
    const error = new AjaxError("", {} as XMLHttpRequest, {});
    const expectedAction = {
      type: CharactersActionTypes.FETCH_ERROR,
      error: error
    };
    expect(fetchErrorActionCreator(error)).toEqual(expectedAction);
  });

  it("should notify that characters needs to be fetched", () => {
    const expectedAction = {
      type: CharactersActionTypes.FETCH_CHARACTERS
    };
    expect(fetchCharactersActionCreator()).toEqual(expectedAction);
  });

  it("should notify that characters needs to be fetched with a query name", () => {
    const query: string = "test";
    const expectedAction = {
      type: CharactersActionTypes.FETCH_QUERY_NAME,
      query: query
    };
    expect(fetchQueryNameActionCreator(query)).toEqual(expectedAction);
  });
});
