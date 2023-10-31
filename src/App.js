/** @format */

import Controls from "./components/Controls";
import Container from "./components/Container";

function App() {
  const initialStyle = {
    borderStyle: "solid",
    borderWidth: 1,
    height: "600px",
    width: "1000px",
    marginLeft: "50px",
    marginRight: "50px",
    marginTop: "50px",
    marginBottom: "50px",
    paddingLeft: "0",
    paddingRight: "0",
    paddingTop: "0",
    paddingBottom: "0",
    color: "#000000",
    backgroundColor: "#FFFFFF",
  };

  return (
    <>
      <Container initialStyle={initialStyle} />
      <Controls />
    </>
  );
}

export default App;
