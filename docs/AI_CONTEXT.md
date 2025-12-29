# AI 개발 컨텍스트

> AI가 이 프로젝트에서 코드를 이해하고 생성할 때 빠르게 참조할 수 있는 핵심 정보를 담은 문서입니다.

## 프로젝트 요약

| 항목 | 값 |
|------|-----|
| 프로젝트 | EMR (전자의무기록) 의료진 관리 시스템 |
| 프레임워크 | Next.js 16.0.8 (App Router) |
| 언어 | TypeScript 5 (strict mode) |
| 상태관리 | Zustand 5 + TanStack Query 5 |
| 폼 처리 | React Hook Form + Zod |
| DB/ORM | PostgreSQL + Prisma 7 |
| API | GraphQL (Apollo Server) |

## 현재 개발 상태

### 완료된 기능
- 페이지 레이아웃 및 네비게이션 (Sidebar, Aside, PageHeader)
- 슬라이드 페이지 스택 시스템
- 폼 검증 시스템 (Zod + React Hook Form)
- 타입 시스템 구축

### 진행 중
- PostgreSQL DB 연결 (Vercel + NCP Cloud)
- GraphQL 리졸버 구현

### 대기 중
- TanStack Query를 통한 API 연동
- 실시간 사용자 이벤트 로깅

---

## 핵심 패턴 요약

### 1. Aside 슬라이드 시스템

```typescript
// stores/useAsideStore.ts
import { useAsideStore } from "@/stores/useAsideStore";

// 페이지 이동
useAsideStore.getState().navigateToPage("my-notes", <MyNotesSlide />);

// 뒤로 가기
useAsideStore.getState().goBack();

// 메인으로 리셋
useAsideStore.getState().resetToMain();
```

**주요 상태:**
- `pages`: 페이지 스택 (AsidePage[])
- `currentIndex`: 현재 페이지 인덱스
- `currentPageId`: 현재 페이지 ID (PageHeader 연동용)
- `isAnimating`: 애니메이션 중 여부

### 2. PageHeader 핸들러 시스템

```typescript
// stores/usePageHeaderStore.ts
import { usePageHeaderStore } from "@/stores/usePageHeaderStore";

// 핸들러 등록
usePageHeaderStore.getState().setNoteClickHandler(() => {
  // 쪽지 클릭 시 동작
});

usePageHeaderStore.getState().setAlarmClickHandler(() => {
  // 알림 클릭 시 동작
});
```

### 3. 파트 공통 상태

```typescript
// stores/useReceptionStore.ts (usePartCommonStore)
import { usePartCommonStore } from "@/stores/useReceptionStore";

// 주요 상태
const {
  isSmallScreen,      // 화면 크기 모드
  activeIndex,        // 활성 탭 인덱스
  selectedTabs,       // 선택된 탭들
  isCustomerDetailOpen, // 고객 상세 패널 열림
  openSidebarMenuPopup, // Sidebar 메뉴 팝업 상태
} = usePartCommonStore();
```

### 4. 폼 처리 패턴

```typescript
// hooks/useFormWithValidation.ts
import { useFormWithValidation } from "@/hooks/useFormWithValidation";
import { customerSchema } from "@/lib/validations/schemas";

const form = useFormWithValidation(customerSchema, {
  defaultValues: { name: "", phone: "" },
});

// 폼 제출
const onSubmit = form.handleSubmit((data) => {
  // 타입 안전한 data 사용
});
```

---

## 자주 사용하는 코드 스니펫

### 새 페이지 컴포넌트

```typescript
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAsideStore } from "@/stores/useAsideStore";
import { usePageHeaderStore } from "@/stores/usePageHeaderStore";
import Aside from "@/components/Aside";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import MainContent from "@/components/[page]/MainContent";

export default function NewPage() {
  const pathname = usePathname();
  const currentPageId = useAsideStore((s) => s.currentPageId);

  // PageHeader 핸들러 설정
  useEffect(() => {
    const { setNoteClickHandler, setAlarmClickHandler } =
      usePageHeaderStore.getState();

    setNoteClickHandler(() => {
      useAsideStore.getState().navigateToPage("my-notes", <MyNotesSlide />);
    });

    setAlarmClickHandler(() => {
      useAsideStore.getState().navigateToPage("my-alarms", <MyAlarmsSlide />);
    });
  }, []);

  return (
    <>
      <main className="C007">
        <PageHeader
          title="페이지 제목"
          isNoteSelected={currentPageId === "my-notes"}
          isAlarmSelected={currentPageId === "my-alarms"}
        />
        <Aside mainContent={<MainContent />} />
      </main>
      <Sidebar />
    </>
  );
}
```

### 새 슬라이드 컴포넌트

```typescript
"use client";

import SlidePage from "@/components/SlidePage";
import type { BaseSlideProps } from "@/types/slides";

interface NewSlideProps extends BaseSlideProps {
  // 추가 props
}

export default function NewSlide({
  onGoBack,
  showBackButton,
  transform,
  zIndex,
}: NewSlideProps) {
  return (
    <SlidePage
      title="슬라이드 제목"
      onGoBack={onGoBack}
      showBackButton={showBackButton}
      transform={transform}
      zIndex={zIndex}
    >
      {/* 슬라이드 내용 */}
    </SlidePage>
  );
}
```

### 새 팝업 컴포넌트

```typescript
"use client";

import Popup from "@/components/Popup";
import PopupHeader from "@/components/popups/PopupHeader";
import type { BasePopupProps } from "@/types/popups";

export default function NewPopup({ isOpen, onClose }: BasePopupProps) {
  if (!isOpen) return null;

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupHeader title="팝업 제목" onClose={onClose} />
      {/* 팝업 내용 */}
    </Popup>
  );
}
```

---

## 파일 위치 가이드

| 파일 유형 | 위치 | 예시 |
|-----------|------|------|
| 페이지 | `app/[page]/page.tsx` | `app/reception/page.tsx` |
| 컴포넌트 | `components/[Name].tsx` | `components/PageHeader.tsx` |
| 페이지별 컴포넌트 | `components/[page]/[Name].tsx` | `components/reception/MainContent.tsx` |
| 슬라이드 | `components/slides/[Name].tsx` | `components/slides/MyNotesSlide.tsx` |
| 팝업 | `components/popups/[Name].tsx` | `components/popups/CustomerStatusPopup.tsx` |
| 훅 | `hooks/use[Name].ts` | `hooks/useFormWithValidation.ts` |
| 스토어 | `stores/use[Name]Store.ts` | `stores/useAsideStore.ts` |
| 타입 | `types/[category].ts` | `types/ui.ts` |
| 유틸리티 | `lib/[name].ts` | `lib/utils/date.ts` |
| 스키마 | `lib/validations/schemas.ts` | - |

---

## 타입 Import 가이드

```typescript
// 중앙 export 파일에서 import (권장)
import type {
  PageHeaderProps,
  SlidePageProps,
  BasePopupProps,
  BaseSlideProps,
} from "@/types";

// 또는 개별 파일에서 import
import type { PageHeaderProps } from "@/types/ui";
import type { BaseSlideProps } from "@/types/slides";
```

---

## CSS 클래스 참조

자세한 내용은 `docs/CSS_CLASS_REFERENCE.md` 참조

### 자주 사용하는 클래스

| 클래스 | 용도 |
|--------|------|
| `C007` | 메인 컨테이너 |
| `C008` | 페이지 헤더 영역 |
| `C013` | 사이드 패널 |
| `C032` | 고객 카드 |
| `T000` | 사용자 이름 텍스트 |
| `T003` | 제목 텍스트 |
| `.isSelected` | 선택 상태 |
| `.isToday` | 오늘 날짜 |

---

## 주의사항

### Production 빌드 호환성

컴포넌트 이름은 minification으로 변경됩니다. `pageId` 기반으로 감지하세요:

```typescript
// ❌ 잘못된 방법
if (component.name === "MyNotesSlide") { ... }

// ✅ 올바른 방법
if (page.id.startsWith("my-notes")) { ... }
```

### useEffect 최적화

```typescript
// ❌ 피해야 할 패턴
useEffect(() => {
  // 매번 실행됨
}, [storePages.length]); // 불필요한 의존성

// ✅ 권장 패턴
const prevRef = useRef<string | null>(null);
useEffect(() => {
  if (prevRef.current === pathname) return; // 변경 없으면 스킵
  prevRef.current = pathname;
  // 필요한 로직
}, [pathname]);
```

---

## 관련 문서

- [아키텍처 가이드](./ARCHITECTURE.md) - 전체 구조
- [AI 최적화 가이드](./AI_OPTIMIZATION.md) - 최적화 패턴
- [CSS 클래스 참조](./CSS_CLASS_REFERENCE.md) - 스타일 클래스
- [타입 시스템](../TYPESYSTEM.md) - 타입 정의

---

## 업데이트 이력

- **2025-01-XX**: 초기 문서 작성
  - 프로젝트 요약 추가
  - 핵심 패턴 요약
  - 코드 스니펫 추가
  - 파일 위치 가이드
