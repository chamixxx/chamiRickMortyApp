import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainCharacterScreen from "./Characters/MainCharacterScreen";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import store from "./Utils/Store";

export class App extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <MainCharacterScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
export default WrappedApp;
