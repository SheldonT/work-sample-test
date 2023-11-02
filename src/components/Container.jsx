/** @format */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewComponent, setActiveComponent } from "../redux/sectionSlice";
import { v4 as uuidv4 } from "uuid";

export default function Container({ id, initialStyle, children }) {
  const [stateId, setStateId] = useState(0);

  const sectionProperties = useSelector((state) => state.section.properties);

  const dispatch = useDispatch();

  useState(() => {
    let uniqueId = 0;
    let newContainerState = {};

    if (id) {
      uniqueId = id;
    } else {
      uniqueId = uuidv4();
    }

    if (initialStyle) {
      newContainerState = {
        id: uniqueId,
        type: "section",
        style: initialStyle,
        children: [],
        buttons: [],
      };
      dispatch(addNewComponent(newContainerState));
    }

    if (!id && !initialStyle) {
      newContainerState = {
        id: uniqueId,
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

      dispatch(addNewComponent(newContainerState));
    }
    setStateId(uniqueId);
  }, []);

  const stateIndex = sectionProperties.findIndex((s) => s.id === stateId);

  const boxStyle = sectionProperties[stateIndex].style;

  const handleControls = (e) => {
    dispatch(setActiveComponent(e.target.id));
  };

  return (
    <div id={stateId} style={boxStyle} onClick={(e) => handleControls(e)}>
      {typeof children === "function" ? children(stateId) : children}
    </div>
  );
}
