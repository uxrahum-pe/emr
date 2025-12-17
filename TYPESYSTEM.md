# 타입 시스템 가이드

이 프로젝트는 **DB 스키마부터 UI 컴포넌트까지의 타입 흐름을 명확히 관리**하기 위해 체계적인 타입 시스템을 구축했습니다.

## 🎯 목적

1. **DB 형식 가시적 관리**: Prisma 스키마와 프론트엔드 타입의 명확한 매핑
2. **타입 안전성**: 컴파일 타임과 런타임 타입 검증
3. **AI 친화적 구조**: 명확한 타입 정의로 AI가 코드를 더 정확하게 생성
4. **유지보수성**: 타입 변경 시 영향 범위를 쉽게 파악

## 📁 구조

```
types/
├── api.ts          # API 응답 타입 (DB Raw ↔ 프론트엔드 Item)
├── database.ts     # DB 스키마 타입 (Prisma 기반)
├── timeline.ts     # Timeline UI 컴포넌트 타입
└── ui.ts          # 공통 UI 컴포넌트 타입

lib/
├── type-guards.ts      # 런타임 타입 검증 함수
├── type-transformers.ts # DB Raw → 프론트엔드 Item 변환
└── api-helpers.ts      # 타입 안전한 API 호출 헬퍼
```

## 🔄 타입 흐름

```
Prisma Schema 
  ↓
database.ts (Prisma 타입 확장)
  ↓
api.ts (Raw 타입 정의)
  ↓
type-transformers.ts (Raw → Item 변환)
  ↓
timeline.ts / ui.ts (UI 컴포넌트 타입)
  ↓
Components
```

## 📝 사용 가이드

### 1. Prisma 스키마 변경 시

```bash
# 1. Prisma 스키마 수정
# prisma/schema.prisma

# 2. Prisma 클라이언트 재생성
npm run type:sync

# 3. types/database.ts 업데이트
# - 새로운 모델의 Prisma.GetPayload 타입 추가
# - 관계(relations) 포함 타입 정의

# 4. types/api.ts 업데이트
# - Raw 타입 추가 (DB에서 받는 원시 데이터)
# - Item 타입 추가 (프론트엔드에서 사용하는 형식)
# - API 응답 타입 추가

# 5. lib/type-transformers.ts 업데이트
# - Raw → Item 변환 함수 추가
```

**예시: VisitLog 모델 추가**

```typescript
// 1. types/database.ts
export type VisitLogWithEntries = Prisma.VisitLogGetPayload<{
  include: { entries: true; patient: true }
}>

// 2. types/api.ts
export interface VisitLogRaw {
  id: string
  visitDate: Date | string
  patientId: string
  // ...
}

export interface VisitLogItem {
  id: string
  visitDate: string // YYYY-MM-DD
  displayDate: string // "12.15"
  // ...
}

// 3. lib/type-transformers.ts
export function transformVisitLog(raw: VisitLogRaw): VisitLogItem {
  return {
    id: raw.id,
    visitDate: formatDate(raw.visitDate),
    displayDate: formatDisplayDate(raw.visitDate),
    // ...
  }
}
```

### 2. API 엔드포인트 추가 시

```typescript
// 1. types/api.ts에 응답 타입 추가
export interface GetNewDataResponse extends ApiResponse<NewDataRaw[]> {}

// 2. lib/api-helpers.ts에 API 호출 함수 추가
export async function getNewData(id: string): Promise<GetNewDataResponse> {
  const response = await apiCall<NewDataRaw[]>(`/api/new-data/${id}`)
  return response as GetNewDataResponse
}

// 3. 컴포넌트에서 사용
const response = await getNewData('123')
if (isSuccessResponse(response)) {
  const items = transformArray.newData(response.data)
  // ...
}
```

### 3. 컴포넌트에서 사용

```typescript
import { getVisitLogs } from '@/lib/api-helpers'
import { transformArray } from '@/lib/type-transformers'
import { isSuccessResponse } from '@/lib/type-guards'

// API 호출
const response = await getVisitLogs(patientId)

// 타입 가드로 검증
if (isSuccessResponse(response)) {
  // 타입 변환
  const items = transformArray.visitLogs(response.data.items)
  
  // 컴포넌트에 전달
  return <TimelineSidebar dateItems={items} />
} else {
  // 에러 처리
  console.error(response.error)
}
```

## 🎨 네이밍 규칙

| 접미사 | 의미 | 예시 |
|--------|------|------|
| `Raw` | DB에서 받은 원시 데이터 | `VisitLogRaw` |
| `Item` | 프론트엔드에서 사용하는 변환된 데이터 | `VisitLogItem` |
| `Response` | API 응답 타입 | `GetVisitLogsResponse` |
| `Props` | 컴포넌트 props 타입 | `TimelineSidebarProps` |

## ⚠️ 주의사항

### 1. 타입 동기화 필수
- Prisma 스키마 변경 → `database.ts` 업데이트
- `database.ts` 변경 → `api.ts` 업데이트
- `api.ts` 변경 → `type-transformers.ts` 업데이트

### 2. 타입 가드 사용
외부 API나 사용자 입력은 반드시 타입 가드로 검증:

```typescript
if (isVisitLogRaw(data)) {
  // 타입이 보장됨
  const transformed = transformVisitLog(data)
}
```

### 3. 변환 로직 중앙화
날짜, 시간 등 포맷팅은 `type-transformers.ts`에 중앙화:

```typescript
// ❌ 컴포넌트에서 직접 변환
const date = new Date(raw.visitDate).toISOString()

// ✅ 변환 함수 사용
const item = transformVisitLog(raw)
```

## 🛠️ 유틸리티

### 타입 체크

```bash
# TypeScript 타입 체크
npm run type:check

# Prisma 생성 + 타입 체크
npm run type:sync
```

### 타입 가드

```typescript
import { isSuccessResponse, isVisitLogRaw } from '@/lib/type-guards'

// API 응답 검증
if (isSuccessResponse(response)) {
  // response.data가 보장됨
}

// 개별 데이터 검증
if (isVisitLogRaw(data)) {
  // data가 VisitLogRaw 타입임이 보장됨
}
```

### 타입 변환

```typescript
import { transformArray, transformVisitLog } from '@/lib/type-transformers'

// 단일 변환
const item = transformVisitLog(raw)

// 배열 변환
const items = transformArray.visitLogs(raws)
```

## 📚 참고 파일

- `types/README.md`: 타입 시스템 상세 가이드
- `components/VisitLogPanel.example.tsx`: API 연동 예시
- `scripts/type-check.md`: 타입 동기화 체크리스트

## 🤖 AI 관점에서의 이점

1. **명확한 컨텍스트**: 타입 정의로 데이터 구조를 정확히 이해
2. **정확한 코드 생성**: 타입 정보로 올바른 인터페이스 사용
3. **자동 완성 향상**: 타입 정보로 더 정확한 제안
4. **리팩토링 안전성**: 타입 변경 시 영향 범위 자동 파악

## 🔍 예시: 전체 흐름

```typescript
// 1. Prisma에서 데이터 조회 (서버)
const raw = await prisma.visitLog.findUnique({ where: { id } })

// 2. API 응답으로 변환
const response: GetVisitLogDetailResponse = {
  success: true,
  data: { visitLog: raw, entries: [] }
}

// 3. 클라이언트에서 타입 가드로 검증
if (isSuccessResponse(response)) {
  // 4. 타입 변환
  const item = transformVisitLog(response.data.visitLog)
  
  // 5. UI 컴포넌트에 전달
  return <VisitLogPanel visitLog={item} />
}
```

이 타입 시스템을 따르면 **DB 스키마 변경 시 타입 정의만 업데이트하면 컴파일 타임에 모든 오류를 잡을 수 있어** 유지보수가 훨씬 쉬워집니다.
