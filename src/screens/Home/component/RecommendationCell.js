import React, { PureComponent } from "react";
import { Dimensions, View, Text } from "react-native";
import { connect } from "react-redux";

import FastImage from "react-native-fast-image";

const deviceWidth = Dimensions.get("window").width;

const cellWidth = deviceWidth / 3.5;

class RecommendationCell extends PureComponent {
  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { index, name, cat, icon } = this.props;
    return (
      <View
        style={{
          alignSelf: "center",
          width: cellWidth,
          marginLeft: index==0 ? 10 : 0,
          height: "100%"
        }}
      >
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            marginBottom: 10
          }}
        >
          <FastImage
            style={{
              width: cellWidth - 20,
              height: cellWidth - 20,
              borderRadius: 10
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
            paddingLeft: 10,
            paddingRight: 10,
            flex: 1
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              minHeight: 40,
              lineHeight: 20,
              marginBottom: 5
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
          <Text style={{ fontSize: 13, color: "gray", left: 0, bottom: 0 }}>
            {cat}
          </Text>
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
)(RecommendationCell);
