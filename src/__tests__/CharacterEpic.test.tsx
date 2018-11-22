import {
  FetchSuccessAction,
  CharactersActionTypes,
  fetchCharactersActionCreator,
  fetchSuccessActionCreator,
  fetchErrorActionCreator
} from "../Characters/CharactersAction";
import {
  initialCharactersState,
  CharactersState
} from "../Characters/CharacterReducer";
import { of, Subject, throwError } from "rxjs";
import { ActionsObservable, StateObservable } from "redux-observable";
import { fetchCharacterEpic } from "../Characters/CharactersEpic";
import { RootState } from "../Utils/RootReducer";
import { ajax } from "rxjs/ajax";

describe("loadUserEpic", () => {
  // done: see https://facebook.github.io/jest/docs/asynchronous.html

  it("dispatches a result action when the user is loaded", done => {
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
