/** @format */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateComponent,
  addSectionToActive,
  addButtonToActive,
  changeButtonName,
  deleteComponent,
  setActiveComponent,
} from "../redux/sectionSlice";
import ColorSelect from "./ColorSelect";
import BoxProperties from "./BoxProperties";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

export default function Controls({ productionAreaRef }) {
  const [componentType, setComponentType] = useState("Section");

  /*const [keyPressed, setKeyPressed] = useState("");
  const [mouseCoord, setMouseCoord] = useState([0, 0]);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeyPressed(event.key);
    };

    const handleKeyRelease = () => {
      setKeyPressed("");
    };

    const handleMouseDown = (event) => {
      setMouseCoord([event.clientX, event.clientY]);
      setMouseDown(true);
    };

    const handleMouseRelease = () => {
      setMouseDown(false);
    };

    window.addEventListener("keydown", (e) => handleKeyDown(e));
    window.addEventListener("keyup", handleKeyRelease);
    document.addEventListener("mousedown", (e) => handleMouseDown(e));
    document.addEventListener("mouseup", handleMouseRelease);

    return () => {
      window.removeEventListener("keydown", (e) => handleKeyDown(e));
      window.removeEventListener("keyup", handleKeyRelease);
      document.removeEventListener("mousedown", (e) => handleMouseDown(e));
      document.removeEventListener("mouseup", handleMouseRelease);
    };
  }, []);

  useEffect(() => {
    let leftOffset = 0;
    let topOffset = 0;

    if (productionAreaRef.current) {
      topOffset = productionAreaRef.current.getBoundingClientRect().top;
      leftOffset = productionAreaRef.current.getBoundingClientRect().left;
    }
    if (keyPressed === "Shift" && mouseDown) {
      dispatch(
        updateComponent({
          top: mouseCoord[1] - topOffset,
          left: mouseCoord[0] - leftOffset,
        })
      );
    }
    if (keyPressed === "Control" && mouseDown) {
      let topPosition = 0;
      let leftPosition = 0;

      if (activeStyle.top) topPosition = activeStyle.top;
      if (activeStyle.left) leftPosition = activeStyle.left;

      dispatch(
        updateComponent({
          height: mouseCoord[1] - topOffset - topPosition,
          width: mouseCoord[0] - leftOffset - leftPosition,
        })
      );
    }
  }, [mouseCoord]);*/

  const dispatch = useDispatch();

  const state = useSelector((state) => state.section);
  const componentProperties = useSelector((state) => state.section.properties);
  const activeComponent = useSelector((state) => state.section.activeComponent);

  const activeComponentIndex = componentProperties.findIndex(
    (p) => p.id === activeComponent
  );

  if (activeComponentIndex === -1) {
    dispatch(setActiveComponent(componentProperties[1].id));
  }

  let activeStyle = {};
  let activeComponentType = "";

  if (activeComponentIndex !== -1) {
    activeStyle = componentProperties[activeComponentIndex].style;
    activeComponentType = componentProperties[activeComponentIndex].type;
  } else {
    activeStyle = componentProperties[0].style;
  }

  const handleAddComponent = () => {
    if (activeComponentType === "section") {
      const newComponentId = uuidv4();

      if (componentType === "Section") {
        const newContainer = {
          id: newComponentId,
          type: "section",
          style: {
            position: "relative",
            display: "flex",
            borderStyle: "solid",
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
        };
        dispatch(addSectionToActive(newContainer));
      } else {
        const newButton = {
          id: newComponentId,
          name: "New Button",
          type: "button",
          style: {
            position: "relative",
            display: "flex",
            borderStyle: "solid",
            borderWidth: "1px",
            height: "25px",
            width: "75px",
            marginLeft: "0",
            marginTop: "0",
            paddingLeft: "0",
            paddingRight: "0",
            paddingTop: "0",
            paddingBottom: "0",
            color: "#000000",
            backgroundColor: "#FFFFFF",
          },
        };
        dispatch(addButtonToActive(newButton));
      }
    }
  };

  const getButtonName = () => {
    const activeComponentIndex = componentProperties.findIndex(
      (b) => b.id === activeComponent
    );

    return componentProperties[activeComponentIndex].name;
  };

  console.log(componentProperties);

  return (
    <div className="controlsCont">
      <div className="controlLabel">Controls</div>
      <div className="addContainerControls">
        <label htmlFor="componentType">Add Component:</label>
        <select
          style={{ marginLeft: "5px", marginRight: "10px" }}
          id="componentType"
          name="componentType"
          disabled={activeComponentType === "button"}
          value={componentType}
          onChange={(e) => setComponentType(e.target.value)}
        >
          <option value="Section">Section</option>
          <option value="Button">Button</option>
        </select>

        <button
          disabled={activeComponentType === "button"}
          onClick={() => handleAddComponent()}
        >
          Add
        </button>
      </div>
      <div
        className="addContainerControls"
        style={{
          display: activeComponentType === "button" ? "flex" : "none",
        }}
      >
        <label htmlFor="buttonName">Button Name:</label>
        <input
          type="text"
          id="buttonName"
          name="buttonName"
          className="buttonName"
          placeholder="Button Name"
          value={getButtonName()}
          onChange={(e) => dispatch(changeButtonName(e.target.value))}
        ></input>
      </div>

      <div className="controlRows">
        <label htmlFor="position">Position:</label>
        <select
          style={{ marginLeft: "5px", marginRight: "10px" }}
          id="position"
          name="position"
          value={componentProperties[activeComponentIndex].style.position}
          onChange={(e) =>
            dispatch(updateComponent({ position: e.target.value }))
          }
        >
          <option value="relative">Relative</option>
          <option value="absolute">Absolute</option>
          <option value="static">Static</option>
          <option value="fixed">Fixed</option>
          <option value="sticky">Sticky</option>
        </select>
      </div>
      <div
        className={
          componentProperties[activeComponentIndex].style.display &&
          componentProperties[activeComponentIndex].style.display === "flex"
            ? "controlRow"
            : "addContainerControls"
        }
      >
        <label htmlFor="display">Display:</label>
        <select
          style={{ marginLeft: "5px", marginRight: "10px" }}
          id="display"
          name="display"
          value={componentProperties[activeComponentIndex].style.display}
          onChange={(e) =>
            dispatch(updateComponent({ display: e.target.value }))
          }
        >
          <option value="block">Block</option>
          <option value="inline-block">Inline-Block</option>
          <option value="flex">Flex</option>
          <option value="inline-flex">Inline-Flex</option>
          <option value="grid">Grid</option>
          <option value="table">Table</option>
          <option value="list-item">List Item</option>
          <option value="inline-table">Inline-Table</option>
          <option value="table-cell">Table-Cell</option>
          <option value="table-row">Table-Row</option>
        </select>
      </div>
      <div
        className="addContainerControls"
        style={{
          display:
            componentProperties[activeComponentIndex].style.display &&
            componentProperties[activeComponentIndex].style.display === "flex"
              ? "flex"
              : "none",
        }}
      >
        <label htmlFor="flexDirection">Flex-Direction:</label>
        <select
          style={{ marginLeft: "5px", marginRight: "10px" }}
          id="flexDirection"
          name="flexDirection"
          value={componentProperties[activeComponentIndex].style.flexDirection}
          onChange={(e) =>
            dispatch(updateComponent({ flexDirection: e.target.value }))
          }
        >
          <option value="row">Row</option>
          <option value="column">Column</option>
        </select>
      </div>
      <div className="controlRows">
        <BoxProperties
          name="Margin"
          top="marginTop"
          left="marginLeft"
          right="marginRight"
          bottom="marginBottom"
        />
      </div>
      <div className="controlRows">
        <BoxProperties
          name="Padding"
          top="paddingTop"
          left="paddingLeft"
          right="paddingRight"
          bottom="paddingBottom"
        />
      </div>
      <div className="addContainerControls">
        <BoxProperties
          name="Position"
          top="top"
          left="teft"
          right="right"
          bottom="bottom"
        />
      </div>

      <div className="controlRows">
        <div className="controlColumns">
          <div className="fieldLabelCont">
            <label htmlFor="width">Width:</label>
            <input
              type="text"
              id="width"
              name="width"
              className="controlFields"
              value={componentProperties[activeComponentIndex].style.width}
              onChange={(e) =>
                dispatch(updateComponent({ width: e.target.value }))
              }
            ></input>
          </div>
        </div>
      </div>
      <div className="addContainerControls">
        <div className="controlColumns">
          <div className="fieldLabelCont">
            <label htmlFor="Height">Height:</label>
            <input
              type="text"
              id="Height"
              name="Height"
              className="controlFields"
              value={componentProperties[activeComponentIndex].style.height}
              onChange={(e) =>
                dispatch(updateComponent({ height: e.target.value }))
              }
            ></input>
          </div>
        </div>
      </div>

      <div className="controlRows">
        <ColorSelect
          label="Text Color"
          property="color"
          index={activeComponentIndex}
        />
      </div>
      <div className="controlRows">
        <ColorSelect
          label="Background Color"
          property="backgroundColor"
          index={activeComponentIndex}
        />
      </div>
      <div className="controlRows">
        <button onClick={() => dispatch(deleteComponent())}>
          Delete Component
        </button>
      </div>
    </div>
  );
}
