# 시작하기전에...
⚠️ 해당 Warpper는 [Unity-App-in-TossAPI](https://github.com/Hoongcha/Unity-App-in-TossAPI)을 기준으로 생성 되었습니다.<br>
같이 쓰거나 수정해서 사용하시길 권장 드립니다.<br>
https://developers-apps-in-toss.toss.im/porting_tutorials/vite_unity.md<br>
`* 해당 URL을 Base로 작성되었습니다.`

---
# Vite로 Unity WebGL 빌드 감싸기

이 가이드는 Unity에서 빌드한 WebGL 파일을 Vite(React 기반) 프로젝트로 감싸는 방법을 안내해요.

## 1. Unity WebGL 빌드 결과물 복사

Unity에서 WebGL 빌드를 완료한 후, 출력 폴더의 구조는 보통 다음과 같아요.

```bash
Build/
├── index.html
├── Build/
└── TemplateData/
```

이 파일들을 Vite 프로젝트의 public/unity 폴더로 복사해 주세요.

```bash
mkdir -p public/unity
cp -r [UnityBuildPath]/* public/unity/
```

복사 후 구조 예시는 다음과 같아요.

```bash
public/
└── unity/
    ├── index.html
    ├── Build/
    └── TemplateData/
```


`public` 폴더에 들어 있는 파일들은 Vite dev 서버에서 정적 파일로 서빙돼요.<br>
즉, `/unity/index.html`로 접근할 수 있어요.

## 2. 설정

`granite.config.ts`,`UnityCanvas.tsx` 두 파일을 설정해야 해요.<br><br>

### `granite.config.ts` 설정
```Typescript
export default defineConfig({
  appName: '', // 토스에서 설정한 앱이름
  brand: {
    displayName: '', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: '#3182F6', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: '', // 아이콘 URL
    bridgeColorMode: 'inverted',
  },
```
상단에 주석에 설명된 대로 설정 해주세요. <br>
게임 기준으로 설정되어 있어요. <br>
게임이 아닌 경우엔 `webViewProps`,`bridgeColorMode`를 변경해야해요.
<br><br>


### `UnityCanvas.tsx` 설정
1. 먼저 Property를 수정해야 해요. <br>
```Typescript

const UNITY_BUILD_PATH = '/unity/Build';
const GAME_NAME = '빌드 했을때 이름'; // 빌드 했을때 빌드본 이름
const LOADING_CONTENT = '로딩로딩'; // 맨앞에 로딩창에 쓰일 문구 ( 게임이름추천 )
const UNITY_SETTINGS = {
  companyName: '', // 회사명
  productName: '', // 게임이름
  productVersion: '1.0.0',
};
```
2. 해당 Warpper는 프로그래스바를 포함해요. <br>
맨마지막 부분을 잘 봐주세요.
```Typescript
...
return (
...
<img
  src="https://pbs.twimg.com/profile_images/1566569005619355649/VzgTcumJ_400x400.png"
  alt="game-logo"
  style={{ width: 120, height: 120, marginBottom: 10, borderRadius: 12 }}
/>
...
);
```
해당 부분 src를 게임 로고 URL로 바꿔주세요. <br> <br>

3. ⚠️ 빌드하고 난 이후 빌드본에서 Build/에서 확장자를 확인해주세요.
```Typescript
const unityConfig = {
    dataUrl: `${UNITY_BUILD_PATH}/${GAME_NAME}.data`,
    frameworkUrl: `${UNITY_BUILD_PATH}/${GAME_NAME}.framework.js`,
    codeUrl: `${UNITY_BUILD_PATH}/${GAME_NAME}.wasm`,
    streamingAssetsUrl: '/unity/StreamingAssets',
    ...UNITY_SETTINGS,
  };
```
위 코드와 확장자가 맞지 않으시다면 수정해주세요!!!!<br>


## 3. 개발 서버 실행

아래 명령어로 Vite 개발 서버를 실행해 보세요.

```bash
npm run dev
```

브라우저에서 Vite 개발 서버 주소(`http://localhost:5173` 등)로 접속하면 React 앱 안에서 Unity 게임이 정상적으로 렌더링되는지 확인할 수 있어요.

## 4. 정적 사이트 빌드 및 배포

```bash
npm run build
```

빌드가 완료되면 `.ait` 파일이 생성돼요.<br>
이 파일을 콘솔에 업로드하면 미니앱을 배포할 수 있어요.
