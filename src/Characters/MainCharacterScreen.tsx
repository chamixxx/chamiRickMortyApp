import React from "react";
import { View, StyleSheet, Text } from "react-native";
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
      <View style={{ flex: 1 }}>
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
  parentView: {
    flex: 1,
    backgroundColor: "white"
  },
  collectionView: {
    flex: 1
  },
  searchBar: {
    height: 48,
    margin: 0,
    marginTop: 8,
    backgroundColor: "#FFFFFF00",
    borderRadius: 10,
    borderTopWidth: 0,
    marginHorizontal: 8,
    borderBottomWidth: 0
  },
  searchBarText: {
    fontSize: 15,
    height: 40,
    marginVertical: 0,
    backgroundColor: "#FFFFFF",
    color: "gray"
  },
  title: {
    fontSize: 17.5,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "center"
  },
  backButtonImage: {
    resizeMode: "contain",
    width: 13.5,
    height: 24,
    marginLeft: 25
  }
});
