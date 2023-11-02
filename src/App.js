/** @format */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Controls from "./components/Controls";
import Container from "./components/Container";
import Button from "./components/Button";

function App() {
  const [showInstructions, setShowInstructions] = useState(false);
  const sectionProperties = useSelector((state) => state.section.properties);

  const initialStyle = {
    position: "relative",
    display: "flex",
    borderStyle: "solid",
    borderWidth: 1,
    height: "600px",
    marginLeft: "50px",
    marginRight: "50px",
    marginTop: "50px",
    paddingLeft: "0",
    paddingRight: "0",
    paddingTop: "0",
    paddingBottom: "0",
    color: "#000000",
    backgroundColor: "#FFFFFF",
  };

  const nestingComponents = (parentId) => {
    const sectionIndex = sectionProperties.findIndex((s) => s.id === parentId);

    const nestedSections = (index) => {
      if (index !== -1 && sectionProperties[index]) {
        const childContainers = sectionProperties[index].children.map(
          (childSectionId, i) => {
            return (
              <Container key={i} id={childSectionId}>
                {/*call nestedComponents inside it's self to allow infinate components to be created inside one another */}
                {(id) => nestingComponents(id)}
              </Container>
            );
          }
        );
        const childButtons = sectionProperties[index].buttons.map(
          (childSectionId, i) => {
            const buttonIndex = sectionProperties.findIndex(
              (b) => b.id === childSectionId
            );

            return (
              <Button key={i} id={childSectionId}>
                {sectionProperties[buttonIndex].name}
              </Button>
            );
          }
        );

        return [childContainers, childButtons];
      }
    };

    return nestedSections(sectionIndex);
  };

  return (
    <>
      <div className="header">
        <h1 className="headerText">Oliver POS Work-Sample Test</h1>
        <h3 className="headerText">Sheldon Tower</h3>
        <h3
          className="linkText"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          Instructions
        </h3>
      </div>
      <div
        className="instructions"
        style={{ display: showInstructions ? "block" : "none" }}
      >
        <div className="header">
          <h2>Instructions</h2>
        </div>
        <ul>
          <li>
            The large container below is the root container. You can add an item
            to the root by from the <i>Add Component</i> drop down menu in the
            controls, and clicking <i>add</i>.
          </li>
          <li>Add as many buttons or containers to the root as you want.</li>
          <li>
            Click on any section inside root to select it. You can then add
            sections or buttons to it, or change it's CSS attributes from the
            controls.
          </li>
          <li>
            When entering CSS Attributes, don't forget to include units.
            Keywords like <i>auto</i> are also accepted.
          </li>
          <li>
            Shift-click anywhere on the screen to move the controls if they're
            in the way.
          </li>
        </ul>
        <h3
          className="linkText"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          [close]
        </h3>
      </div>
      <Container initialStyle={initialStyle}>
        {(parentId) => nestingComponents(parentId)}
      </Container>
      <Controls />
    </>
  );
}

export default App;
