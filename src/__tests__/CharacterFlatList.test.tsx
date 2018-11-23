import React from "react";

import CharacterFlatList from "../Characters/Components/CharacterFlatList";
import configureStore from "redux-mock-store";
import { initialCharactersState } from "../Characters/CharacterReducer";
import { shallow } from "enzyme";

const mockStore = configureStore();

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { FlatList, ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-elements";
import Character from "../Models/Character";
configure({ adapter: new Adapter() });

describe("renders characterFlatList Correctly correctly", () => {
  //   it("basic test", () => {
  //     const store = mockStore({ characters: initialCharactersState });
  //     let component = shallow(
  //       <Provider store={store}>
  //         <CharacterFlatList />
  //       </Provider>
  //     );
  //     //@ts-ignore
  //     component.instance().getListOrIndicator = jest.fn();
  //     component.update();
  //     expect(component).toBeTruthy();
  //     expect(component.instance().getListOrIndicator).toBeCalled();
  //   });
  it("renders all children when is not loading", () => {
    const store = mockStore({
      characters: initialCharactersState
    });
    //@ts-ignore
    const wrapper = shallow(<CharacterFlatList store={store} />);
    const component = shallow(wrapper.getElements()[0]);
    expect(component.find(FlatList).length).toEqual(1);
    expect(component.find(SearchBar).length).toEqual(1);
    expect(component).toMatchSnapshot();
  });

  it("renders all children when is  loading", () => {
    const store = mockStore({
      characters: { ...initialCharactersState, isLoading: true }
    });
    //@ts-ignore
    const wrapper = shallow(<CharacterFlatList store={store} />);
    const component = shallow(wrapper.getElements()[0]);
    expect(component.find(SearchBar).length).toEqual(1);
    expect(component.find(ActivityIndicator).length).toEqual(1);
    expect(component).toMatchSnapshot();
  });

  it("data in flat list equal data in state", () => {
    const store = mockStore({
      characters: {
        ...initialCharactersState,
        charactersArray: [
          new Character(),
          new Character(),
          new Character(),
          new Character()
        ]
      }
    });
    //@ts-ignore
    const wrapper = shallow(<CharacterFlatList store={store} />);
    const component = shallow(wrapper.getElements()[0]);
    expect(
      component
        .find(FlatList)
        .at(0)
        .props().data.length
    ).toEqual(store.getState().characters.charactersArray.length);
    expect(component).toMatchSnapshot();
  });
});
