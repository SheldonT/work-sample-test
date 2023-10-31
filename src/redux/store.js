/** @format */

import { configureStore } from "@reduxjs/toolkit";
import styleReducer from "./styleSlice";

export default configureStore({
  reducer: {
    section: styleReducer,
  },
});
