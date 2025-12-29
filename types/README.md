# 타입 시스템 가이드

이 디렉토리는 프로젝트의 모든 타입 정의를 관리합니다. DB 스키마부터 UI 컴포넌트까지의 타입 흐름을 명확히 하기 위해 체계적으로 구성되어 있습니다.

## 📁 파일 구조

```
types/
├── api.ts          # API 응답 타입 (DB ↔ API)
├── database.ts     # DB 스키마 타입 (Prisma 기반)
├── layout.ts       # 레이아웃 컴포넌트 타입 (Aside, SimplePageLayout 등)
├── popups.ts       # 팝업 컴포넌트 Props 인터페이스 (18개)
├── reception.ts    # 원무 페이지 타입
├── slides.ts       # 슬라이드 컴포넌트 Props 인터페이스 (6개)
├── timeline.ts     # Timeline UI 컴포넌트 타입
└── ui.ts          # 공통 UI 컴포넌트 타입 (Popup, TabSelector, SlidePage 등)
```

## 🔄 타입 흐름

```
Prisma Schema → database.ts → api.ts → type-transformers.ts → timeline.ts/ui.ts → Components
```

### 1. **database.ts** - DB 레이어
- Prisma 스키마와 동기화
- DB 모델의 관계를 포함한 확장 타입 정의
- **주의**: Prisma 스키마 변경 시 반드시 업데이트 필요

### 2. **api.ts** - API 레이어
- DB Raw 타입 (서버에서 받는 원시 데이터)
- 프론트엔드 변환 타입 (UI에서 사용하는 형식)
- API 엔드포인트별 응답 타입

### 3. **timeline.ts / ui.ts / popups.ts / slides.ts / layout.ts** - UI 레이어
- 컴포넌트에서 직접 사용하는 타입
- API 타입과 호환되도록 설계
- **인터페이스 분리 원칙**: 모든 컴포넌트 Props 인터페이스는 `types/` 폴더에 정의
  - `popups.ts`: 모든 팝업 컴포넌트 Props (CustomerStatusPopupProps, AgencyStatusPopupProps 등 18개)
  - `slides.ts`: 모든 슬라이드 컴포넌트 Props (MyNotesSlideProps, CustomerReferenceSlideProps 등 6개)
  - `layout.ts`: 레이아웃 컴포넌트 Props (AsideProps, AsideInnerProps, SimplePageLayoutProps)
  - `ui.ts`: 공통 UI 컴포넌트 Props (PopupProps, TabSelectorProps, SlidePageProps 등)

## 📝 사용 가이드

### API 작업 시

#### 1. 새로운 엔드포인트 추가

```typescript
// types/api.ts에 추가
export interface GetNewDataResponse extends ApiResponse<NewDataRaw[]> {}
```

#### 2. 타입 변환 함수 추가

```typescript
// lib/type-transformers.ts에 추가
export function transformNewData(raw: NewDataRaw): NewDataItem {
  return {
    // 변환 로직
  }
}
```

#### 3. 타입 가드 추가 (필요시)

```typescript
// lib/type-guards.ts에 추가
export function isNewDataRaw(value: unknown): value is NewDataRaw {
  // 검증 로직
}
```

### Prisma 스키마 변경 시

1. `prisma/schema.prisma` 수정
2. `prisma generate` 실행
3. `types/database.ts` 업데이트
4. `types/api.ts`의 Raw 타입 업데이트
5. `lib/type-transformers.ts`의 변환 함수 업데이트

### 컴포넌트에서 사용

```typescript
// 1. API 호출
const response: GetVisitLogsResponse = await fetch('/api/visit-logs')

// 2. 타입 가드로 검증
if (isSuccessResponse(response)) {
  // 3. 타입 변환
  const items = transformArray.visitLogs(response.data.items)
  
  // 4. 컴포넌트에 전달
  return <TimelineSidebar dateItems={items} />
}
```

## 🎯 네이밍 규칙

- **Raw**: DB에서 받은 원시 데이터 (예: `VisitLogRaw`)
- **Item**: 프론트엔드에서 사용하는 변환된 데이터 (예: `VisitLogItem`)
- **Response**: API 응답 타입 (예: `GetVisitLogsResponse`)
- **Props**: 컴포넌트 props 타입 (예: `TimelineSidebarProps`)

## ⚠️ 주의사항

1. **타입 동기화**: Prisma 스키마 변경 시 관련 타입 파일 모두 업데이트
2. **타입 가드**: 외부 API나 사용자 입력은 반드시 타입 가드로 검증
3. **변환 로직**: 날짜, 시간 등 포맷팅은 `type-transformers.ts`에 중앙화
4. **타입 재사용**: 기존 타입을 확장하여 사용 (중복 방지)

## 🔍 타입 검증

런타임 타입 검증이 필요한 경우:

```typescript
import { isVisitLogRaw, isSuccessResponse } from '@/lib/type-guards'

// API 응답 검증
if (isSuccessResponse(response)) {
  // 타입이 보장됨
  const data = response.data // ✅ 타입 안전
}

// 개별 데이터 검증
if (isVisitLogRaw(rawData)) {
  // 타입이 보장됨
  const transformed = transformVisitLog(rawData) // ✅ 타입 안전
}
```

## 📚 참고 자료

- [TypeScript 타입 가드](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [Prisma 타입 생성](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)
- [타입 변환 패턴](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
