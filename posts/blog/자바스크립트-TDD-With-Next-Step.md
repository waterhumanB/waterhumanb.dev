---
title: "자바스크립트 TDD와 jest 기본 사용법"
date: "2023년 7월 23일"
description: "자바스크립트 TDD와 Jest 기본 사용 법 및 Next Step 시작"
thumbnail: ""
category: "JavaScript"
---

## 자바스크립트 TDD

이번에 `Next Step`에서 진행하는 `TDD Clean Code With JavaScript` 강의에 참여하게 되었다. 이전`TDD Clean Code With React`에서는 프론트엔드 개발에 트렌드인 `React`와 `TypeScript`를 사용하여, `Storybook`과
컴포넌트 분리 방법, 목적에 따른 로직 분리 등 Clean Code에 대한 것도 많이 배웠고, 이번에도 기대가 된다.

나는 `Jest`로 테스트 코드를 구현한다는 것은 알고 있지만, 사실 해본적이 없었고, 테스트에 관심이 생긴 지금 앞으로 약 7주 동안 과제 구현 및 리뷰, 강의 등 기대가 된다.

### TDD

전에 `Storybook`을 사용항 `TDD`방식을 소개 했는데, 강의에서 좀 더 쉽게 설명해주셨고, 좀 더 개념이나 테스트를 하는 이유에 대해 이해도가 더 높아졌다.

`TDD(Test Driven Development)`는 테스트 주도 개발이라는 뜻으로, 개발자가 어떤 프로젝트를 할 때 테스트를 기반으로 프로젝트를 하는 방식을 말한다.

- **TDD를 하는 이유**

  - TDD의 핵심 : 코드가 제대로 동작하는지 빠르게 **피드백** 받기 위한 사고 방식이라고 합니다. 내 결정이 잘 동작하는지 빠르게 피드백을 얻기 위해 테스트 코드를 구현하는 것이죠.
  - 결론 : 더 자주, 더 빨리 **피드백**을 받는 것입니다. 어떻게 더 빨리 더 자주 피드백을 받을 수 있을까? 라는 생각이 든다. 예를 들어 어떤 기능을 구현할 때 테스트 코드를 3개를 구현했다고 했을 때, 우리가 그 기능을 구현할 때 웹에서 동작을 테스트 하거나, Console.log로 확인한다. 실제로 웹이나 콘솔에 이상이 없고 기능을 구현했다고 생각했지만, 테스트에 통과 하지 못하면, 기능에 아직 문제가 있는 경우이고, 모든 테스트를 통과 할 때 기능을 구현한 상태라고 말할 수 있다.
  - 테스트를 통과 하거나 못할 때 계속 피드백을 주기 때문에, 이게 TDD의 핵심이라고 생각한다.

- **TDD 개발 순서**
  - 실패하는 테스트 코드 만들기 : 기능 구현에 앞서 어떤 기능을 만들것 인지 먼저 실패하는 테스트를 구현한다. 실패한다는 것은 요구 사항과 예외 사항들을 미리 테스트 코드로 구현해, 앞으로 구현할 기능이 이 실패한 테스트 코드를 통과하기 위함이다.
  - 성공하는 테스트 코드 만들기 : 위에 설명했던 것들을 토대로 이제 기능을 구현하고 내가 만든 테스트를 성공하게 된다면, 요구 사항과 예외 사항을 모두 충족하게 코드를 구현했다는 증거이다.
  - 마지막 리팩토링 : 모든 테스트를 통과 했다면 이제 코드를 개선하고 `Clean Code`로 만들고, 개선된 코드가 테스트까지 성공한다면, 다시 처음 부터 진행하면 된다.

### Jest Cypress Storybook

- **Jest**

  - 페이스북에서 만든 오픈소스 테스트 프레임워크로 자바스크립트 테스트 중에서 가장 인기가 많다.
  - Jest의 가장 큰 장점은 쉬운 설치 및 사용법이다. 필요한 모든 기능을 추가 설치 하지 않고 사용할 수 있어, 처음 사용해도 손쉽게 테스트를 작성하고 실행할 수 있다.
  - jest는 Node.js 런타임에서 실행되며, 터미널을 통해 테스트를 확일 할 수 있어, 프론트엔드 개발자 보단, 백엔드 개발자에게 좋은 테스트 도구이다.
  - https://jestjs.io 그외 Jest 공식문서를 통해 자세한 정보를 얻을 수 있다.

- **Cypress**

  - 웹애플리케이션 테스트용으로 설계된 최신 E2E 테스트 프레임워크로, Jest와 달리 브라우저에서 실행된다.
  - 브라우저에서 직접 테스트를 작성하고 실행할 수 있는 브라우저 자동화 도구로, 브라우저를 다룰 수 있는 별도의 드라이버를 만들어서 사용가능.
  - E2E 뿐만 아니라 통합, 단위 테스트까지 사용 가능.
  - GUI (Graphic User Interface) 도구를 지원, 스펙 관리 및 디버깅이 편리하다.
  - 브라우저 환경에서 실행되기 때문에, 백엔드 보다 프론트엔드 개발자에게 좋은 테스트 도구이다.
  - https://www.cypress.io 공식문서를 통해 자세한 정보를 얻을 수 있다.

- **Storybook**
  - UI 컴포넌트를 애플리케이션 외부의 독립된 환경에서 개발하기 쉽게 도움을 주는 테스트 도구이다.
  - 개발환경에서 컴포넌트들과 인터랙티브하게 상호작용 가능
  - 다양한 부가기능를 지원하여 커스터마이징하기 쉬운 유연한 API를 제공
  - 정적 빌드하여 배포 가능, 배포된 페이지를 통해 기획자, 디자이너와 같은 비개발 직군과도 협업이 가능해, UI가 중요한 서비스나 프로젝트에서 효과를 발휘할 것 같다.
  - https://storybook.js.org 공식문서를 통해 자세한 정보를 얻을 수 있다.

## Jest 기본 사용법

```js
const Sum (a,b) => {
  return a + b
}

test("Sum 두개의 숫자를 더한 값을 반환한다.", () => {
  expect(Sum(1, 3)).toBe(4)
})
```

기본 사용법은 위와 같다. `Sum`이라는 함수는 `a`,`b`라는 인자를 받아 더한 값을 반환하는 함수이다.

테스트 코드를 작성하면 첫번째로 테스트가 어떤 동작을 하는지 설명하고 테스트 값을 추가해서 그 값이 제대로 나오면 테스트가 통과하게 된다.

테스트 실행 방법은 기본 값으로 `npm test`로 실행하면 된다.

### Matchers

Jest는 매처라는 것을 통해 다양항 방식으로 값을 테스트할 수 있다.

```js
test("Sum 두개의 숫자를 더한 값을 반환한다.", () => {
  expect(Sum(1, 3)).toBe(4)
})

// expect는 기대하는 개체를 반환하고, toBe가 매처이다.
```

**공통으로 사용하는 매처**

- **toBe** : 정확한 테스트를 하는데 사용한다.
- **toEqual** : 객체의 값을 확인 하는데 사용한다.
- **toStrictEqual** : `toEqual`보다 엄격한 값을 확인합니다. `TypeScript`처럼 명시적으로 입력한 값을 모두 사용해야 한다.

- **toBeNull** : null값을 확인 하는데 사용한다.
- **toBeUndefined** : undefined값을 확인 하는데 사용한다.
- **toBeDefined** : toBeUndefined과 반대로 undefined가 아닌 값을 확인할 때 사용
- **toBeTruthy** : if문이 참으로 취급하는 모든 항목을 확인한다.
- **toBeFalsy** : if문이 거짓으로 취급하는 모든 항목을 확인한다.

- **toThrow** : 값이 실행될 때 오류를 발생 시키는지 확인 할 때 사용한다. 사용할 때 화살표 함수를 사용해서, 함수가 작동되는 순간을 파악하도록 해줘야 한다.

- **toMatch** : 정규식에 대한 문자열을 확인 할 때 사용한다.

- **toContain** : 배열이나 이터러블에 특정 항목이 포함되어 있는지 확인할 때 사용한다.

- 그 밖의 다양한 매처들이 존재하고, 모두 외워서 할 필요는 없다 https://jestjs.io/docs/using-matchers 공식문서에서 확인 하거나, 필요할 때 찾아서 사용하면 된다.

### 비동기 코드 테스트

```js

const callBackFn = {
  getName : (callback) => {
    const name = "waterHumanB"
    setTimeOut((
      callback(name)
    )=>{},3000)
  }
}

test("3초 후에 받아온 이름은 waterHumanB 입니다.", (done) => {
  function callback(name) {
    expect(name).toBe("waterHumanB");
    done()
  }
  callBackFn.getName(callback)
})
```

이번엔 콜백 함수를 테스트를 진행할 때 첫 번째로 3초 뒤에 `waterHumanB`라는 이름을 받는 콜백 함수르 만들주고,

테스트 코드를 작성하는데, `done`이라는 인자를 받아 이 `done`은 테스트가 마치지 전에 콜백이 호출될 때 까지 기다리는 역할을 하고,

만약 `done`인자를 받지 않고 사용한다면, `Jest`는 바로 테스트를 마무리 하기 때문에 비동기나 콜백을 테스트 할 때 `done` 인자를 추가 해야 한다.

```js
const promiseFn = {
  getAge: () => {
    const age = 28
    return new Promise((res, rej) => {
      setTimeOut(() => {
        res(age)
      }, 3000)
    })
  },
}

test("3초 후에 받아온 나이는 28 ", () => {
  return promiseFn.getAge().then((age) => {
    expect.toBe(28)
  })
})

test("3초 후에 받아온 나이는 28 ", () => {
  return expect(promiseFn.getAge()).resolves.toBe(28)
})
```

`Promise`를 통한 비동기 함수를 테스트할 때는 반드시 `return`을 사용해서 테스트를 진행하고,

`resolves`, `rejects` 매처를 사용하면 보다 간편하게 사용할 수 있다.

```js
test("3초 후에 받아온 나이는 28 ", async () => {
  const age = await promiseFn.getAge()
  expect(age).toBe(28)
})

test("3초 후에 받아온 나이는 28 ", async () => {
  await expect(promiseFn.getAge()).resolves.toBe(28)
})
```

`async await`를 사용하여 비동기 테스트를 진행 하는 방법은 위와 같다.

첫 번째로 기본으로 사용하는 방법과 두 번째로 매처를 사용해서는 방법이다.

### 테스트 전후 작업

```js
let num = 0

test("0 + 1 은 1이다.", () => {
  num = Sum(num, 1)
  expect(num).toBe(1)
})

test("0 + 2 은 2이다.", () => {
  num = Sum(num, 2)
  expect(num).toBe(2)
})

test("0 + 3 은 3이다.", () => {
  num = Sum(num, 3)
  expect(num).toBe(3)
})
```

만약 이런 식의 테스트를 진행 한다면, 어떻게 될까? `num`의 값이 계속 할당 되어

테스트 코드가 실패하게 될것이다.

여기서 `beforeEach`와 `afterEach`를 사용하여 `num`의 값이 바뀌지 않게 할 수 있다.

```js
let num = 0

beforeEach(() => {
  num = 0
})

test("0 + 1 은 1이다.", () => {
  num = Sum(num, 1)
  expect(num).toBe(1)
})

test("0 + 2 은 2이다.", () => {
  num = Sum(num, 2)
  expect(num).toBe(2)
})

test("0 + 3 은 3이다.", () => {
  num = Sum(num, 3)
  expect(num).toBe(3)
})
```

`beforeEach`는 테스트가 시작되기 전 `num`의 값을 `0`으로 할당한다는 의미이다.

반대로 `afterEach`는 테스트 직후에 실행되는 의미로 첫번째 테스트가 끝난 뒤에 `0`으로 할당해서 다른 테스트는 통과하게 된다.

```js
const fn = {
  connectUserDb: () => {
    return new Promise(res=> {
      setTimeOut(() => {
        res({
          name : "waterHumanB";
          age: 28
        })
      },500)
    })
  }
  disConnectDb: () => {
    return new Promise(res=> {
      setTimeOut(()=>{
        res();
      },500)
    })
  }
}

let user

beforeEach(async () =>{
  user = await fn.connectUserDb()
})

afterEach(() =>{
  return fn.disConnectDb()
})

test("이름은 waterHumanB", () => {
  expect(user.name).toBe("waterHumanB")
})
test("나이는 28살", () => {
  expect(user.age).toBe(28)
})
```

예를 들어 DB에서 데이터를 받고, 그 후에 테스트를 끝내는 작업을 할 때 각 테스트는 1초씩 걸릴 겁니다.

여기서 문제는 `beforeEach`와 `afterEach`가 모든 테스트에 영향이 가기 때문에, 비슷한 테스트를 하는 것끼리 묶어서 테스트를 작성해야, 각기 다른 테스트를 진행할 수 있다.

```js
beforeAll(() => console.log("밖 beforeAll")) // 1
beforeEach(() => console.log("밖 beforeEach")) // 2, 6
afterEach(() => console.log("밖 afterEach")) // 4, 10
afterAll(() => console.log("밖 afterAll")) // 마지막

test("0 + 1 = 1", () => {
  console.log("밖 test")
  expect(Sum(0, 1)).toBe(1) // 3
})

describe("묶어서 하는 테스트", () => {
  beforeAll(() => console.log("안 beforeAll")) // 5
  beforeEach(() => console.log("안 beforeEach")) // 7
  afterEach(() => console.log("안 afterEach")) // 9
  afterAll(() => console.log("안 afterAll")) // 마지막 - 1

  test("0 + 1 = 1", () => {
    console.log("안 test")
    expect(Sum(0, 1)).toBe(1) // 8
  })
})
```

`beforeAll`은 모든 테스트 시작 전에 실행하고, `afterAll`은 모드 테스트가 끝나면 실행한다.

`describe`는 테스트를 묶어서 실행할 수 있게 도와주고 위에 테스트를 실행하면, 주석의 순서대로 진행한다.

```js
let num = 0

test("0 + 1 은 1이다.", () => {
  expect(Sum(num, 1)).toBe(1)
})

test("0 + 2 은 2이다.", () => {
  expect(Sum(num, 2)).toBe(2)
  num = 10
})

test("0 + 3 은 3이다.", () => {
  expect(Sum(num, 1)).toBe(3)
})
```

이번엔 중간에 `num`값이 변경되는 테스트를 진행해보자.

마지막 테스트는 `num`값이 10이 되므로 테스트를 실패할 것이다.

이때 마지막 테스트만 실행해야 하는데 이러한 상황에서 사용하는 키워드는 `only`이다.

```js
let num = 0

test("0 + 1 은 1이다.", () => {
  expect(Sum(num, 1)).toBe(1)
})

test("0 + 2 은 2이다.", () => {
  expect(Sum(num, 2)).toBe(2)
  num = 10
})

test.only("0 + 3 은 3이다.", () => {
  expect(Sum(num, 1)).toBe(3)
})
```

이렇게 `test`뒤에 `only`를 붙여 마지막 테스트만 실행해서 테스트의 문제점을 찾아서 해결하면 된다.

```js
let num = 0

test("0 + 1 은 1이다.", () => {
  expect(Sum(num, 1)).toBe(1)
})

test.skip("0 + 2 은 2이다.", () => {
  expect(Sum(num, 2)).toBe(2)
  num = 10
})

test("0 + 3 은 3이다.", () => {
  expect(Sum(num, 1)).toBe(3)
})
```

테스트를 진행했을 때 문제가 없다면, 코드에는 이상이 없는것 입니다. 그렇다면 문제를 찾아야하는데, 현재 두번째 코드에 `num`에서 `10`이 할당되는 것이 문제로 보이네요.

이때 `skip`이란 키워드를 사용해서, 테스트를 건너 뛸 수 있다.

### 목 함수 (Mock Functions)

```js
const mockFn = jest.fn()

mockFn()
mockFn(1)

test("mock", () => {
  console.log(mockFn.mock.calls)
  expect("mock").toBe("mock")
})

// console.log([[],[1]])
```

`Jest`에서 `Mock` 데이터를 만들어 진행할 수 있다. 위처럼 코드를 작성했을 때 `calls`라는 값은 `[[],[1]]`이러한 값일 반환하는데

여기서 `calls`로 알 수 있는 것은 두가지로 아래와 같다.

1. 함수가 총 몇번 호출 되었는지 알 수 있다
2. 함수가 호출할 때 전달된 인수가 무엇인지 알 수 있다.

```js
const mockFn = jest.fn()

mockFn()
mockFn(1)

test("함수가 2번 호출됩니다.", () => {
  expect(mockFn.mock.calls.length).toBe(2)
})

test("2번째로 호출된 함수에 전달된 첫번째 인수는 1 입니다.", () => {
  expect(mockFn.mock.calls[1][0]).toBe(1)
})
```

우리가 `calls`를 활용해서 알 수 있는 정보를 통해 위와 같은 테스트를 진행할 수 있다.

```js
const mockFn = jest.fn()

function forEachAdd(arr) =>{
  arr.forEach(num => {
    mockFn(num +1)
  })
}

forEachAdd([10,20,30])

test("함수가 3번 호출됩니다.", () => {
  expect(mockFn.mock.calls.length).toBe(3)
})

test("전달된 값은 11, 21, 31 입니다.", () => {
  expect(mockFn.mock.calls[0][0]).toBe(11)
  expect(mockFn.mock.calls[1][0]).toBe(21)
  expect(mockFn.mock.calls[2][0]).toBe(31)
})
```

콜백함수를 굳이 새로 만들지 않고, `Mock`함수를 만들어 테스트를 진행할 수 있다.

```js
const mockFn = jest.fn((num) => num + 1)

mockFn(10)
mockFn(20)
mockFn(30)

test("함수가 3번 호출됩니다.", () => {
  console.log(mockFn.mock.results)
  expect(mockFn.mock.calls.length).toBe(3)
})

test("10에서 1 증가한 값이 반환 된다.", () => {
  expect(mockFn.mock.calls[0][0]).toBe(11)
})
test("20에서 1 증가한 값이 반환 된다.", () => {
  expect(mockFn.mock.calls[1][0]).toBe(11)
})
test("30에서 1 증가한 값이 반환 된다.", () => {
  expect(mockFn.mock.calls[2][0]).toBe(11)
})
```

`Mock`데이터를 사용해서 테스트를 할때 `results`라는 키워드를 사용하면 결과값을 반환하는데 다음과 같다.

```
[
  {type: "return",value:11}
  {type: "return",value:21}
  {type: "return",value:31}
]
```

이렇게 반환된 결과 값으로도 테스트를 진행할 수 있다. 밑에 코드를 보자

```js
const mockFn = jest.fn((num) => num + 1)

mockFn(10)
mockFn(20)
mockFn(30)

test("10에서 1 증가한 값이 반환 된다.", () => {
  expect(mockFn.mock.results[0].value).toBe(11)
})
test("20에서 1 증가한 값이 반환 된다.", () => {
  expect(mockFn.mock.results[1].value).toBe(11)
})
test("30에서 1 증가한 값이 반환 된다.", () => {
  expect(mockFn.mock.results[2].value).toBe(11)
})
```

이렇게 `results`로 받은 `value`를 활용해 테스트를 진행 할 수 있다.

```js
const mockFn = jest.fn()

mockFn
  .mockReturnValueOnce(10)
  .mockReturnValueOnce(20)
  .mockReturnValueOnce(30)
  .mockReturnValue(40)

mockFn()
mockFn()
mockFn()
mockFn()

test("mock test", () => {
  console.log(mockFn.mock.results)
  expect("mock test")toBe("mock test")
})
```

이번엔 `mockReturnValue`를 사용해서 실행할 때 마다 다른 값을 반환할 수 있는데, 중간에 값을 바꿔줄 때 `Once`를 붙여서 사용할 수 있다.

위 예제의 콘솔로그를 확인하면 다음과 같다.

```
[
  {type: "return",value:10}
  {type: "return",value:20}
  {type: "return",value:30}
  {type: "return",value:40}
]
```

이렇게 사용할 수도 있다.

```js
const mockFn = jest.Fn()

mockFn
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValue(true)

const result = [1, 2, 3, 4, 5].filter((num) => mockFn(num))

test("홀수는 1,3,5",()=>{
  expect(result).toStringEqual({1,3,5})
})

```

이번엔 우리가 만약 불린값을 반환해야 한다고 할때 위와 같이 사용할 수 있다.

```js
const mockFn = jest.Fn()

mockFn
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValue(true)

const result = [1, 2, 3, 4, 5].filter((num) => mockFn(num))

test("홀수는 1,3,5",()=>{
  expect(result).toStringEqual({1,3,5})
})

```

이번엔 비동기함수를 흉내 낼 수 있는데

```js
const mockFn = jest.Fn()

mockFn.mockResolveValue({ name: "waterHumanB" })

test("받아온 이름은 waterHumanB", () => {
  mockFn().then((res) => {
    expect(res.name).toBe("waterHumanB")
  })
})
```

이런식으로 `mockResolveValue`를 사용해서 비동기 값을 받을 수 있다. 이처럼 `api`호출 값을 테스트하려고 할 때 계속 비동기 통신을 하게 되면, 불필요한 서버 낭비가 되기 때문에, `Mock` 데이터를 활용해서 사용할 수 있고, 예제를 만들어 보자.

```js
const fn = {
  createUser: (name) => {
    console.log("서버에서 받아온 새로운 사용자")
    return { name }
  },
}

test("새로운 사용자를 만든다", () => {
  const user = fn.createUser("waterHumanB")
  expect(user.name).toBe("waterHumanB")
})
```

위에 예제를 보면 `createUser`를 통해 새로운 유저를 만들었고 콘솔로그도 테스트에 찍혀 있을것이다. 그리고 실제 사용자를 만들어 사용했다면 다시 DB에 접속해 새로 만든 사용자를 삭제를 해야 한다. 하지만 `Mock`데이터를 만들어 사용하면, 서버에 불필요한 동작을 막을 수 있다. 아래 예제를 보자

```js
jest.mock(fn)

fn.createUser.mockReturnValue({ name: "waterHumanB" })

test("새로운 사용자를 만든다", () => {
  const user = fn.createUser("waterHumanB")
  expect(user.name).toBe("waterHumanB")
})
```

이렇게 하면 서버에서 데이터를 받아 오지 않고, 가상의 데이터를 만들어 실행할 수 있다.

마지막으로 `Mock`를 활용한 테스트활용 방법을 알아보자

```js
const mockFn = jest.fn()

mockFn(10, 20)
mockFn()
mockFn(30, 40)

test("한번 이상 호출 했는가?", () => {
  expect(mockFn).toBeCalled()
  // 한번이라도 호출되면 통과된다.
})

test("정확히 3번 호출 했는가?", () => {
  expect(mockFn).toBeCalledTimes(3)
  // 정확한 호출 횟수를 판단한다.
})

test("10이랑 20 전달받은 함수가 있는가?", () => {
  expect(mockFn).toBeCalledWith(10, 20)
  // 인수로 어떤 값을 받았는지 판단한다.
  // 10, 20 뿐만 아니라 30, 40도 포함된다.
})

test("마지막 함수는 30이랑 40을 받았는가?", () => {
  expect(mockFn).lastCalledWith(30, 40)
  // 마지막에 받은 인수만 판단한다.
  // 만약 10, 20을 인자로 넣었다면 실패하게 된다.
})
```

위처럼 다양한 호출되는 값으로 테스트를 진행할 수 있다.

## 후기

Next Step 에서 진행하는 TDD Clean Code With JavaScript강의를 시작하면서 TDD를 다시 복습하고 Jest의 기본 사용법과 강의에서 설명했던 내용들을 정리하고 싶어 블로그 글을 쓰게 되었다.

유튜브에 좋은 강의가 있었고, 공식문서를 보면서 따라해보고 Jest를 활용해서 할 수 있는 기본적인 테스트들을 공부해 보았다.

이제 실제 기능을 구현하면서 테스트를 진행하면 될거 같다. 역시 개발 공부는 공식문서가 답인 것을 계속 새로운 것을 공부를 할 때 마다 느낀다.

예전에는 공식문서의 말들이 어렵고 번역을 해도 이해하기 힘들었는데, 이제는 개발 공부의 짬(?)이 차서 그런지, 조금 따라하면서 그 기술을 만드는 이유들을 생각하면서 공부를 해서 그런지 이해하는 속도가 많이 빨라 진거 같다.

일주일 마다 Next Step 강의를 써보려고 한다. 앞으로 화이팅하자!

## 참고자료

- https://jestjs.io
- https://www.cypress.io
- https://storybook.js.org
- https://jestjs.io/docs/using-matchers
- https://www.youtube.com/watch?v=g4MdUjxA-S4list=PLZKTXPmaJk8L1xCg_1cRjL5huINlP2JKt&index=1
