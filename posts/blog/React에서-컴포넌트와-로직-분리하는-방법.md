---
title: "React에서 컴포넌트와 로직 분리하는 방법"
date: "2023.4.03"
description: "React에서 Hook, Utils, Domain으로 컴포넌트와 로직 분리하는 이유와 방법"
thumbnail: ""
category: "React"
---

### 목차

- 기능 구현시 로직을 분리하는 이유가 뭘까?
  - 컴포넌트는 View만 담당하도록 하기
- 로직을 분리하는 방법
  - Hook
  - Domain (Business Logic)
  - Utils
- 그 밖에 분리할 수 있는 것들
  - component
  - constants, data, styles 등
- 회고

# 기능 구현시 로직을 분리하는 이유는 뭘까?

이 내용은 항상 생각을 했었지만, 방법을 크게 몰랐었고, 사실 그렇게 찾아보지는 않았다.
`Next step`에서 `TDD, 클린코드 with React`강의와 과제를 리뷰를 받으면서 좀 더 구체화 되고

로직을 분리하는 방법 및 이유 등의 생각이 자리잡게 되었다.

강의를 듣기전에는 단순히 코드의 가독성과 요지보수를 위해, 코드 150줄 이상 넘기지 않기 위해
나름 대로 분리를 하려고 했었다.

`Hook`으로 분리하는 이유도 코드가 길어지고, `React Hook`을 사용한 로직이여서 분리를 했었다.

`Utils`도 비슷하다, 두번 이상 재사용을 할 수 있는 로직이려서 분리를 했고,

`Domain`은 알지도 못했다, 다른 말로 `Business Logic`이라고 불리며 이것은 어떻게 분리할줄도 몰랐다.

우선 간단하게 설명하면, 모두가 코드 가독성과 유지보수 그리고 재사용성을 위해 분리하는 것은 맞다.

다만, `Hook`,`Utils`,`Domain`이 3가지를 어떤 기준으로 분리를 하느냐 이런것이 좀 어려웠고 지금도 사실 정확하게 생각이 자리잡고 쓰는 것은 아니다.

우선 로직을 분리하기 전에 `React`에서 왜 로직들을 분리하려는 의도를 알아야한다.

## 컴포넌트는 View만 담당하도록 하기

우리가 `React`에서 UI를 렌더링 할 때 컴포넌트라는 단위를 사용해서 사용자에게 화면을 보여준다.

```ts
import { useState } from "react"

import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default App
```

위에 코드를 보면 `React`는 `JSX`라는 문법을 사용해서 `JavaScript` 안에서 `HTML`으로 UI까지 동시에 작성이 가능하다.

> JSX(JavaScript XML)는 Javascript에 XML을 추가한 확장한 문법이다.

여기서 문제점은 UI도를 담당하는 `HTML`구문도 커지고, 기능을 만드는 `JavaScript`도 커지면 하나의 페이지나 UI안에 코드들이 너무 길어져 가독성과 유지보수 등의 측면에서 좋지 않다.

그래서 우리는 UI를 쪼개서 컴포넌트로 만들어 분리를하고 재사용할 수 있는 곳에 재사용을 하고 한 페이지를 컴포넌트로 분리해서 각각 기능을 구현해 보다 가독성을 높이고 유지보수를 좋게 할 수 있다.

`React`를 만든 이유와 우리가 사용하는 이유 중 하나일 것이다. 하지만 어떻게 보면 단점인게 컴포넌트를 분리하는 것이 규칙이 있는게 아니라, 자유적으로 개발자의 역량과 판단으로 이루어진다는 것이다.

그래서 필자도 `React`로 새로운 프로젝트를 할 때 마다 컴포넌트를 어떻게 분리를 해야할까 고민을 한다.

지금까지는 조금만 복잡해질 때마다 분리를 하는 방식으로 했었다.

이제는 컴포넌트는 UI인 View만 담당을 하고 그 이외 기능들은 `Hook`, `Domain`, `Utils` 등으로 로직을 분리를 하려고 한다.

전부 다 분리를 할 수는 없지만, 분리를 할 때 `Hook`으로 분리하는 기준, `Domain`으로 분리하는 기준, `Utils`로 분리하는 기준을 잡고 개발하는 방향으로 진행중이다.

# 로직을 분리하는 방법

## Hook

먼저 `Hook`이 무엇이냐... 리액트 공식문서에 달려가 찾아 보았다. `Hook`을 개발한 동기로는 `Class형` `React`는 **컴포넌트 사이에서 상태 로직을 재사용하기 어렵다**는 이유에서 `Hook`을 사용하여 컴포넌트로부터 상태 관련 로직을 추상화하여 독립적인 테스트와 재사용이 가능하다고 합니다.
**Hook은 계층의 변화 없이 상태 관련 로직을 재사용할 수 있도록 도와줍니다.**라고 설명하네요.

그리고 **복잡한 컴포넌트들은 이해하기 어렵다** 이것은 `Class형` 컴포넌트의 생명주기 메소드들의 자잘한 버그들이 존재하는 것 같네요.

마지막으로 **Class는 사람과 기계를 혼동시킵니다.** 이것은 `JavaScript`에서 `Class`를 사용할 때 `this` 키워드를 사용하는데, `JavaScript`의 `this`키워드는 다른 언어와 다르게 동작하고, 사용자에게 큰 혼란을 주고 코드의 재사용성과 구성을 어렵게 만든다고 하네요. `React`에서 `props`, `state`, `top-down`이러한 데이터 흐름을 이해하고 `Class`의 이해가 부족해서 어려움이 많았다고 합니다.

저도 사실 `Class`를 사용해서 개발은 해본적이 없어서 어려움을 느낄것 같네요.

이제 본론으로 돌아와서 `React`에서 `Hook`으로 분리하는 이유와 방법을 알아보자.

첫 번째로 분리를 하는 이유는 코드의 가독성, 재사용성을 위해서 분리를 한다.

그리고 우리가 `Hook API`를 사용해서 기능을 만든 것들은 `Custom Hook`인 것이다.

뭔가 설명하자니 간단하다..

`Hook`을 분리하는 방법도 생각보다 어렵지 않다.

```ts
import { useState } from "react"

import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default App
```

위에 코드에서 버튼을 누르면 카운트가 1씩 올라가는 페이지를 분리 해보자

```ts
import { useState } from "react"

function useCustomHook() {
  const [count, setCount] = useState(0)

  const countHandler = () => {
    setCount((count) => count + 1)
  }

  return { count, countHandler }
}

export default useCustomHook
```

이런 식으로 `React Hook`을 사용한 로직을 만들어 주고, 그 로직을 사용할 수 있게 `state`와 함수를 반환해주고 사용하면 된다.

```ts
import useCustomHook from "./useCustomHook"
import "./App.css"

function App() {
  const { count, countHandler } = useCustomHook()
  return (
    <div className='App'>
      <button onClick={countHandler}>count is {count}</button>
    </div>
  )
}

export default App
```

이렇게 만든 `Custom Hook`을 사용해서 로직을 좀더 깔끔하게 구현할 수 있다. 이 컴포넌트에서는 버튼을 누르면 카운트가 되는 구나 정도로 파악하고 로직이 궁금하고 보수할게 있다면 분리했던 `Custom Hook`에서 살펴보면 된다.

## Domain (Business Logic)

이번엔`Domain`,`Business Logic`이다.
처음`Domain`으로 분리를한다? 라고 들었을 때`Domain`이 `Domain` 주소할 때와 같은 건가 생각이 들었다.

우리가 흔히 알고 있는 `Domain`주소는 단지 네트워크에서 우리 컴퓨터나 사이트를 식별하는 용도로 사용한다.

그러면 `React`에서 사용하는 `Domain`이란 **React에서 도메인 분리의 개념은 특정 도메인 또는 책임 영역을 기반으로 애플리케이션의 다양한 관심사 또는 기능을 개별 모듈 또는 구성 요소로 구성하고 분리하는 것을 의미합니다.** 라고 설명해준다.

제가 생각했을때 `Domain`은 `Hook`이든 `Utils`이든 `Component`든 그곳에서만 사용하는 순수함수로 구현한 기능이라고 생각한다.

> 순수함수 : 외부의 상태를 변경하지 않으면서 동일한 인자를 받으면 항상 똑같은 값을 리턴하는 함수

예를 들어 위에 `Custom Hook`으로 예를 들자면

```ts
import { useState } from "react"

function useCustomHook() {
  const [count, setCount] = useState(0)

  const doubleNumber = (number) => {
    return number * 2
  }

  const countHandler = () => {
    setCount((count) => doubleNumber(count))
  }

  return { count, countHandler }
}

export default useCustomHook
```

코드 중간에 `doubleNumber`이라는 함수를 하나 만들었다. 단순히 인자로 숫자를 받으면 2배의 값을 반환하는 함수이다.

저 `doubleNumber`이라는 함수는 `useCustomHook`이라는 로직에서만 사용하고 만약 로직이 길어진다면 분리를 할 수 있다.

```ts
// domain 이라는 폴더에 생성함
export const doubleNumber = (number) => {
  return number * 2
}
```

```ts
import { doubleNumber } from "./domain/doubleNumber"
import { useState } from "react"

function useCustomHook() {
  const [count, setCount] = useState(0)

  const countHandler = () => {
    setCount((count) => doubleNumber(count))
  }

  return { count, countHandler }
}

export default useCustomHook
```

이런식으로 특정 영역, 기능에서만 사용하는 함수를 분리를 함으로써 보다 기존 로직의 가독성을 높이고 유지보수 측면에서도 좋겠네요. `util`에서도 `Utils`안에 함수들의 로직들이 복잡하면 `Domain`으로 분리할 수 있다.

## Utils

마지막으로 `Utils`은 흔히 우리가 아는 유틸리티의 뜻이다. 영어 뜻으로 **유용한, 이용하기 쉬운** 이런 의미이고, 뭔가 가져다 쓰기 쉬운 도구같은 느낌을 준다.

우리가 사용할 때는 도구는 무엇인가.. 라이브러리가 생각나는데, 우리가 기능을 구현할 때 사용하는 거니까, 재사용이 가능하고, 특별한 기능에 한정된 로직이 아닌 함수를 의미한다.

쉽게 말해 `doubleNumber`라는 함수가 만약 이곳 저곳 사용을 해야한다면, `Utils`로 분리를 하는게 맞다.

뭔가 설명이 간단하게 끝난것 같다.

예를 들면 `input`에 `ID`를 받을 고 백엔드에 보낼 때 대문자로 보내야 하고, 다른 곳에서도 대문자로 UI를 보여줄곳이 필요하다면, 그때 마다 `Utils`로 함수를 분리해 필요한곳에 사용하면 된다. 이렇게 사용하면 특정한 곳에 사용하는 함수가 아닌 필요한 곳에 재사용할 수 있고, 해당 함수에 로직과 상관없이 단지 대문자로만 바꿔주는 기능만 담당하게 되는 것이다.

# 그 밖에 분리할 수 있는 것들

## component

컴포넌트를 분리하는 방법도 여러가지가 있다.
현재 블로그 컴포넌트를 분리한 것으로 예를 들면
`pages` 폴더에 이 웹사이트에서 보여줄 큰 UI들을 `components` 폴더에 분리하여 사용하고 있다.

그리고 `components` 폴더 안에도 크게 전체UI에 쓸 `Layout`폴더가 있고, 특정 UI에 사용할 `domain`폴더로 구조를 나누었다.

이렇게 하면 UI가 커지고 복잡해질 수록 크게 두개로 분류를 했기 때문에 좀더 유지보수할 때 편한것 같다.

## constants, data, styles 등

먼저 `constants`는 상수값들을 모아둔 곳이다. UI `tag`안에 사용할 텍스트들을 `tag`안에 작성하곤 하는데, 만약 똑같은 텍스트를 수정하려면 일일이 `tag`를 찾아서 변경을 해주지만, `constants`로 모아두면, 한번에 변경이 가능하다. 팁이 있다면 변수명을 잘 지어야한다.

`data`폴더에도 `JSON`파일이나 `JS`파일 같은 단순 객체나, 배열로 이루어진 값들을 넣어서 관리할 수 있다.

`styles`는 전체 `global style`은 `src`폴더에 전체적으로 관리를 하고 각 컴포넌트에서 `styles`파일로 분리를 하면 컴포넌트의 코드량을 줄일 수 있다.

현재 이 블로그에 `styles` 폴더를 보면 그안에 `base`, `constants` 폴더가 있어, `base`는 기본으로 사용할 각종 태그들의 스타일이 있고, `constants`는 기본으로 여기서 사용할 색의 코드들이 들어 있다. 이렇게 하면 위에서 `tag`안에 텍스트를 변경할 떄와 마찬가지로 색깔을 변경할 때 일일이 `styles` 파일을 찾아서 바꾸지 않고 한번에 수정이 가능하다.

그밖에 프로젝트의 규모에 따라 큰 페이지 별로 전체에서 사용한 `components`,`hook`,`routes`,`pages`,`domain`,`utils` 등을 각 각 안에서 구조를 잡아도 된다. 이렇게 사용할 때는 큰 페이지에 기능이 많고 다른 페이지에 영향을 주지 않으며 프로젝트 규모가 커질 때 좋다.

# 회고

처음 컴포넌트와 로직을 분리할 때 `domain`? `hook`? `utils`? 어떻게 나누라는 거야.. 라고 생각을 했었고, 내 나름 정의를 해보면서 분리를 하고 피드백 받고 하니 어느정도 음 기본은 잡힌 것 같다. 아직 많이 해봐야 되겠지만, 이제는 코드를 짜는 것 보다 생각하는 시간이 많아 진듯하다.

### 참고자료

https://ko.legacy.reactjs.org/docs/hooks-intro.html#motivation
