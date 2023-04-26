import { useState } from "react";
import { AppContext } from "./context/AppContext";
import { Outlet } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle, Wrapper, MC } from "./styled/style";
import Analytics from "./Analytics";

function App() {
  const [totalRound, setTotalRound] = useState("16");
  const [gender, setGender] = useState("female");
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
          <MC src={process.env.PUBLIC_URL + "/assets/img/MC.png"} />
        </Wrapper>
        <ToastContainer
          toastStyle={{
            backgroundColor: "#444444",
            fontFamily: "pretendard",
            fontSize: "1.8rem",
            color: "#ffffff",
            textAlign: "center",
          }}
          position="bottom-center"
          limit={1}
          closeButton={false}
          autoClose={100}
          transition={Flip}
          hideProgressBar
        />
      </AppContext.Provider>
    </>
  );
}

export default App;
