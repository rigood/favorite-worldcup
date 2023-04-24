import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GlobalStyle = createGlobalStyle`
${reset}
:root{
  --primary: #ff3e51;
  --black: #212529;
}
*{
  box-sizing: border-box;
}
body{
  color: var(--black);
}
li{
  list-style: none;
}
button{
  all: unset;
}
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 50px 30px;
`;

export const TitleWrapper = styled.div`
  color: var(--primary);
  text-align: center;
  h2 {
    font-size: 30px;
    margin-bottom: 10px;
  }
  h1 {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 50px;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  fieldset {
    width: 100%;
    legend {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      span.asterisk {
        margin-left: 5px;
        color: var(--primary);
      }
    }
    input[type="text"] {
      width: 100%;
      padding: 0px 10px 10px;
      outline: none;
      border: none;
      border-bottom: 1px solid lightgray;
      font-size: 16px;
    }
  }
`;

export const Progress = styled.h3`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

export const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  position: relative;
`;

export const Vs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  font-size: 32px;
  font-weight: bold;
  font-style: italic;
  color: var(--primary);
  text-shadow: -3px 0 white, 0 3px white, 3px 0 white, 0 -3px white;
`;

export const Member = styled.div`
  flex: 1;
  cursor: pointer;
`;

export const Image = styled.div`
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

export const Text = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
`;

export const WinnerImage = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;
  width: 100%;
  aspect-ratio: 1;
  transform: scale(0.9);
  border-radius: 40px;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 100px;
    height: 100px;
  }
`;

export const WinnerLoading = styled.div`
  text-align: center;
  span {
    margin-left: 10px;
  }
`;

export const WinnerText = styled.div`
  text-align: center;
  font-weight: bold;
  div:first-child {
    font-size: 24px;
    padding-top: 20px;
  }
  div:last-child {
    font-size: 40px;
    padding-top: 15px;
    padding-bottom: 15px;
    span {
      margin: 0 10px;
    }
  }
`;

export const WinnerHeart = styled(FontAwesomeIcon)`
  color: var(--primary);
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;

export const Button = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 15px 10px;
  width: calc(100% - 20px); // 20px = padding left+right
  border-radius: 5px;
  background-color: var(--primary);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  ${(props) => (props.isTouchScreen ? "" : "&:hover{opacity:0.8}")}
`;

export const ReplayBtn = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;
