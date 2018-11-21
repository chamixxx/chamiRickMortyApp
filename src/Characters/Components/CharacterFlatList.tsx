import React from "react";
import { View, StyleSheet, FlatList, Keyboard, Text } from "react-native";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import _ from "lodash";
import Character from "../../Models/Character";
import CharacterFlatListCell from "./CharacterFlatListCell";
import { RootState } from "../../Utils/RootReducer";
import {
  fetchCharactersActionCreator,
  fetchQueryNameActionCreator
} from "../CharactersAction";

// Interfaces and types

interface OwnProps {}

interface StateProps {
  characters: Character[];
  searchQuery: string;
}

interface DispatchProps {
  fetchCharactersData: () => void;
  fetchQueryName: (query: string) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
  searchQuery: string;
  characterDataSourceFiltered: Character[];
}

// Component class

class CharacterFlatList extends React.Component<Props, State> {
  private characterFlatListView!: FlatList<Character>;
  private cellHeight = 95;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: "",
      characterDataSourceFiltered: []
    };
  }

  componentDidMount() {
    this.props.fetchCharactersData();
  }

  componentWillReceiveProps(newProps: Props) {}

  handleTouchOnCard = (item: Character) => {
    Keyboard.dismiss();
  };

  renderOverviewItem = (item: Character, index: number): JSX.Element => {
    return (
      <CharacterFlatListCell
        item={item}
        handleTouchOnCard={this.handleTouchOnCard}
        index={index}
      />
    );
  };

  handleSearchQuery = (searchQuery: string) => {
    const formatedQuery = searchQuery.toLowerCase();
    this.props.fetchQueryName(searchQuery);
    if (this.props.characters.length > 0) {
      this.characterFlatListView.scrollToIndex({ animated: false, index: 0 });
    }
  };

  handleLoadMore = () => {
    this.props.fetchCharactersData();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "gray", marginTop: -4 }}>
          <SearchBar
            noIcon
            onChangeText={this.handleSearchQuery}
            placeholder="Search"
            placeholderTextColor={"gray"}
            containerStyle={styles.searchBar}
            inputStyle={styles.searchBarText}
          />
        </View>
        <FlatList
          data={this.props.characters}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={3}
          renderItem={({ item, index }) => this.renderOverviewItem(item, index)}
          horizontal={false}
          style={styles.collectionView}
          keyExtractor={(item: Character, index: number) =>
            item.id!.toString() + index
          }
          extraData={this.props.characters.length}
          ref={(ref: FlatList<Character>) => {
            this.characterFlatListView = ref as any;
          }}
          initialNumToRender={20}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    characters: state.characters.charactersArray,
    searchQuery: state.characters.searchQuery
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    fetchCharactersData: () => dispatch(fetchCharactersActionCreator()),
    fetchQueryName: (query: string) =>
      dispatch(fetchQueryNameActionCreator(query))
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CharacterFlatList);

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
  }
});
