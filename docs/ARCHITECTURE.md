# EMR 시스템 아키텍처 가이드

## 개요

이 문서는 EMR 시스템의 아키텍처와 주요 컴포넌트 구조를 설명합니다. AI가 코드를 이해하고 수정할 때 이 문서를 참조하면 전체 구조를 빠르게 파악할 수 있습니다.

## 디렉토리 구조

```
emr/
├── app/                    # Next.js App Router 페이지들
│   ├── reception/          # 원무 페이지 (메인 페이지)
│   ├── dashboard/          # 대시보드 페이지
│   └── ...
├── components/             # 재사용 가능한 컴포넌트들
│   ├── reception/          # 원무 페이지 전용 컴포넌트
│   │   ├── MainContent.tsx
│   │   ├── NoteClickHandler.tsx
│   │   └── AlarmClickHandler.tsx
│   ├── Aside.tsx           # 우측 슬라이드 사이드바
│   ├── PageHeader.tsx      # 상단 헤더
│   └── ...
├── types/                   # TypeScript 타입 정의
│   ├── reception.ts         # 원무 페이지 타입
│   ├── ui.ts                # UI 컴포넌트 타입
│   └── ...
├── utils/                   # 유틸리티 함수들
│   └── role-utils.ts        # 역할 관련 유틸리티
└── docs/                    # 문서
    └── ARCHITECTURE.md      # 이 파일
```

## 핵심 컴포넌트

### 1. Aside 컴포넌트 (`components/Aside.tsx`)

**역할**: 우측 사이드바에서 슬라이드 페이지를 관리하는 컨테이너 컴포넌트

**주요 기능**:
- 페이지 스택 관리 (pages 배열)
- 동일한 pageId의 페이지는 누적하지 않고 기존 페이지로 이동
- 애니메이션 상태 관리
- 함수형 업데이트를 사용하여 최신 상태 보장

**사용 예시**:
```tsx
<Aside
  mainContent={<MainContent />}
  onNavigate={(pageId) => console.log(pageId)}
>
  <NoteClickHandler onHandlerReady={handleNoteHandlerReady} />
</Aside>
```

**중요 사항**:
- `navigateToPage`는 함수형 업데이트를 사용하여 항상 최신 `pages` 상태를 확인합니다.
- 동일한 `pageId`의 페이지가 이미 열려있으면 해당 페이지로 이동하고 그 이후 페이지들을 제거합니다.

### 2. MainContent 컴포넌트 (`components/reception/MainContent.tsx`)

**역할**: 원무 페이지의 메인 콘텐츠 영역을 렌더링

**주요 기능**:
- 고객 및 직원 클릭 이벤트 처리
- 역할 기반 라우팅 (`role-utils.ts` 사용)
- React.memo로 최적화

**사용 예시**:
```tsx
<MainContent onCustomerClick={(name, id) => console.log(name, id)} />
```

### 3. NoteClickHandler / AlarmClickHandler

**역할**: PageHeader의 버튼 클릭 시 슬라이드 페이지를 표시하는 핸들러 생성

**주요 기능**:
- Aside 내부에 렌더링되어야 `useAside` 훅 사용 가능
- 핸들러는 한 번만 등록
- 애니메이션 중에는 클릭 무시

**사용 예시**:
```tsx
<NoteClickHandler onHandlerReady={handleNoteHandlerReady} />
<AlarmClickHandler onHandlerReady={handleAlarmHandlerReady} />
```

## 상태 관리 패턴

### 함수형 업데이트 사용

React의 상태 업데이트는 비동기이므로, 상태를 기반으로 조건부 로직을 수행할 때는 함수형 업데이트를 사용해야 합니다.

**잘못된 예시**:
```tsx
const navigateToPage = (pageId: string, content: ReactNode) => {
  const existingPageIndex = pages.findIndex(...); // ❌ 오래된 상태 참조
  // ...
};
```

**올바른 예시**:
```tsx
const navigateToPage = (pageId: string, content: ReactNode) => {
  setPages((prev) => {
    const existingPageIndex = prev.findIndex(...); // ✅ 최신 상태 참조
    // ...
  });
};
```

### useCallback과 useMemo 사용

불필요한 리렌더링을 방지하기 위해 콜백 함수와 계산된 값을 메모이제이션합니다.

```tsx
const handleClick = useCallback((id: string) => {
  // ...
}, [dependency]);

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

## 역할 기반 라우팅

`utils/role-utils.ts`에서 역할에 따른 컴포넌트, 카테고리, 제목을 결정합니다.

**사용 예시**:
```tsx
import { getRoleInfo } from "@/utils/role-utils";

const roleInfo = getRoleInfo("원장");
// { category: "doctor", title: "원장 일정 보기", component: DoctorSlidePage }
```

## 타입 정의

모든 타입은 `types/` 디렉토리에 중앙화되어 있습니다.

- `types/reception.ts`: 원무 페이지 관련 타입
- `types/ui.ts`: UI 컴포넌트 타입

## 성능 최적화

1. **React.memo**: 불필요한 리렌더링 방지
2. **useCallback**: 함수 참조 안정화
3. **useMemo**: 계산된 값 메모이제이션
4. **함수형 업데이트**: 최신 상태 보장

## AI를 위한 컨텍스트 엔지니어링

### 코드 수정 시 주의사항

1. **함수형 업데이트 사용**: 상태를 기반으로 조건부 로직을 수행할 때는 항상 함수형 업데이트를 사용하세요.
2. **컴포넌트 분리**: 큰 컴포넌트는 작은 단위로 분리하여 유지보수성을 향상시키세요.
3. **타입 정의**: 새로운 타입은 `types/` 디렉토리에 추가하세요.
4. **주석 작성**: 복잡한 로직에는 JSDoc 스타일의 주석을 작성하세요.

### 파일 수정 시 체크리스트

- [ ] 함수형 업데이트를 사용했는가?
- [ ] 불필요한 리렌더링을 방지했는가?
- [ ] 타입을 올바르게 정의했는가?
- [ ] 주석을 작성했는가?
- [ ] 컴포넌트를 적절히 분리했는가?

## 참고 자료

- [React 공식 문서 - 함수형 업데이트](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state)
- [React 공식 문서 - useCallback](https://react.dev/reference/react/useCallback)
- [React 공식 문서 - useMemo](https://react.dev/reference/react/useMemo)
