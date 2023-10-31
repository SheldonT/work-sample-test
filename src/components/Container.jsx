/** @format */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewContainer, setActiveContainer } from "../redux/styleSlice";
import { v4 as uuidv4 } from "uuid";

export default function Container({ id, initialStyle }) {
  const [stateId, setStateId] = useState(0);

  const style = useSelector((state) => state.section.properties);
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
      newContainerState = { id: uniqueId, style: initialStyle, children: [] };
      dispatch(addNewContainer(newContainerState));
    }

    if (!id && !initialStyle) {
      newContainerState = {
        id: uniqueId,
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

      dispatch(addNewContainer(newContainerState));
    }

    setStateId(uniqueId);
  }, []);

  const stateIndex = style.findIndex((s) => s.id === stateId);

  const boxStyle = style[stateIndex].style;

  const handleControls = (e) => {
    if (e.target.id === activeContainer) {
      dispatch(setActiveContainer(0));
    } else {
      dispatch(setActiveContainer(e.target.id));
    }
  };

  return (
    <div id={stateId} style={boxStyle} onClick={(e) => handleControls(e)}>
      {style[stateIndex].children.map((child, i) => {
        return <Container key={i} id={child} />;
      })}
    </div>
  );
}
