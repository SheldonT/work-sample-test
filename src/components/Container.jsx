/** @format */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewContainer, setActiveContainer } from "../redux/styleSlice";
import { v4 as uuidv4 } from "uuid";

export default function Container({ id }) {
  const [stateId, setStateId] = useState(0);

  const style = useSelector((state) => state.style);

  const dispatch = useDispatch();

  useState(() => {
    let uniqueId = 0;

    if (id) {
      uniqueId = id;
    } else {
      uniqueId = uuidv4();
    }

    const newContainerState = {
      id: uniqueId,
      borderStyle: "solid",
      borderWidth: 1,
      height: 100,
      width: 100,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      color: "#000000",
      backgroundColor: "#FFFFFF",
    };

    dispatch(addNewContainer(newContainerState));

    setStateId(uniqueId);
  }, []);

  const stateIndex = style.style.findIndex((s) => s.id === stateId);

  const boxStyle = {
    borderStyle: "solid",
    borderWidth: `${style.style[stateIndex].borderWidth}px`,
    height: `${style.style[stateIndex].height}px`,
    width: `${style.style[stateIndex].width}px`,
    marginLeft: `${style.style[stateIndex].marginLeft}px`,
    marginRight: `${style.style[stateIndex].marginRight}px`,
    marginTop: `${style.style[stateIndex].marginTop}px`,
    marginBottom: `${style.style[stateIndex].marginBottom}px`,
    paddingLeft: `${style.style[stateIndex].paddingLeft}px`,
    paddingRight: `${style.style[stateIndex].paddingRight}px`,
    paddingTop: `${style.style[stateIndex].paddingTop}px`,
    paddingBottom: `${style.style[stateIndex].paddingBottom}px`,
    color: style.style[stateIndex].color,
    backgroundColor: style.style[stateIndex].backgroundColor,
  };

  const handleControls = () => {
    if (style.activeContainer !== stateId) {
      dispatch(setActiveContainer(stateId));
    } else {
      dispatch(setActiveContainer(0));
    }
  };

  return <div style={boxStyle} onClick={() => handleControls()}></div>;
}
