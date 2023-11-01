/** @format */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewContainer, setActiveContainer } from "../redux/sectionSlice";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";

export default function Container({ id, initialStyle, children }) {
  const [stateId, setStateId] = useState(0);

  const sectionProperties = useSelector((state) => state.section.properties);
  const activeContainer = useSelector((state) => state.section.activeContainer);

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
      dispatch(addNewContainer(newContainerState));
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

      dispatch(addNewContainer(newContainerState));
    }

    setStateId(uniqueId);
  }, []);

  const stateIndex = sectionProperties.findIndex((s) => s.id === stateId);

  const boxStyle = sectionProperties[stateIndex].style;

  const handleControls = (e) => {
    if (e.target.id === activeContainer) {
      dispatch(setActiveContainer(0));
    } else {
      dispatch(setActiveContainer(e.target.id));
    }
  };

  return (
    <div id={stateId} style={boxStyle} onClick={(e) => handleControls(e)}>
      {children}
      {sectionProperties[stateIndex].children.map((child, i) => {
        return <Container key={i} id={child} />;
      })}

      {sectionProperties[stateIndex].buttons.map((button, i) => {
        return <Button key={i} id={button} />;
      })}
    </div>
  );
}
