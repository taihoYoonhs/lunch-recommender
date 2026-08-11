# 오늘 뭐 먹지? 🍱

직장인을 위한 메뉴 추천 앱입니다. 날씨·시간대는 자동으로 가져오고, 기분과 인원수만 선택하면 딱 맞는 메뉴를 추천해줍니다.

## 주요 기능

**고정 조건 (자동으로 가져옴)**
- 브라우저 Geolocation API로 현재 위치 확인, 실패 시 도시명 직접 입력으로 대체
- OpenWeatherMap API로 실시간 날씨 조회 후 더움/추움/비/보통 4단계로 분류 (한글로 표기)
- 기기 시간 기준으로 아침/점심/간식/저녁/야식 시간대 판별

**사용자 입력 조건 (select)**
- 오늘의 기분 15종 중 선택 (스트레스/보양식/해장/다이어트/기분전환 등)
- 인원수 (1~6명, 7명 이상)

날씨·시간대·기분·인원수 4가지 조건에 가장 잘 맞는 메뉴를 점수화하여 추천하고, 즐겨찾기 및 최근 추천 기록을 localStorage에 저장합니다 (백엔드/DB 없음).

## 기술 스택

- Vite + React + TypeScript
- Tailwind CSS v4
- OpenWeatherMap API

## 시작하기

### 1. 설치

```bash
npm install
```

### 2. OpenWeatherMap API 키 설정

1. [OpenWeatherMap](https://openweathermap.org/api)에서 무료 API 키를 발급받습니다.
2. `.env.example`을 복사해 `.env` 파일을 만들고 키를 입력합니다.

```bash
cp .env.example .env
```

```
VITE_OPENWEATHER_API_KEY=발급받은_API_키
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드

```bash
npm run build
```

`vite.config.ts`에서 `base: './'`(상대 경로)로 설정되어 있어 GitHub Pages의 하위 경로와 Vercel의 루트 경로 모두에서 별도 수정 없이 동작합니다.

## 배포하기

### GitHub Pages

**방법 A — GitHub Actions로 자동 배포 (권장)**

이 저장소에는 `main` 브랜치에 푸시할 때마다 자동으로 빌드하고 배포하는 워크플로(`.github/workflows/deploy.yml`)가 포함되어 있습니다.

1. GitHub 저장소 **Settings → Pages**에서 Source를 **GitHub Actions**로 설정합니다.
2. **Settings → Secrets and variables → Actions**에 `VITE_OPENWEATHER_API_KEY` 시크릿을 등록합니다.
3. `main` 브랜치에 푸시하면 자동으로 빌드/배포됩니다.

**방법 B — 로컬에서 수동 배포**

```bash
npm run deploy
```

`gh-pages` 패키지가 `dist` 폴더를 `gh-pages` 브랜치로 푸시합니다. GitHub 저장소 **Settings → Pages**에서 Source를 `gh-pages` 브랜치로 지정하세요. 이 방법을 쓰는 경우 `.env`에 API 키가 설정되어 있어야 합니다(로컬 빌드에 포함됨).

### Vercel

1. [Vercel](https://vercel.com)에서 이 GitHub 저장소를 Import합니다.
2. Framework Preset은 **Vite**로 자동 감지됩니다 (Build Command: `npm run build`, Output Directory: `dist`).
3. 프로젝트 설정의 **Environment Variables**에 `VITE_OPENWEATHER_API_KEY`를 추가합니다.
4. Deploy를 누르면 끝입니다. 이후 `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다.

## 폴더 구조

```
src/
  components/   # WeatherCard, CityInput, MenuCard, SelectField, FavoritesPanel, HistoryPanel
  hooks/         # useGeolocation, useWeather, useLocalStorage
  data/          # menus.json (정적 메뉴 데이터, 49개), moods.ts, groupSizes.ts
  utils/         # recommend.ts (날씨 분류 및 점수 기반 메뉴 추천), time.ts (시간대 판별)
  types/         # 공용 타입 정의
```
