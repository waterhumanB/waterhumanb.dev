---
title: "자바스크립트 알고리즘 재귀"
date: "2022-12-05"
description: "자바스크립트 알고리즘 재귀에 대해서 알아보자!"
---

## 재귀는 무엇인가?

재귀는 자기자신을 호출하는 절차이다.

### 재귀가 사용되는 곳

- JSON.parse / JSON.stringify
- document.getElementById 및 DOM 순회 알고리즘
- 객체 순회
- 보다 복잡한 알고리즘에서 매우 일반적임
- 때때로 반복에 대한 더 clean한 대안입니다.

## 스택 자료구조

스택은 목록 끝에서만 데이터가 추가되고 나가는 선형구조(LIFO - Last in First Out)으로 구성된 자료구조이다.

JS에서는 배열에 push로 값을 넣고, pop으로 값을 뺀다.

- 서로 관계가 있는 여러 작업을 연달아 수행하면서 이전의 작업 내용을 저장해 둘 필요가 있을 때 널리 사용된다.
- 함수 실행 conText들이 쌓이는 Call Stack과 브라우저의 방문 기록이 쌓이는 History Stack이 대표적이다.

## 재귀 기본 케이스

재귀가 갖는 기본 케이스는 재귀가 끝나는 조건이다.

### 재귀함수의 두가지 필수 부분

1. 위에 재귀의 기본케이스
2. 다른 입력

## 통상적인 재귀의 잠재적 위험

- 종료 조건이 없는것
- 값을 반환하는 걸 잊은 것
- 잘못된 값을 반환하는 것

위 세가지를 위반하면 Stack Overflow를 초래할 수 있다.

## Helper 메서드 재귀

```js
function outer(input) {
  var outerScopedVariable = [];

  function helper(helperInput) {
    //  outerScopedVariable 수정하기
    helper(helperInput--);
  }

  helper(input);

  return outerScopedVariable;
}
```

## 순수 재귀 팁

배열의 경우 slice, spread 연산자 및 배열의 ​​복사본을 만드는 concat 과 같은 메서드를 사용 하여 배열을 변경하지 않도록 합니다.

문자열은 변경할 수 없으므로 문자열의 복사본을 만들려면 slice, 하위 문자열 또는 하위 문자열 과 같은 메서드를 사용해야 합니다.

개체의 복사본을 만들려면 Object.assign 또는 spread 연산자를 사용하십시오.
