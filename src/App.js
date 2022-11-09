import { useState } from "react";
import { AppContext } from "./context/AppContext";
import { Outlet } from "react-router-dom";
import { GlobalStyle, Wrapper } from "./styled/style";

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
