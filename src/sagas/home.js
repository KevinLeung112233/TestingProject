import { all, fork, takeEvery, put, select, call } from "redux-saga/effects";
import * as Actions from "../actions/home";
import api from "../api";
import * as Selectors from "selectors/home";

function* fetchAppStore(action) {
  try {
    let page = 1;
    const { loadNextPage } = action.data;

    if (loadNextPage) {
      page = yield select(Selectors.currentPage);
    }

    let limit = page * 10;

    let response = yield api.get(`rss/topfreeapplications/limit=${limit}/json`);

    let dataList =
      response &&
      response.data &&
      response.data.feed &&
      response.data.feed.entry;

    let appDetail = yield all(dataList.map(item => getAppDetails(item)));

    for (let i = 0; i < dataList.length; i++) {
      dataList[i].id = appDetail[i][0].id;
      dataList[i].rating = appDetail[i][0].rating;
      dataList[i].ratingCount = appDetail[i][0].ratingCount;
    }

    yield put(Actions.fetchAppStoreSuccess(dataList));
  } catch (e) {
    yield put(Actions.fetchAppStoreFail(e));
  }
}

function* getAppDetails(action) {
  let ratingList = [];

  try {
    const item = action;
    const id =
      item && item.id && item.id.attributes && item.id.attributes[`im:id`];
    let appDetails = yield api.get(`lookup`, { params: { id } });

    let rating =
      appDetails &&
      appDetails.data &&
      appDetails.data.results &&
      appDetails.data.results[0] &&
      appDetails.data.results[0].averageUserRating;

    let ratingCount =
      appDetails &&
      appDetails.data &&
      appDetails.data.results &&
      appDetails.data.results[0] &&
      appDetails.data.results[0].userRatingCount;

    ratingList.push({ id, rating, ratingCount });
  } catch (e) {
    console.log(`error : ` + e);
  }

  return ratingList;
}

function* fetchRecommendationList() {
  try {
    let response = yield api.get("rss/topgrossingapplications/limit=10/json");
    yield put(
      Actions.fetchRecommendationListSuccess(
        response &&
          response.data &&
          response.data.feed &&
          response.data.feed.entry
      )
    );
  } catch (e) {
    console.log(e);
    yield put(Actions.fetchRecommendationListFail(e));
  }
}

function* watchFetchAppStore() {
  yield takeEvery(Actions.FETCH_APPSTORE, fetchAppStore);
}

function* watchFetchRecommendationList() {
  yield takeEvery(Actions.FETCH_RECOMMENDATIONLIST, fetchRecommendationList);
}

export default function* home() {
  yield all([fork(watchFetchAppStore), fork(watchFetchRecommendationList)]);
}
