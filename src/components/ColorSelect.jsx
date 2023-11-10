/** @format */
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateComponent } from "../redux/sectionSlice";
import { HexColorPicker } from "react-colorful";

export default function ColorSelect({ label, property, index }) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const colorPickerRef = useRef(null);
  const textFieldRef = useRef(null);
  const componentProperties = useSelector((state) => state.section.properties);
  const activeComponentColor = componentProperties[index].style[property];

  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        colorPickerRef.current &&
        textFieldRef.current &&
        !colorPickerRef.current.contains(event.target) &&
        !textFieldRef.current.contains(event.target)
      ) {
        setIsPickerVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleTextFieldClick = () => {
    setIsPickerVisible(true);
  };

  const handleColorSelect = (value) => {
    dispatch(updateComponent({ [property]: value }));
  };

  return (
    <>
      <label htmlFor="hexColor">{label}:</label>
      <div className="hexColorFields">
        {isPickerVisible && (
          <div className="colorPicker" ref={colorPickerRef}>
            <HexColorPicker
              color={activeComponentColor}
              onChange={handleColorSelect}
            />
          </div>
        )}
        <input
          ref={textFieldRef}
          type="text"
          id="hexColor"
          name="hexColor"
          style={{ [property]: activeComponentColor }}
          className="hexColorFields"
          value={activeComponentColor}
          onChange={(e) => handleColorSelect(e.target.value)}
          onClick={handleTextFieldClick}
        ></input>
      </div>
    </>
  );
}
