import * as Actions from "../actions/home";

const initialState = {
  appList: [],
  recommendationList: [],
  searchKey: "",
  appListCurrentPage: 1,
  isFetchingAppList: false,
  errorAppList: null,
  isFetchingRecommendationList: false,
  errorRecommendationList: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Actions.FETCH_APPSTORE:
      return {
        ...state,
        isFetchingAppList: true,
        errorAppList: null,
        appListCurrentPage: action.data && action.data.page
      };
    case Actions.FETCH_APPSTORE_SUCCESS:
      const fetchedDataArray = (action.data && action.data) || [];
      const currentDataArray = state.appList || [];

      let finalArray = [];
      if (state.appListCurrentPage == 1) {
        finalArray = action.data;
      } else if (fetchedDataArray.length > 0) {
        finalArray.push(...currentDataArray);
        const croppedList = fetchedDataArray.slice(
          currentDataArray.length,
          fetchedDataArray.length
        );
        finalArray.push(...croppedList);
      } else {
        finalArray = state.appList;
      }
      return {
        ...state,
        isFetchingAppList: false,
        errorAppList: null,
        appList: fetchedDataArray
      };
    case Actions.FETCH_APPSTORE_FAIL:
      return {
        ...state,
        isFetchingAppList: false,
        errorAppList: action.error
      };
    case Actions.FETCH_RECOMMENDATIONLIST:
      return {
        ...state,
        isFetchingRecommendationList: true,
        errorRecommendationList: null
      };
    case Actions.FETCH_RECOMMENDATIONLIST_SUCCESS:
      return {
        ...state,
        isFetchingRecommendationList: false,
        errorRecommendationList: null,
        recommendationList: action.data
      };
    case Actions.FETCH_RECOMMENDATIONLIST_FAIL:
      return {
        ...state,
        isFetchingRecommendationList: false,
        errorRecommendationList: action.error
      };
    case Actions.SET_SEARCHKEY:
      return {
        ...state,
        searchKey: action && action.searchKey
      };
    default:
      return state;
  }
}
