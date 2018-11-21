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
                  uri: this.props.item.image!
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
              <Text>{this.props.item.status!}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableHighlight>
    );
  }
}
