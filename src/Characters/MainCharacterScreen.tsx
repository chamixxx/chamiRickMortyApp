import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import _ from "lodash";
import CharacterFlatList from "./Components/CharacterFlatList";

// Interfaces and types

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

// Component class

export default class MainCharacterScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: "",
      characterDataSourceFiltered: []
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(newProps: Props) {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: "100%"
        }}
      >
        <View
          style={{
            backgroundColor: "gray",
            height: 56,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{ flex: 3, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.title}>Character List</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>

        <CharacterFlatList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17.5,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "center"
  }
});
