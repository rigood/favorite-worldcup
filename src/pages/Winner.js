import { AppContext } from "../context/AppContext";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  WinnerImage,
  WinnerText,
  WinnerHeart,
  Buttons,
  Button,
} from "../styled/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faReply,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Female, Male } from "../data/Data";

function Winner() {
  const { nickname } = useContext(AppContext);

  const { id } = useParams();
  const [winner, setWinner] = useState("");

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

  return (
    <>
      <WinnerImage src={winner.src}>
        <img src="/assets/img/medal.png" />
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
      <Buttons>
        <Button onClick={handleReplay}>
          <FontAwesomeIcon icon={faReply} />
          <span>다시 하기</span>
        </Button>
        <Button onClick={handleShare}>
          <FontAwesomeIcon icon={faShareAlt} />
          <span>카톡 공유</span>
        </Button>
      </Buttons>
    </>
  );
}

export default Winner;
