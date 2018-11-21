import React from "react";
import { View, StyleSheet, FlatList, Keyboard, Text } from "react-native";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import _ from "lodash";
import Character from "../../Models/Character";
import CharacterFlatListCell from "./CharacterFlatListCell";

// Interfaces and types

interface OwnProps {}

interface StateProps {}

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
    let filteredData = _.filter(this.props.characters, foodItem => {
      if (foodItem.matchingSynonym(formatedQuery) != undefined) {
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

  render() {
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
          data={this.state.characterDataSourceFiltered}
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

const mapStateToProps = (state: any): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, OwnProps>(
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
  },
  backButtonImage: {
    resizeMode: "contain",
    width: 13.5,
    height: 24,
    marginLeft: 25
  }
});
