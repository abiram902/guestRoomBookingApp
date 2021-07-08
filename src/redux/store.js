import listingReducer from "./listings/listingReducer";
import { createStore } from "redux";

const store = createStore(listingReducer);

export default store;
