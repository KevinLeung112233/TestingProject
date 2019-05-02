import React, { PureComponent } from "react";
import { Router } from "react-native-router-flux";
import { Provider, connect } from "react-redux";
import registerScreens from "./screens";
import configureStore from "./store/configureStore";
import api from "../src/api";

export const { store } = configureStore();
const ConnectedRouter = connect()(Router);

class App extends PureComponent {
  constructor(props) {
    super(props);
    api.init(store);
  }

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter scenes={registerScreens} />
      </Provider>
    );
  }
}

export default App;
