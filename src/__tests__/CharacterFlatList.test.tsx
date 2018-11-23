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
configure({ adapter: new Adapter() });

describe("renders correctly", () => {
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
  it("renders all children", () => {
    const store = mockStore({ characters: initialCharactersState });
    //@ts-ignore
    const wrapper = shallow(<CharacterFlatList store={store} />);
    const component = shallow(wrapper.getElements()[0]);
    expect(component.find(FlatList).length).toEqual(1);
    expect(component.find(SearchBar).length).toEqual(1);
    expect(component).toMatchSnapshot();
  });
});
