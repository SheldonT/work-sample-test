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
    activeComponent: 0,
  },
  reducers: {
    addNewComponent: (state, action) => {
      let newProperties = [...state.properties];

      newProperties.push(action.payload);

      state.properties = newProperties;
    },
    setActiveComponent: (state, action) => {
      state.activeComponent = action.payload;
    },
    updateComponent: (state, action) => {
      const containerIndex = state.properties.findIndex(
        (s) => s.id === state.activeComponent
      );

      state.properties[containerIndex].style = action.payload;
    },

    addSectionToActive: (state, action) => {
      let newProperties = [...state.properties];

      const containerIndex = newProperties.findIndex(
        (s) => s.id === state.activeComponent
      );

      newProperties.push(action.payload);
      newProperties[containerIndex].children.push(action.payload.id);

      state.properties = newProperties;
    },

    addButtonToActive: (state, action) => {
      let newProperties = [...state.properties];

      const containerIndex = newProperties.findIndex(
        (s) => s.id === state.activeComponent
      );

      newProperties.push(action.payload);
      newProperties[containerIndex].buttons.push(action.payload.id);

      state.properties = newProperties;
    },

    changeButtonName: (state, action) => {
      const containerIndex = state.properties.findIndex(
        (s) => s.id === state.activeComponent
      );

      state.properties[containerIndex].name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewComponent,
  setActiveComponent,
  updateComponent,
  addSectionToActive,
  addButtonToActive,
  changeButtonName,
} = sectionSlice.actions;

export default sectionSlice.reducer;
