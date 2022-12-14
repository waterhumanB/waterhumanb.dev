---
title: "타입스크립트 고급타입"
date: "2022-12-06"
description: "타입스크립트 고급 타입에 대해서 알아보자!"
---

## 인터섹션 타입 (Intersection Type)

인터섹션 타입은 여러 타입을 모두 만족하는 하나의 타입을 의미한다.

예를 들어

```ts
interface Person {
  name: "suin";
  age: 28;
}

interface Career {
  job: "developer";
}

type WaterHumanB = Person & Career;

interface WaterHumanA extends Person, Carrer
```

위와 같이 두개의 타입을 합쳐서 모두 만족하는 하나의 타입을 만드는 것입니다.

타입을 합칠 때는 `interface`나 `type`을 둘중 아무거나 사용해도 되지만,

인터섹션 타입을 사용할 때는 `type`이 선호되는 이유는 `interface`를 사용하면 코드의 길이가 길어지기 때문이다.

## 타입 가드 (Type Guard)

Type guard를 사용하면 조건문에서 객체의 타입을 좁혀나갈 수 있습니다.

### typeof

TypeScript는 JavaScript의 instanceof, typeof 연산자를 이해할 수 있습니다.

즉 조건문에 typeof와 instanceof를 사용하면, TypeScript는 해당 조건문 블록 내에서는

해당 변수의 타입이 다르다는 것(=좁혀진 범위의 타입)을 이해한다는 것이죠.

아래 예시를 보시면 TypeScript는 특정 메소드(String.prototype.substr)가 string에

존재하지 않는다는 사실을 인식해 사용자 오타가 있을 수 있음을 지적하고 있습니다.

```ts
function doSomething(x: number | string) {
  if (typeof x === "string") {
    // TypeScript는 이 조건문 블록 안에 있는 `x`는 백퍼 `string`이란 걸 알고 있습니다.
    console.log(x.subtr(1)); // Error: `subtr`은 `string`에 존재하지 않는 메소드입니다.
    console.log(x.substr(1)); // ㅇㅋ
  }
  x.substr(1); // Error: `x`가 `string`이라는 보장이 없죠.
}
```

### in

in은 객체 내부에 특정 property가 존재하는지를 확인하는 연산자로 type guard로 활용할 수 있습니다.

```ts
interface A {
  x: number;
}
interface B {
  y: string;
}

function doStuff(q: A | B) {
  if ("x" in q) {
    // q: A
  } else {
    // q: B
  }
}
```

## 구별된 유니온 (Discriminated Union)

유니언을 구성하는 모든 객체에는 하나의 공통 속성만 있고

유니언은 해당 속성을 설명하므로 객체를 설명하는 이 속성을 switch 문에 사용하여

완전한 타입 안전성을 갖추고 객체에 어떤 속성을 사용할 수 있는지 파악할 수 있다.

```ts
interface IronMan {
  type: "technology";
  suitDamage: 999;
}

interface Captain {
  type: "roider";
  shieldDamage: 888;
}

type Hero = IronMan | Captain;

function Avengers(hero: Hero) {
  let power;
  switch (hero.type) {
    case "technology":
      power = hero.suitDamage;
      break;
    case "roider":
      power = hero.shieldDamage;
  }
  return power;
}
```

## 형 변환 (Typecasting)

형 변환은 타입스크립트가 직접 감지하지 못하는 특정 타입의 값을 타입스크립트에 알려주는 역할을 한다.

1. 변환하고자 하는 요소 앞이나 타입스크립트에 타입을 알려주고자 하는 위치 앞에 무언가를 추가하는 방법으로 사용방법은 `<>` 안에 코드의 타입으 입력해준다.
2. `as` 키워드를 입력해 앞에 코드가 어떤 타입으로 형 변환할지 입력해준다.

Html 파일에 id가 user-input인 input 태그가 있다고 가정할 때

```ts
const userInputEl = document.getElementById("user-input");

userInputEl.value = "축구 국가대표팀 고생했어요~!"; // error
```

TS는 Html코드를 읽을 수 없기 때문에, 단순히 Id가 user-input 이라는 요소를 찾습니다.

이 때 우리는 형 변환을 통해 타입을 지정해 줘야합니다.

```ts
const userInputEl = <HTMLInputElement>document.getElementById("user-input");
// or
const userInputEl = document.getElementById("user-input")! as HTMLInputElement;
// !를 사용하면 !앞의 표션식을 null로 반환하지 않겠다고 타입스크립트에 인식시킬 수 있다.

userInputEl.value = "축구 국가대표팀 고생했어요~!"; // error
```

위와 같은 두가지 방법중에 선호하는 방식으로 통일해서 사용하면 됩니다.

## 인덱스 타입(Index Type)

객체가 지닐 수 있는 속성에 대해 보다 유연한 객체를 생성할 수 있게 해주는 기능

```ts
interface Error {
  [prop: string] : string
}

const errorBag : Error = {
  email: "이메일을 입력해주세요."
  userName : "이름을 입력해주세요."
  nickName : "닉네임을 입력해주세요."
}
```

위 예제코드를 보면 `Error`라는 `interface`를 만들어 인덱스 타입을 적용해

key값이 문자열이고 vaule값이 문자열은 객체들을 생성할 수 있게 해주고 있습니다.

이는 각기 웹사이트, 환경에 따라 받아야 하는 값들이 다르고, 갯수를 정확히 모를 때 사용하면 편리하다

## 함수 오버로드 (Function Overload)

- 동일한 이름에 매개 변수만 다른 여러 버전의 함수를 만드는 것을 함수의 오버로딩이라고 한다.
- 파라미터의 형태가 다양한 여러 케이스에 대응하는 같은 이름을 가진 함수를 만드는 것
- 함수의 다형성(다양한 형태)을 지원하는 것
- function 키워드로만 함수 오버로딩을 할 수 있으며 arrow function으로는 오버로딩을 할 수 없다.

```ts
const addZero = (num: number) => (num > 9 ? "" : "0") + num;

function formatDate(date: Date, format = "yyyyMMdd"): string {
  const yyyy = date.getFullYear().toString();
  const MM = addZero(date.getMonth() + 1);
  const dd = addZero(date.getDate());
  return format.replace("yyyy", yyyy).replace("MM", MM).replace("dd", dd);
}

function formatDateString(dateStr: string, format = "yyyyMMdd"): string {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear().toString();
  const MM = addZero(date.getMonth() + 1);
  const dd = addZero(date.getDate());
  return format.replace("yyyy", yyyy).replace("MM", MM).replace("dd", dd);
}

function formatDateTime(datetime: number, format = "yyyyMMdd"): string {
  const date = new Date(datetime);
  const yyyy = date.getFullYear().toString();
  const MM = addZero(date.getMonth() + 1);
  const dd = addZero(date.getDate());
  return format.replace("yyyy", yyyy).replace("MM", MM).replace("dd", dd);
}
```

함수 오버로딩으로 리팩토링

```ts
const addZero = (num: number) => (num > 9 ? "" : "0") + num;
function formatDate(date: Date, format = "yyyyMMdd"): string;
function formatDate(date: number, format = "yyyyMMdd"): string;
function formatDate(date: string, format = "yyyyMMdd"): string;

// 위 3개 함수를 함수 오버로딩 처리, date는 유니온 타입사용
function formatDate(date: string | Date | number, format = "yyyyMMdd"): string {
  const dateToFormat = new Date(date);

  // … dateToFormat validation … 만약 empty나 1, 0이 들어왔을 때 validation 처리해주기

  const yyyy = dateToFormat.getFullYear().toString();
  const MM = addZero(dateToFormat.getMonth() + 1);
  const dd = addZero(dateToFormat.getDate());

  return format.replace("yyyy", yyyy).replace("MM", MM).replace("dd", dd);
}
```

## 선택적 체이닝 (Optional Chaining)

선택적 체이닝 연산자는 객체 데이터의 중첩된 속성과 객체에 안전하게 접근할 수 있게 해준다.

```ts
const data = {
  id: "id1",
  name: "waterHumanB",
  job: { title: "front-dev" },
};

console.log(data?.job?.title);
```

## Null 병합

이중 물음표 연산자가 null 병합 연산자이다.

```ts
const userInput = ""; // 빈값이 출력

const userInput = undefined; // DEFAULT 출력

const inputData = userInput ?? "DEFAULT";

console.log(inputData);
```

이것이 null이거나 undefined라면, 그러니까 빈 문자열이나 0이 아닌

null이나 undefined 둘 중 하나라면 풀백을 사용해야 한다는 의미입니다.

## 참고 자료

### [타입가드 참고자료](https://radlohead.gitbook.io/typescript-deep-dive/type-system/typeguard#type-guard)

### [함수 오버로드 참고자료](https://lakelouise.tistory.com/194)
