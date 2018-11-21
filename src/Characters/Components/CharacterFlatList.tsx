import React from "react";
import { View, StyleSheet, FlatList, Keyboard, Text } from "react-native";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect, DispatchProp } from "react-redux";
import { SearchBar } from "react-native-elements";
import _ from "lodash";
import Character from "../../Models/Character";
import CharacterFlatListCell from "./CharacterFlatListCell";
import { RootState } from "../../Utils/RootReducer";
import { RootActions } from "../../Utils/Store";

// Interfaces and types

interface OwnProps {}

interface StateProps {
  characters: Character[];
  searchQuery: string;
  filteredCharacters: Character[];
}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps & InjectedIntlProps;

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

  componentDidMount() {}

  componentWillReceiveProps(newProps: Props) {}

  handleTouchOnCard = (item: Character) => {};

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
    const formatedQuery = searchQuery.toUpperCase();
    let filteredData = _.filter(this.props.characters, character => {
      if (character.matchingName(formatedQuery) != undefined) {
        return true;
      }
      return false;
    });

    this.setState({
      searchQuery: searchQuery,
      characterDataSourceFiltered: filteredData
    });
    if (this.state.characterDataSourceFiltered.length > 0) {
      this.characterFlatListView.scrollToIndex({ animated: false, index: 0 });
    }
  };

  handleLoadMore = () => {};

  render() {
    const isRefreshing = true;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "gray", marginTop: -4 }}>
          <SearchBar
            noIcon
            onChangeText={this.handleSearchQuery}
            placeholder={this.props.intl.formatMessage({
              id: "character.list.Search",
              defaultMessage: "Search"
            })}
            placeholderTextColor={"gray"}
            containerStyle={styles.searchBar}
            inputStyle={styles.searchBarText}
          />
        </View>
        <FlatList
          data={this.props.filteredCharacters}
          refreshing={isRefreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={10}
          renderItem={({ item, index }) => this.renderOverviewItem(item, index)}
          horizontal={false}
          style={styles.collectionView}
          keyExtractor={(item: Character, index: number) => item.id!.toString()}
          extraData={this.props.characters}
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
    searchQuery: state.characters.searchQuery,
    filteredCharacters: state.characters.filteredCharacters
  };
};

const mapDispatchToProps = (
  dispatch: DispatchProp<RootActions>
): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(CharacterFlatList));

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
