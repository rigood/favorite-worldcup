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
  }, [id]);

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
          title: "🏆 나는솔로 이상형 월드컵 🏆",
          description: "나는솔로 출연진 중 그대의 이상형을 찾아보세요.",
          logoUrl:
            "https://github.com/rigood/favorite-worldcup/blob/9f9c8bcfe1c8aa943da206c5d593dfab25521fee/public/assets/img/logo.jpg?raw=true",
          femaleImgUrl:
            "https://github.com/rigood/favorite-worldcup/blob/main/public/assets/img/10oksoon.JPG?raw=true",
          maleImgUrl:
            "https://github.com/rigood/favorite-worldcup/blob/main/public/assets/img/11youngcheol.jpg?raw=true",
          btnText: "이상형 찾기",
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
        link.download = `${nickname}의_이상형_${winner.group}기_${winner.name}.png`;
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
      })
      .catch((err) => {
        console.log("이미지 다운로드 중 오류가 발생하였습니다.", err);
      });
  }, [ref, nickname, winner.group, winner.name]);

  if (!winner) {
    return (
      <WinnerLoading>
        <FontAwesomeIcon icon={faSpinner} spin />
        <span>우승자 정보를 저장중입니다. </span>
      </WinnerLoading>
    );
  }

  return (
    <>
      <Particles />
      <div ref={ref}>
        <Title />
        <WinnerImage
          src={process.env.PUBLIC_URL + "/assets/img/" + winner.src}
          alt="우승자 이미지"
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/img/medal.png"}
            alt="우승 메달 이미지"
          />
        </WinnerImage>
        <WinnerText>
          <div>{nickname}의 이상형 </div>
          <div>
            <WinnerHeart icon={faHeart} beat />
            <span>
              {winner.group}기 {winner.name}
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
          <span>{isDownloading ? "저장중..." : "이미지 저장"}</span>
        </Button>
        <Button onClick={handleShare} isTouchScreen={isTouchScreen}>
          <FontAwesomeIcon icon={faShareAlt} />
          <span>카톡 공유</span>
        </Button>
      </Buttons>
      <ReplayBtn onClick={handleReplay}>
        <FontAwesomeIcon icon={faReply} />
        <span>다시 하기</span>
      </ReplayBtn>
    </>
  );
}

export default Winner;
