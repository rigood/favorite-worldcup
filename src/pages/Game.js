import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Progress, Main, Vs, Member, Image, Text } from "../styled/style";
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
  }, []);

  const navigate = useNavigate();

  const handleClick = (member) => () => {
    if (candidates.length > 2) {
      // 현재 라운드에서 다음 순서 진행
      setWinners([...winners, member]);
      setDisplays([candidates[2], candidates[3]]);
      setCandidates(candidates.slice(2));
    } else {
      if (winners.length !== 0) {
        // 다음 라운드 진출 (ex: 16강 -> 8강)
        let updatedCandidates = [...winners, member];
        setCandidates(updatedCandidates);
        setDisplays([updatedCandidates[0], updatedCandidates[1]]);
        setWinners([]);
        setRound((prev) => prev / 2);
      } else {
        // 결승 진출
        setWinners([member]);
        setCandidates([]);
        setDisplays([]);
        setRound(1);
        navigate(`/result/${member.id}`, { replace: true });
      }
    }
    setStep((prev) => (prev === round / 2 ? 1 : prev + 1));
  };

  return (
    <>
      <Title />
      <Progress>
        {round === 2
          ? "결승 👑 내 이상형은 누구?"
          : `${round}강 ⚽ (${step}/${round / 2})`}
      </Progress>
      <Main>
        {displays.map((member) => {
          return (
            <Member key={member.id} onClick={handleClick(member)}>
              <Image>
                <img
                  src={member.src}
                  alt={`${member.group}기 ${member.name}`}
                />
              </Image>
              <Text>
                {member.group}기 {member.name}
              </Text>
            </Member>
          );
        })}
        <Vs>VS</Vs>
      </Main>
    </>
  );
}

export default Game;
