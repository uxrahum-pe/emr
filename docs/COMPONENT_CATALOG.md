# 컴포넌트 카탈로그

> 프로젝트의 모든 컴포넌트를 카테고리별로 정리한 문서입니다.

## 목차

1. [레이아웃 컴포넌트](#레이아웃-컴포넌트)
2. [UI 컴포넌트](#ui-컴포넌트)
3. [슬라이드 컴포넌트](#슬라이드-컴포넌트)
4. [팝업 컴포넌트](#팝업-컴포넌트)
5. [페이지별 컴포넌트](#페이지별-컴포넌트)

---

## 레이아웃 컴포넌트

### Aside

**파일**: `components/Aside.tsx`
**타입**: `AsideProps` (`types/layout.ts`)

우측 사이드바 영역의 슬라이드 페이지 스택을 관리합니다.

```tsx
<Aside mainContent={<MainContent />}>
  <NoteClickHandler onHandlerReady={handleNoteReady} />
</Aside>
```

**주요 기능:**
- 페이지 스택 관리 (push/pop)
- 슬라이드 애니메이션
- pathname 변경 시 자동 리셋

---

### Sidebar

**파일**: `components/Sidebar.tsx`

좌측 네비게이션 메뉴를 제공합니다.

```tsx
<Sidebar />
```

**메뉴 항목:**
- 대시보드, 원무, 상담, 전처치, 진료, 수술, 시술, 후관리, 통계

---

### PageHeader

**파일**: `components/PageHeader.tsx`
**타입**: `PageHeaderProps` (`types/ui.ts`)

페이지 상단 헤더 컴포넌트입니다.

```tsx
<PageHeader
  title="원무"
  onNoteClick={handleNoteClick}
  isNoteSelected={currentPageId === "my-notes"}
  onAlarmClick={handleAlarmClick}
  isAlarmSelected={currentPageId === "my-alarms"}
/>
```

**기능:**
- 페이지 제목 표시
- 방문 고객 현황 팝업
- 통합 예약 서비스
- 메뉴 검색
- 쪽지/알림 버튼

---

### SlidePage

**파일**: `components/SlidePage.tsx`
**타입**: `SlidePageProps` (`types/ui.ts`)

Aside 내 슬라이드 페이지 컨테이너입니다.

```tsx
<SlidePage
  title="고객 참조 사항"
  onGoBack={goBack}
  showBackButton={true}
>
  <CustomerReferenceContent />
</SlidePage>
```

---

### SimplePageLayout

**파일**: `components/layouts/SimplePageLayout.tsx`
**타입**: `SimplePageLayoutProps` (`types/layout.ts`)

간단한 페이지용 공통 레이아웃입니다.

```tsx
<SimplePageLayout
  title="통계"
  subtitle="데이터 분석 및 리포트"
  containerClassName="statistics-page"
>
  {children}
</SimplePageLayout>
```

---

## UI 컴포넌트

### Tooltip

**파일**: `components/Tooltip.tsx`
**타입**: `TooltipProps` (`types/ui.ts`)

```tsx
<Tooltip text="설명 텍스트">
  <button>호버하세요</button>
</Tooltip>
```

---

### Popup

**파일**: `components/Popup.tsx`
**타입**: `PopupProps` (`types/ui.ts`)

모달 팝업 컨테이너입니다.

```tsx
<Popup isOpen={isOpen} onClose={handleClose}>
  <PopupHeader title="팝업 제목" onClose={handleClose} />
  {/* 팝업 내용 */}
</Popup>
```

---

### PopupSectionBox

**파일**: `components/PopupSectionBox.tsx`
**타입**: `PopupSectionBoxProps` (`types/ui.ts`)

팝업 내 섹션 박스입니다.

```tsx
<PopupSectionBox x={290} y={60} width={1340} height={400}>
  {/* 섹션 내용 */}
</PopupSectionBox>
```

---

### ToggleSwitch

**파일**: `components/ToggleSwitch.tsx`
**타입**: `ToggleSwitchProps` (`types/ui.ts`)

```tsx
// Controlled
<ToggleSwitch
  value={isOn}
  onChange={setIsOn}
  onLabel="ON"
  offLabel="OFF"
/>

// Uncontrolled
<ToggleSwitch
  defaultChecked={true}
  onChange={handleChange}
  onLabel="ON"
  offLabel="OFF"
/>
```

---

### TabSelector

**파일**: `components/TabSelector.tsx`
**타입**: `TabSelectorProps` (`types/ui.ts`)

```tsx
<TabSelector
  items={[{ title: "전체" }, { title: "진행중" }, { title: "완료" }]}
  value={selectedTab}
  onChange={setSelectedTab}
  multiple={false}
/>
```

---

### Checkbox

**파일**: `components/Checkbox.tsx`

```tsx
<Checkbox checked={isChecked} onChange={setIsChecked} />
```

---

### LabeledCheckbox

**파일**: `components/LabeledCheckbox.tsx`

```tsx
<LabeledCheckbox
  label="동의합니다"
  checked={isAgreed}
  onChange={setIsAgreed}
/>
```

---

### ScrollableContainer

**파일**: `components/ScrollableContainer.tsx`
**타입**: `ScrollableContainerProps` (`types/ui.ts`)

```tsx
<ScrollableContainer height="400px" onOverflowChange={handleOverflow}>
  {/* 스크롤 가능한 내용 */}
</ScrollableContainer>
```

---

### DraggableScrollContainer

**파일**: `components/DraggableScrollContainer.tsx`
**타입**: `DraggableScrollContainerProps` (`types/ui.ts`)

드래그로 스크롤 가능한 컨테이너입니다.

```tsx
<DraggableScrollContainer scrollSpeed={2} scrollToEnd={true}>
  {/* 드래그 스크롤 내용 */}
</DraggableScrollContainer>
```

---

### ListItem

**파일**: `components/ListItem.tsx`
**타입**: `ListItemProps` (`types/ui.ts`)

```tsx
<ListItem
  leftContent={<Avatar />}
  rightContent={<Badge />}
  onClick={handleClick}
>
  리스트 항목 내용
</ListItem>
```

---

### EmployeeBadge

**파일**: `components/EmployeeBadge.tsx`

직원 정보 배지입니다.

```tsx
<EmployeeBadge
  name="김유정"
  role="상담사"
  onClick={handleClick}
/>
```

---

### ValidatedInput

**파일**: `components/ValidatedInput.tsx`

검증 기능이 포함된 입력 필드입니다.

```tsx
<ValidatedInput
  {...register("name")}
  error={errors.name?.message}
  placeholder="이름을 입력하세요"
/>
```

---

### WeeklyCalendar

**파일**: `components/WeeklyCalendar.tsx`

주간 달력 컴포넌트입니다.

```tsx
<WeeklyCalendar isNotShadow={false} />
```

---

### MonthlyCalendar

**파일**: `components/MonthlyCalendar.tsx`

월간 달력 컴포넌트입니다.

```tsx
<MonthlyCalendar
  selectedDate={selectedDate}
  onDateSelect={handleDateSelect}
/>
```

---

### TimelineSidebar

**파일**: `components/TimelineSidebar.tsx`

타임라인 사이드바 컴포넌트입니다.

```tsx
<TimelineSidebar
  viewMode="date"
  onDateSelect={handleDateSelect}
  onPackageSelect={handlePackageSelect}
/>
```

---

### ExpandableText

**파일**: `components/ExpandableText.tsx`

확장 가능한 텍스트 컴포넌트입니다.

```tsx
<ExpandableText maxLines={3}>
  긴 텍스트 내용...
</ExpandableText>
```

---

### FatLevelGauge

**파일**: `components/FatLevelGauge.tsx`

지방 레벨 게이지 컴포넌트입니다.

```tsx
<FatLevelGauge level={3} />
```

---

## 슬라이드 컴포넌트

모든 슬라이드 컴포넌트는 `BaseSlideProps`를 확장합니다.

### MyNotesSlide

**파일**: `components/slides/MyNotesSlide.tsx`
**타입**: `MyNotesSlideProps` (`types/slides.ts`)

내 쪽지 보기 슬라이드입니다.

```tsx
useAsideStore.getState().navigateToPage("my-notes", <MyNotesSlide />);
```

---

### MyAlarmsSlide

**파일**: `components/slides/MyAlarmsSlide.tsx`
**타입**: `MyAlarmsSlideProps` (`types/slides.ts`)

내 알림 보기 슬라이드입니다.

```tsx
useAsideStore.getState().navigateToPage("my-alarms", <MyAlarmsSlide />);
```

---

### DoctorSlidePage

**파일**: `components/slides/DoctorSlidePage.tsx`
**타입**: `DoctorSlidePageProps` (`types/slides.ts`)

원장 일정 슬라이드입니다.

```tsx
useAsideStore.getState().navigateToPage("doctor",
  <DoctorSlidePage doctorName="홍길동" doctorId="D001" />
);
```

---

### CounselorSlidePage

**파일**: `components/slides/CounselorSlidePage.tsx`
**타입**: `CounselorSlidePageProps` (`types/slides.ts`)

상담사 일정 슬라이드입니다.

```tsx
useAsideStore.getState().navigateToPage("counselor",
  <CounselorSlidePage counselorName="김유정" counselorId="C001" />
);
```

---

### EmployeeSlidePage

**파일**: `components/slides/EmployeeSlidePage.tsx`
**타입**: `EmployeeSlidePageProps` (`types/slides.ts`)

직원 일정 슬라이드입니다.

```tsx
useAsideStore.getState().navigateToPage("employee",
  <EmployeeSlidePage
    employeeName="이철수"
    employeeId="E001"
    employeeRole="매니저"
  />
);
```

---

### CustomerReferenceSlide

**파일**: `components/slides/CustomerReferenceSlide.tsx`
**타입**: `CustomerReferenceSlideProps` (`types/slides.ts`)

고객 참조사항 슬라이드입니다.

```tsx
useAsideStore.getState().navigateToPage("customer",
  <CustomerReferenceSlide
    customerName="박지영"
    customerId="210048921"
  />
);
```

---

### DoctorScheduleContent

**파일**: `components/slides/DoctorScheduleContent.tsx`

원장 일정 내용 컴포넌트입니다.

---

## 팝업 컴포넌트

모든 팝업 컴포넌트는 `BasePopupProps`를 확장합니다.

### 상태 팝업 (Sidebar 메뉴)

| 컴포넌트 | 파일 | 설명 |
|---------|------|------|
| CustomerStatusPopup | `popups/CustomerStatusPopup.tsx` | 고객 현황 |
| ForeignerStatusPopup | `popups/ForeignerStatusPopup.tsx` | 외국인 현황 |
| AgreementStatusPopup | `popups/AgreementStatusPopup.tsx` | 동의서 현황 |
| PracticeIndexStatusPopup | `popups/PracticeIndexStatusPopup.tsx` | 실천지수 현황 |
| AgencyStatusPopup | `popups/AgencyStatusPopup.tsx` | 대행사 현황 |
| RecordingFilePopup | `popups/RecordingFilePopup.tsx` | 녹취파일 관리 |

```tsx
<CustomerStatusPopup isOpen={isOpen} onClose={handleClose} />
```

---

### 기능 팝업

| 컴포넌트 | 파일 | 설명 |
|---------|------|------|
| MenuSearchPopup | `popups/MenuSearchPopup.tsx` | 메뉴 검색 |
| ReservationServicePopup | `popups/ReservationServicePopup.tsx` | 통합 예약 서비스 |
| PartReferencePopup | `popups/PartReferencePopup.tsx` | 파트 참조사항 |
| AppointmentPopup | `popups/AppointmentPopup.tsx` | 상담 예약 |
| CheckInPopup | `popups/CheckInPopup.tsx` | 접수하기 |
| CheckOutPopup | `popups/CheckOutPopup.tsx` | 귀가처리 |
| PaymentPopup | `popups/PaymentPopup.tsx` | 수납등록 |
| PrescriptionPopup | `popups/PrescriptionPopup.tsx` | 처방전 |
| MovePartPopup | `popups/MovePartPopup.tsx` | 파트이동 |
| DailyProcedurePopup | `popups/DailyProcedurePopup.tsx` | 일일 시술 |
| StatusManagementPopup | `popups/StatusManagementPopup.tsx` | 상태 관리 |

---

### PopupHeader

**파일**: `components/popups/PopupHeader.tsx`
**타입**: `PopupHeaderProps` (`types/popups.ts`)

팝업 헤더 컴포넌트입니다.

```tsx
<PopupHeader
  title="팝업 제목"
  onClose={handleClose}
  x={260}
  y={20}
  width={1400}
/>
```

---

## 페이지별 컴포넌트

### Dashboard

| 컴포넌트 | 파일 | 설명 |
|---------|------|------|
| PersonalSchedule | `dashboard/PersonalSchedule.tsx` | 개인 일정 |
| ReservationClickHandler | `dashboard/ReservationClickHandler.tsx` | 예약 클릭 핸들러 |

### Reception

| 컴포넌트 | 파일 | 설명 |
|---------|------|------|
| MainContent | `reception/MainContent.tsx` | 메인 콘텐츠 |
| CustomerStatusSection | `reception/CustomerStatusSection.tsx` | 고객 상태 섹션 |
| NoteClickHandler | `reception/NoteClickHandler.tsx` | 쪽지 클릭 핸들러 |
| AlarmClickHandler | `reception/AlarmClickHandler.tsx` | 알림 클릭 핸들러 |

### Counseling

| 컴포넌트 | 파일 | 설명 |
|---------|------|------|
| MainContent | `counseling/MainContent.tsx` | 메인 콘텐츠 |
| CustomerStatusSection | `counseling/CustomerStatusSection.tsx` | 고객 상태 섹션 |
| NoteClickHandler | `counseling/NoteClickHandler.tsx` | 쪽지 클릭 핸들러 |
| AlarmClickHandler | `counseling/AlarmClickHandler.tsx` | 알림 클릭 핸들러 |

---

## 컴포넌트 관계도

```
App Layout
├── Sidebar (좌측 네비게이션)
└── Main Content
    ├── PageHeader (상단 헤더)
    └── Aside (우측 사이드바)
        ├── MainContent (페이지별 메인 콘텐츠)
        └── SlidePage Stack
            ├── MyNotesSlide
            ├── MyAlarmsSlide
            ├── DoctorSlidePage
            ├── CounselorSlidePage
            ├── EmployeeSlidePage
            └── CustomerReferenceSlide
```

---

## 업데이트 이력

- **2025-01-XX**: 초기 카탈로그 작성
