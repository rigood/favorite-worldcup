import { useState } from "react";
import { AppContext } from "./context/AppContext";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle, Wrapper } from "./styled/style";
import Analytics from "./Analytics";

function App() {
  const [totalRound, setTotalRound] = useState("16");
  const [gender, setGender] = useState("male");
  const [nickname, setNickname] = useState("그대");

  function checkTouchScreen() {
    if ("ontouchstart" in document.documentElement) {
      return true;
    } else {
      return false;
    }
  }

  function checkSafariBrowser() {
    let userAgentString = navigator.userAgent;

    let chromeAgent = userAgentString.indexOf("Chrome") > -1;

    let safariAgent = userAgentString.indexOf("Safari") > -1;

    if (chromeAgent && safariAgent) {
      safariAgent = false;
    }

    return safariAgent;
  }

  const isTouchScreen = checkTouchScreen();
  const isSafariBrowser = checkSafariBrowser();

  return (
    <>
      <Analytics />
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
          isSafariBrowser,
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
