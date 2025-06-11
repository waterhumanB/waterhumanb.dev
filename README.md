# Next.js Blog - WaterHumanB.dev

Next.js 공식문서에서 기본 튜트리얼 공부 및 블로그 만들기

# 구현 기능

### 하단에 구현할 기능들 간단한 설명

- [x] 페이지 구현
  - [x] Home 페이지 : Blog 소개
    - [ ] 최신 블로그 글들 보여주기
    - [ ] 최신 노트 정리 글들 보여주기
    - [ ] GA 연결 후 일일, 주간, 한달 등 방문자 그래프
  - [x] Blog 페이지 : 공부한 것들 정리 및 프로젝트 후기 및 에러 등
    - [x] 메인 페이지 위에 카테고리 분리
    - [x] 게시물 Data : slug, title, date, description, thumbnail, category
    - [ ] 페이지 하단에 날짜 별로 다음, 이전 글 보여주고 이동가능
  - [x] Note 페이지 : 강의, 책 들 공부한 것들 순서대로 정리
    - [x] 게시물 Data : slug, title, date, description, education
    - [x] 왼쪽에 카테고리 메뉴 : 토글 버튼으로 인강, 책 구분하기
      - [x] 토글 버튼 만들기 : 컴포넌트 Hook으로 분리하기
      - [x] 인강, 책에 맞는 글들만 사이드바 메뉴에 보여주기
      - [x] 큰 주제 클릭 하면 안에 작은 주제의 글들 drop&down 형식으로 보여주기
    - [x] Note 페이지 소개 글과 강의 정리글과 책 정리글 분리해서 보여주기
  - [x] 404 페이지 만들기
  - [x] Project 페이지 : 개인, 팀 프로젝트 정리
    - [x] 프로젝트들의 git, notion, title, des 등 객체를 배열로 만들어 화면에 뿌려주는 방식
  - [x] TOC (table of contents)
  - [ ] About 페이지 : 저를 소개합니다.
  - [ ] 페이지에서 Header 부분에 스크롤 게이지 보여주기
  - [ ] 페이지 오른쪽 하단에 페이지 최상단으로 올라가는 버튼 만들기
- [x] sitemap 등록
- [x] Google, Naver, Daum, Bing 사이트에 블로그 노출 시키기
  - [x] 페이지 마다 meta tag 추가하기
    - [x] \_app.tsx에 defaultSEO로 meta tag 추가하고, 다른 page는 nextSEO로 추가해주기
- [ ] 다크모드 기능
- [x] Blog 페이지에 git 댓글 기능
- [ ] 전체적으로 인터렉션한 웹으로 UI 개선하기
