---
title: "타입스크립트의 기본타입 #2"
date: "2022-11-25"
description: "타입스크립트에서 제공하는 기본적인 타입을 알아보자!"
---

## Any 타입

### any 타입은 타입스크립트 타입중에서 가장 유연한 타입

any타입을 쓰게 되면, 모든 변수나, 값들의 타입을 지정할 필요가 없다.

이말은 즉, 타입스크립트의 가장 큰 장점을 상쇄시켜 바닐라 자바스크립트를 쓰는 것과

다를 바 없게 되고, 타입스크립트 컴파일러가 작동을 하지 않게 된다.

## 유니언 타입

유니언 타입은 쉽게 설명하면, 타입을 지정할 때 한개의 타입이 아닌 여러개의 타입을 지정할 수 있는 문법입니다.

```ts
function combine(input1: string | number, input2: string | number) {
  const result = input1 + input2;
}
```

위처럼 combine 함수에 인자에 숫자 또는 문자열이 들어올 수 있도록 해주는 타입 지정이 유니온 타입입니다.

## 리터럴 타입

리터럴 타입은 유니언 타입과 결해서 사용합니다.

```ts
function combine(
  input1: string | number,
  input2: string | number,
  input3: "as-number" | "as-text",
) {
  if (input3 === "as-number") {
    return console.log("100!")
  }
  if(input3 ==="as-text") {
    return const result = input1 + input2;
  }
  return "result"
}
```

위처럼 Enum와 비슷한 느낌으로 사용할 수 있지만, Enum은 전역 변수 같은 느낌으로 쓰지만,

리터럴 타입은 하나의 변수나 함수 등에 사용하는게 좋은 것 같습니다.

## 타입 알리어스 / 사용자 정의 타입

타입 알리어스는 우리가 어떠한 값을 변수로 지정하듯이 타입도 변수처럼 지정할 수 있는 문법입니다.

```ts
type Combinable = string | number
type CoversionDescriptor = "as-number" | "as-text"

function combine(
  input1: Combinable,
  input2: Combinable,
  input3: CoversionDescriptor,
) {
  if (input3 === "as-number") {
    return console.log("100!")
  }
  if(input3 ==="as-text") {
    return const result = input1 + input2;
  }
  return "result"
}
```

위에 코드처럼 우리가 사용할 타입을 변수를 만드는 것처럼 type이라는 키워드를 통해 지정해 줍니다.

이렇게 되면, Enum을 사용할 때 처럼 자주 사용하는 타입들을 미리 지정해서 사용할 수 있다.

## 타입 알리어스 및 객체 타입

타입 별칭을 사용하여 타입을 직접 “생성”할 수 있습니다. 유니온 타입을 저장하는 것만 가능한 것이 아닙니다. 복잡할 수 있는 객체 타입에도 별칭을 붙일 수 있습니다.

```ts
type User = { name: string; age: number };
const u1: User = { name: "Max", age: 30 }; // this works!
```

타입 별칭을 사용하면 불필요한 반복을 피하고 타입을 중심에서 관리할 수 있습니다.

예를 들어, 다음 코드를 아래와 같이 단순화할 수 있습니다.

```ts
function greet(user: { name: string; age: number }) {
  console.log("Hi, I am " + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}
```

단순화 후

```ts
type User = { name: string; age: number };

function greet(user: User) {
  console.log("Hi, I am " + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```

## 함수 반환 타입 및 "무효" void

타입스크립트에는 `void`라는 타입이 있다. 이것은 함수에서 어떠한 것도 반환하지 않을 떄 쓰는 타입으로

보통 자바스크립트에서 함수에 반환되는 값이 없으면 `undefined`로 반환됩니다.

하지만 TS에서는 함수에서 `undefined`타입으로 지정할 수 없어서 `void`타입을 사용하여 타입을 지정해줍니다.

`void`타입은 함수에 의도적으로 반환문이 없다는 것을 의미하는 것입니다.

```ts
function add(n1: number, n2: nuber) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log("result : ", num);
}
```

위와 같은 코드에서 `printReulst` 함수는 아무것도 반환하지 않기 때문에 void 타입을 가지게 됩니다. 아래 처럼 말이죠.

```ts
function add(n1: number, n2: nuber) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log("result : ", num);
}
```

하지만 `printResult`함수에 `undefined` 타입을 주고 싶으면 아무것도 반환하지 않으며 됩니다. 밑에 처럼

```ts
function add(n1: number, n2: nuber) {
  return n1 + n2;
}
// void 타입도 사용가능
function printResult(num: number): undefined {
  console.log("result : ", num);
  return;
}
```

### 함수 타입

함수 타입은 함수의 매개변수 및 반환 타입을 정의할때 사용한다.

### 알 수 없는 타입 unknow

`unknow` 타입은 어떠한 변수나 함수에서 할당되는 값에 어떤것이 할당될지 모를떄 사용합니다.

이는 `any`와 비슷하지만 다릅니다. `any` 타입은 자바스크립트의 동적타입처럼 어떠한 타입도 유연하게 받지만 `unknow`타입은 내가 받는 타입이 확실치 않을 때 사용합니다.

```ts
let userInput: unknow;
let uerName: string;

userInput = 5;
userInput = "suin";

//error
userName = userInput;
```

위에 코드를 보면 `userName`에 `userInput`을 할당하면 에러가 발생합니다.

분명 `userName`은 문자열 타입을 가지고 있고 `userInput`마지막에 문자열이 들어 오지만

`userInput`의 타입은 알 수 없는 타입이므로 에러가 발생합니다.

## never 타입

`never`은 절대 발생할 수 없는 타입을 나타낼 떄 쓰는 타입입니다.

이는 `void`와 비슷해 보이지만 다릅니다. void는 반환값이 없을 때 반환 타입을 표현하기 위해 사용하는 것입니다.

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

위와 같은 반환할 수 없는 타입을 나타낼 때 사용합니다.
