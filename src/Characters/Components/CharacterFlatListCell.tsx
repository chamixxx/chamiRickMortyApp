import React from "react";
import { TouchableHighlight, Image, View } from "react-native";
import {
  Left,
  Thumbnail,
  Body,
  Text,
  Card,
  CardItem,
  Right
} from "native-base";
import Character from "../../Models/Character";

interface OwnProps {
  item: Character;
  handleTouchOnCard: (item: Character) => void;
  index: number;
}

export default class CharacterFlatListCell extends React.PureComponent<
  OwnProps,
  any
> {
  private cellHeight: number = 95;

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.props.handleTouchOnCard(this.props.item)}
        underlayColor="#ffffff00"
      >
        <Card style={{ marginLeft: 8, marginRight: 8 }}>
          <CardItem
            style={{ height: this.cellHeight, backgroundColor: "#F5F4F4" }}
          >
            <Left>
              <Thumbnail
                source={{
                  uri:
                    "file://" +
                    RNFetchBlob.fs.dirs.DocumentDir +
                    "/" +
                    this.props.item.imageUrl
                }}
                style={{
                  height: 68,
                  width: 68,
                  borderRadius: 34
                }}
              />
              <Body style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    marginLeft: 12,
                    color: "black"
                  }}
                >
                  {this.props.item.name!}
                </Text>
              </Body>
            </Left>
            <Right>
              <View style={{ flexDirection: "row" }}>
                {/* <View
                  style={{
                    height: 29,
                    width: 64,
                    backgroundColor: this.getRatingInterpretationColor(
                      this.props.item.rating!
                    ),
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 15
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center",
                      fontSize: 11
                    }}
                  >
                    {this.getRatingInterpretationText(this.props.item.rating!)}
                  </Text>
                </View> */}
                <Image
                  source={require("../Images/back.png")}
                  style={{
                    height: 27,
                    width: 13.5,
                    resizeMode: "contain"
                  }}
                />
              </View>
            </Right>
          </CardItem>
        </Card>
      </TouchableHighlight>
    );
  }
}
