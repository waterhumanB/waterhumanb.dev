---
title: "Jest와 리액트 테스트 라이브러리"
date: "2022-11-15"
description: "jest와 테스트 라이브러리에 대해서 알아보자!"
---

## React Testing Library의 완고한 부분

### 사용자 사용 방식으로 소프트웨어를 테스트하는 것

- 내부 구현(소프트웨어의 작성법을 의미) 테스트를 대신 하는 것
- 소프트웨어가 원래대로 동작하는지가 중요함
- 작성한 코드의 변경 방식과 소프트웨어가 사양에 따라 계속 동작하는 한 테스트를 통과하게 된다.

### 접근성 마커로 요소를 찾는 것

- 테스트 ID를 사용하는 대신 스크린 리더와 다른 보조 기술로 요소를 찾는 것

## RTL 과 Jest의 차이

### RTL

- RTL은 테스트를 위한 가상 DOM를 제공한다.
- 브라우저 없이 테스트를 할 때 button 같은 요소를 사용할때 가상 DOM으로 테스트 한다.

### Jest

- Jest는 테스트 러너로, 테스트를 찾고 실행하는 것
- 테스트 통과 여부를 결정하는 역할을 한다.

## 기본 테스팅 코드 살펴보기

```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

1. 테스트 함수에서는 첫 번째로 render 메서드를 실행한다.
2. render를 통해 가상DOM을 생성하고, screen으로 가상DOM에 접근한다.
3. getByText 메서드를 실행해서 표시되는 모든 텍스트를 기반으로 DOM에서 요소를 찾는다.
4. 안에 인자로 정규식 표현으로 "learn react"를 대소문자 구분없이 받는 것입니다.
5. 만약 정규식 표현을 사용하지 않으려면 그냥 문자열을 추가해도 된다.
6. 문자열로 사용할 때는 찾는 요소에 정확한 문자열을 입력해줘야 한다.
7. 마짐가은 expect는 테스트 성공과 실패의 원인입니다. 복잡하고 중요하다.

## Jest와 Jest-DOM 단언(Assertion)

```js
expect(linkElement).toBeInTheDocument();
```

- Jest에서 전역 메서드인 expect 메서드로 시작한다.
- 안에 인자는 단언이 단언하는 것으로 예측에 들어맞는지 jest에서 확인한다.
- "toBeInTheDocument()"는 Jest DOM에서 온 matcher이다.
- 인자는 넣지 않고, 찾는 요소가 DOM에 있는지 없는지만 파악하기 때문이다.

## Jest 단언(Assertion) 예시

```js
expect(element.textContent).toBe("hello");
```

- 요소는 textContent이고 매처는 toBe로 'hello'가 있는 모든 요소를 찾는다.

```js
expect(elementsArray).toHaveLength(7);
```

- 어떤 배열을 가진 요소에 길이가 7인 요소를 matcher 한다.

## Jest DOM은 부엉이 로고

- Jest-DOM은 create-react-app이 생성될때 만들어진다.
- src/setUpTests.js 파일을 사용해 각 테스터 전에 jest-DOM을 import한다.
- 즉, 모든 테스트에서 jest-dom 매처를 사용할 수 있다.
- matcher 중에 toBe, toHaveLength 같은 것은 일반적으로 사용할 수 있고, toBeInTheDocument는 가상 DOM에만 사용할 수 있다.
  - 다른 매처는 DOM에서 볼 수 있는 toBeVisible()과 체크박스 같은 toBeChecked() 가 있다.

## Jest의 원리와 필요한 이유

### RTL이 도움을 주는 것

- 컴포넌트를 가상 DOM으로 렌더링하는데 도움을 준다.
- 가상 DOM은 검색하는 데 도움이 된다. 예) getByText 메소드 등
- 가상 DOM과 상호작용하여 요소를 클릭하거나 텍스트를 입력할 수 있다.

### Jest가 필요한 이유

- 테스트 러너가 필요함 그게 Jest
- 테스트를 찾고 실행하며 단언할 무언가가 필요함.
- create-react-app에서도 선호하는 테스팅 프레임워크이다.
- npm test를 실행하면 Jest는 Watch모드로 실행한다.

### Jest가 실행하는 Watch모드는 무엇일까?

- 마지막 커밋 이후 파일의 모든 변경 사항을 확인하고
- 변경된 파일과 연관된 테스트만 실행한다.
- 테스트가 완료되면 커밋을 해서 업데이트 해준다.

### Jest가 테스트 통과나 실패를 어떻게 알 수 있을까?

- 2개의 인수를 가진 전역 테스트 메서드가 있고
  - 첫번째 인자는 테스트의 문자열 설명
    - 이 인자를 사용해서 실패 했을 때 어떤 테스트인지 알 수 있다.
  - 두번째 인자는 테스트 함수
    - Jest는 테스트의 성공과 실패를 결정하기 위해 이 함수를 실행함.
    - 테스트 함수가 실행할 때 에러가 발생하면 실패한다.
    - 단언은 예상이 틀렸을 때 에러가 발생하도록 한다.
    - 에러가 없어야 테스트에 통과할 수 있다.
    - 그렇기에 빈 테스트도 통과돼야 한다.

## TDD(Test-Driven Development)에 대해서

### TDD

- TDD는 코드 작성 전에 테스트를 작성하고
- 테스트에 통과하도록 코드를 작성하는 것

### Red-Green Test

- 코드 작성 전에 테스트에 실패하는 레드 테스트를 먼저 실행하고
- 코드 작성 후에 통과되는 테스트로 그린 테스트를 확인하는 방법

### TDD를 사용하는 이유

- 첫번째 테스트를 작성하는 것이 프로세스의 한 부분으로 느끼는 방식에 차이가 있기 때문
- 마지막에 해야 하는 따분한 일이 아니라 코딩 프로세스의 일부이기 때문
- 프로세스에 통합 되어있고, 그래서 코드 완료 후에도 번거로운 일처럼 느껴지지 않는다.
- 코드 작성 전에 테스트를 작성하면 변경 후에 자동으로 다시 실행할 수 있다.
- 개발하면서 모든 테스트를 작성해 두면 변경 사항이 생길 때마다 모든 테스트를 다시 실행해서 자동 회귀 테스트를 할 수 있다.
- 변경 사항 확인을 위해 애플리케이션을 열고 수동으로 테스트할 필요가 없다.

## React Testing Library의 철학

### RTL의 역할과 사용하는 이유

- 테스트를 위한 가상 DOM을 생성하고 DOM과 상호 작용하기 위한 유틸리티도 제공한다.
- 예) DOM에서 요소를 찾을 수 있거나, 클릭과 같은 요소와 상호 작용할 수 있다.
- 브라우저 없이 가상 DOM을 사용해서 테스트를 할 수 있다.

### 테스트의 유형

- 첫번째 Unit Tests : 유닛 테스트
  - 보통 함수나 별개의 React 컴포넌트 코드의 한 유닛 혹은 단위를 테스트함
  - 이 유닛이 다른 코드의 유닛과 상호 작용하는 것을 테스트하지 않는다.
- 두번째 Integration Tests : 통합 테스트
  - 여러 유닛이 함께 작동하는 방식을 테스트해서 유닛간의 상호작용을 테스트 하는것
  - 예) 컴포넌트 간의 상호 작용을 테스트 하거나, 마이크로 서비스 간의 상호 작용을 테스트함
- 세번째 Functionnal Tests : 기능 테스트
  - 소프트웨어의 특정 기능을 테스트 하는 것 -> 동작과 관련한 의미에 해댕한다.
  - 특정 코드 함수가 아닌 소프트웨어의 일반적인 동작을 의미한다.
  - 일반적인 동작이란 데이터를 폼에 입력하고 제출을 클릭하면 소프트웨어가 특정 데이터 세트로 바르게 작동하는 기능을 확인해야 한다.
  - 유닛 테스트에 가까울 수 있지만 기능 테스트이다. 코드가 아닌 동작을 테스트 하는 것이다.
- 마지막 Acceptance 인수 / End to End (E2E) Test
  - 실제 브라우저가 필요하고, 애플리케이션이 연결된 서버가 필요하다.
  - 보통 Cypress나 Selenium과 같은 특별한 도구가 필요하다.

## 기능 테스트와 유닛 테스트 비교하기

### 유닛 테스트

테스트를 최대한 격리 시킨다. 그래서 함수나 컴포넌트를 테스트할 때 의존성을 표시한다.

다른 의존성이 있거나, 컴포넌트가 의존하는 다른 함수가 있다면 실제 버전 대신 테스트 버전을 사용한다.

문제가 발생하거나 테스트에 실패 시 생태계의 다른 어떤 것이 아니라 테스트에 실패하게 만드는 특정 유닛이 뮨제인 것

내부 테스트도 진행하는데, 내부 테스트가 필요한 이유는 격리 상태에서 컴포넌트를 테스트하면 때로는 상태의 차이점에 관해서만 테스트하게 되기 때문이다.

이는 애플리케이션 변경 사항을 확인하는 다른 컴포넌트가 없기 때문이다. 격리된 유닛에서 실패를 쉽고 정확하게 파악할 수 있다.

테스트가 코드의 한 유닛에 격리되어 있기 때문에 테스트가 실패하면 어디를 확인해야 하는지 정확하게 알 수 있다.

하지만 사용자가 소프트웨어와 상호작용하는 방식과는 거리가 멀다. 소프트웨어와 상호 작용하는 사용자가 실패하거나

그 반대로 사용자가 소프트웨어와 상호 작용하는데 문제가 없어도 테스트에 실패할 수 있다.

사용자가 소프트웨어와 상호 작용하는 방식과는 조금 덜 밀접하게 연결되어 있다.

또한 리팩토링으로 실패할 가능성도 있다. 리팩토링은 동작을 변경하지 않고 소프트웨어 작성 방식을 변경하는 것으로

보통 유닛 테스트로 소프트웨어가 어떻게 작성됐는지 테스트한다. 내부를 테스트하는 것이다. 이는 작성 방식을 변경하면

동작이 변경되지 않아도 테스트에 실패할 수 있음을 의미한다. 따라서 소프트웨어가 제대로 작동하면 테스트도 통과해야 하기 때문에 이런 점이 단점이 된다

### 기능 테스트

테스트하는 특정 동작이나 유저 플로우와 연관된 모든 단위를 포함한다. 장점은 사용자가 소프트웨어와 상호 작용하는 방식과 밀접하다는 것이다.

즉, 테스트에 통과하면 사용자에게 문제가 없고 테스트가 실패하면 사용자에게 문제가 발생할 가능성이 높다는 것을 의미한다.

테스트가 견고하다는 의미이기도 한다. 코드 작성 방식을 리팩토링하면 동작이 동일하게 유지되는 한 테스트도 통과하게 된다.

하지만 실패한 테스트를 디버깅하기 어려운 점이 단점이다. 코드가 테스트와 유닛 테스트처럼 밀접하게 연결되어 있지 않아

어떤 부분의 코드가 테스트 실패의 원인인지 정확히 알 수 없다. 전반적인 RTL은 기능 테스트의 장점이 단점을 보안하는 것 같다.

## TDD 와 BDD의 차이점

- BDD : Behavior-Driven Development 행동 주도 개발
  - 다양한 역할 간의 협업이 필요하다. 예) 개발자나 QA 그리고 사업 파트너 등
  - 서로 다른 그룹이 상호 작용하는 방식에 관한 프로세스도 정의되어 있다.

## Testing Library 와 접근성

[쿼리의 사용법](https://testing-library.com/docs/queries/about/#priority)
[태그 역할의 정의](https://www.w3.org/TR/wai-aria/#role_definitions)

- Testing Library는 요소를 찾는 방식에도 완고합니다. 접근성으로 요소를 찾거나 요소를 찾을 수 있는 스크린 리더와 같은 보조 기술로 요소를 찾는 걸 권장한다.
- 일반적으로 스크린 리더처럼 테스트에서 요소를 찾을 수 없으면, 앱이 스크린 리더에 친화적이지 않다는 의미
