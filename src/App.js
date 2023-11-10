/** @format */
import { useState, useRef } from "react";
import { useSelector } from "react-redux";

import Controls from "./components/Controls";
import Container from "./components/Container";
import Button from "./components/Button";

function App() {
  const [showInstructions, setShowInstructions] = useState(false);

  const productionAreaRef = useRef(null);
  const componentProperties = useSelector((state) => state.section.properties);

  const initialStyle = {
    position: "relative",
    display: "flex",
    borderStyle: "solid",
    borderWidth: "1px",
    height: "100%",
    wdith: "100%",
    marginTop: "0",
    paddingLeft: "0",
    paddingRight: "0",
    paddingTop: "0",
    paddingBottom: "0",
    color: "#000000",
    backgroundColor: "#FFFFFF",
  };

  const nestingComponents = (parentId) => {
    const sectionIndex = componentProperties.findIndex(
      (s) => s.id === parentId
    );

    const nestedSections = (index) => {
      if (index !== -1 && componentProperties[index]) {
        const childContainers = componentProperties[index].children.map(
          (childSectionId, i) => {
            return (
              <Container key={i} id={childSectionId}>
                {/*call nestedComponents inside it's self to allow infinate components to be created inside one another */}
                {(id) => nestingComponents(id)}
              </Container>
            );
          }
        );
        const childButtons = componentProperties[index].buttons.map(
          (childSectionId, i) => {
            const buttonIndex = componentProperties.findIndex(
              (b) => b.id === childSectionId
            );

            return (
              <Button key={i} id={childSectionId}>
                {componentProperties[buttonIndex].name}
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
      {showInstructions && (
        <div
          className="instructions"
          //style={{ display: showInstructions ? "block" : "none" }}
        >
          <div className="header">
            <h2>Instructions</h2>
          </div>
          <ul>
            <li>
              The section to the right is the production area, and the controls
              are to the left. The production area contains a root container by
              default, which cannot be removed. Click anywhere on this container
              to select it.
            </li>
            <li>
              Select either a button or a section in the controls and click{" "}
              <i>Add</i> to add that item to the root container. Add as many
              buttons or containers to the root as you want.
            </li>
            <li>
              Click on any section inside root to select it. You can then use
              the controls to change that item's CSS properties. The properties
              will change as they're entered. Don't forget to include units for
              numerical values, where applicable.
            </li>
            <li>
              You can delete any component (except root) by selecting it and
              clicking the <i>delete component</i> button.
            </li>

            <li>
              Project code is hosted at{" "}
              <a
                href="https://github.com/SheldonT/work-sample-test"
                target="_blank"
              >
                https://github.com/SheldonT/work-sample-test
              </a>
            </li>
          </ul>
          <h3
            className="linkText"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            [close]
          </h3>
        </div>
      )}
      <div className="main">
        <Controls productionAreaRef={productionAreaRef} />
        <div ref={productionAreaRef} className="productionArea">
          <Container initialStyle={initialStyle}>
            {(parentId) => nestingComponents(parentId)}
          </Container>
        </div>
      </div>
    </>
  );
}

export default App;
