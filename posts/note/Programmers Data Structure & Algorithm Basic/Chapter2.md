---
title: "자료구조의 종류와 시간복잡도 그리고 자바스크립트의 9가지 코드 트릭"
date: "2023-01-09"
description: "알고리즘을 배우기 전에, 자료구조의 종류와 시간복잡도 빅오표기법과 자바스크립트의 9가지 코드 트릭에 대해서 알아보자!"
---

## 자료구조의 종류

- 자료구조
  - 단순구조
    - 정수
    - 실수
    - 문자열
    - 논리
  - 선형구조
    - 배열
    - 연결 리스트
    - 스택
    - 큐
  - 비선형 구조
    - 트리
    - 그래프

### 선형 구조

한 원소 뒤에 하나의 원소 만이 존재하는 형태로 자료들이 선형으로 나열되어 있는 구조를 가진다.
선형 구조에 해당되는 자료구조는 배열, 연결 리스트, 스택, 큐, 등이 있다.

### 비선형 구조

원소 간 다대다 관계를 가지는 구조로 계층적 구조나 망형 구조를 표현하기에 적절하다.
비선형 구조에 해당되는 자료구조는 트리와 그래프 등이 있다.

## 시간 복잡도 Big-O notation

빅오는 대략적으로 숫자를 세는 것의 붙인 공식적인 표현
정식으로 입력된 내용이 늘어날 수록 알고리즘에 실행 시간이 어떻게 변하는지
설명하는 공식적인 방식

함수 실행 시간이 변하는 관계를 의미
입력의 크기와 실행시간의 관계를 말한다.

### 빅오 표기법의 4가지 규칙

1. 계수 법칙 : n이 무한에 가까울 수록 K의 크기는 의미가 없다.
2. 합의 법칙 : 빅오 끼리 더해질 수 있다.
3. 곱의 법칙 : 빅오 끼리 곱해질 수 있다. O(n^2)같은 경우가 n\*n이 나온 경우이다.
4. 다향 법칙 : 위에 곱의 법칙에서 n*n*n 이러한 식이 있으면 n^3으로 나타 낼 수 있다.

- 두가지 법칙만 기억하면 된다.
  1. 상수항은 무시하기
  2. 가장 큰 항 외엔 무시하기

### 성능 측정 방법

```js
console.log("start");
const start = new Date().getTime();
const N = 1000000000;

let total = 0;
for (let i = 0; i < N; i += 1) {
  total += i;
}

const end = new Date().getTime();
console.log(end - start);
console.log("finish");

// start
// 1114
// finish
```

## 자바스크립트의 9가지 코드 트릭

### 1. 구조 분해 할당을 이용한 변수 swap

ES6의 구조 분해 할당 문법을 사용하여 두 변수를 swap 할 수 있습니다.

```js
let a = 5,
  b = 10;
[a, b] = [b, a];
console.log(a, b); // 10 5
```

### 2. 배열 생성으로 루프 제거하기

보통 단순히 범위 루프를 돌고 싶다면 다음과 같이 코드를 작성합니다.

```js
let sum = 0;
for (let i = 5; i < 10; i += 1) {
  sum += i;
}
```

만약 범위 루프를 함수형 프로그래밍 방식으로 사용하고 싶다면 배열을 생성해서 사용할 수 있습니다.

```js
const sum = Array
.from(new Array(5), (\_, k) => k + 5)
.reduce((acc, cur) => acc + cur, 0);

```

### 3. 배열 내 같은 요소 제거하기

Set을 이용할 수 있습니다.

```js
const names = ["Lee", "Kim", "Park", "Lee", "Kim"];
const uniqueNamesWithArrayFrom = Array.from(new Set(names));
const uniqueNamesWithSpread = [...new Set(names)];
```

### 4. Spread 연산자를 이용한 객체 병합

두 객체를 별도 변수에 합쳐줄 수 있습니다.

```js
const person = {
  name: "Lee Sun-Hyoup",
  familyName: "Lee",
  givenName: "Sun-Hyoup",
};

const company = {
  name: "Cobalt. Inc.",
  address: "Seoul",
};

const leeSunHyoup = { ...person, ...company };
console.log(leeSunHyoup);
// {
// address: “Seoul”
// familyName: “Lee”
// givenName: “Sun-Hyoup”
// name: "Cobalt. Inc." // 같은 키는 마지막에 대입된 값으로 정해진다.
// }
```

### 5. &&와 || 활용

&&와 ||는 조건문 외에서도 활용될 수 있습니다.

```js
/// ||
// 기본값을 넣어주고 싶을 때 사용할 수 있습니다.
// participantName이 0, undefined, 빈 문자열, null일 경우 'Guest'로 할당됩니다.
const name = participantName || "Guest";

/// &&
// flag가 true일 경우에만 실행됩니다.
flag && func();

// 객체 병합에도 이용할 수 있습니다.
const makeCompany = (showAddress) => {
  return {
    name: "Cobalt. Inc.",
    ...(showAddress && { address: "Seoul" }),
  };
};
console.log(makeCompany(false));
// { name: 'Cobalt. Inc.' }
console.log(makeCompany(true));
// { name: 'Cobalt. Inc.', address: 'Seoul' }
```

### 6. 구조 분해 할당 사용하기

객체에서 필요한 것만 꺼내 쓰는 것이 좋습니다.

```js
const person = {
name: 'Lee Sun-Hyoup',
familyName: 'Lee',
givenName: 'Sun-Hyoup'
company: 'Cobalt. Inc.',
address: 'Seoul',
}

const { familyName, givenName } = person;
```

### 객체 생성시 키 생략하기

객체를 생성할 때 프로퍼티 키를 변수 이름으로 생략할 수 있습니다.

```js
const name = "Lee Sun-Hyoup";
const company = "Cobalt";
const person = {
  name,
  company,
};
console.log(person);
// {
// name: 'Lee Sun-Hyoup'
// company: 'Cobalt',
// }
```

### 7. 비구조화 할당 사용하기

함수에 객체를 넘길 경우 필요한 것만 꺼내 쓸 수 있습니다.

```js
const makeCompany = ({ name, address, serviceName }) => {
  return {
    name,
    address,
    serviceName,
  };
};
const cobalt = makeCompany({
  name: "Cobalt. Inc.",
  address: "Seoul",
  serviceName: "Present",
});
```

### 8. 동적 속성 이름

ES6에 추가된 기능으로 객체의 키를 동적으로 생성 할 수 있습니다.

```js
const nameKey = "name";
const emailKey = "email";
const person = {
  [nameKey]: "Lee Sun-Hyoup",
  [emailKey]: "kciter@naver.com",
};
console.log(person);
// {
// name: 'Lee Sun-Hyoup',
// email: 'kciter@naver.com'
// }
```

### 9. !! 연산자를 사용하여 Boolean 값으로 바꾸기

!! 연산자를 이용하여 0, null, 빈 문자열, undefined, NaN을 false로 그 외에는 true로 변경할 수 있습니다.

```js
function check(variable) {
  if (!!variable) {
    console.log(variable);
  } else {
    console.log("잘못된 값");
  }
}
check(null); // 잘못된 값
check(3.14); // 3.14
check(undefined); // 잘못된 값
check(0); // 잘못된 값
check("Good"); // Good
check(""); // 잘못된 값
check(NaN); // 잘못된 값
check(5); // 5
```
