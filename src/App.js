/** @format */

import Controls from "./components/Controls";
import Container from "./components/Container";
import { useSelector, useDispatch } from "react-redux";

function App() {
  return (
    <>
      <Container />
      <Container />
      <Controls />
    </>
  );
}

export default App;
