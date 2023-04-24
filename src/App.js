import { useState } from "react";
import { AppContext } from "./context/AppContext";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <ToastContainer
          toastStyle={{
            backgroundColor: "#ff3e51",
            color: "#ffffff",
            textAlign: "center",
          }}
          position="bottom-center"
          limit={1}
          closeButton={false}
          autoClose={1000}
          hideProgressBar
        />
      </AppContext.Provider>
    </>
  );
}

export default App;
