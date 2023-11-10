/** @format */
import { useSelector, useDispatch } from "react-redux";
import { updateComponent } from "../redux/sectionSlice";

export default function BoxProperties({ name, top, left, right, bottom }) {
  const activeComponent = useSelector((state) => state.section.activeComponent);
  const componentProperties = useSelector((state) => state.section.properties);

  const activeComponentIndex = componentProperties.findIndex(
    (p) => p.id === activeComponent
  );

  let activeStyle = {};

  if (activeComponentIndex !== -1) {
    activeStyle = componentProperties[activeComponentIndex].style;
  } else {
    activeStyle = componentProperties[0].style;
  }

  const dispatch = useDispatch();

  return (
    <div className="controlColumns">
      <span>{name}</span>
      <div className="marginControlRows">
        <input
          className="controlFields"
          type="text"
          placeholder="Top"
          value={activeStyle[top]}
          onChange={(e) => dispatch(updateComponent({ [top]: e.target.value }))}
        ></input>
      </div>
      <div className="marginControlRows">
        <input
          className="controlFields"
          type="text"
          placeholder="Left"
          value={activeStyle[left]}
          onChange={(e) =>
            dispatch(updateComponent({ [left]: e.target.value }))
          }
        ></input>
        <input
          className="controlFields"
          type="text"
          placeholder="Right"
          value={activeStyle[right]}
          onChange={(e) =>
            dispatch(updateComponent({ [right]: e.target.value }))
          }
        ></input>
      </div>
      <div className="marginControlRows">
        <input
          className="controlFields"
          type="text"
          placeholder="Bottom"
          value={activeStyle[bottom]}
          onChange={(e) =>
            dispatch(updateComponent({ [bottom]: e.target.value }))
          }
        ></input>
      </div>
    </div>
  );
}
