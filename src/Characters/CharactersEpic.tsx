import { ajax } from "rxjs/ajax";
import { switchMap, map, catchError } from "rxjs/operators";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import {
  CharactersActionTypes,
  fetchSuccessActionCreator,
  fetchErrorActionCreator
} from "./CharactersAction";
import { charactersUri, baseUrl } from "../Utils/Constants";
import { RootState } from "../Utils/RootReducer";
import { RootActions } from "../Utils/Store";
import { CharactersInfoInterface } from "./CharacterReducer";
import { mapCharacterJSONtoCharacter } from "../Models/Character";

export const fetchCharacterEpic: Epic<RootActions, RootActions, RootState> = (
  action$,
  state
) => {
  return action$.pipe(
    ofType(CharactersActionTypes.FETCH_CHARACTERS),
    switchMap((action, index) => {
      const url =
        state.value.characters.info.next == ""
          ? baseUrl + charactersUri
          : state.value.characters.info.next;
      return ajax.getJSON(url).pipe(
        map(response => {
          let mappedResponse = response as {
            info: CharactersInfoInterface;
            results: {}[];
          };
          return fetchSuccessActionCreator(
            mappedResponse.results.map((result: any) => {
              return mapCharacterJSONtoCharacter(result);
            }),
            mappedResponse.info
          );
        }),
        catchError(error => {
          console.log(error);
          return of(fetchErrorActionCreator(error));
        })
      );
    })
  );
};
