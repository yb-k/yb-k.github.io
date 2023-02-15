---
emoji: 🍎
title: Practice Nodejs CLI App
date: '2023-02-15 09:28:00'
author: 김용범
tags: nodejs-cli nodejs
categories: nodejs 
---

# Practice Nodejs CLI App

# Reference

현재 게시글은 lirantal의 nodejs-cli-apps-best-practices를 정리한 내용입니다.

대부분 구글번역기를 사용하였지만.. 개인적인 견해로 빠지거나 수정된 부분이 있기때문에 Nodejs CLI에 대한 개발 구성을 고려하고계시다면

꼭 원문을 참고하시길 바랍니다.

감사합니다.

> [원문 lirantal/nodejs-cli-apps-best-practices](https://github.com/lirantal/nodejs-cli-apps-best-practices)

## 1. Command Line Experience(경험)

이 목차에서는 수준 높은 사용자 경험을 제공하는 `nodejs` CLI을 만드는 것과 관련된 모범사례를 다룹니다.

### 1.1 Respect POSIX args

`POSIX`규격을 지킬것

> `POSIX`란, IEEE가 제정한 유닉스의 애플리케이션 프로그래밍 인터페이스(API) 규격이다

✅ **DO**: CLI의 표준으로 인정되는 `POSIX` 규격을 사용합니다.

❌ **Otherwise**: 사용자는 표준 규격이 아닌 CLI에 실망할 수 있습니다.

ℹ️ **Detail**

Unix 계열의 OS는 `awk`, `sed`와 같은 CLI의 사용을 대중화했습니다. 이러한 커맨드 프로그램의 사용은 옵션(플래그), 옵션 인수 및 기타 피연산자의 동작을 효과적으로 표준화하였습니다.

몇가지 예

- 옵션의 인수값들을 대괄호([])를 표시하여 선택사항임을 나타내거나 꺽쇠(<>)를 사용하여 필수임을 표시하였습니다.
- 짧은 형식의 단일 문자 인수를 긴 형식 인수의 별칭으로 허용합니다.
- 옵션에 대하여 `-`를 사용하며 하나의 영문자를 포함합니다.
- 값이 없는 옵션을 사용할때 그룹화가 가능합니다.(`cli -abc` 는 `cli -a -b -c`와 동일합니다.)

따라서, 사용자는 CLI이 Unix App과 유사한 규칙을 가지길 기대합니다.

📦 **Recommended packages**

오픈소스 패키지

- commander
- yargs

### 1.2 Build empathic CLIs

사용자 친화적인 CLI를 만들것

✅ **Do**: 사용자와 CLI가 원활하게 상호 작용할 수 있도록 워크플로우를 작성할 필요가 있습니다.

❌ **Otherwise**: 사용자에게 기능들이 적절하게 동작하지 않는다면, 실망할 수 있습니다.

### 1.3 Stateful data

✅ **Do**: CLI 앱의 여러 호출 간에 상태를 저장,제공하고 원활한 상호 작용을 제공하기 위해 값과 데이터를 기억합니다.

❌ **Otherwise**: 사용자가 CLI를 여러 번 호출하여 동일한 정보를 반복적으로 제공하도록 요구하면 사용자를 짜증나게 할 것입니다.

ℹ️ **Detail**

CLI를 여러 번 호출할 때 사용자 이름, 이메일, API 토큰 또는 기타 기본 설정을 기억하는 것과 같이 CLI 애플리케이션에 영속성 스토리지를 제공해야 하는 경우가 있을 수 있습니다.

앱이 이러한 사용자 설정을 유지할 수 있도록 하는 configuration helper 를 사용합니다.

파일을 읽고 쓸 때 [XDG 기본 디렉토리 사양](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)을 따라야 합니다.
(또는 사양을 존중하는 configuration helper 선택) 이를 통해 사용자는 파일이 기록되고 관리되는 위치를 제어할 수 있습니다.

Reference projects:

- configstore
- conf

### 1.4 Provide a colorful experience

다채로운 경험 제공

✅ **Do**: CLI 애플리케이션에서 색상을 사용하여 앱 출력의 일부를 강조 표시합니다.

❌ **Otherwise**: 특히 출력에 텍스트가 많은 경우 희미한 프로그램 출력에서 ​​정보가 쉽게 손실될 수 있습니다.

ℹ️ **Detail**

오늘날 커맨드 프로그램과 상호 작용하는 데 사용되는 대부분의 터미널은 특별히 제작된 ANSI 인코딩 문자로 활성화되는 것과 같은 컬러 텍스트를 지원합니다.

커맨드 프로그램 출력의 다채로운 디스플레이는 더욱 풍부한 경험과 향상된 상호 작용에 기여할 수 있습니다. 즉, 지원되지 않는 단말기는 화면에 왜곡된 정보의 형태로 출력이 저하될 수 있습니다. 또한 컬러 출력을 지원하지 않을 수 있는 지속적 통합 빌드 작업에서 CLI를 사용할 수 있습니다. 빌드 서버 외부에서도 특정 문자를 처리하지 못하는 IDE의 콘솔을 통해 CLI를 사용할 수 있습니다. 수동 옵트아웃이 가능해야 합니다.

📦 Recommended packages

Reference to Open Source Node.js packages:

- chalk
- colors
- kleur

### 1.5 Rich interactions

풍부한 상호작용

✅ **Do**: CLI 사용자에게 보다 원활한 경험을 제공하기 위해 텍스트 입력 외의 다양한 입력 방식을 활용할 필요가 있습니다..

❌ **Otherwise**: 제공된 데이터가 비가시적 옵션(예: 드롭다운)의 형태인 경우, 텍스트 입력은 사용자에게 번거로울 수 있습니다.

ℹ️ **Detail**

드롭다운 선택 목록, 라디오 버튼 토글, 평가, 자동 완성 또는 숨겨진 암호 입력과 같이 자유 텍스트보다 더 기능적인 사용자 입력의 타입을 제공할 수 있습니다.

또 다른 유형은 비동기 작업이 수행될 때 사용자에게 더 나은 경험을 위해 제공하는 애니메이션 로더 및 진행률 표시줄의 형태입니다.

대부분의 CLI는 기본 command 인수를 제공합니다. 앱이 자체적으로 해결할 수 있는 매개변수를 사용자에게 입력하도록 강제하지 마세요.

📦 Recommended packages

Reference to Open Source Node.js packages:

- enquirer
- ora
- ink
- prompts

### 1.6 Hyperlinks everywhere

어디곳에서나 하이퍼링크

Reference projects:

✅ **Do**:텍스트 출력에 올바른 형식의 하이퍼링크를 사용하십시오.

> URL(예: https://www.github.com) 또는 소스코드(예: src/Util.js:2:75)

둘 다 최신 터미널이 클릭 가능한 링크로 변환할 수 있습니다.

❌ **Otherwise**: 다음과 같이 사용자가 복사 & 붙여넣기하여 사용하여야하는 비활성 링크는 사용하지 마십시오.(예: git.io/abc)

ℹ️ **Detail**

URL에 대한 링크를 공유하거나 파일과 파일의 특정 줄 번호 및 열을 가리키는 경우 클릭하면 브라우저 또는 IDE가 열리는 올바른 형식의 링크를 제공할 수 있습니다.

Reference projects:

- open

### 1.7 Zero configuration

별도의 구성 없이

✅ **Do**: 필수 구성 및 command 인수 값을 자동 감지하여 플러그 앤 플레이 환경을 최적화합니다.

❌ **Otherwise**: command 인수를 신뢰할 수 있는 방식으로 자동 감지할 수 있고 호출된 작업에 사용자 상호 작용(예: 삭제 확인)이 명시적으로 필요하지 않은 경우 사용자 상호 작용을 강제하지 마십시오.

ℹ️ **Detail**

CLI 애플리케이션을 실행할 때 "즉시 사용 가능한" 경험을 제공하는 것을 목표로 하십시오. 예를 들어, POSIX는 다양한 용도로 사용되는 환경 변수 구성에 대한 표준을 정의합니다. `TMPDIR`, `NO_COLOR`, `DEBUG`, `HTTP_PROXY` 등과 같은, 이를 자동으로 감지하고 필요한 경우 확인 메시지를 표시합니다.

Zero configuration 참조 프로젝트

- The Jest JavaScript Testing Framework
- Parcel, a web application bundler

### 1.8 Respect POSIX signals

POSIX 시그널을 지켜라

✅ **Do**: 프로그램이 POSIX 시그널를 존중하여 사용자 또는 다른 프로그램과의 적절한 상호 작용을 허용하는지 확인하십시오.

❌ **Otherwise**: 귀하의 프로그램은 다른 프로그램과 잘 작동하지 않으며 예상치 못한 동작을 일으킵니다.

ℹ️ **Detail**

특히 CLI 애플리케이션의 경우 사용자 입력과 상호 작용하는 것이 일반적이며 키보드 이벤트를 부적절하게 관리하면 사용자가 일반적으로 사용하는 SIGINT 일시정지시 사용하는 `CTRL+C` 키를 누를 때 앱이 응답하지 못할 수 있습니다.

프로세스 시그널를 지키지 않는 경우에는 사람이 아닌 프로그램의 상호 작용에 의해 조정될 때 악화됩니다. 예를 들어, 도커 컨테이너에서 실행되지만 전송된 소프트웨어 일시정지 시그널에 응답하지 않는 CLI가 있습니다.

## 2 Distribution

이 섹션에서는 소비자를 위한 최적의 문제로 Node.js CLI 애플리케이션을 배포하고 패키징하는 것과 관련된 모범 사례를 다룹니다.

### 2.1 Prefer a small dependency footprint

작은 의존성 풋프린트 선호

✅ **Do**: 운영환경에서의 종속성을 최소화하고, 더 작은 종속성으로 대치하고, Node.js CLI의 최소한의 번들을 보장하기 위해 종속성의 풋프린트와 전이적 종속성을 검사합니다. 중복적인 종속성 사용을 과도하게 최적화하지 않도록 주의하여 균형을 유지해야합니다.

❌ **Otherwise**: 애플리케이션에서 종속성의 크기와 사용이 Node.js CLI의 설치 시간에 영향을 미쳐 사용자 경험이 저하될 수 있습니다.

ℹ️ **Detail**

`npx`로 호출된 Node.js CLI에 대한 빠른 `npm install`는 더 나은 사용자 경험을 제공합니다.이는 전체 종속성과 전이적 종속성, 풋프린트가 합리적인 크기로 유지될 때 가능합니다.

`npm` 설치는 최초 한번의 느린 속도로 저수준의 경험을 제공하지만,
`npx`는 호출할때 매번 패키지를 재설치하기 때문에 이 부분에서의 차이는 명확하다.

Reference projects:

- **Bundlephobia**is a tool to help you find the cost of a npm package.

### 2.2 Use the shrinkwrap, Luke

✅ **Do**: npm을 `npm-shrinkwrap.json` lockfile로 사용하여 최종 사용자가 npm 패키지를 설치할 때 고정 종속성 버전(직접 및 전이)이 전파되도록 합니다.

❌ **Otherwise**: 앱의 종속성 버전을 수정하지 않으면 패키지 관리자(예: npm)가 설치 중에 이를 해결하고 버전 범위를 통해 설치된 전이적 종속성으로 인해 제어할 수 없는 주요 변경 사항이 있는 경우 Node.js의 빌드 또는 실행이 실패할 수 있습니다.

ℹ️ **Details**

shrinkwrap을 사용하십시오. 아멘

> 해당 내용은 nodejs 프로젝트의 패키지 의존성의 관련된 내용이다.
>
> shrinkwrap.json는 package-lock.json과는 다르게 강제성이 따르는데,
>
> 이는 최종 사용자가 종속성 업데이트를 할 수 없다는 것이며,
>
> 다른 의존성 문제를 야기할 수 있다고 판단된다. (os, nodejs version, app project내 라이브러리 종속성 등)
>
> ionic-cli 에서도 lockfiles은 apps에서만 생성,관리할 수 있도록 처리하고있다.

### 2.3 Cleanup configuration files

설정 파일 정리

✅ **Do**: CLI 애플리케이션이 제거되면 설정 파일을 정리합니다. 선택적으로 CLI 애플리케이션은 더 나은 사용자 경험을 위해 다음 설치 시 재초기화 단계를 건너뛰도록 설정 파일을 유지하라는 메시지를 사용자에게 표시할 수 있습니다.

❌ **Otherwise**: 사용자의 파일 시스템에는 고립된 설정 파일 형태의 잔여물과 CLI tool이 설치될 때 도입한 식별 가능한 데이터가 포함될 수 있습니다.

ℹ️ **Details**
상태 저장 데이터 내용에서 언급한 것처럼 CLI 애플리케이션이 설정 파일을 저장하는 것과 같이 영구 스토리지를 사용하는 경우 CLI 애플리케이션은 설치 제거 시 설정 파일을 제거해야 합니다.

npm package manager가 npm v7부터 제거 hook를 제공하지 않기 때문에 프로그램에는 인수 (예 --uninstall: ) 또는 별도의 사용자 입력을 통해 제거할 수 있는 옵션이 포함되어야 합니다 .

> 👍 Tip
>
> 선택적으로 npm 버전이 6 이하인 경우 자동으로 호출되는 `pre` 및 `post` uninstall 스크립트를 제공할 수 있습니다. 이 [저장소](https://github.com/m-sureshraj/jenni/blob/master/src/scripts/pre-uninstall.js) 에서 작업 예제를 찾을 수 있습니다.

## 3 Interoperability

상호 운용성

이 섹션에서는 Node.js CLI를 다른 command 도구와 원활하게 통합하고 CLI가 작동하는 데 자연스러운 규칙을 따르는 것과 관련된 모범 사례를 다룹니다.

이 섹션은 다음과 같은 질문에 답합니다.

- 쉬운 구문 분석을 위해 이 CLI의 출력을 내보낼 수 있습니까?
- 이 CLI의 출력을 다른 command 도구의 입력으로 파이프할 수 있습니까?
- 다른 도구의 결과를 이 CLI로 파이프할 수 있습니까?

### 3.1 Accept input as STDIN

STDIN 입력 지원할 것

✅ **Do**: 데이터 작업이 예상되는 command 응용 프로그램의 경우 사용자가 데이터를 표준 입력(STDIN)으로 쉽게 파이프할 수 있도록 합니다.

❌ **Otherwise**:다른 command 응용 프로그램은 CLI에 대한 입력으로 직접 결과를 제공할 수 없으므로 다음과 같은 일반적인 UNIX 한 줄을 방지합니다.

```bash
$ curl -s "https://api.example.com/data.json" | your_node_cli
```

ℹ️ **Details**

command 애플리케이션이 데이터와 함께 작동하는 경우,
일반적으로 `--file <file.json>` command 인수로 지정되는 JSON 파일에서 일종의 작업을 수행합니다.

**명령 파이프에서 입력을 받는 방법에 대한 readline 모듈**의 공식 Node.js API 문서를 기반으로 하는 예는 다음과 같습니다.

```js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What do you think of Node.js? ", (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
```

그런 다음 위의 Node.js 애플리케이션에 입력을 파이프합니다.

```bash
echo "Node.js is amazing" | node cli.js
```

### 3.2 Enable structured output

구조화된 출력를 지원할 것

✅ **Do**: 앱 결과의 구조화된 출력을 허용하는 플래그를 활성화합니다(그러한 결과가 있는 경우). 데이터를 구문 분석하고 쉽게 조작할 수 있습니다.

❌ **Otherwise**: CLI 사용자는 CLI에서 제공하는 출력 데이터를 추출하기 위해 복잡한 정규식 구문 분석 및 일치 기술을 적용해야 할 수 있습니다.

ℹ️ **Details**

command 애플리케이션 사용자가 데이터를 구문 분석하고 데이터를 사용하여 웹 대시보드 또는 이메일 알림을 제공하는 것과 같은 다른 작업을 수행하는 데 종종 유용합니다.

command 출력에서 ​​관심 있는 데이터를 쉽게 추출할 수 있으므로 CLI 사용자에게 친숙한 환경을 제공합니다.

### 3.3 Cross-platform etiquette

크로스 플랫폼 에티켓

✅ **Do**: CLI가 여러 플랫폼에서 작동할 것으로 예상되는 경우 관련 프로그래밍 구조를 활용하는 개발자와 함께 명령 셸 및 파일 시스템과 같은 구성 요소의 의미 체계에 적절한 주의를 기울여야 합니다.

❌ **Otherwise**: 코드에 기능적 차이가 없더라도 잘못된 경로 구분 문자와 같은 요인으로 인해 다른 운영 체제에서 CLI가 중단됩니다.

ℹ️ **Details**

프로그램의 관점에서 기능이 제거되지 않고 다른 운영 체제에서 잘 실행되어야 하지만 일부 누락된 문법이가 프로그램을 작동하지 않게 만들 수 있습니다. 교차 플랫폼 에티켓를 존중해야 하는 몇 가지 사례를 살펴보겠습니다.

#### Wrongly spawning a command

Node.js 프로그램을 실행하는 프로세스를 생성해야 할 수도 있습니다.
예를 들어 다음 스크립트가 있습니다.

`program.js`

```bash
#!/usr/bin/env node

// the rest of your app code
```

이것은 작동합니다.

```js
const cliExecPath = "program.js";
const process = childProcess.spawn(cliExecPath, []);
```

개선된 처리입니다.

```js
const cliExecPath = "program.js";
const process = childProcess.spawn("node", [cliExecPath]);
```

왜 더 나은가요? 소스 `program.js`코드는 Unix와 유사한 Shebang(셔뱅) 표기법으로 시작하지만 Shebang이 크로스 플랫폼 표준이 아니기 때문에 Windows는 이것을 해석하는 방법을 모릅니다.

이것은 `package.json` scripts에도 해당됩니다.
나쁜 습관의 npm run script:

```json
"scripts": {
  "postinstall": "myInstall.js"
}
```

이는 `myInstalls.js`의 Shebang이 Windows가 `node` interpreter로 이를 실행하는것에 도움이 되지 않기 때문입니다.

대신 다음 모범 사례를 따르십시오.

```json
"scripts": {
  "postinstall": "node myInstall.js"
}
```

#### Shell interpreters vary

쉘 인터프리터는 다양합니다.

모든 문자가 다른 쉘 인터프리터에서 동일하게 취급되는 것은 아닙니다.

예를 들어 Windows 명령 프롬프트는 bash shell에서 예상되는 것과 같이 작은따옴표(')를 큰따옴표(")와 동일하게 취급하지 않으므로 작은따옴표 안의 전체 문자열이 같은 문자열에 속한다는 것을 인식하지 못합니다.이는 오류를 야기할 수 있습니다.

Windows Node 환경에서 Windows command prompt를 사용할떄 실패 케이스는 아래와 같습니다.

package.json

```json
"scripts": {
  "format": "prettier-standard '\*_/_.js'",
  ...
}
```

이 npm run script가 실제로 Windows, macOS 및 Linux 간에 교차 플랫폼에서의 동작하기위해 수정하려면 다음을 수행하십시오.

package.json

```json
"scripts": {
  "format": "prettier-standard \"\*_/_.js\"",
  ...
}
```

이 예에서는 큰따옴표를 사용하고 JSON 표기법으로 이스케이프해야 했습니다.

#### Avoid concatenating paths

경로 연결 방지

경로는 플랫폼에 따라 다르게 설정됩니다. 문자열을 연결하여 수동으로 빌드하면 서로 다른 플랫폼 간에 상호 운용할 수 없습니다.

다음과 같은 나쁜 습관의 예를 살펴보겠습니다.

```js
const myPath = `${__dirname}/../bin/myBin.js`;
```

예를 들어 Windows에서 백슬래시가 사용되는 경로 구분 기호는 슬래시라고 가정합니다.

파일 시스템 경로를 수동으로 빌드하는 대신 Node.js의 자체 path 모듈에 따라 다음을 수행하십시오.

```js
const myPath = path.join(__dirname, "..", "bin", "myBin.js");
```

#### Avoid chaining commands with semicolons

세미콜론(;)으로 command을 연결하지 마십시오.

Linux shell은 세미콜론을 지원하여 다음과 같이 순차적으로 실행되는 명령을 연결하는 것으로 알려져 있습니다.(예: `cd /tmp; ls`) 그러나 Windows에서 동일한 작업을 수행하면 실패합니다.

다음을 수행하지 마십시오.

```js
const process = childProcess.exec(`${cliExecPath}; ${cliExecPath2}`);
```

대신 이중 앰퍼샌드 또는 이중 파이프 표기법을 사용하십시오.

```js
const process = childProcess.exec(`${cliExecPath} || ${cliExecPath2}`);
```

### 3.4 Support configuration precedence

configuration 우선순위 지원

✅ **Do**: 우선 순위에 따라 여러 소스에서 구성을 얻을 수 있도록 허용합니다. 커맨드 인수가 가장 높은 우선 순위를 가지며 그 다음이 셸 변수, 다른 수준의 구성 순입니다.

❌ **Otherwise**: 사용자는 이러한 우선순위를 재정의하는 것에 부정적입니다.

ℹ️ **Details**
호출된 CLI 애플리케이션의 동작을 수정하기 위해 많은 도구 체인에서 일반적인 방법이 될 것이며, 환경 변수를 사용하여 configuration setting을 감지하고 지원합니다.

커맨드 프로그램의 configuration 우선 순위는 다음을 따라야 합니다.

- 애플리케이션이 호출될 때 지정된 커맨드 인수입니다.
- 생성된 shell의 환경 변수 및 애플리케이션에서 사용할 수 있는 기타 환경 변수.
- 프로젝트 범위 구성, 예: 로컬 디렉터리 `.git/config`파일
- 사용자 범위 구성, 예: 사용자의 홈 디렉토리 구성 파일:` ~/.gitconfig` 또는 이에 상응하는 XDG: `~/.config/git/config`
- 시스템 범위 구성, 예: `/etc/gitconfig`.

Reference projects:

- cosmiconfig

## 4 Accessibility

접근성

이 섹션에서는 사용자가 Node.js CLI 애플리케이션을 사용할 수 있도록 만드는 것과 관련된 모범 사례를 다룹니다. 관리자가 어플리케이션 환경에 대한 고려하지 않았더라도 말이죠.

### 4.1 Containerize the CLI

CLI 컨테이너화

✅ **Do**: Node.js 환경이 없는 사용자가 사용할 수 있도록 CLI용 도커 이미지를 만들고 Docker 허브와 같은 공용 레지스트리에 게시합니다.

❌ **Otherwise**: Node.js 환경이 없는 사용자는 CLI 애플리케이션을 가지 npm거나 npx사용할 수 없으므로 CLI 애플리케이션을 실행할 수 없습니다.

ℹ️ **Details**

npm 레지스트리에서 Node.js CLI 애플리케이션을 설치하는 것은 일반적으로 Node.js native toolchain(`npm` or `npx` 와 같은)을 사용하여 수행됩니다.
이는 JavaScript 및 Node.js 개발자에게 공통적이며 설치 지침 내에서 참조될 것으로 예상됩니다.

그러나 JavaScript에 대한 친숙성 또는 toolchain 가용성에 관계없이 일반 대중이 사용하는 CLI 애플리케이션을 대상으로 하는 경우 npm 레지스트리에서 설치 형식으로만 CLI 애플리케이션을 배포한다면 제약사항이 있습니다. CLI 애플리케이션을 빌드 또는 CI 환경에서 사용하려는 경우 Node.js 관련 toolchain을 설치할 필요가 있습니다.

실행 파일을 패키징하고 배포하는 방법에는 여러 가지가 있으며 CLI 애플리케이션과 함께 미리 번들로 제공되는 Docker 컨테이너로 실행 파일을 컨테이너화하는 것은 쉽게 사용할 수 있는 대안이며, 종속성이 없습니다(Docker 환경이 필요한 것 제외).

4.2 Graceful degradation

점진적 저하

✅ **Do**: 지원되지 않는 환경에서 다채롭고 애니메이션이 풍부한 디스플레이를 선택 해제할 수 있는 기능을 사용자에게 제공합니다.
상호 작용을 건너뛰고 형식이 지정된 출력을 JSON 형식으로 제공할 수 있습니다.

❌ **Otherwise**: 다양한 출력을 제공하고 프롬프트 및 기타 디스플레이가 풍부한 인터페이스와 같은 터미널 대화형을 사용하면 지원되는 터미널이 없는 사용자의 최종 사용자 경험이 크게 저하되고 CLI 애플리케이션을 사용하지 못하게 할 수 있습니다.

ℹ️ **Details**

화려한 출력 형태로 풍부한 단말기 디스플레이를 제공하는 것이 일반적이지만, ascii 코드들, 또는 터미널의 애니메이션과 강력한 프롬프트 메커니즘과 같은. 이는 지원되는 터미널이 있는 사용자에게는 훌륭한 사용자 경험에 기여할 수 있지만, 그렇지 않은 사용자에게는 텍스트가 깨져 표시되거나 완전히 작동하지 않을 수 있습니다.

지원되지 않는 터미널을 사용하는 사용자가 Node.js CLI 애플리케이션을 올바르게 사용할 수 있도록 하려면 다음 내용을 고려해보십시오.

- 터미널 기능을 자동 감지하고 런타임 동안 CLI 상호 작용을 저하시킬지 여부를 평가합니다.
- `--json`원시 데이터를 강제로 출력하도록 command 인수를 제공하는 것과 같이 사용자가 점진적 저하를 명시적으로 전환할 수 있는 옵션을 제공합니다 .

> 👍 Tip
>
> Supporting graceful degradation such as JSON output isn't only useful for
> end-users and their unuspported terminals, but is also valuable for running
> in continuous integration environments, as well as enabling users
> the ability to connect your program's output with other program's input or
> export data if needed.

### 4.3 Node.js versions compatibility

Node.js 버전 호환성

✅ **Do**: 지원 및 유지 관리되는 Node.js 버전을 대상으로 합니다.

❌ **Otherwise**: 이전 및 지원되지 않는 Node.js 버전과의 호환성을 유지하려는 코드 기반은 유지 관리가 어려우며 언어 및 런타임 기능의 이점을 잃게 됩니다.

ℹ️ **Details**

때로는 새로운 ECAMScript 기능이 없는 이전 Node.js 버전을 예외적인 대상으로 지정해야 할 수도 있습니다. 예를 들어, 대부분 DevOps 또는 IT에 맞춰진 Node.js CLI를 구축하는 경우에는 최신 런타임이 포함된 이상적인 Node.js 환경이 없을 수 있습니다.

참고로 Debian Stretch(oldstable)는 Node.js 8.11.1 과 함께 제공됩니다 .

지원이 끝난 Node.js 8, 6 또는 4와 같은 이전 버전의 Node.js를 대상으로 해야 하는 경우,V8 JavaScript 엔진 및 Node.js 런타임은 해당 버전과 함께 제공되기 때문에 Babel을 사용한 코드 생성을 통해 소스코드를 지원 할 수있도록 해야합니다.

또 다른 해결 방법은 컨테이너화된 버전의 CLI를 제공하여 이전 대상을 방지하는 것입니다. 섹션 (4.1) CLI 컨테이너화를 참조하십시오 .

유지 관리되지 않은 버전 또는 지원이 끝난 Node.js 버전과 일치하는 이전 ECMAScript 언어 사양을 사용하기 위해 프로그램 코드를 바보로 만들지 마십시오. 코드 유지 관리 문제만 발생할 수 있습니다.

지원되지 않는 환경에서 CLI가 호출되면 감지를 시도하고 설명 오류 메시지와 함께 종료하여 오류 메시지를 표시해야합니다.

dockly에 대한 이 [예제](https://github.com/lirantal/dockly/blob/42d8c09631bc5348f108a50c3ce9601851fb760b/index.js#L25)를 참조하십시오 .

### 4.4 Shebang autodetect the Node.js runtime

Shebang이 Node.js 런타임 자동 감지

✅ **Do**:런타임 환경을 기반으로 Node.js 런타임을 자동으로 찾는 Shebang 선언에서 설치에 영향을 받지 않는 참조를 사용합니다. `#!/usr/bin/env node` 처럼

❌ **Otherwise**: `#!/usr/local/bin/node`와 같이 하드 코딩된 Node.js 런타임 위치를 사용하는 것은 local한 환경에만 해당되며 Node.js의 위치가 다른 다른 환경에서는 Node.js CLI가 작동하지 않을 수 있습니다.

ℹ️ **Details**

entry point를 `node cli.js`로 실행하거나 Node.js CLI를 쉽게 개발할 수 있습니다. 또는 `#!/usr/local/bin/node`를 cli.js 파일의 맨 위에 추가할 수 있습니다.
그러나 후자는 노드 실행 파일의 위치가 다른 사용자의 환경에 대해 보장되지 않기 때문에 여전히 결함이 있는 접근 방식입니다.

`#!/usr/bin/env node`를 모범 사례로 지정하는 것이 좋습니다.
Node.js 런타임이 `nodejs` 등이 아닌 `node`로 참조된 다는 가정하에 입니다.

## 5 Testing

### 5.1 Put no trust in locales

locale을 신뢰하지 말것

✅ **Do**: 테스트는 locale이 각기 다른 시스템에서 실행될 수 있으므로 출력 텍스트가 주장하는 문자열과 동일하다고 검증하지 마십시오.

❌ **Otherwise**: 개발자는 다른 locale의 시스템에서 테스트할 때 테스트 실패를 맞이하게됩니다.

ℹ️ **Details**

CLI를 실행하고 출력을 구문 분석하여 CLI를 테스트하기로 선택하면 CLI가 인수 없이 실행될 때 예제를 적절하게 제공하는 것과 같이 특정 기능이 출력에 존재하는지 확인하기 위해 grep을 수행할 수 있습니다. 예:

```js
const output = execSync(cli);
expect(output).to.contain("Examples:"));
```

영어 기반으로 테스트를 진행하지 않는 경우, 시스템 기본 locale을 자동으로 감지하여 locale을 변환 되는 library를 사용하는 경우에는 위의 예제는 실패할 수 있습니다.

## 6 Errors

이 섹션에서는 Node.js CLI 애플리케이션을 만들고 사용하고 싶지만 개발자가 설계한 이상적인 환경이 없는 사용자가 사용할 수 있도록 하는 것과 관련된 모범 사례에 대해 설명합니다.

이 섹션에 제시된 모범 사례의 목표는 사용자가 오류를 이해하기 위해 문서나 소스 코드를 참조할 필요 없이 빠르고 쉽게 오류 문제를 해결할 수 있도록 돕는 것입니다.

### 6.1 Trackable errors

추적가능한 오류

✅ **Do**: 오류를 보고할 때 프로젝트 문서에서 조회할 수 있는 추적 가능한 오류 코드를 제공하고 오류 메시지 문제 해결을 단순화합니다.

가능한 경우 추적 가능한 오류 코드를 추가 정보로 확장하여 쉽게 구문 분석하고 컨텍스트를 명확하게 할 수 있습니다.

❌ **Otherwise**: 일반 오류 메시지는 모호한 경향이 있으며 사용자가 해결책을 찾기 어렵게 만듭니다. 구문 분석 및 분석은 간단하지 않으며 문서에서 참조하는 것도 깨끗하지 않습니다.

ℹ️ **Details**

오류 메시지가 반환될 때 나중에 참조할 수 있는 참조 번호 또는 특정 오류 코드가 포함되어 있는지 확인하십시오. HTTP 상태 코드와 마찬가지로 CLI 애플리케이션을 수행하려면 명명되거나 코딩된 오류가 필요합니다.

Example:

```bash
$ my-cli-tool --doSomething

Error (E4002): please provide an API token via environment variables
```

### 6.2 Actionable errors

수정 가능한 오류

✅ **Do**: 실패한 오류 메시지는 오류가 있다고 불평하기보다는 사용자에게 수정이 필요한 사항을 알려야 합니다.

❌ **Otherwise**: 오류를 해결하기 위한 조치에 대한 힌트 없이 오류 메시지가 표시되는 사용자는 CLI 앱을 성공적으로 사용하지 못할 수 있습니다.

ℹ️ **Details**

Example:

```bash
$ my-cli-tool --doSomething

Error (E4002): please provide an API token via environment variables
```

### 6.3 Provide debug mode

디버그 모드 제공

✅ **Do**: 숙련된 사용자가 문제를 진단해야 하는 경우 더 자세한 정보를 사용하도록 허용합니다.

❌ **Otherwise**: 디버깅 기능을 건너뛰지 마십시오. 사용자로부터 피드백을 수집하고 오류의 원인을 정확히 찾아내기가 더 어려워질 것입니다.

ℹ️ **Details**

환경 변수와 커맨드 인수를 사용하여 확장된 디버그 상세 수준을 활성화합니다. 코드에서 의미가 있는 경우 사용자와 관리자가 프로그램 흐름, 입력 및 출력, 문제 해결을 더 쉽게 만드는 기타 정보를 이해하는 데 도움이 되는 디버그 메시지를 심습니다.

📦 Recommended packages

Reference to Open Source Node.js packages:

- debug

### 6.4 Proper use of exit codes

exit code의 적절한 사용

✅ **Do**: 오류 또는 종료 상태의 의미론적 의미를 전달하는 적절한 exit code로 프로그램을 종료합니다.

❌ **Otherwise**: exit code가 잘못되었거나 누락되면 지속적 통합 흐름 및 기타 command 스크립팅 사용 사례에서 CLI 사용이 방해를 받습니다.

ℹ️ **Details**

Command line scriptrs 는 종종 shell을 사용하여 `$?`프로그램의 상태 코드를 추론하고 이에 따라 조치를 취합니다. 이는 단계별로 성공적으로 완료되었는지 여부를 결정하기 위해 CI(지속적인 통합) flow에서도 활용됩니다.

CLI가 특정 상태 코드 없이 항상 종료되면 오류가 발생하더라도 shell과 이에 의존하는 다른 프로그램은 이를 알 수 있는 방법이 없습니다. 프로그램이 종료되는 오류가 발생하면 이 의미를 전달해야 합니다. 예를 들어:

```js
try {
  // something
} catch (err) {
  // cleanup or otherwise
  // then exit with proper status code
  process.exit(1);
}
```

exit code에 대한 짧은 참조:

- exit code 0은 성공적인 실행을 전달합니다.
- exit code 1은 실패를 전달합니다.

또한 프로그램의 의미론과 함께 사용자 정의 exit code를 사용하도록 선택할 수도 있지만 그렇게 하는 경우 적절하게 문서화해야 합니다.

Reference: A list of [exit codes used by the BASH shell](http://www.tldp.org/LDP/abs/html/exitcodes.html)

### 6.5 Effortless bug reports

손쉬운 버그 리포트

✅ **Do**: 문제를 열 ​​수 있는 URL을 제공하고 필요한 데이터를 최대한 많이 미리 채워 버그 보고서를 제출하는 작업을 쉽게 만드십시오. GitHub 와 같은 이슈 템플릿을 사용하면 어떤 정보가 필요한지 사용자에게 추가로 안내할 수 있습니다.

❌ **Otherwise**: 사용자는 버그를 보고하는 방법을 찾는 데 어려움을 겪고 도움이 되는 정보가 거의 없거나 문제를 전혀 제출하지 않을 수 있습니다.

## 7 Development

이 섹션에서는 Node.js command 애플리케이션 구축의 개발 및 유지 관리 모범 사례를 다룹니다.

### 7.1 Use a bin object

bin 객체를 사용 할것

✅ **Do**: 개체를 사용하여 실행 파일의 이름과 경로를 정의합니다.

❌ **Otherwise**: 패키지 이름을 실행 파일과 결합하게 됩니다.

ℹ️ **Details**

다음은 `package.json`파일 이름과 프로젝트의 위치에서 실행 파일의 이름을 분리하는 예를 보여줍니다.

```json
"bin": {
 "myCli-is-cool": "./bin/myCli.js"
}
```

### 7.2 Use relative paths

상대 경로를 사용 할 것

✅ **Do**:`process.cwd()` 사용자 입력 경로에 액세스하는 데 사용 하고 `__dirname` 프로젝트 기반 경로에 액세스하는 데 사용합니다.

❌ **Otherwise**: 파일 경로가 잘못되어 파일에 액세스할 수 없게 됩니다.

ℹ️ **Details**

프로젝트 파일 범위 내의 파일에 액세스하거나 사용자 입력에서 제공되는 파일에 액세스해야 할 수도 있습니다, 마치 log 나, JSON 파일과 같은 것들.
`process.cwd()` 또는 `__dirname`의 사용을 혼동하면 오류가 발생할 수 있습니다, 게다가 둘 다 사용하지 않을 수도 있습니다.

파일에 올바르게 액세스하는 방법:

- `process.cwd()`: 액세스해야 하는 파일 경로가 Node.js CLI의 상대 위치에 따라 다를 때 사용하십시오. 이에 대한 좋은 예는 CLI가 로그 생성을 위한 파일 경로를 지원하는 경우입니다. 예: `myCli --outfile ../../out.json`. `myCli`가 `/usr/local/node_modules/myCli/bin/myCli.js`에 설치된 경우에는 `process.cwd()`는 해당 위치를 참조하지 않습니다.대신 현재 작업 디렉토리는 이는 CLI가 호출되었을 때 사용자가 있던 디렉토리입니다.

- `__dirname`: CLI의 소스 코드 내에서 파일에 접근해야 하고 코드가 있는 파일의 해당 위치에서 파일을 참조해야 할 때 사용합니다. 예를 들어 CLI가 다른 디렉토리의 JSON 데이터 파일에 접근해야 하는 경우 : `fs.readFile(path.join(__dirname, '..', 'myDataFile.json'))`.

### 7.3 Use the `files` field

`files`필드 사용

✅ **Do**: 필드를 사용하여 `files`게시된 패키지에 필요한 파일만 포함하십시오.

❌ **Otherwise**: CLI 애플리케이션을 실행하는 데 필요하지 않을 수 있는 파일이 포함된 패키지가 생성됩니다. 예: (테스트 파일, 개발용 설정 등)

ℹ️ **Details**

게시된 패키지 크기를 작게 유지하려면 CLI 애플리케이션을 실행하는것에 꼭 필요한 파일만 포함해야 합니다. 자세한 내용은 이 게시물을 참조하세요.

> https://nodejs.medium.com/publishing-npm-packages-c4c615a0fc6b

다음 `files`필드는 사양 파일을 제외하고 src 디렉토리 내의 모든 파일을 포함하도록 npm CLI에 지시합니다.

```json
"files": [
"src",
"!src/**/*.spec.js"
],
```

# 9 Appendix: CLI Frameworks

### 9.1 CLI Frameworks Table

| Name       | Description                                                                                                               | npm                                                     | GitHub                                                       | Stars and downloads                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| oclif      | A framework for building a command line interface.                                                                        | [Link to npm](https://www.npmjs.com/package/oclif)      | [Link to GitHub](https://github.com/oclif/oclif)             | ![](https://img.shields.io/github/stars/oclif/oclif)![](https://img.shields.io/npm/dt/oclif.svg)                  |
| inquirer   | A collection of common interactive command line user interfaces.                                                          | [Link to npm](https://www.npmjs.com/package/inquirer)   | [Link to GitHub](https://github.com/SBoudrias/Inquirer.js)   | ![](https://img.shields.io/github/stars/sboudrias/inquirer.js)![](https://img.shields.io/npm/dt/inquirer.svg)     |
| ink        | Ink provides the same component-based UI building experience that React offers in the browser, but for command-line apps. | [Link to npm](https://www.npmjs.com/package/ink)        | [Link to Github](https://github.com/vadimdemedes/ink)        | ![](https://img.shields.io/github/stars/vadimdemedes/ink)![](https://img.shields.io/npm/dt/ink.svg)               |
| blessed    | A curses-like library with a high level terminal interface API for node.js.                                               | [Link to npm](https://www.npmjs.com/package/blessed)    | [Link to GitHub](https://github.com/chjj/blessed)            | ![](https://img.shields.io/github/stars/chjj/blessed)![](https://img.shields.io/npm/dt/blessed.svg)               |
| prompts    | Lightweight, beautiful and user-friendly interactive prompts                                                              | [Link to npm](https://npmjs.org/package/prompts)        | [Link to GitHub](https://github.com/terkelg/prompts)         | ![](https://img.shields.io/github/stars/terkelg/prompts)![](https://img.shields.io/npm/dt/prompts.svg)            |
| vue-termui | A Vue.js based terminal UI framework that allows you to build modern terminal applications with ease.                     | [Link to npm](https://www.npmjs.org/package/vue-termui) | [Link to GitHub](https://github.com/vue-terminal/vue-termui) | ![](https://img.shields.io/github/stars/vue-terminal/vue-termui)![](https://img.shields.io/npm/dt/vue-termui.svg) |

```toc
```