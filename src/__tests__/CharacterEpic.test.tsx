import {
  fetchCharactersActionCreator,
  fetchSuccessActionCreator,
  fetchErrorActionCreator
} from "../Characters/CharactersAction";
import { initialCharactersState } from "../Characters/CharacterReducer";
import { of, throwError } from "rxjs";
import { ActionsObservable, StateObservable } from "redux-observable";
import { fetchCharacterEpic } from "../Characters/CharactersEpic";
import { RootState } from "../Utils/RootReducer";
import { ajax } from "rxjs/ajax";

describe("fetchCharacters", () => {
  it("dispatches a result action when characters are fetched", done => {
    const successResult = {
      charactersToPush: [],
      info: initialCharactersState.info
    };
    const mockResponse = {
      info: initialCharactersState.info,
      results: []
    };
    jest.spyOn(ajax, "getJSON").mockImplementation(() => of(mockResponse));

    const action$ = ActionsObservable.of(fetchCharactersActionCreator());
    const expectedOutputActions = fetchSuccessActionCreator(
      successResult.charactersToPush,
      successResult.info
    );

    const result = fetchCharacterEpic(
      action$,
      {} as StateObservable<RootState>,
      {}
    ).subscribe((actionReceived: any) => {
      expect(actionReceived.type).toEqual(expectedOutputActions.type);
      done();
    });
  });

  it("dispatches an error action when ajax fails", done => {
    const error = { error: "Error" };
    jest.spyOn(ajax, "getJSON").mockImplementation(() => throwError(error));

    const expectedOutputActions = fetchErrorActionCreator(error as any);
    const action$ = ActionsObservable.of(fetchCharactersActionCreator());

    const result = fetchCharacterEpic(
      action$,
      { value: { characters: { info: { next: "" } } } } as StateObservable<
        RootState
      >,
      {}
    ).subscribe((actionReceived: any) => {
      expect(actionReceived.error).toBe(expectedOutputActions.error);
      done();
    });
  });
});

// Unit test logic for the other epic is the same
