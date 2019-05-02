import React, { PureComponent } from "react";
import { FlatList, View, ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import * as HomeActions from "../../actions/home";

import AppListCell from "./component/AppListCell";
import RecommendationCell from "./component/RecommendationCell";

import { SearchBar } from "react-native-elements";

const MAX_PAGE = 10;

class Home extends PureComponent {
  state = {
    searchKey: ""
  };

  componentDidMount() {
    if (!this.props.appList || this.props.appList.length == 0) {
      this.props.fetchAppStore();
    }

    if (
      !this.props.recommendationList ||
      this.props.recommendationList.length == 0
    ) {
      this.props.fetchRecommendationList();
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  _renderAppListItem = ({ item, index }) => {
    if (!item || item == null) return;

    return (
      <AppListCell
        name={item.name}
        cat={item.cat}
        index={index}
        icon={item.icon}
        rating={item.rating}
        searchKeyword={this.isSearching ? this.props.searchKey : ""}
        ratingCount={item.ratingCount}
      />
    );
  };

  _renderRecommendationItem = ({ item, index }) => {
    if (!item || item == null) return;
    return (
      <RecommendationCell
        name={item.name}
        cat={item.cat}
        icon={item.icon}
        index={index}
      />
    );
  };

  _keyExtractor = (item, index) => index.toString();

  getFormattedList(list, needHighReImage = false) {
    if (!list || list.length == 0) return [];

    let newList = [];
    list.forEach(item => {
      if (item) {
        newList.push({
          name: item["im:name"] && item["im:name"].label,
          cat:
            item.category &&
            item.category.attributes &&
            item.category.attributes.label,
          author: item[`im:artist`] && item[`im:artist`].label,
          summary: item.summary && item.summary.label,
          icon:
            item["im:image"] &&
            item["im:image"][needHighReImage ? 2 : 0] &&
            item["im:image"][needHighReImage ? 2 : 0].label &&
            item["im:image"][needHighReImage ? 2 : 0].label,
          rating: (item && item.rating) || 0,
          id: item.id,
          ratingCount: item.ratingCount
          // (item &&
          //   item.id &&
          //   item.id.attributes &&
          //   item.id.attributes[`im:id`]) ||
          // ""
        });
      }
    });

    return newList;
  }

  get getFilteredData() {
    const { searchKey } = this.props;

    let filteredAppList = this.getFormattedList(this.props.appList).filter(
      data =>
        data &&
        (data.name.includes(searchKey) ||
          data.cat.includes(searchKey) ||
          data.summary.includes(searchKey) ||
          data.author.includes(searchKey))
    );

    let filteredRecommendationList = this.getFormattedList(
      this.props.recommendationList
    ).filter(
      data =>
        data &&
        (data.name.includes(searchKey) ||
          data.cat.includes(searchKey) ||
          data.summary.includes(searchKey) ||
          data.author.includes(searchKey))
    );

    const appListIdList = filteredAppList.map(function(data) {
      return data.id;
    });

    let uniqueReList = filteredRecommendationList.filter(
      data => appListIdList.indexOf(data.id) == -1
    );

    let finalList = filteredAppList.concat(uniqueReList);

    return finalList;
  }

  _onSearch(text) {
    this.props.setSearchKey(text);
  }

  _loadNextPage = () => {
    const { isFetchingAppList, appListCurrentPage } = this.props;

    if (this.reachMaxPage || this.isSearching || isFetchingAppList) return;

    this.props.fetchAppStore({
      loadNextPage: true,
      page: appListCurrentPage + 1
    });
  };

  _renderHeader = () => {
    const { recommendationList } = this.props;

    if (this.isSearching) return;

    return (
      <View
        style={{
          marginTop: 20,
          paddingBottom: 19,
          borderBottomWidth: 2,
          borderBottomColor: "#E8E8E8"
        }}
      >
        <Text
          style={{
            marginLeft: 20,
            fontSize: 22,
            color: "black",
            marginBottom: 20
          }}
        >
          {"推介"}
        </Text>
        <FlatList
          data={this.getFormattedList(this.props.recommendationList, true)}
          extraData={recommendationList}
          renderItem={this._renderRecommendationItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  _renderFooter = () => {
    if (
      !this.props.isFetchingAppList &&
      (this.isSearching || this.reachMaxPage)
    )
      return null;
    return (
      <ActivityIndicator style={{ height: 50, color: "gray" }} size="large" />
    );
  };

  get isSearching() {
    return this.props.searchKey && this.props.searchKey !== "";
  }

  get reachMaxPage() {
    return this.props.appListCurrentPage == MAX_PAGE;
  }

  render() {
    const { searchKey, appList } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SearchBar
          placeholder="搜尋"
          onChangeText={text => this._onSearch(text)}
          value={searchKey}
          lightTheme
        />
        <FlatList
          data={
            this.isSearching
              ? this.getFilteredData
              : this.getFormattedList(this.props.appList)
          }
          extraData={appList}
          renderItem={this._renderAppListItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={this._loadNextPage}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={this._renderHeader()}
          ListFooterComponent={this._renderFooter()}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  appList: store.home.appList,
  recommendationList: store.home.recommendationList,
  searchKey: store.home.searchKey,
  appListCurrentPage: store.home.appListCurrentPage,
  isFetchingAppList: store.home.isFetchingAppList
});

const mapDispatchToProps = {
  fetchAppStore: HomeActions.fetchAppStore,
  fetchRecommendationList: HomeActions.fetchRecommendationList,
  setSearchKey: HomeActions.setSearchKey
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
