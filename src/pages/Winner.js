import { AppContext } from "../context/AppContext";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  WinnerLoading,
  SaveImg,
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
import ReactGA from "react-ga";
import { Female, Male } from "../data/Data";
import { toPng } from "html-to-image";
import Title from "../components/Title";
import Particles from "../components/Particles";

function Winner() {
  const { nickname, isTouchScreen, isSafariBrowser } = useContext(AppContext);

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
    ReactGA.event({
      category: "카톡 공유",
      action: "카톡 공유 버튼 클릭",
      label: `${winner.group}기 ${winner.name} (id: ${id})`,
    });

    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }

      kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "🏆 나는솔로 이상형 월드컵 🏆",
          description: `${nickname}의 이상형은 ${winner.group}기 ${winner.name}😍\n나는솔로 출연진 중 그대의 이상형을 찾아보세요.`,
          imageUrl: `https://github.com/rigood/favorite-worldcup/blob/main/public/assets/img/${winner.src}?raw=true`,
          link: {
            mobileWebUrl: `https://rigood.github.io/favorite-worldcup/result/${id}`,
            webUrl: `https://rigood.github.io/favorite-worldcup/result/${id}`,
          },
        },
        buttons: [
          {
            title: "이상형 결과 보기",
            link: {
              mobileWebUrl: `https://rigood.github.io/favorite-worldcup/result/${id}`,
              webUrl: `https://rigood.github.io/favorite-worldcup/result/${id}`,
            },
          },
          {
            title: "이상형 찾기",
            link: {
              mobileWebUrl: `https://rigood.github.io/favorite-worldcup`,
              webUrl: `https://rigood.github.io/favorite-worldcup`,
            },
          },
        ],
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
        padding: "1rem",
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

    ReactGA.event({
      category: "이미지 저장",
      action: "이미지 저장 버튼 클릭",
      label: `${winner.group}기 ${winner.name} (id: ${id})`,
    });
  }, [ref, nickname, winner.group, winner.name, id]);

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
      <SaveImg ref={ref}>
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
      </SaveImg>
      <Buttons>
        {!isSafariBrowser && (
          <Button onClick={handleImgSave} isTouchScreen={isTouchScreen}>
            <FontAwesomeIcon
              icon={isDownloading ? faSync : faDownload}
              spin={isDownloading ? true : false}
            />
            <span>{isDownloading ? "저장중..." : "이미지 저장"}</span>
          </Button>
        )}
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
