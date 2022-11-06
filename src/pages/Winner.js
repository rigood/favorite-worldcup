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

  const handleShare = () => {};

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
