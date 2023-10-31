/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const styleSlice = createSlice({
  name: "style",
  initialState: {
    style: [
      {
        id: 0,
        borderWidth: 1,
        height: 100,
        width: 100,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        color: "#000000",
        backgroundColor: "#FFFFFF",
      },
    ],
    activeContainer: 0,
  },
  reducers: {
    addNewContainer: (state, action) => {
      state.style.push(action.payload);
    },
    setActiveContainer: (state, action) => {
      state.activeContainer = action.payload;
    },
    updateContainer: (state, action) => {
      const containerIndex = state.style.findIndex(
        (s) => s.id === action.payload.id
      );

      state.style[containerIndex] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewContainer, setActiveContainer, updateContainer } =
  styleSlice.actions;

export default styleSlice.reducer;
