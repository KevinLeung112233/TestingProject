const HOME = "HOME";

export const FETCH_APPSTORE = `${HOME}/FETCH_APPSTORE`;
export const FETCH_APPSTORE_SUCCESS = `${HOME}/FETCH_APPSTORE_SUCCESS`;
export const FETCH_APPSTORE_FAIL = `${HOME}/FETCH_APPSTORE_FAIL`;

export const fetchAppStore = (data = { loadNextPage: false, page: 1 }) => ({
  type: FETCH_APPSTORE,
  data
});

export const fetchAppStoreSuccess = data => ({
  type: FETCH_APPSTORE_SUCCESS,
  data
});

export const fetchAppStoreFail = error => ({
  type: FETCH_APPSTORE_FAIL,
  error
});

export const FETCH_RECOMMENDATIONLIST = `${HOME}/FETCH_RECOMMENDATIONLIST`;
export const FETCH_RECOMMENDATIONLIST_SUCCESS = `${HOME}/FETCH_RECOMMENDATIONLIST_SUCCESS`;
export const FETCH_RECOMMENDATIONLIST_FAIL = `${HOME}/FETCH_RECOMMENDATIONLISTE_FAIL`;

export const fetchRecommendationList = () => ({
  type: FETCH_RECOMMENDATIONLIST
});

export const fetchRecommendationListSuccess = data => ({
  type: FETCH_RECOMMENDATIONLIST_SUCCESS,
  data
});

export const fetchRecommendationListFail = error => ({
  type: FETCH_RECOMMENDATIONLIST_FAIL,
  error
});

export const SET_SEARCHKEY = `${HOME}/SET_SEARCHKEY`;

export const setSearchKey = searchKey => ({
  type: SET_SEARCHKEY,
  searchKey
});
