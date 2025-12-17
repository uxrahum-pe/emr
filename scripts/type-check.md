# 타입 체크 및 동기화 가이드

## Prisma 스키마 변경 후 타입 동기화 체크리스트

Prisma 스키마를 변경한 후 다음 단계를 따라 타입 시스템을 동기화하세요.

### 1. Prisma 클라이언트 재생성

```bash
npx prisma generate
```

### 2. 타입 파일 업데이트

#### `types/database.ts` 확인
- 새로운 모델이 추가되었는지 확인
- 관계(relations)가 올바르게 반영되었는지 확인
- `Prisma.ModelNameGetPayload` 타입이 올바른지 확인

#### `types/api.ts` 확인
- 새로운 Raw 타입 추가 (예: `NewModelRaw`)
- 프론트엔드 Item 타입 추가 (예: `NewModelItem`)
- API 응답 타입 추가 (예: `GetNewModelResponse`)

#### `lib/type-transformers.ts` 확인
- Raw → Item 변환 함수 추가
- 배열 변환 헬퍼에 추가

#### `lib/type-guards.ts` 확인
- 타입 가드 함수 추가 (필요시)

### 3. 타입 체크 실행

```bash
# TypeScript 타입 체크
npx tsc --noEmit

# 또는 Next.js 빌드로 체크
npm run build
```

### 4. 컴포넌트 업데이트

새로운 타입을 사용하는 컴포넌트가 있다면:
- Import 경로 확인
- 타입 변환 로직 확인
- 타입 가드 사용 확인

## 자동화 스크립트 (선택사항)

다음 스크립트를 `package.json`에 추가하여 자동화할 수 있습니다:

```json
{
  "scripts": {
    "type:check": "tsc --noEmit",
    "type:sync": "prisma generate && npm run type:check"
  }
}
```

## 주의사항

1. **타입 변경은 Breaking Change**: 타입 변경 시 모든 사용처를 확인하세요
2. **마이그레이션**: DB 마이그레이션과 타입 변경을 함께 진행하세요
3. **테스트**: 타입 변경 후 컴포넌트 동작을 테스트하세요
