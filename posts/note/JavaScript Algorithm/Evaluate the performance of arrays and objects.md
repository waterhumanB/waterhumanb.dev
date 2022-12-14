---
title: "빅오표기법으로 자바스크립트 배열과 오브젝트의 성능 평가"
date: "2022-11-14"
description: "빅오 표기법으로 자바스크립트의 배열과 오브젝트의 성능을 평가해보자!"
---

### 객체의 빅오

### 배열의 빅오

## 자바스크립트에서 객체를 사용할 때는 언젠인가?

- 객체는 정렬되어 있을 필요가 없을 떄 잘 자동한다.
- 빠른 접근과 입력, 제거를 원할 때 사용하기 좋다.

## 객체의 빅오

- Insertion - O(1)
- Removal - O(1)
- Searching - O(N)
- Access - O(1)

## 객체 메소드의 빅오

- Object.keys - O(N)
- Object.values - O(N)
- Object.entries - O(N)
- hasOwnProperty - O(1)

## 자바스크립트에서 배열을 사용할 때는 언제인가?

- 정렬된 데이터 구조를 사용 할 때 사용한다.
- 빠른 접근/삽입과 제거가 필요할 때 사용한다.

## 배열의 빅오

- Insertion - push O(1), unshift O(N) 이외 메소드 들은 다 다름
- Removal - pop O(1), shift O(N) 이외 메소드 들은 다 다름
- Searching - O(N)
- Access - O(1)

## 배열 메소드의 빅오

- push - O(1)
- pop - O(1)
- shift - O(N)
- unshift - O(N)
- concat - O(N)
- slice - O(N)
- splice - O(N)
- sort - O(N \* log N)
- forEach/map/filter/reduce/etc. - O(N)

[강의자료](https://cs.slides.com/colt_steele/built-in-data-structures-25)
