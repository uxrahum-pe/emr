# EMR 프로젝트 아키텍처 가이드

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [기술 스택](#기술-스택)
3. [폴더 구조](#폴더-구조)
4. [상태 관리](#상태-관리)
5. [데이터 흐름](#데이터-흐름)
6. [컴포넌트 구조](#컴포넌트-구조)
7. [타입 시스템](#타입-시스템)
8. [스타일링 시스템](#스타일링-시스템)

## 프로젝트 개요

의료진 관리 시스템(EMR)으로, Next.js 16 App Router 기반의 풀스택 애플리케이션입니다.

### 주요 기능
- 대시보드: 전체 현황 조회
- 원무: 고객 상태 관리, 직원 일정 조회
- 상담/진료/수술/시술: 각 파트별 업무 관리
- 통계: 데이터 분석 및 리포트

## 기술 스택

### Core
- **Next.js 16.0.8** (App Router)
- **React 19.2.1**
- **TypeScript 5**

### 상태 관리
- **Zustand 5.0.9**: 클라이언트 전역 상태 관리
- **TanStack Query 5.90.12**: 서버 상태 관리 (API 데이터 캐싱)

### 폼 & 검증
- **React Hook Form 7.68.0**: 폼 상태 관리
- **Zod 4.2.1**: 스키마 검증 및 타입 추론
- **@hookform/resolvers 5.2.2**: React Hook Form + Zod 통합

### 날짜 처리
- **date-fns 4.1.0**: 날짜 포맷팅 및 계산

### 데이터베이스
- **Prisma 7.1.0**: ORM
- **PostgreSQL**: 데이터베이스

### GraphQL
- **Apollo Server 5.2.0**: GraphQL 서버
- **GraphQL 16.12.0**

### 스타일링
- **Tailwind CSS 4**: 유틸리티 CSS 프레임워크
- **CSS Modules**: 컴포넌트별 스타일

## 폴더 구조

```
emr/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 대시보드 (루트)
│   ├── reception/         # 원무 페이지
│   ├── counseling/        # 상담 페이지
│   ├── clinic/            # 진료 페이지
│   ├── surgery/           # 수술 페이지
│   ├── procedure/         # 시술 페이지
│   ├── pre-care/          # 전처치 페이지
│   ├── post-care/         # 후관리 페이지
│   ├── statistics/        # 통계 페이지
│   ├── settings/          # 설정 페이지
│   ├── api/               # API 라우트
│   │   ├── events/        # 이벤트 API
│   │   └── graphql/       # GraphQL 엔드포인트
│   └── layout.tsx         # 루트 레이아웃
│
├── components/             # React 컴포넌트
│   ├── dashboard/         # 대시보드 전용 컴포넌트
│   ├── reception/         # 원무 전용 컴포넌트
│   ├── layouts/           # 레이아웃 컴포넌트
│   │   └── SimplePageLayout.tsx # 간단한 페이지 공통 레이아웃
│   ├── Aside.tsx          # 우측 슬라이드 패널
│   ├── Sidebar.tsx        # 좌측 네비게이션
│   ├── PageHeader.tsx     # 페이지 헤더
│   └── ...
│
├── stores/                 # Zustand 스토어
│   ├── useAsideStore.ts   # Aside 상태 관리
│   ├── usePageHeaderStore.ts # PageHeader 핸들러 관리
│   └── useReceptionStore.ts  # 원무 페이지 상태
│
├── hooks/                  # 커스텀 훅
│   ├── usePageHeaderHandlers.ts # PageHeader 핸들러 훅
│   ├── useFormWithValidation.ts # 폼 검증 훅
│   └── ...
│
├── lib/                    # 유틸리티 및 헬퍼
│   ├── query-client.tsx   # TanStack Query 설정
│   ├── utils/
│   │   └── date.ts        # 날짜 유틸리티 (date-fns)
│   ├── validations/
│   │   └── schemas.ts     # Zod 스키마 정의
│   └── ...
│
├── types/                  # TypeScript 타입 정의
│   ├── ui.ts              # UI 컴포넌트 타입
│   ├── reception.ts       # 원무 페이지 타입
│   ├── api.ts             # API 타입
│   └── ...
│
├── graphql/                # GraphQL 스키마 및 리졸버
│   ├── schema.ts          # GraphQL 스키마
│   └── resolvers.ts       # GraphQL 리졸버 (Zod 검증 포함)
│
└── prisma/                 # Prisma 스키마
    └── schema.prisma       # 데이터베이스 스키마
```

## 상태 관리

### Zustand 스토어 구조

#### 1. `useAsideStore`
**용도**: Aside 컴포넌트의 전역 상태 관리

**상태**:
- `pages`: Aside 페이지 스택
- `currentIndex`: 현재 활성 페이지 인덱스
- `isAnimating`: 애니메이션 진행 중 여부
- `currentPageId`: 현재 페이지 ID (PageHeader 선택 상태용)

**액션**:
- `navigateToPage`: 페이지로 네비게이션
- `goBack`: 이전 페이지로 돌아가기
- `resetToMain`: 메인 페이지로 리셋

**사용 위치**: `components/Aside.tsx`, 모든 페이지

#### 2. `usePageHeaderStore`
**용도**: PageHeader의 클릭 핸들러 전역 관리

**상태**:
- `noteClickHandler`: 쪽지 클릭 핸들러
- `alarmClickHandler`: 알림 클릭 핸들러
- `reservationClickHandler`: 통합 예약 서비스 클릭 핸들러

**액션**:
- `setNoteClickHandler`: 쪽지 핸들러 설정
- `setAlarmClickHandler`: 알림 핸들러 설정
- `setReservationClickHandler`: 통합 예약 서비스 핸들러 설정
- `resetHandlers`: 모든 핸들러 초기화

**사용 위치**: `components/PageHeader.tsx`, 모든 페이지

#### 3. `useReceptionStore`
**용도**: 원무 페이지 전용 상태 관리

**상태**:
- `isSmallScreen`: 작은 화면 모드 여부
- `activeIndex`: 활성 탭 인덱스
- `selectedTabs`: 선택된 예약 탭들
- `selectedPendingTabs`: 선택된 대기 탭들
- `selectedSortTab`: 선택된 정렬 탭
- `isQuickActionsHovered`: Quick Actions 호버 상태
- `isCustomerDetailOpen`: 고객 상세 패널 열림 상태

**사용 위치**: `app/reception/page.tsx`

### TanStack Query

**용도**: 서버 상태 관리 (API 데이터 캐싱, 동기화)

**설정**: `lib/query-client.tsx`
- `staleTime`: 1분
- `gcTime`: 5분
- `retry`: 1회
- `refetchOnWindowFocus`: false

**사용 예시** (향후):
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['patients'],
  queryFn: fetchPatients,
});
```

## 데이터 흐름

### 1. 서버 → 클라이언트
```
Prisma (DB)
  ↓
GraphQL Resolvers (Zod 검증)
  ↓
API Route (/api/graphql)
  ↓
TanStack Query (캐싱)
  ↓
React Components
```

### 2. 클라이언트 상태 흐름
```
User Action
  ↓
Component Event Handler
  ↓
Zustand Store Action
  ↓
Store State Update
  ↓
Component Re-render
```

### 3. 폼 데이터 흐름
```
User Input
  ↓
React Hook Form (상태 관리)
  ↓
Zod Schema (검증)
  ↓
Validated Data
  ↓
API Call (TanStack Query Mutation)
```

## 컴포넌트 구조

### 레이아웃 컴포넌트
- **`Sidebar`**: 좌측 네비게이션 메뉴
- **`PageHeader`**: 페이지 상단 헤더 (제목, 검색, 알림 등)
- **`Aside`**: 우측 슬라이드 패널 (페이지 스택 관리)
- **`SimplePageLayout`**: 간단한 페이지들을 위한 공통 레이아웃 (Sidebar + 기본 구조)

### 페이지 컴포넌트
- **`app/page.tsx`**: 대시보드 (루트)
- **`app/reception/page.tsx`**: 원무 페이지
- 각 파트별 페이지: `app/{part}/page.tsx`

### 기능 컴포넌트
- **`CustomerStatusSection`**: 고객 상태 섹션 (원무 페이지)
- **`MainContent`**: 원무 페이지 메인 콘텐츠
- **`WeeklyCalendar`**: 주간 달력
- **`MonthlyCalendar`**: 월간 달력
- **`EmployeeBadge`**: 직원 배지

### UI 컴포넌트
- **`SlidePage`**: 슬라이드 페이지 컨테이너
- **`Tooltip`**: 툴팁
- **`Popup`**: 팝업 모달
- **`ToggleSwitch`**: 토글 스위치
- **`TabSelector`**: 탭 선택기

## 타입 시스템

자세한 내용은 `TYPESYSTEM.md` 참조

### 주요 타입 파일
- `types/ui.ts`: 공통 UI 컴포넌트 타입
- `types/reception.ts`: 원무 페이지 타입
- `types/layout.ts`: 레이아웃 컴포넌트 타입
- `types/api.ts`: API 응답 타입
- `types/database.ts`: 데이터베이스 타입 (Prisma)

### Zod 스키마
- `lib/validations/schemas.ts`: 폼 검증 스키마
  - `patientSchema`: 환자 스키마
  - `reservationSchema`: 예약 스키마
  - `employeeSchema`: 직원 스키마

## 스타일링 시스템

### CSS 클래스 네이밍
- **C{번호}**: 컴포넌트 클래스 (예: `C007`, `C008`)
- **T{번호}**: 텍스트 스타일 클래스 (예: `T003`, `T004`)
- **is{이름}**: 상태/변형 클래스 (예: `isSelected`, `isToday`)

### CSS 파일 구조
- `app/uxmason.global.css`: 전역 스타일
- `app/uxmason.C.css`: 컴포넌트 스타일
- `app/uxmason.T.css`: 텍스트 스타일
- `app/{page}/page.css`: 페이지별 스타일

### Tailwind CSS
- 유틸리티 클래스로 빠른 스타일링
- CSS Variables와 함께 사용

## 주요 패턴

### 1. 페이지 구조 패턴
```typescript
export default function Page() {
  // Zustand 스토어에서 상태 가져오기
  const state = useStore((s) => s.state);
  
  // 커스텀 훅 사용
  const handlers = usePageHeaderHandlers();
  
  return (
    <>
      <main className="C007">
        <PageHeader {...handlers} />
        <Aside mainContent={MainContent}>
          {/* 페이지별 콘텐츠 */}
        </Aside>
      </main>
      <Sidebar />
    </>
  );
}
```

### 2. 컴포넌트 분리 패턴
- 페이지별 컴포넌트는 `components/{page}/` 폴더에 분리
- 공통 컴포넌트는 `components/` 루트에 배치
- 큰 컴포넌트는 기능별로 분리

### 3. 상태 관리 패턴
- **전역 상태**: Zustand 스토어
- **서버 상태**: TanStack Query
- **로컬 상태**: `useState` (컴포넌트 내부)

### 4. 폼 처리 패턴
```typescript
import { useFormWithValidation } from '@/hooks/useFormWithValidation';
import { patientSchema } from '@/lib/validations/schemas';

const form = useFormWithValidation(patientSchema, {
  defaultValues: { name: '', registerDate: new Date() },
});

const onSubmit = (data: PatientFormData) => {
  // 타입 안전한 데이터 처리
};
```

## 개발 가이드

### 새 페이지 추가 시
1. `app/{page-name}/page.tsx` 생성
2. 필요한 Zustand 스토어 생성 (필요시)
3. 페이지별 컴포넌트는 `components/{page-name}/`에 분리
4. 타입 정의는 `types/{page-name}.ts`에 추가

### 새 컴포넌트 추가 시
1. 컴포넌트 파일 생성 (`components/ComponentName.tsx`)
2. 타입 정의 (`types/ui.ts` 또는 별도 파일)
3. 스타일 추가 (필요시)
4. Story/Example 파일 생성 (선택)

### API 연동 시
1. GraphQL 스키마에 타입 추가 (`graphql/schema.ts`)
2. 리졸버에 로직 추가 (`graphql/resolvers.ts`) - Zod 검증 포함
3. TanStack Query 훅 생성 (필요시)
4. 컴포넌트에서 사용

## 참고 문서

- `TYPESYSTEM.md`: 타입 시스템 상세 가이드
- `types/README.md`: 타입 정의 가이드
- `components/NAMING_CONVENTIONS.md`: 네이밍 규칙
- `docs/DATABASE_STRATEGY.md`: 데이터베이스 전략
