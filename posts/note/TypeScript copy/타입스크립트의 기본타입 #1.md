---
title: "타입스크립트의 기본타입 #1"
date: "2022-11-24"
description: "타입스크립트에서 제공하는 기본적인 타입을 알아보자!"
---

## 자바스크립트 타입의 특징

자바스크립트는 동적 타입으로, 어떠한 파라미터 등에 할당을 할 때 타입을 지정하지 않으면
어떠한 타입이라도 할당을 할 수 있다.

만약 사용자가 다른 타입을 입력 했다면 컴파일이 아닌 런타임중에 오류를 확인 할 수 있다.

그래서 특정 타입에 의존하는 코드가 있는 경우에만 어떠한 타입인지 알 수 있도록 `typeof` 연산자를 사용합니다.

## 타입스크립트 타입의 특징

타입스크립트는 정적타입으로 개발 도중에 끝나는 변수와 매개변수의 타입을 정의한다는 것을 의미한다.

자바스크립트 처럼 런타임 중에 갑자기 변경되지 않는다.

물론 타입스크립트는 자바스크립트로 컴파일 되기 때문에 이론적으로 그럴 수 있지만, 위에 말했던

개발 도중에 에러가 발생하므로 어떤 타입을 보유할 수 있는지 여부를 명확히 할 수 밖에 없다.

타입스크립트는 자바스크립트 엔진에 내장되어 있지 않기 때문에 런타임이 아닌 개발중에 사용할 수 있고,

브라우저에서도 사용할 수 없고, 컴파일할 때만 실행할 수 있다.

- 타입스크립트에서는 항상 string 또는 number와 같은 타입을 다룹니다.
- 타입스크립트의 주요 원시 타입은 모두 소문자입니다

## 타입 할당 및 타입 추론하기

```ts
function add(num1: number, num2: number, string1: string) {
  const add = num1 + num2;
  return `${string1}: ${add}`;
}

const A = 7;
const B = 8;
const C = "ADD";

add(A, B, C);
("ADD:15");
```

위에 코드처럼 타입스크립트에서 타입을 할당할때 변수나, 파라미터 등에 `:`을 써서 할달할 타입을 입력합니다.

```ts
let Num: number;
Num = 7;

let Str: string = "Hello World";
```

그치만 위에 코드처럼 변수에 굳이 타입을 할당하지 않아도 타입추론을 통해 해당 변수가 어떤 타입인지 알 수 있습니다. 예를 들면

```ts
let Num = 7; // number
let Str = "Hello World"; // string
```

변수에 값을 입력해 두면 그 타입을 알아서 추론을 해서 타입을 할당하지 않아도 타입을 알 수 있습니다.

## 튜플 타입

투플은 배열처럼 생긴 타입스크립트에서 쓸 수 있는 문법으로 어떠한 배열 안에 원하는 타입만 지정할 때 사용합니다.

예를 들어 밑에 코드를 보면

```ts
const person {
  name: "suin",
  age: 28
  role: [1,"dev"]
}
// role type : role : (string | number)[]
```

이렇게 타입 추론을 하게 된다. 그러면

```ts
person.role[1] = 200;
```

위처럼 다른 값을 다시 할당하면 오류가 나지 않는다. 위에 `person`에 우리는 0번째 숫자, 1번쨰 문자열 타입으로 지정했지만 role 타입 추론을 통해 <strong>"문자열 아니면 숫자형이 들어간 배열"</strong> 이렇게 타입 추론을 해서 오류가 발생한다.

이러한 것을 방지하기 위해 우리는 튜플 타입을 사용해서 오류를 막을 수 있다.

```ts
const person: {
  name: string,
  age: number,
  role: [number,string]
} {
  name: "suin",
  age: 28
  role: [1,"dev"]
}
```

위에 `role`의 타입을 튜플로 지정함으로서 0번째 배열은 숫자형, 1번째 배열은 문자열로 지정해서 오류를 막을 수 있다.

## 열거형 타입 Enum

Enum은 한 컴포넌트 안에서 자주 쓰는 변수들을 좀 더 간편하게 쓸 수 있는 타입스크립트의 문법중 하나입니다.

```ts
const person{
  name: "suin",
  age: 28
  role: [1,"dev"]
}

if( person.name === "suin") {
  console.log("My name is Suin!!")
}
```

위와 같은 코드를 보면 조건문을 통해 똑같은 문자열을 입력해서 확인하고 있습니다.

흔히 우리는 이것을 좀더 잘 쓰기 위해 name안에 값을 변수로 따로 지정해서 사용합니다.

```ts
const myName = "suin"
const myAge = 28

const person{
  name: myName,
  age: myAge
  role: [1,"dev"]
}

if( person.name === myName, pser.age=== myAge) {
  console.log("My name is Suin!!")
}
```

위처럼 변수를 한곳에서 관리를 할 수 있습니다. 하지만 변수가 하나가 아니라 좀 더 많아진다면. 변수를 계속해서 할당해서 파일을 분리할 정도로 길어 질 수도 있습니다.

그때 Enum을 사용해서 좀더 편리하게 사용할 수 있습니다.

```ts
enum info{ myName = "suin", myAge = 28}

const person{
  name: info.myName,
  age: info.myAge
  role: [1,"dev"]
}

if( person.name === info.myName, pser.age=== info.myAge) {
  console.log("My name is Suin!!")
}
```

위와 같이 enum을 사용해서 사용할 변수를 열거 형태로 사용하면 어떠한 값들을 식별할 때 좀더 편하게 쓸 수 있습니다.

enum안에 값들을 할당할 수 있고, 변수명만 입력하게 되면, 배열처럼 제로베이스로 순서를 가지게 되고, 만약 0번째 변수를 2라고 할당하면 그 다음 순서대로 값을 가지게 됩니다.
