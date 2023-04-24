import { useState } from "react";
import { AppContext } from "./context/AppContext";
import { Outlet } from "react-router-dom";
import { GlobalStyle, Wrapper } from "./styled/style";

function App() {
  const [totalRound, setTotalRound] = useState("16");
  const [gender, setGender] = useState("male");
  const [nickname, setNickname] = useState("그대");

  const isTouchScreen = () => {
    if ("ontouchstart" in document.documentElement) {
      return true;
    } else {
      return false;
    }
  };

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
          isTouchScreen,
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
