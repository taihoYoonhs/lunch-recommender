# 오늘 뭐 먹지? 🍱

직장인을 위한 메뉴 추천 앱입니다. 외부 API나 위치 권한 없이, 날씨/기분/인원수만 골라도
지금 시간대에 맞는 메뉴를 추천해줍니다.

## 주요 기능

**자동으로 가져오는 조건**
- 기기 시간 기준으로 아침/점심/간식/저녁/야식 시간대 판별

**사용자 입력 조건 (select)**
- 오늘 날씨 (더움/추움/비 오는 날/보통) — 위치 권한이나 외부 날씨 API 없이 직접 선택
- 오늘의 기분 20종 중 선택 (스트레스/보양식/해장/다이어트/고기·면 당김/속편한 음식 등)
- 인원수 (1~6명, 7명 이상)

날씨·시간대·기분·인원수 4가지 조건을 모두 만족하는 메뉴 중 랜덤으로 추천합니다. 조건에 맞는
메뉴가 없으면 기분 → 날씨 → 인원수 → 시간대 순으로 조건을 하나씩 완화해 다시 찾고, 왜
추천했는지 이유 문구도 함께 보여줍니다. 즐겨찾기 및 최근 추천 기록은 localStorage에
저장합니다 (백엔드/DB 없음).

## 기술 스택

- Vite + React + TypeScript
- Tailwind CSS v4

## 시작하기

### 1. 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

외부 API 키나 환경변수 설정이 필요 없습니다.

### 3. 빌드

```bash
npm run build
```

`vite.config.ts`에서 `base: './'`(상대 경로)로 설정되어 있어 GitHub Pages의 하위 경로와
Vercel의 루트 경로 모두에서 별도 수정 없이 동작합니다.

## 배포하기

### GitHub Pages

**방법 A — GitHub Actions로 자동 배포 (권장)**

이 저장소에는 `main` 브랜치에 푸시할 때마다 자동으로 빌드하고 배포하는
워크플로(`.github/workflows/deploy.yml`)가 포함되어 있습니다.

1. GitHub 저장소 **Settings → Pages**에서 Source를 **GitHub Actions**로 설정합니다.
2. `main` 브랜치에 푸시하면 자동으로 빌드/배포됩니다.

**방법 B — 로컬에서 수동 배포**

```bash
npm run deploy
```

`gh-pages` 패키지가 `dist` 폴더를 `gh-pages` 브랜치로 푸시합니다. GitHub 저장소
**Settings → Pages**에서 Source를 `gh-pages` 브랜치로 지정하세요.

### Vercel

1. [Vercel](https://vercel.com)에서 이 GitHub 저장소를 Import합니다.
2. Framework Preset은 **Vite**로 자동 감지됩니다 (Build Command: `npm run build`,
   Output Directory: `dist`).
3. Deploy를 누르면 끝입니다. 이후 `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다.

## 폴더 구조

```
src/
  components/   # MenuCard, SelectField, FavoritesPanel, HistoryPanel
  hooks/         # useLocalStorage
  data/          # menus.json (정적 메뉴 데이터, 300개), moods.ts, groupSizes.ts, weatherOptions.ts
  utils/         # recommend.ts (조건 필터+완화 기반 메뉴 추천), time.ts (시간대 판별)
  types/         # 공용 타입 정의
```
