/** @format */
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateComponent,
  addSectionToActive,
  addButtonToActive,
  changeButtonName,
  setActiveComponent,
} from "../redux/sectionSlice";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

export default function Controls() {
  const [activeStyle, setActiveStyle] = useState({});
  const [activeComponentType, setActiveComponentType] = useState("section");
  const [componentType, setComponentType] = useState("Section");
  const [buttonName, setButtonName] = useState("Button");
  const [keyPressed, setKeyPressed] = useState("");
  const [mouseCoord, setMouseCoord] = useState([0, 0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [controlsCoord, setControlsCoord] = useState({
    right: "20px",
    bottom: "20px",
  });

  const componentProperties = useSelector((state) => state.section.properties);
  const activeComponent = useSelector((state) => state.section.activeComponent);

  const dispatch = useDispatch();

  useEffect(() => {
    if (componentProperties.length === 2) {
      dispatch(setActiveComponent(componentProperties[1].id));
    }

    if (activeComponent !== 0) {
      const sectionIndex = componentProperties.findIndex(
        (s) => s.id === activeComponent
      );

      if (sectionIndex !== -1) {
        setActiveStyle(componentProperties[sectionIndex].style);
        setActiveComponentType(componentProperties[sectionIndex].type);
        if (componentProperties[sectionIndex].type === "button")
          setButtonName(componentProperties[sectionIndex].name);
      } else {
        setActiveStyle(componentProperties[0].style);
      }
    }
  }, [activeComponent]);

  useState(() => {
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

    const handleMouseRelease = (event) => {
      setMouseDown(false);
    };

    window.addEventListener("keydown", (e) => handleKeyDown(e));
    window.addEventListener("keyup", handleKeyRelease);
    window.addEventListener("mousedown", (e) => handleMouseDown(e));
    window.addEventListener("mouseup", (e) => handleMouseRelease(e));

    return () => {
      window.removeEventListener("keydown", (e) => handleKeyDown(e));
      window.removeEventListener("keyup", handleKeyRelease);
      window.removeEventListener("mousedown", (e) => handleMouseDown(e));
      window.removeEventListener("mouseup", (e) => handleMouseRelease(e));
    };
  }, []);

  useEffect(() => {
    if (keyPressed === "Shift" && mouseDown) {
      setControlsCoord({
        left: `${mouseCoord[0]}px`,
        top: `${mouseCoord[1]}px`,
      });
    }
  }, [mouseCoord]);

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
        setButtonName(newButton.name);
      }
    }
  };

  const handleDispatchUpdate = () => {
    let buffer = {};

    //removing any properties containing an empty string.
    for (const key in activeStyle) {
      if (activeStyle[key] !== "")
        buffer = { ...buffer, [key]: activeStyle[key] };
    }

    if (activeComponentType === "button")
      dispatch(changeButtonName(buttonName));
    dispatch(updateComponent(buffer));
  };

  return (
    <div className="controlsCont" style={controlsCoord}>
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
        <span
          className="notice"
          style={{
            display: activeComponentType === "button" ? "flex" : "none",
          }}
        >
          Can't add a component to a button
        </span>
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
          value={buttonName}
          onChange={(e) => setButtonName(e.target.value)}
        ></input>
      </div>

      <div className="addContainerControls">
        <label htmlFor="position">Position:</label>
        <select
          style={{ marginLeft: "5px", marginRight: "10px" }}
          id="position"
          name="position"
          value={activeStyle.position}
          onChange={(e) =>
            setActiveStyle({ ...activeStyle, position: e.target.value })
          }
        >
          <option value="relative">Relative</option>
          <option value="absolute">Absolute</option>
          <option value="static">Static</option>
          <option value="fixed">Fixed</option>
          <option value="sticky">Sticky</option>
        </select>

        <label htmlFor="display">Display:</label>
        <select
          style={{ marginLeft: "5px", marginRight: "10px" }}
          id="display"
          name="display"
          value={activeStyle.display}
          onChange={(e) =>
            setActiveStyle({ ...activeStyle, display: e.target.value })
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
            activeStyle.display && activeStyle.display === "flex"
              ? "flex"
              : "none",
        }}
      >
        <label htmlFor="flexDirection">Flex-Direction:</label>
        <select
          style={{ marginLeft: "5px", marginRight: "10px" }}
          id="flexDirection"
          name="flexDirection"
          value={activeStyle.flexDirection}
          onChange={(e) =>
            setActiveStyle({ ...activeStyle, flexDirection: e.target.value })
          }
        >
          <option value="row">Row</option>
          <option value="column">Column</option>
        </select>
      </div>
      <div className="controlRows">
        <div className="controlColumns">
          <span>Margin</span>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
              placeholder="Top"
              value={activeStyle.marginTop}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, marginTop: e.target.value })
              }
            ></input>
          </div>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
              placeholder="Left"
              value={activeStyle.marginLeft}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, marginLeft: e.target.value })
              }
            ></input>
            <input
              className="controlFields"
              type="text"
              placeholder="Right"
              value={activeStyle.marginRight}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, marginRight: e.target.value })
              }
            ></input>
          </div>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
              placeholder="Bottom"
              value={activeStyle.marginBottom}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, marginBottom: e.target.value })
              }
            ></input>
          </div>
        </div>
        <div className="controlColumns">
          <span>Padding</span>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
              placeholder="Top"
              value={activeStyle.paddingTop}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, paddingTop: e.target.value })
              }
            ></input>
          </div>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
              placeholder="Left"
              value={activeStyle.paddingLeft}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, paddingLeft: e.target.value })
              }
            ></input>
            <input
              className="controlFields"
              type="text"
              placeholder="Right"
              value={activeStyle.paddingRight}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, paddingRight: e.target.value })
              }
            ></input>
          </div>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
              placeholder="Bottom"
              value={activeStyle.paddingBottom}
              onChange={(e) =>
                setActiveStyle({
                  ...activeStyle,
                  paddingBottom: e.target.value,
                })
              }
            ></input>
          </div>
        </div>

        <div className="controlColumns">
          <span>Position</span>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
              placeholder="Top"
              value={activeStyle.top}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, top: e.target.value })
              }
            ></input>
          </div>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
              placeholder="Left"
              value={activeStyle.left}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, left: e.target.value })
              }
            ></input>
            <input
              className="controlFields"
              type="text"
              placeholder="Right"
              value={activeStyle.right}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, right: e.target.value })
              }
            ></input>
          </div>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
              placeholder="Bottom"
              value={activeStyle.bottom}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, bottom: e.target.value })
              }
            ></input>
          </div>
        </div>
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
              value={activeStyle.width}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, width: e.target.value })
              }
            ></input>
          </div>
        </div>

        <div className="controlColumns">
          <div className="fieldLabelCont">
            <label htmlFor="Height">Height:</label>
            <input
              type="text"
              id="Height"
              name="Height"
              className="controlFields"
              value={activeStyle.height}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, height: e.target.value })
              }
            ></input>
          </div>
        </div>
      </div>

      <div className="controlRows">
        <label htmlFor="textColor">Text Color:</label>
        <input
          type="text"
          id="textColor"
          name="textColor"
          style={{ color: activeStyle.color }}
          className="hexColorFields"
          value={activeStyle.color}
          onChange={(e) =>
            setActiveStyle({ ...activeStyle, color: e.target.value })
          }
        ></input>

        <label htmlFor="textColor">Background Color:</label>
        <input
          type="text"
          id="textColor"
          name="textColor"
          className="hexColorFields"
          style={{ backgroundColor: activeStyle.backgroundColor }}
          value={activeStyle.backgroundColor}
          onChange={(e) =>
            setActiveStyle({ ...activeStyle, backgroundColor: e.target.value })
          }
        ></input>
      </div>
      <div className="submitControlRow">
        <button onClick={() => handleDispatchUpdate()}>Apply</button>
      </div>
    </div>
  );
}
