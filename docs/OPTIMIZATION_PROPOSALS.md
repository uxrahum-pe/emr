# 대형 컴포넌트 최적화 제안

> 코드 라인 수가 많은 컴포넌트들의 분석 및 최적화 방안을 제시합니다.

## 현재 대형 컴포넌트 현황

| 순위 | 컴포넌트 | 라인 수 | 우선순위 |
|------|---------|---------|----------|
| 1 | `reception/CustomerStatusSection.tsx` | 3,795 | 높음 |
| 2 | `counseling/CustomerStatusSection.tsx` | 3,006 | 높음 |
| 3 | `PageHeader.tsx` | 939 | 중간 |
| 4 | `VisitLogContent.tsx` | 868 | 중간 |
| 5 | `CustomerInfoPanel.tsx` | 809 | 중간 |
| 6 | `WeeklyCalendar.tsx` | 615 | 낮음 |

---

## 1. CustomerStatusSection (원무/상담)

### 현재 문제점
- **크기**: 3,795줄 (원무) / 3,006줄 (상담)
- **문제**: 하나의 파일에 너무 많은 UI와 로직이 포함됨
- **영향**: 유지보수 어려움, 번들 크기 증가, 렌더링 성능 저하 가능

### 분리 제안

```
components/reception/CustomerStatusSection/
├── index.tsx                    # 메인 컨테이너 (상태 관리)
├── CustomerStatusHeader.tsx     # 헤더 영역 (탭, 필터)
├── CustomerCardGrid.tsx         # 고객 카드 그리드
├── CustomerCard.tsx             # 개별 고객 카드
├── QuickActionsPanel.tsx        # 빠른 작업 패널
├── FilterPanel.tsx              # 필터 패널
├── SortControls.tsx             # 정렬 컨트롤
└── hooks/
    ├── useCustomerFiltering.ts  # 필터링 로직
    └── useCustomerSorting.ts    # 정렬 로직
```

### 구현 단계

1. **1단계**: 공통 하위 컴포넌트 추출
   - `CustomerCard` - 개별 고객 정보 표시
   - `QuickActionsPanel` - 빠른 작업 버튼들
   - `FilterPanel` - 필터 UI

2. **2단계**: 로직 훅으로 분리
   - `useCustomerFiltering` - 필터 상태 및 로직
   - `useCustomerSorting` - 정렬 상태 및 로직

3. **3단계**: 원무/상담 공통화
   - 공통 컴포넌트는 `components/shared/` 로 이동
   - 차이점만 props로 주입

### 예상 효과
- 각 파일 500줄 이하로 축소
- 코드 재사용성 향상
- 테스트 용이성 증가

---

## 2. PageHeader

### 현재 문제점
- **크기**: 939줄
- **문제**: 팝업 내용이 인라인으로 포함됨

### 분리 제안

```
components/
├── PageHeader.tsx              # 헤더 UI만 (200줄 이하)
└── header/
    ├── VisitorStatusPopup.tsx  # 방문 고객 현황 팝업 (별도 파일)
    ├── VisitorCard.tsx         # 방문자 카드
    └── PartStatusCard.tsx      # 파트별 상태 카드
```

### 구현 단계

1. 팝업 내용을 `VisitorStatusPopup.tsx`로 분리
2. 반복되는 `C187` 카드를 `VisitorCard` 컴포넌트로 추출
3. 파트별 상태 섹션을 `PartStatusCard`로 추출

### 예상 효과
- PageHeader 200줄 이하로 축소
- 팝업 내용 재사용 가능

---

## 3. VisitLogContent

### 현재 문제점
- **크기**: 868줄
- **문제**: 다양한 뷰 모드와 상태가 혼재

### 분리 제안

```
components/visit-log/
├── VisitLogContent.tsx         # 메인 컨테이너
├── VisitLogDateView.tsx        # 날짜별 뷰
├── VisitLogPackageView.tsx     # 패키지별 뷰
├── VisitLogEntry.tsx           # 개별 로그 엔트리
├── FutureScheduleSection.tsx   # 향후 일정 섹션
└── hooks/
    └── useVisitLog.ts          # 방문일지 데이터 로직
```

---

## 4. CustomerInfoPanel

### 현재 문제점
- **크기**: 809줄
- **문제**: 여러 탭과 섹션이 하나의 파일에 포함

### 분리 제안

```
components/customer/
├── CustomerInfoPanel.tsx       # 메인 패널
├── CustomerBasicInfo.tsx       # 기본 정보 탭
├── CustomerHistory.tsx         # 이력 탭
├── CustomerPackages.tsx        # 패키지 정보 탭
└── CustomerNotes.tsx           # 메모/참조사항 탭
```

---

## 5. WeeklyCalendar

### 현재 상태
- **크기**: 615줄
- **상태**: 복잡도 대비 적절한 크기

### 개선 제안 (선택적)
- 날짜 셀 컴포넌트 분리 (성능 최적화 시)
- 이벤트 렌더링 로직 분리

---

## 즉시 적용 가능한 최적화

### 1. React.memo 적용

```typescript
// 리스트 아이템에 memo 적용
const CustomerCard = memo(function CustomerCard({ customer }: Props) {
  return <div>...</div>;
});
```

### 2. 콜백 메모이제이션

```typescript
// 핸들러 메모이제이션
const handleClick = useCallback((id: string) => {
  // 로직
}, [dependencies]);
```

### 3. 가상화 적용 (대량 데이터 시)

```typescript
import { FixedSizeList } from 'react-window';

// 가상 스크롤 적용
<FixedSizeList
  height={600}
  itemCount={customers.length}
  itemSize={80}
>
  {({ index, style }) => (
    <CustomerCard customer={customers[index]} style={style} />
  )}
</FixedSizeList>
```

---

## 리팩토링 우선순위

### 높음 (즉시 권장)
1. `reception/CustomerStatusSection.tsx` 분리
2. `counseling/CustomerStatusSection.tsx` 분리
3. 두 컴포넌트 공통화

### 중간 (다음 스프린트)
4. `PageHeader.tsx` 팝업 분리
5. `VisitLogContent.tsx` 뷰 분리

### 낮음 (필요 시)
6. `CustomerInfoPanel.tsx` 탭 분리
7. `WeeklyCalendar.tsx` 셀 분리

---

## 성능 모니터링 권장 사항

### React DevTools 사용
1. Profiler로 렌더링 시간 측정
2. "Highlight updates" 활성화하여 불필요한 리렌더링 확인

### 번들 분석
```bash
npm run build
# 또는
npx @next/bundle-analyzer
```

### 권장 메트릭
- 각 컴포넌트 파일: 500줄 이하
- 렌더링 시간: 16ms 이하 (60fps)
- 초기 로드 시간: 3초 이하

---

## 참고 자료

- [React 성능 최적화](https://reactjs.org/docs/optimizing-performance.html)
- [Code Splitting](https://nextjs.org/docs/advanced-features/dynamic-import)
- [React.memo 사용 가이드](https://reactjs.org/docs/react-api.html#reactmemo)

---

## 업데이트 이력

- **2025-01-XX**: 초기 분석 및 제안 작성
