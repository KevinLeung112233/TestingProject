import home from "./home";
import {
    combineReducers
} from "redux";
// import {
//     persistReducer
// } from "redux-persist";
// import FilesystemStorage from "redux-persist-filesystem-storage";

// const businessPersistConfig = {
//     key: "business",
//     storage: FilesystemStorage,
//     whitelist: ["form"],
//     timeout: 10000
// };

const rootReducers = combineReducers({
    home,
});

export default rootReducers;