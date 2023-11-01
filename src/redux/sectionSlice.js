/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const sectionSlice = createSlice({
  name: "section",
  initialState: {
    properties: [
      {
        id: 0,
        type: "section",
        style: {
          position: "relative",
          display: "flex",
          borderWidth: "1px",
          height: "100px",
          width: "100px",
          marginLeft: "0",
          marginTop: "0",
          paddingLeft: "0",
          paddingRight: "0",
          paddingTop: "0",
          paddingBottom: "0",
          color: "#000000",
          backgroundColor: "#FFFFFF",
        },

        children: [],
        buttons: [],
      },
    ],
    activeContainer: 0,
  },
  reducers: {
    addNewContainer: (state, action) => {
      let newProperties = [...state.properties];

      newProperties.push(action.payload);

      state.properties = newProperties;
    },
    setActiveContainer: (state, action) => {
      state.activeContainer = action.payload;
    },
    updateContainer: (state, action) => {
      const containerIndex = state.properties.findIndex(
        (s) => s.id === state.activeContainer
      );

      state.properties[containerIndex].style = action.payload;
    },

    addSectionToActive: (state, action) => {
      let newProperties = [...state.properties];

      const containerIndex = newProperties.findIndex(
        (s) => s.id === state.activeContainer
      );

      newProperties.push(action.payload);
      newProperties[containerIndex].children.push(action.payload.id);

      state.properties = newProperties;

      state.activeContainer = action.payload.id;
    },

    addButtonToActive: (state, action) => {
      let newProperties = [...state.properties];

      const containerIndex = newProperties.findIndex(
        (s) => s.id === state.activeContainer
      );

      console.log(action.payload);
      newProperties.push(action.payload);
      newProperties[containerIndex].buttons.push(action.payload.id);

      state.properties = newProperties;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewContainer,
  setActiveContainer,
  updateContainer,
  addSectionToActive,
  addButtonToActive,
} = sectionSlice.actions;

export default sectionSlice.reducer;
