import { all, fork } from "redux-saga/effects";
import home from "./home";

export default function* root() {
  yield all([fork(home)]);
}
