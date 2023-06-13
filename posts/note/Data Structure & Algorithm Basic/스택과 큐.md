---
title: "스택과 큐"
date: "2023-01-09"
description: "스택과 큐 자료구조에 대해서 알아보자!"
---

## 스택 Stack

Last In First Out이라는 개념을 가진 선형 자료구조 이다.
바닥이 막힌 상자를 생각하면 이해하기 쉽다.

- Array로 표현할 수 있다. push와 pop을 이용하면 LIFO를 구현 가능하다.
- Linked List로 표현한다. head가 top으로 생각하면 된다.

## 큐 Queue

First In First Out이라는 개념을 가진 선형 자료구조다.
Linear Queue와 Circular Queue가 존재한다.

- 큐의 앞부분을 Front 뒷부분을 Rear
- 큐의 요소를 추가하는 것을 EnQueue
- 큐의 요소를 제거하는 것을 DeQueue

큐는 배열보다 연결 리스트로 표현해야 한다.
배열로 구현 하면 탐색과정에서 선형시간이 소요 되기 때문이다.

연결 리스트로 표현하면 front가 head가 되고 Rear가 tail이 된다.

### 선형 큐 Circular Queue

Front와 Rear가 이어져있는 Queue로
Circular Queue는 Linked List로 구현했을 때 이점이 없다.
