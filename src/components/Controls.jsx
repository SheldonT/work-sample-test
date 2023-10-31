/** @format */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateContainer, addSectionToActive } from "../redux/styleSlice";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

export default function Controls() {
  const [activeStyle, setActiveStyle] = useState({});
  const [componentType, setComponentType] = useState("Section");
  const style = useSelector((state) => state.section.properties);
  const activeContainer = useSelector((state) => state.section.activeContainer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeContainer !== 0) {
      const styleIndex = style.findIndex((s) => s.id === activeContainer);

      if (styleIndex !== -1) {
        setActiveStyle(style[styleIndex].style);
      } else {
        setActiveStyle(style[0].style);
      }
    }
  }, [activeContainer]);

  const handleAddComponent = () => {
    if (componentType === "Section") {
      const newContainer = {
        id: uuidv4(),
        style: {
          position: "relative",
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
      };

      dispatch(addSectionToActive(newContainer));
    }
  };

  const handleDispatchUpdate = () => {
    let buffer = {};
    //removing any properties containing an empty string.
    for (const key in activeStyle) {
      if (activeStyle[key] !== "")
        buffer = { ...buffer, [key]: activeStyle[key] };
    }
    dispatch(updateContainer(buffer));
  };

  return (
    <div
      className="controlsCont"
      style={{ display: activeContainer !== 0 ? "flex" : "none" }}
    >
      <div className="addContainerControls">
        <label htmlFor="componentType">Add Component:</label>
        <select
          style={{ marginLeft: "5px", marginRight: "10px" }}
          id="componentType"
          name="componentType"
          value={componentType}
          onChange={(e) => setComponentType(e.target.value)}
        >
          <option value="Section">Section</option>
          <option value="Button">Button</option>
        </select>
        <button onClick={() => handleAddComponent()}>Add</button>
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
      </div>

      <div className="controlRows">
        <div className="controlColumns">
          <span>Margin</span>
          <div className="marginControlRows">
            <input
              className="controlFields"
              type="text"
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
              value={activeStyle.marginLeft}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, marginLeft: e.target.value })
              }
            ></input>
            <input
              className="controlFields"
              type="text"
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
              value={activeStyle.paddingLeft}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, paddingLeft: e.target.value })
              }
            ></input>
            <input
              className="controlFields"
              type="text"
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
              value={activeStyle.left}
              onChange={(e) =>
                setActiveStyle({ ...activeStyle, left: e.target.value })
              }
            ></input>
            <input
              className="controlFields"
              type="text"
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
          className="hexColorFields"
          value={activeStyle.color}
          onChange={(e) =>
            setActiveStyle({ ...activeStyle, color: e.target.value })
          }
        ></input>
        <div
          style={{
            height: "25px",
            width: "25px",
            borderStyle: "solid",
            borderWidth: "1px",
            backgroundColor: activeStyle.color,
          }}
        ></div>
      </div>

      <div className="controlRows">
        <label htmlFor="textColor">Background Color:</label>
        <input
          type="text"
          id="textColor"
          name="textColor"
          className="hexColorFields"
          value={activeStyle.backgroundColor}
          onChange={(e) =>
            setActiveStyle({ ...activeStyle, backgroundColor: e.target.value })
          }
        ></input>
        <div
          style={{
            height: "25px",
            width: "25px",
            borderStyle: "solid",
            borderWidth: "1px",
            backgroundColor: activeStyle.backgroundColor,
          }}
        ></div>
      </div>
      <div className="submitControlRow">
        <button onClick={() => handleDispatchUpdate()}>Apply</button>
      </div>
    </div>
  );
}
