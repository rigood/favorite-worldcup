import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ProgressText,
  ProgressBarBg,
  ProgressBar,
  Main,
  Vs,
  Member,
  MemberImage,
  MemberText,
  ReplayBtn,
} from "../styled/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { Female, Male } from "../data/Data";
import Title from "../components/Title";

function Game() {
  const { totalRound, gender } = useContext(AppContext);

  const [round, setRound] = useState(parseInt(totalRound));
  const [step, setStep] = useState(1);

  const [candidates, setCandidates] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    let people;
    if (gender === "female") {
      people = [...Female];
    } else if (gender === "male") {
      people = [...Male];
    } else {
      people = [...Female, ...Male];
    }

    const randomPeople = people
      .sort(() => Math.random() - 0.5)
      .slice(0, totalRound);

    setCandidates(randomPeople);
    setDisplays([randomPeople[0], randomPeople[1]]);
  }, [totalRound, gender]);

  const navigate = useNavigate();

  const handleClick = (member) => () => {
    if (candidates.length > 2) {
      // 현재 라운드에서 다음 순서 진행
      setWinners([...winners, member]);
      setCandidates(candidates.slice(2));
      setDisplays([candidates[2], candidates[3]]);
    } else {
      if (winners.length !== 0) {
        // 다음 라운드 진출 (ex: 16강 -> 8강)
        let updatedCandidates = [...winners, member];
        setCandidates(updatedCandidates);
        setDisplays([updatedCandidates[0], updatedCandidates[1]]);
        setWinners([]);
        setRound((prev) => prev / 2);
        toast(`⚽ ${round === 4 ? "결승" : round / 2 + "강"} 진출 ⚽`);
      } else {
        // 결승 진출
        setWinners(member);
        setCandidates([]);
        setDisplays([]);
        setRound(1);
        navigate(`/result/${member.id}`, { replace: true });
      }
    }
    setStep((prev) => (prev === round / 2 ? 1 : prev + 1));
  };

  const handleReplay = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <Title />
      <ProgressText>
        {round === 2 ? "👑 결승 👑" : `${round}강 ⚽ (${step}/${round / 2})`}
      </ProgressText>
      <ProgressBarBg>
        <ProgressBar ratio={(step / (round / 2)) * 100 - 5} />
      </ProgressBarBg>
      <Main>
        {displays.map((member) => {
          return (
            <Member key={member.id} onClick={handleClick(member)}>
              <MemberImage>
                <img
                  src={process.env.PUBLIC_URL + "/assets/img/" + member.src}
                  alt={`${member.group}기 ${member.name}`}
                />
              </MemberImage>
              <MemberText>
                {member.group}기 {member.name}
              </MemberText>
            </Member>
          );
        })}
        <Vs>VS</Vs>
      </Main>
      <ReplayBtn onClick={handleReplay}>
        <FontAwesomeIcon icon={faReply} />
        <span>다시 하기</span>
      </ReplayBtn>
    </>
  );
}

export default Game;
