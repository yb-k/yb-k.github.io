---
emoji: 🍞
title: filter(Boolean)를 활용한 JS 배열 관리
date: '2023-01-15 20:39:00'
author: 김용범
tags: js es6 filter array
categories: JavaScript
---

> 이전 블로그에서 게시한 게시글을 이관하였습니다.
>
> 작성일자. 2021년 5월 26일

<br>

## 개요

`CRA(create-react-app)` 프로젝트를 `eject`하여 소스를 분석하던 도중 신기한 소스를 발견했다.

<br>

```js
const something = [...some].filter(Boolean);
```

<br>

## 분석

`JavaScript`에서 제공되는 배열은 `런타임 환경`에서 아래와 같이 존재 할 수 있다.

```js
const bad = undefined;
const bomb = [undefined, 5, null, , , undefined];

const arr = [bad, 1, 2, ...bomb];
// arr = [undefined, 1, 2, undefined, 5, null, undefined, undefined, undefined]
```

위에서 제공되는 예시와 같이 `undefined` 또는 `null`이 의도하지 않게 들어갈 수 있다.

이러한 가능성은 반복문에서 문제가 발생될 가능성이 크다.

```js
arr.map((item) => {
  console.log(item.value); // ERROR! Uncaught TypeError: Cannot read property 'item' of undefined
});
```

<br><br>

이를 해결하기위해 일반적으로 반복문 내에서 체크하는 로직을 삽입하여 처리하기도 한다.

```js
arr.map((item) => {
  if (item) {
    return item;
  }

  console.log(item.value);
});
```

<br><br>

하지만 이러한 처리방식은 아래와 같은 문제점을 야기한다.

1. 코드가 복잡해진다.
2. **배열이 또다른 새로운 배열로 확장되는 경우 또는 배열이 재사용되는 경우 동일하게 체크하는 로직을 삽입하여야한다.**

<br>

**이보다 더 좋은 방법은 없을까?**

<br>

## 도출

그 방법은 `filter(Boolean)`을 사용하여 배열을 **믿을 수 있는 상태**로 만드는 것이다!

심플하고 간단하게 사용할 수 있다.

```js
let array = [false, 0, -0, 0n, '', null, undefined, NaN, { hello: 'world' }];

console.log(array.filter(Boolean)); // [{hello: "world"}]
```

<br>

정리하면,

`Array.prototype.filter` 사용시,

`Boolean`을 `iterator` 로 사용하여 `false, 0, -0, 0n, "", null, undefined, NaN`를 제거할 수 있다.

<br><br>

## Reference

> [The filter(Boolean) trick](https://michaeluloth.com/filter-boolean)

```toc
```