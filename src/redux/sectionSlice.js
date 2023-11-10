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
    previousState: {},
  },

  /*
  redux toolkit using the Immer library by default, which creates a draft
  version of the state for reducers in the background, making it safe to
  mutate the state directly.
  https://redux-toolkit.js.org/usage/immer-reducers
  */

  reducers: {
    addNewComponent: (state, action) => {
      state.previousState = { ...state };

      state.properties.push(action.payload);
    },
    deleteComponent: (state) => {
      const componentToDelete = state.properties.findIndex(
        (p) => p.id === state.activeComponent
      );

      if (
        state.properties.length > 2 &&
        componentToDelete !== 1 &&
        componentToDelete !== -1
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

        const deleteComponentBuffer = {
          ...state.properties[componentToDelete],
        };

        state.activeComponent = state.properties[1].id;
        state.properties.splice(componentToDelete, 1);

        if (deleteComponentBuffer.type === "section") {
          const componentChildren = [
            ...deleteComponentBuffer.children,
            ...deleteComponentBuffer.buttons,
          ];

          for (let i = 0; i < state.properties.length; i++) {
            if (state.properties[i].type === "section") {
              for (let j = 0; j < componentChildren.length; j++) {
                if (state.properties[i].id === componentChildren[j]) {
                  state.properties.splice(i, 1);
                }
              }
            }
          }
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
      const containerIndex = state.properties.findIndex(
        (s) => s.id === state.activeComponent
      );

      state.properties.push(action.payload);
      state.properties[containerIndex].children.push(action.payload.id);
    },

    addButtonToActive: (state, action) => {
      const containerIndex = state.properties.findIndex(
        (s) => s.id === state.activeComponent
      );

      state.properties.push(action.payload);
      state.properties[containerIndex].buttons.push(action.payload.id);
    },

    changeButtonName: (state, action) => {
      const containerIndex = state.properties.findIndex(
        (s) => s.id === state.activeComponent
      );

      state.properties[containerIndex].name = action.payload;
    },
  },
});

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
