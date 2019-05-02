import React from "react";
import {
  Actions,
  Stack,
  Scene,
  Modal,
  Lightbox,
  Overlay
} from "react-native-router-flux";
import Home from "./screens/Home";

const Scenes = Actions.create(
  <Overlay key="overlay">
    <Modal key="modal" hideNavBar>
      <Lightbox key="lightbox">
        <Stack hideNavBar key="root">
          <Scene key="home" component={Home} hideNavBar initial />
        </Stack>
      </Lightbox>
    </Modal>
  </Overlay>
);

export default Scenes;
