# CSS 클래스명 참조 문서

이 문서는 프로젝트에서 사용되는 CSS 클래스명(C007, C014, T000 등)의 의미와 용도를 설명합니다. AI가 코드를 이해하는 데 도움을 주기 위해 작성되었습니다.

## 빠른 참조

### 컴포넌트 클래스 (C###)

| 클래스 | 의미 | 주요 사용 위치 |
|--------|------|---------------|
| C000 | 사이드바 네비게이션 | `Sidebar.tsx` |
| C007 | 메인 컨테이너 | 모든 페이지 `<main>` |
| C013 | 사이드 패널 (ASIDE) | `Aside.tsx` |
| C018 | 알림/쪽지 버튼 | `PageHeader.tsx` |
| C190 | 사이드바 메뉴 아이템 | `Sidebar.tsx` |
| C193 | 파트별 메뉴 영역 | `Sidebar.tsx` |
| C194 | 파트 메뉴 버튼 | `Sidebar.tsx` |
| C180 | 팝업 콘텐츠 영역 | `popups/*.tsx` |

### 텍스트 클래스 (T###)

| 클래스 | 의미 | 주요 사용 위치 |
|--------|------|---------------|
| T000 | 사용자 이름 | `Sidebar.tsx` |
| T001 | 병원명 | `Sidebar.tsx` |
| T003 | 제목 텍스트 | `PageHeader.tsx` |
| T083 | 사이드바 메뉴 버튼 텍스트 | `Sidebar.tsx` |

### 상태 클래스 (is*)

| 클래스 | 의미 | 사용 예 |
|--------|------|---------|
| isSelected | 선택된 상태 | `.C004.isSelected` |
| isOverflowed | 오버플로우 상태 | `.C003.isOverflowed` |
| isPending | 대기 상태 | `.C031.isPending` |

---

## 목차

1. [레이아웃 클래스](#레이아웃-클래스)
2. [사이드바 클래스](#사이드바-클래스)
3. [페이지 헤더 클래스](#페이지-헤더-클래스)
4. [고객 상태 섹션 클래스](#고객-상태-섹션-클래스)
5. [텍스트 스타일 클래스](#텍스트-스타일-클래스)
6. [상태 클래스](#상태-클래스)
7. [기타 컴포넌트](#기타-컴포넌트)
8. [아이콘 클래스](#아이콘-클래스)

---

## 레이아웃 클래스

### C007
- **의미**: 메인 컨테이너 (Main Container)
- **용도**: 페이지의 메인 콘텐츠 영역
- **스타일**: 사이드바 너비(160px)만큼 왼쪽 마진, 최대 너비 제한
- **사용 위치**: `app/page.tsx`, `app/reception/page.tsx` 등 모든 페이지의 `<main>` 태그

### C008
- **의미**: 페이지 헤더 컨테이너 (Page Header Container)
- **용도**: 페이지 상단 헤더 영역
- **스타일**: flex 레이아웃, 중앙 정렬, 고정 너비
- **사용 위치**: `components/PageHeader.tsx`

### C013
- **의미**: 사이드 패널 (Aside Panel)
- **용도**: 우측 고정 사이드바 (ASIDE)
- **스타일**: 고정 너비(500px), 고정 위치, 녹색 배경
- **사용 위치**: `components/Aside.tsx`

### C020
- **의미**: 대시보드/콘텐츠 섹션 (Content Section)
- **용도**: 메인 콘텐츠 영역
- **스타일**: 상단 마진, 중앙 정렬, 반응형 너비
- **사용 위치**: `app/page.tsx` (CustomerStatusSection)

### C021
- **의미**: 고객 상태 카드 (Customer Status Card)
- **용도**: 고객 상태를 표시하는 카드 컨테이너
- **스타일**: 둥근 모서리, 그림자, 흰색 배경
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

---

## 사이드바 클래스

### C000
- **의미**: 사이드바 네비게이션 (Sidebar Navigation)
- **용도**: 좌측 고정 사이드바
- **스타일**: 고정 너비(120px), 고정 위치, 흰색 배경
- **사용 위치**: `components/Sidebar.tsx`

### C001
- **의미**: 사용자 프로필 영역 (User Profile Area)
- **용도**: 사이드바 상단 사용자 정보 영역
- **스타일**: 상단 마진
- **사용 위치**: `components/Sidebar.tsx`

### C002
- **의미**: 사용자 아바타 (User Avatar)
- **용도**: 사용자 프로필 이미지
- **스타일**: 원형, 고정 크기(45px), 배경 이미지
- **사용 위치**: `components/Sidebar.tsx`

### C003
- **의미**: 메뉴 스크롤 컨테이너 (Menu Scroll Container)
- **용도**: 사이드바 메뉴 아이템들의 스크롤 영역
- **스타일**: 세로 스크롤, 스크롤바 숨김, 오버플로우 감지
- **상태**: `.isOverflowed` - 오버플로우 시 그라데이션 배경
- **사용 위치**: `components/Sidebar.tsx`

### C004
- **의미**: 메뉴 아이템 (Menu Item)
- **용도**: 사이드바의 각 메뉴 링크
- **스타일**: 정사각형 버튼(60px), 둥근 모서리, 호버 효과
- **상태**: `.isSelected` - 현재 선택된 페이지 표시
- **사용 위치**: `components/Sidebar.tsx`

### C005
- **의미**: 메뉴 아이콘 (Menu Icon)
- **용도**: 메뉴 아이템의 아이콘 영역
- **스타일**: 고정 크기(50px), 중앙 정렬
- **사용 위치**: `components/Sidebar.tsx`

### C006
- **의미**: 설정 메뉴 영역 (Settings Menu Area)
- **용도**: 사이드바 하단 설정 버튼 영역
- **스타일**: 하단 마진
- **사용 위치**: `components/Sidebar.tsx`

---

## 페이지 헤더 클래스

### C009
- **의미**: 방문 고객 현황 버튼 (Visitor Status Button)
- **용도**: 지점 전체 방문 고객 현황 팝업 열기 버튼
- **스타일**: flex 레이아웃, 테두리, 호버 효과
- **사용 위치**: `components/PageHeader.tsx`

### C010
- **의미**: 상태 인디케이터 (Status Indicator)
- **용도**: 방문 고객 현황의 상태 표시 (녹색 점)
- **스타일**: 원형, 고정 크기(16px), 녹색 배경
- **사용 위치**: `components/PageHeader.tsx`

### C011
- **의미**: 버튼 텍스트 영역 (Button Text Area)
- **용도**: 버튼 내부 텍스트 컨테이너
- **스타일**: 패딩, 오른쪽 테두리
- **사용 위치**: `components/PageHeader.tsx`

### C012
- **의미**: 아이콘 컨테이너 (Icon Container)
- **용도**: 아이콘을 표시하는 범용 컨테이너
- **스타일**: 고정 크기(40px), 중앙 정렬
- **조합**: `styleSheet isIcon [iconName]` - 아이콘 타입 지정
- **사용 위치**: 전역적으로 사용

### C014
- **의미**: 통합 예약 서비스 버튼 (Reservation Service Button)
- **용도**: 통합 예약 서비스 페이지 열기 버튼
- **스타일**: 작은 패딩, 테두리, 호버 효과
- **사용 위치**: `components/PageHeader.tsx`

### C015
- **의미**: 헤더 액션 영역 (Header Actions Area)
- **용도**: 헤더 우측 액션 버튼들을 담는 컨테이너
- **스타일**: flex, 우측 정렬, 자동 마진
- **사용 위치**: `components/PageHeader.tsx`

### C016
- **의미**: 검색 버튼 (Search Button)
- **용도**: 메뉴 및 기능 검색 버튼
- **스타일**: 테두리, 둥근 모서리, 호버 효과
- **사용 위치**: `components/PageHeader.tsx`

### C017
- **의미**: 아이콘 (Icon)
- **용도**: 작은 아이콘 표시
- **스타일**: 고정 크기(40px), 중앙 정렬, 낮은 투명도
- **사용 위치**: `components/PageHeader.tsx`

### C018
- **의미**: 알림/쪽지 버튼 (Notification/Note Button)
- **용도**: 1:1 참조사항 전달, 시스템 알림 버튼
- **스타일**: 정사각형 버튼(60px), 테두리, 호버 효과
- **상태**: `.isSelected` - 선택된 상태 (검은색 배경)
- **조합**: `isNote`, `isAlarm` - 버튼 타입 지정
- **사용 위치**: `components/PageHeader.tsx`

### C019
- **의미**: 버튼 아이콘 (Button Icon)
- **용도**: C018 버튼 내부의 아이콘
- **스타일**: 고정 크기(40px), 마진
- **사용 위치**: `components/PageHeader.tsx`

---

## 고객 상태 섹션 클래스

### C022
- **의미**: 탭 버튼 (Tab Button)
- **용도**: 고객 상태 섹션의 탭 선택 버튼
- **스타일**: 테두리, 둥근 모서리, 호버 효과
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C023
- **의미**: 정렬 버튼 (Sort Button)
- **용도**: 정렬 옵션 선택 버튼
- **스타일**: flex, 배경색, 호버 효과
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C024
- **의미**: 액션 영역 (Action Area)
- **용도**: 버튼들을 담는 컨테이너
- **스타일**: flex, 우측 정렬
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C025
- **의미**: 토글 스위치 (Toggle Switch)
- **용도**: ON/OFF 토글 스위치
- **스타일**: 배경색, 그림자, 슬라이더
- **상태**: `.isOff` - OFF 상태
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C026
- **의미**: 토글 슬라이더 (Toggle Slider)
- **용도**: 토글 스위치의 슬라이더 버튼
- **스타일**: 원형, 흰색 배경, 그림자
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C027
- **의미**: 토글 배경 (Toggle Background)
- **용도**: 토글 스위치의 배경 레이어
- **스타일**: 200% 너비, 전환 효과
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C028
- **의미**: 섹션 헤더 (Section Header)
- **용도**: 고객 상태 섹션의 헤더 영역
- **스타일**: 패딩, flex 레이아웃
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C029
- **의미**: 콘텐츠 영역 (Content Area)
- **용도**: 고객 상태 목록을 표시하는 영역
- **스타일**: 고정 높이(900px), 상단 테두리
- **상태**: `.isSmall` - 작은 높이(640px)
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C030
- **의미**: 탭 컨테이너 (Tab Container)
- **용도**: 여러 탭을 담는 컨테이너
- **스타일**: 패딩, flex 레이아웃, 전체 높이
- **조합**: `.isQuartet` - 4개 탭 레이아웃
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C031
- **의미**: 탭 패널 (Tab Panel)
- **용도**: 각 탭의 콘텐츠 패널
- **스타일**: 25% 너비, 세로 분할선, 커서 포인터
- **상태**: 
  - `.isPending` - 대기 상태 (노란색 배경)
  - `.isActived` - 활성화된 상태
  - `.isFolded` - 접힌 상태
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C032
- **의미**: 탭 헤더 (Tab Header)
- **용도**: 탭의 헤더 영역 (클릭 가능)
- **스타일**: flex 레이아웃, 패딩
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C033
- **의미**: 탭 제목 (Tab Title)
- **용도**: 탭의 제목 텍스트
- **스타일**: 폰트 크기, 굵기
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C034
- **의미**: 리스트 아이템 (List Item)
- **용도**: 고객 정보를 표시하는 리스트 아이템
- **스타일**: flex 레이아웃, 패딩, 호버 효과
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`, `components/ListItem.tsx`

### C035
- **의미**: 리스트 아이템 왼쪽 영역 (List Item Left)
- **용도**: 리스트 아이템의 왼쪽 콘텐츠
- **스타일**: flex, 정렬
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C036
- **의미**: 리스트 아이템 중앙 영역 (List Item Center)
- **용도**: 리스트 아이템의 중앙 콘텐츠
- **스타일**: flex, 정렬
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C037
- **의미**: 리스트 아이템 오른쪽 영역 (List Item Right)
- **용도**: 리스트 아이템의 오른쪽 콘텐츠
- **스타일**: flex, 정렬
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C038
- **의미**: 스크롤 컨테이너 (Scroll Container)
- **용도**: 스크롤 가능한 콘텐츠 영역
- **스타일**: 스크롤바 숨김, 오버플로우 처리
- **상태**: `.isOverflowed` - 오버플로우 시 상하 그라데이션 표시
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`, `components/ScrollableContainer.tsx`

### C039
- **의미**: 직원 배지 (Employee Badge)
- **용도**: 직원 정보를 표시하는 배지
- **스타일**: flex 레이아웃, 패딩, 호버 효과
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`, `components/EmployeeBadge.tsx`

### C040
- **의미**: 직원 아바타 (Employee Avatar)
- **용도**: 직원 프로필 이미지
- **스타일**: 원형, 고정 크기
- **상태**: `.isMale` - 남성 아바타
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`, `components/EmployeeBadge.tsx`

### C041
- **의미**: 스크롤 가능한 영역 (Scrollable Area)
- **용도**: 가로 스크롤 가능한 영역
- **스타일**: 스크롤바 숨김, 활성 상태 스타일
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C042
- **의미**: 금액 표시 (Amount Display)
- **용도**: 금액 정보 표시
- **스타일**: 폰트 크기, 색상
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C043
- **의미**: 할인 표시 (Discount Display)
- **용도**: 할인 정보 표시
- **스타일**: 폰트 크기, 색상
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C044
- **의미**: 기수 표시 (Generation Display)
- **용도**: 기수 정보 표시
- **스타일**: 폰트 크기, 색상
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C045
- **의미**: 시간 표시 (Time Display)
- **용도**: 시간 정보 표시
- **스타일**: 폰트 크기, 색상
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C046
- **의미**: 위치 표시 (Location Display)
- **용도**: 위치 정보 표시
- **스타일**: flex 레이아웃
- **상태**: 
  - `.isEmpty` - 빈 상태
  - `:has(.C047.isChecked)` - 체크된 상태
  - `:has(.C047.isMyLocation)` - 내 위치 상태
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C047
- **의미**: 위치 마커 (Location Marker)
- **용도**: 위치 마커 아이콘
- **스타일**: 아이콘 크기
- **상태**: `.isChecked`, `.isMyLocation`
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C048
- **의미**: 상태 인디케이터 (Status Indicator)
- **용도**: 상태를 표시하는 인디케이터
- **스타일**: 크기, 색상
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C049
- **의미**: 추가 정보 (Additional Info)
- **용도**: 추가 정보 표시 영역
- **스타일**: 폰트 크기, 색상
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C050
- **의미**: 액션 버튼 (Action Button)
- **용도**: 액션 버튼 영역
- **스타일**: flex 레이아웃
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

---

## 텍스트 스타일 클래스

### T000
- **의미**: 사용자 이름 (User Name)
- **용도**: 사이드바의 사용자 이름 표시
- **스타일**: 중앙 정렬, 폰트 크기 17px
- **사용 위치**: `components/Sidebar.tsx`

### T001
- **의미**: 병원명 (Hospital Name)
- **용도**: 사이드바의 병원명 표시
- **스타일**: 중앙 정렬, 녹색, 폰트 크기 15px
- **사용 위치**: `components/Sidebar.tsx`

### T003
- **의미**: 제목 텍스트 (Title Text)
- **용도**: 제목 텍스트 스타일
- **스타일**: 폰트 크기 14px
- **사용 위치**: `components/PageHeader.tsx`

### T004
- **의미**: 상태 텍스트 (Status Text)
- **용도**: 상태 정보 텍스트
- **스타일**: 폰트 크기 14px, 녹색
- **사용 위치**: `components/PageHeader.tsx`

### T005
- **의미**: 검색 텍스트 (Search Text)
- **용도**: 검색 버튼의 텍스트
- **스타일**: 폰트 크기 14px, 회색, flex
- **사용 위치**: `components/PageHeader.tsx`

### T006
- **의미**: 배지 숫자 (Badge Number)
- **용도**: 알림/쪽지 버튼의 숫자 배지
- **스타일**: 절대 위치, 빨간색 배경, 흰색 텍스트
- **사용 위치**: `components/PageHeader.tsx`

### T007
- **의미**: 큰 제목 (Large Title)
- **용도**: 큰 제목 텍스트
- **스타일**: 폰트 크기 21px, 굵게
- **사용 위치**: 전역

### T008
- **의미**: 일반 텍스트 (Normal Text)
- **용도**: 일반 텍스트 스타일
- **스타일**: 폰트 크기 14px, flex
- **사용 위치**: 전역

### T009
- **의미**: 회색 텍스트 (Grey Text)
- **용도**: 보조 텍스트
- **스타일**: 폰트 크기 14px, 회색
- **사용 위치**: 전역

### T010
- **의미**: 테이블 텍스트 (Table Text)
- **용도**: 테이블 셀 텍스트
- **스타일**: 폰트 크기 14px, 패딩, 회색
- **상태**: `.isMini` - 작은 크기
- **사용 위치**: 전역

### T011
- **의미**: 중간 제목 (Medium Title)
- **용도**: 중간 크기 제목
- **스타일**: 폰트 크기 19px
- **사용 위치**: 전역

### T012
- **의미**: 우측 정렬 텍스트 (Right Aligned Text)
- **용도**: 우측 정렬 텍스트
- **스타일**: 폰트 크기 14px, 회색, 자동 마진
- **사용 위치**: 전역

### T083
- **의미**: 사이드바 메뉴 버튼 텍스트 (Sidebar Menu Button Text)
- **용도**: C194 버튼의 텍스트 라벨 (C196과 함께 사용)
- **스타일**: 메뉴 버튼 텍스트 스타일
- **사용 위치**: `components/Sidebar.tsx` (C194 버튼 내부)

---

## 상태 클래스

### isSelected
- **의미**: 선택된 상태
- **용도**: 현재 선택된 항목 표시
- **사용 예**: `.C004.isSelected`, `.C018.isSelected`
- **스타일**: 배경색 변경, 아이콘 색상 반전

### isOverflowed
- **의미**: 오버플로우 상태
- **용도**: 콘텐츠가 넘칠 때 표시
- **사용 예**: `.C003.isOverflowed`, `.C038.isOverflowed`
- **스타일**: 상하 그라데이션 배경 표시

### isPending
- **의미**: 대기 상태
- **용도**: 대기 중인 상태 표시
- **사용 예**: `.C031.isPending`
- **스타일**: 노란색 배경

### isActived
- **의미**: 활성화된 상태
- **용도**: 활성화된 탭/패널 표시
- **사용 예**: `.C031.isActived`
- **스타일**: 배경색, 레이아웃 변경

### isFolded
- **의미**: 접힌 상태
- **용도**: 접힌 탭/패널 표시
- **사용 예**: `.C031.isFolded`
- **스타일**: 높이 축소, 콘텐츠 숨김

### isOff
- **의미**: OFF 상태
- **용도**: 토글 스위치의 OFF 상태
- **사용 예**: `.C025.isOff`
- **스타일**: 배경색 변경, 슬라이더 위치 변경

### isSmall
- **의미**: 작은 크기
- **용도**: 작은 높이로 표시
- **사용 예**: `.C029.isSmall`
- **스타일**: 높이 축소 (640px)

### isQuartet
- **의미**: 4개 탭 레이아웃
- **용도**: 4개의 탭을 가진 레이아웃
- **사용 예**: `.C030.isQuartet`
- **스타일**: 4개 탭을 위한 레이아웃 조정

---

## 기타 컴포넌트

### C061
- **의미**: 툴팁 (Tooltip)
- **용도**: 호버 시 표시되는 툴팁
- **스타일**: 고정 위치, 반투명 배경, 흰색 텍스트
- **사용 위치**: `components/Tooltip.tsx`

### C070
- **의미**: 전달사항 입력 영역 (Message Input Area)
- **용도**: 원무 파트의 전달사항 입력 영역
- **스타일**: flex 레이아웃, 패딩
- **사용 위치**: `components/Aside.tsx`

### C071
- **의미**: 작성 버튼 (Write Button)
- **용도**: 전달사항 작성 버튼
- **스타일**: 아이콘 버튼
- **사용 위치**: `components/Aside.tsx`

### C072
- **의미**: 작성 아이콘 (Write Icon)
- **용도**: 작성 아이콘
- **스타일**: 아이콘 크기
- **사용 위치**: `components/Aside.tsx`

### C073
- **의미**: 대시보드 메인 영역 (Dashboard Main Area)
- **용도**: 대시보드의 메인 콘텐츠 영역
- **스타일**: 빈 영역 (대시보드 전용)
- **사용 위치**: `components/Aside.tsx`

### C074
- **의미**: 구분선 (Divider)
- **용도**: 섹션 구분선
- **스타일**: 구분선 스타일
- **사용 위치**: `components/Aside.tsx`

### C075
- **의미**: 메인 콘텐츠 (Main Content)
- **용도**: ASIDE의 메인 콘텐츠 영역
- **스타일**: 콘텐츠 영역 스타일
- **사용 위치**: `components/Aside.tsx`

### C096
- **의미**: 고객 상세 패널 (Customer Detail Panel)
- **용도**: 고객 상세 정보를 표시하는 패널
- **스타일**: 슬라이드 패널 스타일
- **사용 위치**: `components/reception/CustomerStatusSection.tsx`

### C112, C113
- **의미**: 추가 UI 컴포넌트
- **용도**: 특정 UI 요소
- **사용 위치**: 전역

### C135
- **의미**: 추가 UI 컴포넌트
- **용도**: 특정 UI 요소
- **사용 위치**: 전역

### C156, C157, C158
- **의미**: 추가 UI 컴포넌트
- **용도**: 특정 UI 요소
- **사용 위치**: 전역

### C167, C168, C169, C170, C171
- **의미**: 추가 UI 컴포넌트
- **용도**: 특정 UI 요소
- **사용 위치**: 전역

### C176
- **의미**: 특수 컨테이너 (Special Container)
- **용도**: 특수한 레이아웃 컨테이너
- **사용 위치**: 전역

### C180
- **의미**: 팝업 콘텐츠 영역 (Popup Content Area)
- **용도**: 팝업 내부의 콘텐츠를 담는 영역 (퍼블리싱 공간)
- **스타일**: 팝업 콘텐츠 컨테이너
- **사용 위치**: `components/popups/*.tsx` (모든 팝업 컴포넌트의 퍼블리싱 영역)

### C189
- **의미**: 정렬 영역 (Sort Area)
- **용도**: 정렬 옵션을 표시하는 영역
- **사용 위치**: `components/PageHeader.tsx`

### C190
- **의미**: 사이드바 메뉴 아이템 (Sidebar Menu Item)
- **용도**: 사이드바의 각 파트 메뉴 아이템 (대시보드, 원무, 상담 등)
- **스타일**: 클릭 가능한 메뉴 아이템
- **사용 위치**: `components/Sidebar.tsx`

### C191
- **의미**: 사이드바 서브메뉴 컨테이너 (Sidebar Submenu Container)
- **용도**: C190 메뉴 아이템 클릭 시 표시되는 서브메뉴 영역
- **스타일**: 서브메뉴 컨테이너 레이아웃
- **사용 위치**: `components/Sidebar.tsx`

### C193
- **의미**: 파트별 메뉴 영역 (Part Menu Area)
- **용도**: 각 파트(원무, 상담 등)별로 구분된 메뉴 버튼 영역
- **스타일**: 파트별 메뉴 버튼들을 담는 컨테이너
- **특징**: 각 파트마다 별도의 C193 영역이 존재 (원무 C193, 상담 C193 등)
- **사용 위치**: `components/Sidebar.tsx` (각 파트별로 조건부 렌더링)

### C194
- **의미**: 파트 메뉴 버튼 (Part Menu Button)
- **용도**: C193 영역 내의 각 메뉴 버튼 (예: "고객 현황", "대행사 현황" 등)
- **스타일**: 클릭 가능한 메뉴 버튼, 호버 효과
- **기능**: 클릭 시 `usePartCommonStore`의 `openSidebarMenuPopup` 상태를 업데이트하여 팝업 열기
- **사용 위치**: `components/Sidebar.tsx` (각 파트의 C193 영역 내부)

### C195
- **의미**: 메뉴 버튼 아이콘 (Menu Button Icon)
- **용도**: C194 버튼 내부의 아이콘 영역
- **스타일**: 아이콘 표시
- **조합**: `styleSheet isIcon [iconName]` - 아이콘 타입 지정 (예: `isBuilding`, `isMicrophone`)
- **사용 위치**: `components/Sidebar.tsx` (C194 버튼 내부)

### C196
- **의미**: 메뉴 버튼 텍스트 (Menu Button Text)
- **용도**: C194 버튼의 텍스트 라벨
- **스타일**: 버튼 텍스트 스타일
- **사용 위치**: `components/Sidebar.tsx` (C194 버튼 내부)

### C197, C198, C199, C200
- **의미**: 대시보드 그리드 (Dashboard Grid)
- **용도**: 대시보드의 그리드 레이아웃
- **사용 위치**: `app/page.tsx`

---

## 아이콘 클래스

### styleSheet isIcon
- **의미**: 아이콘 스타일시트
- **용도**: 아이콘을 표시하기 위한 기본 클래스
- **조합**: `styleSheet isIcon [iconName]`
- **아이콘 타입**:
  - `isDashboard` - 대시보드
  - `isReception` - 원무
  - `isCounseling` - 상담
  - `isPreCare` - 전처치
  - `isProcedure` - 진료
  - `isSurgery` - 수술
  - `isClinic` - 시술
  - `isPostCare` - 후관리
  - `isStatistics` - 통계
  - `isSettings` - 설정
  - `isBentoMenu` - 벤토 메뉴
  - `isReservation` - 예약
  - `isMagnifier` - 검색
  - `isNote` - 쪽지
  - `isAlarm` - 알림
  - `isWrite` - 작성
  - `isEarth` - 지구
  - 기타 등등

---

## 사용 가이드

### 빠른 검색 방법

1. **클래스명 검색**: `Ctrl+F`로 클래스명 직접 검색 (예: `C194`)
2. **빠른 참조 테이블**: 문서 상단의 빠른 참조 테이블 활용
3. **카테고리별 탐색**: 목차를 통해 관련 클래스 그룹 확인

### AI를 위한 참조 방법

1. **클래스명 찾기**: 이 문서에서 클래스명을 검색하여 의미 파악
2. **컴포넌트 위치**: "사용 위치" 필드를 참조하여 실제 사용 예시 확인
3. **상태 클래스**: 상태 클래스 섹션을 참조하여 동적 상태 처리 방법 파악
4. **조합 사용**: 여러 클래스를 조합하여 사용하는 경우 각 클래스의 의미를 확인

### 퍼블리싱 시 주의사항

1. **일관성 유지**: 기존 클래스명 규칙을 따르기
2. **상태 클래스**: `.isSelected`, `.isOverflowed` 등 상태 클래스는 JavaScript로 동적 추가
3. **CSS 변수**: 모든 크기와 색상은 CSS 변수(`--size-*`, `--color-*`) 사용
4. **반응형**: `calc()` 함수를 사용하여 반응형 크기 계산
5. **새 클래스 추가 시**: 기존 네이밍 규칙(C###, T###)을 따르고 이 문서에 추가

### 클래스명 네이밍 규칙

- **C{번호}**: 컴포넌트 클래스 (예: `C007`, `C194`)
- **T{번호}**: 텍스트 스타일 클래스 (예: `T000`, `T083`)
- **is{이름}**: 상태/변형 클래스 (예: `isSelected`, `isOverflowed`)

---

## 업데이트 이력

- 2025-01-XX: 인터페이스 분리 작업 반영, 빠른 참조 테이블 추가
- 2025-01-XX: Sidebar 서브메뉴 클래스 상세 설명 추가
- 2025-01-XX: 초기 문서 작성

---

## 참고

- CSS 파일 위치: `app/uxmason.C.css` (컴포넌트 스타일)
- 텍스트 스타일: `app/uxmason.T.css` (텍스트 스타일)
- 글로벌 스타일: `app/uxmason.global.css` (CSS 변수 정의)
- 타입 정의: 모든 컴포넌트 Props는 `types/` 폴더에 정의 (참고: `types/README.md`)
