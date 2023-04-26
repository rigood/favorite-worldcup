import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Radio from "../components/Radio";
import RadioGroup from "../components/RadioGroup";
import { Form, Button, Notice, Feedback } from "../styled/style";
import Title from "../components/Title";

function Home() {
  const {
    totalRound,
    setTotalRound,
    gender,
    setGender,
    setNickname,
    isTouchScreen,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setTotalRound(e.target.totalRound.value);
    setGender(e.target.gender.value);

    const nicknameInput = e.target.nickname.value;
    setNickname(nicknameInput === "" ? "그대" : nicknameInput);

    navigate("/game");
  };

  return (
    <>
      <Title />
      <Form onSubmit={handleSubmit}>
        <RadioGroup
          label="총 라운드"
          value={totalRound}
          onChange={setTotalRound}
        >
          <Radio name="totalRound" value="32">
            32강
          </Radio>
          <Radio name="totalRound" value="16">
            16강
          </Radio>
          <Radio name="totalRound" value="8">
            8강
          </Radio>
        </RadioGroup>

        <RadioGroup
          label="출연진(이상형) 성별"
          value={gender}
          onChange={setGender}
        >
          <Radio name="gender" value="female">
            여자
          </Radio>
          <Radio name="gender" value="male">
            남자
          </Radio>
          <Radio name="gender" value="all">
            성별 무관
          </Radio>
        </RadioGroup>

        <fieldset>
          <legend>닉네임 (선택)</legend>
          <input
            type="text"
            name="nickname"
            placeholder="최대 10자리 입력"
            maxLength="10"
            autoFocus
          />
        </fieldset>

        <Button type="submit" isTouchScreen={isTouchScreen}>
          시작하기
        </Button>
      </Form>
      <Notice>
        출연진 이미지 사용과 관련하여
        <br />
        어떠한 수익도 창출되지 않습니다.
        <br />
      </Notice>
      <Feedback
        href="https://github.com/rigood/favorite-worldcup"
        target="_blank"
      >
        © 2023. rigood all rights reserved.
      </Feedback>
    </>
  );
}

export default Home;
