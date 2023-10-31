/** @format */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateContainer } from "../redux/styleSlice";
import "../App.css";

export default function Controls() {
  const [activeStyle, setActiveStyle] = useState({});
  const style = useSelector((state) => state.style);
  const dispatch = useDispatch();

  useEffect(() => {
    if (style.activeContainer !== 0) {
      const styleIndex = style.style.findIndex(
        (s) => s.id === style.activeContainer
      );

      if (styleIndex !== -1) {
        setActiveStyle(style.style[styleIndex]);
      } else {
        setActiveStyle(style.style[0]);
      }
    }
  }, [style.activeContainer]);

  console.log(style.style);

  return (
    <div
      className="controlsCont"
      style={{ display: style.activeContainer !== 0 ? "flex" : "none" }}
    >
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
        <button onClick={() => dispatch(updateContainer(activeStyle))}>
          Apply
        </button>
      </div>
    </div>
  );
}
