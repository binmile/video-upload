import axios from "axios";
import { ofType } from "redux-observable";
import {
  catchError,
  debounceTime,
  map,
  mergeMap,
  pluck,
  takeUntil,
} from "rxjs/operators";
import { from, of } from "rxjs";
import {
  GET_VIDEO_LIST,
  errorGettingVideoList,
  gotVideoList,
} from "./actionVideoUpload";

const url = "http://13.233.5.61:3001/user-files/1";

async function getVideoListData() {
  const res = await axios.get(url);
  const { data } = res;
  return data || {};
}

export const epicGetVideoList = (action$) =>
  action$.pipe(
    ofType(GET_VIDEO_LIST),
    debounceTime(250),
    pluck("payload"),
    mergeMap(({ data }) =>
      from(getVideoListData(data)).pipe(
        map(
          (data) => gotVideoList(data?.data),
          takeUntil(action$.pipe(ofType(GET_VIDEO_LIST)))
        ),
        catchError((error) => {
          return of(errorGettingVideoList(error));
        })
      )
    )
  );
