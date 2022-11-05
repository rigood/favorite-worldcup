import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Game from "./pages/Game";

const GlobalStyle = createGlobalStyle`
${reset}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Pretendard';
  color: #212529;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Game />
    </>
  );
}

export default App;
