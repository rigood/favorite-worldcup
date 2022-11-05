import { useEffect } from "react";
import { useState } from "react";
import { Data } from "../data/Data";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faReply,
  faReplyAll,
  faShare,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 50px 10px;
`;

const Title = styled.div`
  text-align: center;
  font-family: "GmarketSans";
  color: #ff3e51;
  h2 {
    font-size: 30px;
    margin-bottom: 10px;
  }
  h1 {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 30px;
  }
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  position: relative;
`;

const Vs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  font-size: 32px;
  font-weight: bold;
  font-style: italic;
  color: #ff3e51;
  text-shadow: -3px 0 white, 0 3px white, 3px 0 white, 0 -3px white;
`;

const Member = styled.div`
  flex: 1;
  cursor: pointer;
`;

const Image = styled.div`
  overflow: hidden;
  img {
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

const Text = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
`;

const WinnerImage = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;
  width: 100%;
  aspect-ratio: 1;
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

const WinnerText = styled.div`
  margin-top: 40px;
  text-align: center;
  font-weight: bold;
  div:first-child {
    font-size: 24px;
    margin-bottom: 15px;
  }
  div:last-child {
    font-size: 40px;
    span {
      margin: 0 10px;
    }
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 60px;
`;

const Button = styled.div`
  flex: 1;
  text-align: center;
  padding: 15px 10px;
  border-radius: 5px;
  background-color: #ff3e51;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  span {
    margin-left: 15px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

function Game() {
  const [memberList, setMemberList] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const nickname = "사용자";

  useEffect(() => {
    const members = [...Data].sort(() => Math.random() - 0.5);
    setMemberList(members);
    setSelectedMembers([members[0], members[1]]);
    console.log(members);
  }, []);

  const handleClick = (member) => () => {
    if (memberList.length > 2) {
      setWinners([...winners, member]);
      setSelectedMembers([memberList[2], memberList[3]]);
      setMemberList(memberList.slice(2));
    } else {
      if (winners.length !== 0) {
        let updatedMemberList = [...winners, member];
        setMemberList(updatedMemberList);
        setSelectedMembers([updatedMemberList[0], updatedMemberList[1]]);
        setWinners([]);
      } else {
        setWinners([member]);
        setMemberList([]);
        setSelectedMembers([]);
        setIsEnd(true);
      }
    }
  };

  const handleReplay = () => {
    window.location.replace("/");
  };

  const handleShare = () => {};

  return (
    <Wrapper>
      <Title>
        <h2>나는 SOLO</h2>
        <h1>이상형 월드컵</h1>
      </Title>
      {!isEnd ? (
        <Main>
          {selectedMembers.map((member) => {
            return (
              <Member key={member.id} onClick={handleClick(member)}>
                <Image>
                  <img src={member.src} />
                </Image>
                <Text>
                  {member.group}기 {member.name}
                </Text>
              </Member>
            );
          })}
          <Vs>VS</Vs>
        </Main>
      ) : (
        <>
          <WinnerImage src={winners[0].src}>
            <img src="/assets/img/winner.png" />
          </WinnerImage>
          <WinnerText>
            <div>{nickname} 님의 이상형 </div>
            <div>
              <FontAwesomeIcon icon={faHeart} color="#ff3e51" beat />
              <span>
                {winners[0].group}기 {winners[0].name}
              </span>
              <FontAwesomeIcon icon={faHeart} color="#ff3e51" beat />
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
      )}
    </Wrapper>
  );
}

export default Game;

// <h1>member</h1>;
// {
//   memberList.map((e) => (
//     <li key={e.id}>
//       {e.group} {e.name}
//     </li>
//   ));
// }
// <h1>winner</h1>;
// {
//   winners.map((e) => (
//     <li key={e.id}>
//       {e.group} {e.name}
//     </li>
//   ));
// }
// <h1>select</h1>;
// {
//   selectedMembers.map((e) => (
//     <li key={e.id}>
//       {e.group} {e.name}
//     </li>
//   ));
// }
