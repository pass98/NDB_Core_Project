# NDB_Core_Project란? (2023.07 ~ 2023.08)
NDB_Core_Project는 Open AI인 Chat GPT의 API를 연동해서 사용자가 원하는 프로그래밍언어로 코딩테스트를 진행할 수 있도록 제작한 프로젝트입니다.
현재 제작된 언어는 PYTHON, JAVA만 구현되었습니다.

# 사용된 스킬 : JAVASCIRPT, HTML, CSS 

# 직접 담당한 부분 : MyPage의 UI, UX를 담당하고 mySQl을 이용하여 DB 내의 데이터를 연동하는 작업을 진행했습니다. 

mypage : mypage입니다. 계정의 정보, 문제, 풀었던 문제 개수, 회원의 결제 정보에 대한 페이지를 class 별로 레이아웃을 만들고 클릭시 각각의 레이아웃이 나오는 방식으로 제작했습니다.

1. 계정의 정보 : mypage에 접속 시 가장 먼저 뜨는 화면이며 사용자의 이미지, 계정, 비밀번호에 대한 정보가 출력됩니다. 

2. 문제 : 사용자가 풀었던 문제 페이지로 사용자의 계정으로 풀었던 문제의 목록과 문제의 개수를 별명과 함께 표시했습니다.

3. 회원의 결제 정보 : BM을 구독자 모델로 결정했으며 사용자의 구독 상태에 따라 다른 레이아웃이 나오도록 표시했습니다. 결제 시 '모델이 변경되었습니다'라는 문구와 함께 사용자의 정보가 변화됩니다.


# 사용 폴더 내용

- config : 환경변수 정보 저장 (DB연결정보, API키값 등)

- public : 정적파일 관리 (JS, CSS, Image, Audio, Video 등)

- routes : 라우팅을 위한 폴더( 라우팅 별 모듈 생성/ 로직구현)

- views : 요청에 대한 로직 처리 후 응답을 보낼 html

- app.js 서버를 실행하기 위한 Main 파일(express 미들웨어 설정 )
  순두부 아니다 팀협업 테스트

# git 참고사항  
- .gitignore 사용법

1. node_module 지우고 다들 로컬에서 npm install 입력후 만듬

2. main 브랜치 에는 node_module 파일이 없어야한다.

3. 복잡하면 폴더를 전부삭제후 origon main branch에 .gitignore를 추가하고

4. 로컬에서 작업하던거 백업해놓고 클론다시받기

## 주의!

- 1. 브랜치 이동 주의

- 2. main origin 에는 node_modules가 없어야한다 (git 용량문제)

## 로그인 페이지 다이어그램

```mermaid
 graph TD
    A[사용자] --> B[웹사이트 접속]
    B --> C[로그인 버튼 클릭]
    C --> D{로그인 플랫폼 선택}
    D -- 카카오톡 선택 --> E[카카오톡 로그인 요청]
    D -- 구글 선택 --> F[구글 로그인 요청]
    E --> G{카카오톡 인증 완료 여부}
    G -- 인증 성공 --> H[카카오톡 정보 전송]
    H --> I[백엔드에 카카오톡 정보 전달]
    I --> J[백엔드에서 인증 처리]
    J -- 인증 성공 --> K[메인 페이지로 이동]
    G -- 인증 실패 --> L[종료]
    F --> M{구글 인증 완료 여부}
    M -- 인증 성공 --> N[구글 정보 전송]
    N --> O[백엔드에 구글 정보 전달]
    O --> P[백엔드에서 인증 처리]
    P -- 인증 성공 --> K
    M -- 인증 실패 --> L
    C -- 웹사이트 로그인 선택 --> Q[일반 로그인 페이지로 이동]
    Q --> R[아이디, 비밀번호 입력]
    R --> S[로그인 버튼 클릭]
    S --> T[백엔드에서 인증 처리]
    T -- 인증 성공 --> K
    T -- 인증 실패 --> L
    K --> U(ChatGPT API 연동)
    U --> K
    K --> V(결재 구독 시스템으로 이동)
    V --> W{결재 완료 여부}
    W -- 결재 완료한 경우 --> K
    W -- 결재 완료하지 않은 경우 --> V
    K --> X(마이페이지로 이동)
    X --> K
    L --> A[사용자]


```
