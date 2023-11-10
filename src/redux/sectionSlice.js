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
          position: "",
          display: "",
          borderWidth: "",
          height: "",
          width: "",
          marginLeft: "",
          marginTop: "",
          paddingLeft: "",
          paddingRight: "",
          paddingTop: "",
          paddingBottom: "",
          color: "",
          backgroundColor: "",
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
    deleteComponent: (state) => {
      if (
        state.properties.length > 2 &&
        state.properties.findIndex((p) => p.id === state.activeComponent) !== 1
      ) {
        for (let i = 0; i < state.properties.length; i++) {
          if (state.properties[i].type === "section") {
            for (let j = 0; j < state.properties[i].children.length; j++) {
              if (state.properties[i].children[j] === state.activeComponent) {
                state.properties[i].children.splice(j, 1);
              }
            }
            for (let j = 0; j < state.properties[i].buttons.length; j++) {
              if (state.properties[i].buttons[j] === state.activeComponent) {
                state.properties[i].buttons.splice(j, 1);
              }
            }
          }
        }

        const componentToDelete = state.properties.findIndex(
          (p) => p.id === state.activeComponent
        );

        if (componentToDelete !== -1) {
          state.activeComponent = state.properties[1].id;
          state.properties.splice(componentToDelete, 1);
        }
      }
    },

    setActiveComponent: (state, action) => {
      const currentActiveIndex = state.properties.findIndex(
        (s) => s.id === state.activeComponent
      );

      const newActiveIndex = state.properties.findIndex(
        (s) => s.id === action.payload
      );

      state.properties[currentActiveIndex].style.borderWidth = "1px";
      state.properties[newActiveIndex].style.borderWidth = "2px";

      state.activeComponent = action.payload;
    },

    updateComponent: (state, action) => {
      const containerIndex = state.properties.findIndex(
        (s) => s.id === state.activeComponent
      );

      const newState = {
        ...state.properties[containerIndex].style,
        ...action.payload,
      };

      let emptyPropertiesRemoved = {};

      //keeps empty properties out of the store.
      for (const key in newState) {
        if (newState[key] !== "")
          emptyPropertiesRemoved = {
            ...emptyPropertiesRemoved,
            [key]: newState[key],
          };
      }

      state.properties[containerIndex].style = {
        ...emptyPropertiesRemoved,
      };
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
  deleteComponent,
  updateComponent,
  addSectionToActive,
  addButtonToActive,
  changeButtonName,
} = sectionSlice.actions;

export default sectionSlice.reducer;
