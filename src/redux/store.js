/** @format */

import { configureStore } from "@reduxjs/toolkit";
import sectionReducer from "./sectionSlice";

export default configureStore({
  reducer: {
    section: sectionReducer,
  },
});
