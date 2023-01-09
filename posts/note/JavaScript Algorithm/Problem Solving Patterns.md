---
title: "자바스크립트 알고리즘 문제 해결 패턴"
date: "2022-11-28"
description: "자바스크립트 알고리즘 문제 해결 패턴에 대해 알아보자!"
---

## 빈도 카운터

이 패턴은 개체 또는 집합을 사용하여 값/값의 빈도를 수집한다.

이렇게 하면 배열/문자열을 사용하는 중첩 루프 또는O(N^2) 작업이 필요하지 않을 수 있다.

예)
두 개의 배열을 받는 same 함수를 작성하세요.

배열의 모든 값이 두 번째 배열에서 해당 값을 제곱한 경우 함수는 true를 반환해야 합니다. 값의 빈도는 동일해야 합니다.

```js
same([1, 2, 3], [4, 1, 9]); // true
same([1, 2, 3], [1, 9]); // false
same([1, 2, 1], [4, 4, 1]); // false (must be same frequency)
```

기본 해결

```js
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }
  return true;
}
```

시간 복잡도 N^2

리팩토링

```js
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}
```

시간 복잡도 O(N)

## 다중 포인터

인덱스 또는 위치에 해당하는 포인터 또는 값을 생성 하고 특정 조건에 따라 시작, 끝 또는 중간으로 이동

최소한의 공간 복잡성으로 문제를 해결하는 데 매우 효율적이다.

예
정렬된 정수 배열을 받는 sumZero 라는 함수를 작성하세요. 함수는 합계가 0인 첫 번째 쌍 을 찾아야 합니다.
쌍이 존재하지 않는 경우 합계가 0이거나 정의되지 않은 두 값을 모두 포함하는 배열을 반환합니다.

```js
sumZero([-3, -2, -1, 0, 1, 2, 3]); // [-3,3]
sumZero([-2, 0, 1, 3]); // undefined
sumZero([1, 2, 3]); // undefined
```

기본 풀이

```js
function sumZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}
```

시간 복잡도 - O(N^2) & 공간 복잡성 - O(1)

리팩토링

```js
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}
```

시간 복잡도 - O(N) & 공간 복잡성 - O(1)

## 슬라이딩 윈도우

이 패턴에는 한 위치에서 다른 위치로 배열 또는 숫자가 될 수 있는 창 을 만드는 작업이 포함됩니다.

특정 조건에 따라 창이 커지거나 닫힙니다(그리고 새로운 창이 생성됨).

배열/문자열 등에서 데이터의 하위 집합을 추적하는 데 매우 유용합니다.

예
정수 배열과 n 이라는 숫자를 받아들이는 maxSubarraySum이라는 함수를 작성하세요 . 이 함수는 배열에 있는 n개의 연속 요소 의 최대 합계를 계산해야 합니다 .

```js
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2); // 10
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4); // 17
maxSubarraySum([4, 2, 1, 6], 1); // 6
maxSubarraySum([4, 2, 1, 6, 2], 4); // 13
maxSubarraySum([], 4); // null
```

순진한 해결책

```js
function maxSubarraySum(arr, num) {
  if (num > arr.length) {
    return null;
  }
  var max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}
```

시간 복잡도 - O(N^2)

리팩토링

```js
function maxSubarraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
```

시간 복잡도 - O(N)

## 분할 정복

이 패턴에는 데이터 세트를 더 작은 청크로 나눈 다음 데이터 하위 세트로 프로세스를 반복하는 것이 포함됩니다.

이 패턴은 시간 복잡성을 크게 줄일 수 있습니다.

예
정렬된 정수 배열이 주어지면 search라는 함수를 작성하십시오. 이 함수는 값을 받아들이고 함수에 전달된 값이 있는 인덱스를 반환합니다. 값을 찾지 못하면 -1을 반환

search([1,2,3,4,5,6],4) // 3
search([1,2,3,4,5,6],6) // 5
search([1,2,3,4,5,6],11) // -1

순진한 해결책

```js
function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
}
```

선형 검색

시간 복잡도 O(N)

리팩토링

```js
function search(array, val) {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];

    if (array[middle] < val) {
      min = middle + 1;
    } else if (array[middle] > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }

  return -1;
}
```

시간 복잡도 - Log(N) - 이진 검색

## 요약

문제 해결 방식을 개발하는 것은 매우 중요합니다.
코드를 작성하기 전에 코드에 대해 생각하면 항상 문제를 더 빨리 해결할 수 있습니다.
문제 해결 패턴에 유의하십시오.
주파수 카운터, 다중 포인터, 슬라이딩 윈도우, 분할 및 정복을 사용하면 시간과 공간 복잡성을 줄이고 더 어려운 문제를 해결하는 데 도움이 됩니다.
