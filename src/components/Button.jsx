/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewContainer, setActiveContainer } from "../redux/sectionSlice";
import { v4 as uuidv4 } from "uuid";

export default function Button({ id, children }) {
  const [stateId, setStateId] = useState(0);
  const buttonProperties = useSelector((state) => state.section.properties);
  const activeButton = useSelector((state) => state.section.activeContainer);

  const dispatch = useDispatch();

  useEffect(() => {
    let uniqueId = 0;
    let newButtonState = {};

    if (id) {
      uniqueId = id;
    } else {
      uniqueId = uuidv4();

      newButtonState = {
        id: uniqueId,
        name: "Button",
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

      dispatch(addNewContainer(newButtonState));
    }

    setStateId(uniqueId);
  }, []);

  const stateIndex = buttonProperties.findIndex((b) => b.id === stateId);

  const buttonStyle = buttonProperties[stateIndex].style;

  const handleControls = (e) => {
    dispatch(setActiveContainer(e.target.id));
  };

  return (
    <button id={stateId} style={buttonStyle} onClick={(e) => handleControls(e)}>
      {children}
    </button>
  );
}
