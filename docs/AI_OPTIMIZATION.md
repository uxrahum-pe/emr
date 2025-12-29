# AI 최적화 가이드

이 문서는 AI가 코드를 이해하고 수정할 때 발생할 수 있는 일반적인 문제와 해결 방법을 정리합니다.

## 🚨 주요 주의사항

### 1. Production 빌드에서의 Minification 문제

#### 문제 상황
Production 빌드에서 Next.js는 코드를 minification하여 컴포넌트 이름을 변경합니다. 예를 들어:
- `MyAlarmsSlide` → `eF`
- `MyNotesSlide` → `eG`

이로 인해 `displayName`이나 `component.name`을 사용한 컴포넌트 감지가 실패할 수 있습니다.

#### 해결 방법: pageId 기반 감지

**❌ 잘못된 방법:**
```typescript
// Production 빌드에서 실패할 수 있음
const isSlidePageComponent = 
  contentDisplayName === "MyAlarmsSlide" || 
  contentDisplayName === "MyNotesSlide";
```

**✅ 올바른 방법:**
```typescript
// pageId 기반으로 감지 (minification과 무관)
const isPreWrappedSlidePage =
  page.id.startsWith("my-alarms") ||
  page.id.startsWith("my-notes") ||
  page.id.startsWith("customer") ||
  page.id.startsWith("doctor") ||
  page.id.startsWith("counselor") ||
  page.id.startsWith("employee");

const isSlidePageComponent =
  React.isValidElement(page.content) &&
  (contentType === SlidePage ||
    isPreWrappedSlidePage ||
    // displayName 체크는 fallback으로만 사용
    (typeof contentType === "function" &&
      contentDisplayName === "DoctorSlidePage"));
```

#### 적용된 위치
- `components/Aside.tsx`: Slide 컴포넌트 감지 로직

#### 참고
- 모든 Slide 컴포넌트는 `navigateToPage(pageId, content)` 형태로 전달됩니다.
- `pageId`는 minification과 무관하게 항상 동일하게 유지됩니다.
- 따라서 `pageId`를 기반으로 컴포넌트를 감지하는 것이 가장 안정적입니다.

---

### 2. useEffect 의존성 배열 최적화

#### 문제 상황
`useEffect`의 의존성 배열에 불필요한 값이 포함되면 불필요한 재실행이 발생합니다.

**예시:**
```typescript
// ❌ 문제: storePages.length가 변경될 때마다 실행됨
React.useEffect(() => {
  // main 페이지 생성/업데이트
}, [mainPageContent, storePages.length, currentIndex]);
```

#### 해결 방법: 필요한 경우에만 실행

**✅ 올바른 방법:**
```typescript
// pathname 변경 추적을 위한 ref
const prevPathnameRef = useRef<string | null>(null);

React.useEffect(() => {
  if (!isMounted || !mainPageContent) return;

  const currentState = useAsideStore.getState();
  const mainPageIndex = currentState.pages.findIndex(
    (page) => page.id === "main"
  );

  // pathname이 변경되었는지 확인
  const pathnameChanged = prevPathnameRef.current !== pathname;
  prevPathnameRef.current = pathname;

  // main 페이지가 없거나, pathname이 변경된 경우에만 실행
  const shouldUpdate = mainPageIndex === -1 || pathnameChanged;

  if (!shouldUpdate && mainPageIndex !== -1) {
    return; // 스킵
  }

  // 필요한 경우에만 실행
  // ...
}, [
  mainContent, // 실제 변경을 추적
  mainPageContent,
  pathname,
  isMounted,
]);
```

#### 적용된 위치
- `components/Aside.tsx`: `mainPageContent` useEffect

#### 핵심 원칙
1. **ref를 사용한 이전 값 추적**: `useRef`로 이전 값을 저장하고 실제 변경 여부 확인
2. **조건부 실행**: 필요한 경우에만 로직 실행
3. **의존성 배열 최소화**: 실제로 필요한 값만 의존성 배열에 포함

---

### 3. React 컴포넌트 참조 비교 문제

#### 문제 상황
React 컴포넌트는 매번 새로운 참조로 생성될 수 있어, 참조 비교(`===`)가 실패할 수 있습니다.

**예시:**
```typescript
// ❌ 문제: mainPageContent가 매번 새로운 참조로 생성됨
const contentChanged = prevMainPageContentRef.current !== mainPageContent;
// 항상 true가 되어 불필요한 업데이트 발생
```

#### 해결 방법: 원본 데이터 추적

**✅ 올바른 방법:**
```typescript
// 원본 데이터(mainContent)를 추적
const prevMainContentRef = useRef<typeof mainContent>(null);

// mainContent가 실제로 변경되었는지 확인
const mainContentChanged = prevMainContentRef.current !== mainContent;
prevMainContentRef.current = mainContent;
```

#### 적용된 위치
- `components/Aside.tsx`: `mainPageContent` useEffect (현재는 pathname 기반으로 단순화됨)

---

### 4. Zustand 스토어 상태 동기화

#### 문제 상황
Zustand 스토어의 상태 변경이 컴포넌트 렌더링과 동기화되지 않을 수 있습니다.

#### 해결 방법: 직접 구독

**✅ 올바른 방법:**
```typescript
// storePages를 직접 구독
const storePages = useAsideStore((state) => state.pages);

// 렌더링에는 storePages를 직접 사용
const pages = storePages;
```

**❌ 피해야 할 방법:**
```typescript
// localPages와 storePages 동기화 문제 발생 가능
const [localPages, setLocalPages] = useState<typeof storePages>([]);
React.useEffect(() => {
  setLocalPages(storePages);
}, [storePages]);
const pages = localPages.length > 0 ? localPages : storePages;
```

#### 적용된 위치
- `components/Aside.tsx`: `pages` 상태 관리

---

## 📋 체크리스트

새로운 기능을 추가하거나 수정할 때 다음 사항을 확인하세요:

### Production 빌드 호환성
- [ ] 컴포넌트 이름 대신 `pageId`나 다른 안정적인 식별자를 사용하는가?
- [ ] `displayName`에 의존하지 않는가?
- [ ] minification 후에도 작동하는가?

### useEffect 최적화
- [ ] 의존성 배열에 불필요한 값이 포함되지 않았는가?
- [ ] ref를 사용하여 이전 값을 추적하는가?
- [ ] 필요한 경우에만 실행되도록 조건이 있는가?

### 상태 관리
- [ ] Zustand 스토어 상태를 직접 구독하는가?
- [ ] 불필요한 로컬 상태를 사용하지 않는가?
- [ ] 상태 동기화 문제가 없는가?

### 타입 안전성
- [ ] 타입 가드를 사용하여 런타임 타입 체크를 하는가?
- [ ] `any` 타입을 사용하지 않는가?
- [ ] TypeScript 에러가 없는가?

---

## 🔍 디버깅 팁

### 1. 콘솔 로그 활용
```typescript
console.log("🔍 [Component] 상태 체크", {
  pageId: page.id,
  contentType: typeof contentType === "function" 
    ? contentType.name 
    : typeof contentType,
  contentDisplayName,
  isSlidePageComponent,
});
```

### 2. Production 빌드 테스트
로컬에서만 작동하는 코드는 Production 빌드에서 실패할 수 있습니다:
```bash
npm run build
npm start
```

### 3. Vercel 배포 후 확인
Vercel의 Production 빌드는 추가 최적화를 수행하므로, 반드시 배포 후 테스트하세요.

---

## 📚 관련 문서

- [아키텍처 가이드](./ARCHITECTURE.md)
- [타입 시스템 가이드](../TYPESYSTEM.md)
- [컴포넌트 명명 규칙](../components/NAMING_CONVENTIONS.md)

---

## 🎯 핵심 원칙 요약

1. **안정적인 식별자 사용**: 컴포넌트 이름 대신 `pageId` 같은 안정적인 식별자 사용
2. **최소한의 의존성**: useEffect 의존성 배열을 최소화하고 필요한 경우에만 실행
3. **직접 구독**: Zustand 스토어 상태를 직접 구독하여 동기화 문제 방지
4. **Production 테스트**: 로컬뿐만 아니라 Production 빌드에서도 테스트

---

## 📝 업데이트 이력

- **2025-01-XX**: 초기 문서 작성
  - Production 빌드 minification 문제 해결 방법 추가
  - useEffect 최적화 가이드 추가
  - Zustand 스토어 동기화 가이드 추가

