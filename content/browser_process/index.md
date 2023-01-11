---
emoji: 🥚
title: 브라우저 동작 원리
date: '2023-01-11 16:44'
author: 김용범
tags: blog gatsby theme 개츠비 테마
categories: browser webkit gecko
---

## 개요
**웹 브라우저**는 가장 널리 사용되는 소프트웨어중 하나로

`Webkit`이나 `Gecko`와 같은 렌더링 엔진을 사용한다.

ex) Chrome, Internet Explorer, Fierfox, Safari, Opera 등등..

Opera를 제외한 모든 브라우저는 **Webkit** 렌더링 엔진을 사용하고 있다.


## 주요 기능
서버(server)에 요청(request)하고 브라우저 창에 웹리소스를 읽어 오는 것으로

일반적으로 HTML 문서를 웹 리소스로 하용한다.

리소스의 위치는 URI(Uniform Resource Identifier)를 사용하여 사용자가 지정할 수 있다.

> 이러한 브라우저가 HTML 파일을 해석하고 표시하는 방법은
> 
> `World Wide Web Consortium (W3C)`에서 관리하고 대부분의 브라우저는 이를 따르고 있습니다.
>
> [W3C 바로가기](https://www.w3.org/)



### 공통 인터페이스 

브라우저는 일반적으로 사용자 인터페이스를 제공합니다.

-   URI 삽입을 위한 주소 표시줄
-   뒤로 및 앞으로 버튼
-   북마크
-   새로고침 버튼
-   홈 버튼

을 공통적으로 제공하고 있습니다.

[##_Image|kage@bcP6Cr/btqM5fP64ui/y66IydeRTkaAqCUhO5L2gK/img.png|CDM|1.3|{"originWidth":500,"originHeight":339,"style":"alignCenter","mobileStyle":"widthContent"}_##]

1. 사용자 인터페이스: 브라우저에서 요청된 페이지를 볼 수 있는 창을 제외한 나머지입니다.

2. 브라우저 엔진: 사용자 인터페이스와 렌더링 엔진 사이의 동작을 제어

3. 렌더링 엔진: 요청한 콘텐츠를 화면에 표시

4. 통신: HTTP 요청과 같은 네트워크 호출에 사용

5. UI Backend: 콤보 박스와 창 같은 기본적인 장치를 그림.(브라우저별 정의된 UI)

6. JavaScript Interpreter: 자바스크립트 해석 및 실행

7. Data Storage: 자료를 저장

Chorme과 같은 브라우저는 각 탭마다 별도의 렌더링 엔진 인스턴스를 유지한다!

각 탭은 독립된 프로세스로 처리됩니다.

**렌더링 엔진의 동작과정**

1. DOM Tree 구축을 위한 HTML 파싱 (html)

2. 렌더 트리 구축 (css, style tag)

3. 렌더 트리 배치 (위치 계산)

4. 렌더 트리 그리기(paint)

렌더링 엔진은 가능한 한 빨리 화면에 내용을 표시하려고 하기때문에

모든 HTML이 분석이 될때까지 기다리지 않고

일부 콘텐츠가 분석되고 표시되는 동안 네트워크를 통해 전달받은 나머지 콘텐츠로 작업이 계속된다.

## 주요 흐름

[##_Image|kage@cmv7cm/btqM5UkEZ56/NCxro7mhQXUmJwW1KISR71/img.png|CDM|1.3|{"originWidth":624,"originHeight":289,"style":"alignCenter","mobileStyle":"widthContent","caption":"WebKit 기본 흐름"}_##][##_Image|kage@bijRnh/btqMX9Kpjpd/Ci8Lpp8mkM0S6dvrRhIdmK/img.jpg|CDM|1.3|{"originWidth":624,"originHeight":290,"style":"alignCenter","mobileStyle":"widthContent","caption":"Gecko 기본 흐름"}_##]

**HTML 파서**

XML과 HTML의 형태가 유사하지만 파서에서 차이가 난다.

XML보다 HTML은 유연한 문법으로 암묵적인 태그 생략이 가능하다는 점이 큰 차이이다.

**DOM**

DOM(Document Object Model)의 줄임말로,

HTML 문서를 객체로 표현한 것으로 최상의 객체로는 문서(Document)이다.

DOM은 마크업과 1:1 관계를 맺는다.

```
 <html>
  <body>
   <p>Hello World</p>
   <div><img src="example.png" /></div>
  </body>
</html>  
```

이것은 아래의 DOM 트리로 변환할 수 있다.

[##_Image|kage@brPzfG/btqM38YgmuP/iNqvGSQ0KUJWPw7BnI8TJ1/img.png|CDM|1.3|{"originWidth":400,"originHeight":219,"style":"alignCenter","mobileStyle":"widthContent"}_##]

**WebKit CSS Parser**

아래의 예시와 같이 파싱이 진행된다.

[##_Image|kage@kxV26/btqM2GVgIra/9xyKSZIbuOeXrqmVs6Ea4K/img.png|CDM|1.3|{"originWidth":500,"originHeight":393,"style":"alignCenter","mobileStyle":"widthContent"}_##]

**스크립트와 스타일 시트의 진행 순서**

웹은 파싱과 실행이 동시에 수행되는 동기화 모델이다.

파서가 `<script>` 태그를 만나면 즉시 파싱하고 스크립트가 실행되는 동안 문서의 파싱은 중단된다.

개발자는 스크립트를 defer로 표시할 수 있는데

이를 통해 문서 파싱이 완료된 후 스크립트가 실행할 수 있도록 처리할 수 있다.

HTML5는 스크립트를 비동기로 처리하는 속성을 추가했기때문에 별도의 맥락에 의해 파싱되고 실행된다.

sciprt defer 속성: [developer.mozilla.org/ko/docs/Web/HTML/Element/script](https://developer.mozilla.org/ko/docs/Web/HTML/Element/script)

참조: [d2.naver.com/helloworld/59361](https://d2.naver.com/helloworld/59361)

[www.html5rocks.com/en/tutorials/internals/howbrowserswork/](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)

 [How Browsers Work: Behind the scenes of modern web browsers - HTML5 Rocks

In this comprehensive primer, you will learn what happens in the browser between when you type google.com in the address bar until you see the Google page on the browser screen.

www.html5rocks.com](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)