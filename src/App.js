import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { useState } from "react";
import { AppContext } from "./context/AppContext";
import { Outlet } from "react-router-dom";
import { Wrapper } from "./styled/style";

const GlobalStyle = createGlobalStyle`
${reset}
:root{
  --primary: #ff3e51;
}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Pretendard';
  color: #212529;
}
li{
  list-style: none;
}
button{
  all: unset;
}
`;

function App() {
  const [totalRound, setTotalRound] = useState("16");
  const [gender, setGender] = useState("male");
  const [nickname, setNickname] = useState("그대");
  return (
    <>
      <GlobalStyle />
      <AppContext.Provider
        value={{
          totalRound,
          setTotalRound,
          gender,
          setGender,
          nickname,
          setNickname,
        }}
      >
        <Wrapper>
          <Outlet />
        </Wrapper>
      </AppContext.Provider>
    </>
  );
}

export default App;
