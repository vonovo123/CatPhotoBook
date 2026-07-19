# Cat PhotoBook

프로그래머스 2020/2021 데브매칭 프론트엔드 과제([고양이 사진첩](https://prgms.tistory.com/53))를  
**바닐라 TypeScript**로 다시 정리한 토이 프로젝트입니다.

프레임워크 없이 컴포넌트 · 상태(pub/sub) · 네비게이션 서비스를 직접 구성했습니다.

## 실행 방법

```bash
npm install
npm run dev      # http://localhost:5173
```

| 명령 | 설명 |
|------|------|
| `npm run build` | 타입체크 후 프로덕션 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run typecheck` | TypeScript 검사만 실행 |

## 기술 스택

- **TypeScript** + **Vite 6**
- 바닐라 DOM (React/Vue 없음)
- 데이터: 로컬 mock (`mockData.ts`)
- 이미지: [CATAAS](https://cataas.com/) (`/cat/{id}`)

> 원래 과제 API·S3는 서비스가 종료되어, 동일 응답 형태의 mock으로 대체했습니다.

## 주요 기능

- 디렉터리 / 파일 탐색 (아이콘 보기)
- 브레드크럼 경로 이동
- 상위 폴더(`..`) 이동
- 이미지 모달 미리보기 (배경 클릭 · `Esc` 닫기)
- 로딩 / 에러 토스트
- `localStorage`로 마지막 위치·목록 유지
- XSS 방지를 위한 HTML 이스케이프

## 아키텍처

```
src/
├── main.ts / App.ts          # 진입 · 화면 조합
├── types/                    # PhotoNode, StoreState
├── API/                      # api, mockData
└── js/
    ├── store.ts              # 메모리 상태 + pub/sub
    ├── services/navigation.ts  # 폴더 이동 · 파일 열기
    ├── components/           # Nodes, BreadCrum, ImageViewer
    ├── UI/                   # Loading, ErrorMessage
    └── utils/                # persist, withLoading, escapeHtml
```

```text
[Nodes / BreadCrum]  클릭
        ↓
[navigation]  openDirectory / goBack / goToHistory / openFile
        ↓
[api + withLoading] → [persist] → Store + localStorage
        ↓
  구독 컴포넌트 render()
```

| 레이어 | 역할 |
|--------|------|
| UI 컴포넌트 | 렌더 + 이벤트만 담당 |
| `navigation` | 히스토리 · API · 상태 갱신 |
| `store` + `persist` | 메모리 상태와 localStorage 동기화 |
| `API` | `getDir(id)` — 현재는 mock |

## 기술 선택 이유

| 선택 | 이유 |
|------|------|
| 바닐라 TS 유지 | 프레임워크 없이 SPA 패턴을 직접 보여주기 위함 |
| Vite | 단순한 개발·빌드 환경 |
| mock + CATAAS | 어떤 환경에서도 데모가 가능하게 |

