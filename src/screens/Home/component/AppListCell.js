import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import FastImage from "react-native-fast-image";
import StarRating from "react-native-star-rating";
import Highlighter from "react-native-highlight-words";

class AppListCell extends PureComponent {
  render() {
    const {
      index,
      name,
      cat,
      icon,
      rating,
      searchKeyword,
      ratingCount
    } = this.props;
    let isEven = index % 2 == 0;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 10,
          paddingBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8"
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            alignSelf: "center",
            minWidth: 30,
            textAlign: "center"
          }}
        >
          {index + 1}
        </Text>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            marginLeft: 10
          }}
        >
          <FastImage
            style={{
              width: 60,
              height: 60,
              borderRadius: isEven ? 10 : 30
            }}
            source={{
              uri: icon
                ? icon
                : "https://cdn3.iconfinder.com/data/icons/fugue/icon_shadowless/image-empty.png",
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            marginLeft: 10
          }}
        >
          <Highlighter
            highlightStyle={{ backgroundColor: "orange" }}
            searchWords={[searchKeyword]}
            textToHighlight={name}
            style={{ fontSize: 16, color: "black" }}
          />
          <Highlighter
            highlightStyle={{ backgroundColor: "orange" }}
            searchWords={[searchKeyword]}
            textToHighlight={cat}
            style={{
              fontSize: 14,
              color: "gray",
              marginTop: 5,
              marginBottom: 5
            }}
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignSelf: "flex-start",
              justifyContent: "center"
            }}
          >
            <StarRating
              disabled={true}
              maxStars={5}
              rating={rating}
              fullStarColor="orange"
              halfStarColor="orange"
              emptyStarColor="orange"
              starSize={12}
              starStyle={{ marginRight: 1 }}
              containerStyle={{ width: 80, alignSelf: "center" }}
            />
            <Text
              style={{
                fontSize: 12,
                color: "gray",
                alignSelf: "center",
                top: -1
              }}
            >{`(${ratingCount})`}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppListCell);
