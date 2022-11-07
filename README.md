# 🏆 이상형 월드컵 (나는솔로 ver)

- [데모 링크](#)
- 토너먼트 형식으로 나는솔로 출연진 중 자신의 이상형을 고르는 게임

<br>

## 💻 프로젝트

- 2022년 11월 개인 프로젝트

<br>

## 📌 주요 기능

- 게임 진행방식

  - [x] 총 라운드 선택 (32강, 16강, 8강)
  - [x] 출연진(이상형) 성별 선택 (여자, 남자, 성별무관)
  - [x] 사용자 닉네임 입력 가능

- 이상형 월드컵

  - [x] 나는솔로 출연진을 랜덤 추출하여 1:1 매치
  - [x] 현재 라운드, 진행중인 단계 표시

- 최종 결과
  - [x] 카카오톡 링크 공유 가능
  - [x] 이상형 이미지 저장

<br>

## 🔨 패키지

- React
- React-router-dom
- Styled-components
- html-to-image

<br>

## 🔍 구현 방법

- 재사용 가능한 `Radio` 컴포넌트를 구현하여 게임 진행방식을 입력 받음
- `useContext`를 이용하여 총 라운드, 출연진 성별, 닉네임 state를 전역적으로 관리
- `useEffect`를 이용하여 라운드가 시작되면 랜덤으로 후보 추출
- `useState`를 이용하여 후보, 렌더링 될 후보, 승자 배열의 state 관리
- `카카오톡 공유 API`를 통해 링크 공유 기능 구현
- `html-to-image` 라이브러리 사용하여 DOM을 이미지로 저장
