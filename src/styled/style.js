import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GmarketWoff2 from "../fonts/GmarketSansBold.woff2";
import GmarketWoff from "../fonts/GmarketSansBold.woff";
import PretendardWoff2 from "../fonts/Pretendard-Regular.woff2";
import PretendardWoff from "../fonts/Pretendard-Regular.woff";

export const GlobalStyle = createGlobalStyle`

${reset}

:root{
  --primary: #ff3e51;
  --black: #212529;
  --gray: #9e9e9e;
  --progressBarBg: #EDF2F7;
}

@font-face {
  font-family: "gmarket";
  src: url(${GmarketWoff2}) format("woff2"),
  url(${GmarketWoff}) format("woff");
}

@font-face {
  font-family: "pretendard";
  src: url(${PretendardWoff2}) format("woff2"),
  url(${PretendardWoff}) format("woff");
}

*{
  box-sizing: border-box;
}

html{
  font-size: 62.5%;
}

@media screen and (max-width: 400px){
  html{
    font-size: 50%;
  }
}

body{
  color: var(--black);
  background: linear-gradient(#FB7B72 5%, #FFB0A3, #FB7B72);
  font-family: "pretendard";
  line-height: 1.3;
}

li{
  list-style: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: #000;
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  box-shadow: 0 0 0px 1000px #fff inset;
  transition: background-color 5000s ease-in-out 0s;
}

input:autofill,
input:autofill:hover,
input:autofill:focus,
input:autofill:active {
  -webkit-text-fill-color: #000;
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  box-shadow: 0 0 0px 1000px #fff inset;
  transition: background-color 5000s ease-in-out 0s;
}
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 4rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

export const MC = styled.img`
  position: absolute;
  bottom: 0;
  right: 50px;

  @media screen and (max-width: 1508px) {
    display: none;
  }
`;

export const TitleWrapper = styled.div`
  font-family: "gmarket";
  color: var(--primary);
  text-align: center;
  margin-bottom: 3rem;
  h2 {
    font-size: 3rem;
  }
  h1 {
    font-size: 4rem;
    font-weight: bold;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  fieldset {
    width: 100%;
    legend {
      font-size: 2.4rem;
      font-weight: bold;
      margin-bottom: 2rem;
      span.asterisk {
        margin-left: 0.5rem;
        color: var(--primary);
      }
    }
    input[type="text"] {
      width: 100%;
      padding: 1rem 0;
      margin: -1rem 0 -1rem;
      border: none;
      outline: none;
      border-bottom: 1px solid lightgray;
      font-size: 1.8rem;
    }
  }
`;

export const Notice = styled.p`
  margin-top: 4rem;
  font-size: 1.4rem;
  color: var(--gray);
  text-align: center;
  word-break: break-all;
  white-space: pre-wrap;
`;

export const Feedback = styled.a`
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
  font-size: 1.2rem;
  color: var(--gray);
`;

export const ProgressText = styled.h3`
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;
`;

export const ProgressBarBg = styled.div`
  width: 100%;
  height: 5px;
  background-color: var(--progressBarBg);
  margin: 2.5rem 0 5rem 0;
  position: relative;
`;

export const ProgressBar = styled.div`
  width: ${(props) => props.ratio + "%"};
  height: 100%;
  background-color: var(--primary);
  transition: width 0.5s ease;
`;

export const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 3rem;
  position: relative;
`;

export const Vs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  font-size: 3.2rem;
  font-style: italic;
  font-weight: bold;
  color: var(--primary);
  text-shadow: -3px 0 white, 0 3px white, 3px 0 white, 0 -3px white;
`;

export const Member = styled.div`
  flex: 1;
  cursor: pointer;
`;

export const MemberImage = styled.div`
  margin-bottom: 2rem;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border: 1px solid lightgray;
    transition: all 0.5s;
  }
  img:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

export const MemberText = styled.p`
  font-size: 2.4rem;
  text-align: center;
`;

export const SaveImg = styled.div`
  padding: 1rem;
`;

export const WinnerImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  margin: -1.5rem 0 2.5rem;

  border-radius: 3rem;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;

  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    top: 1.6rem;
    left: 1rem;
    width: 8rem;
    height: 8rem;
    user-select: none;
  }
`;

export const WinnerLoading = styled.div`
  font-size: 2rem;
  text-align: center;
  span {
    margin-left: 1rem;
  }
`;

export const WinnerText = styled.div`
  font-weight: bold;
  text-align: center;

  div:first-child {
    font-size: 2.4rem;
  }
  div:last-child {
    font-size: 3.9rem;
    span {
      margin: 0 1rem;
    }
  }
`;

export const WinnerHeart = styled(FontAwesomeIcon)`
  color: var(--primary);
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin: 2.5rem 0 1rem;
`;

export const Button = styled.button`
  flex: 1;

  width: 100%;
  padding: 1.5rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;
  border-radius: 0.5rem;
  background-color: var(--primary);

  font-family: inherit;
  font-size: 1.7rem;
  color: white;
  cursor: pointer;

  transition: all 0.3s;
  ${(props) => (props.isTouchScreen ? "" : "&:hover{opacity:0.8}")}

  span {
    margin-left: 1rem;
  }
`;

export const ReplayBtn = styled.button`
  align-self: center;

  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  padding: 1.5rem 1rem;

  border: none;
  outline: none;
  background-color: white;

  font-family: inherit;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;

  span {
    margin-left: 1rem;
  }
`;
