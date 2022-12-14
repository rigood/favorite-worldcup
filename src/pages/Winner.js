import { AppContext } from "../context/AppContext";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  WinnerLoading,
  WinnerImage,
  WinnerText,
  WinnerHeart,
  Buttons,
  Button,
  ReplayBtn,
} from "../styled/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faHeart,
  faReply,
  faShareAlt,
  faSpinner,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { Female, Male } from "../data/Data";
import { toPng } from "html-to-image";
import Title from "../components/Title";
import Particles from "../components/Particles";

function Winner() {
  const { nickname, isTouchScreen } = useContext(AppContext);

  const { id } = useParams();
  const [winner, setWinner] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const candidates = [...Female, ...Male];
    const winner = candidates.find(
      (candidate) => candidate.id === parseInt(id)
    );
    setWinner(winner);
  }, []);

  const navigate = useNavigate();

  const handleReplay = () => {
    navigate("/", { replace: true });
  };

  const handleShare = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }

      kakao.Share.sendCustom({
        templateId: 85487,
        templateArgs: {
          title: "π λλμλ‘ μ΄μν μλμ»΅ π",
          description: "λλμλ‘ μΆμ°μ§ μ€ κ·Έλμ μ΄μνμ μ°Ύμλ³΄μΈμ.",
          logoUrl:
            "https://github.com/rigood/favorite-worldcup/blob/9f9c8bcfe1c8aa943da206c5d593dfab25521fee/public/assets/img/logo.jpg?raw=true",
          femaleImgUrl:
            "https://github.com/rigood/favorite-worldcup/blob/main/public/assets/img/10oksoon.JPG?raw=true",
          maleImgUrl:
            "https://github.com/rigood/favorite-worldcup/blob/main/public/assets/img/11youngcheol.jpg?raw=true",
          btnText: "μ΄μν μ°ΎκΈ°",
        },
      });
    }
  };

  const ref = useRef(null);
  const handleImgSave = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    setIsDownloading(true);

    toPng(ref.current, {
      cacheBust: true,
      backgroundColor: "white",
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBlock: "30px",
      },
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${nickname}μ_μ΄μν.png`;
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
      })
      .catch((err) => {
        console.log("μ΄λ―Έμ§ λ€μ΄λ‘λ μ€ μ€λ₯κ° λ°μνμμ΅λλ€.", err);
      });
  }, [ref]);

  if (!winner) {
    return (
      <WinnerLoading>
        <FontAwesomeIcon icon={faSpinner} spin />
        <span>μ°μΉμ μ λ³΄λ₯Ό μ μ₯μ€μλλ€. </span>
      </WinnerLoading>
    );
  }

  return (
    <>
      <Particles />
      <div ref={ref}>
        <Title />
        <WinnerImage
          src={process.env.PUBLIC_URL + winner.src}
          alt="μ°μΉμ μ΄λ―Έμ§"
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/img/medal.png"}
            alt="μ°μΉ λ©λ¬ μ΄λ―Έμ§"
          />
        </WinnerImage>
        <WinnerText>
          <div>{nickname}μ μ΄μν </div>
          <div>
            <WinnerHeart icon={faHeart} beat />
            <span>
              {winner.group}κΈ° {winner.name}
            </span>
            <WinnerHeart icon={faHeart} beat />
          </div>
        </WinnerText>
      </div>
      <Buttons>
        <Button onClick={handleImgSave} isTouchScreen={isTouchScreen}>
          <FontAwesomeIcon
            icon={isDownloading ? faSync : faDownload}
            spin={isDownloading ? true : false}
          />
          <span>{isDownloading ? "μ μ₯μ€..." : "μ΄λ―Έμ§ μ μ₯"}</span>
        </Button>
        <Button onClick={handleShare} isTouchScreen={isTouchScreen}>
          <FontAwesomeIcon icon={faShareAlt} />
          <span>μΉ΄ν‘ κ³΅μ </span>
        </Button>
      </Buttons>
      <ReplayBtn onClick={handleReplay}>
        <FontAwesomeIcon icon={faReply} />
        <span>λ€μ νκΈ°</span>
      </ReplayBtn>
    </>
  );
}

export default Winner;
