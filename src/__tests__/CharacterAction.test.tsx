import Character from "../Models/Character";
import { CharactersInfoInterface } from "../Characters/CharacterReducer";
import { baseUrl, charactersUri } from "../Utils/Constants";
import {
  CharactersActionTypes,
  fetchSuccessActionCreator
} from "../Characters/CharactersAction";

describe("actions", () => {
  it("should create an action add characters to the list", () => {
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
});
